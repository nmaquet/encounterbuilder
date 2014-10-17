// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

module.exports = function (db, collections, ObjectID) {
    var traverse = require("traverse");
    var async = require("async");
    var s3Service = require('./s3Service')();

    var userResourceCollections = {
        "user-feat": collections.userFeats,
        "user-illustration": collections.userIllustrations,
        "user-map": collections.userMaps,
        "user-spell": collections.userSpells,
        "user-item": collections.userItems,
        "user-monster": collections.userMonsters,
        "user-npc": collections.userNpcs,
        "user-text": collections.userTexts,
        "encounter": collections.encounters
    };

    var route = require('./userResourceRoute')(collections.chronicles, null, ObjectID);
    var userService = require('./userService')(db, null);
    var originalCreate = route.createResource;

    function createOrCopyChronicle(request, response) {
        var baseChronicleId = request.body.baseChronicleId;
        var sessionUserId = request.user._id;
        if (!baseChronicleId) {
            originalCreate(request, response);
        }
        else {
            var newId = {};
            var requestPending = 0;
            userService.exportChronicle(baseChronicleId, function (error, chronicle) {
                if (error) {
                    console.log(error);
                    return response.send(500);
                }
                if (!chronicle) {
                    return response.send(404);
                }
                if (chronicle.contentTree.length === 0) {
                    insertChronicle(chronicle, sessionUserId);
                }

                traverseContentTree(false, function () {
                    traverseContentTree(true, insertChronicle);
                });

                function traverseContentTree(onlyEncounters, callback) {
                    traverse(chronicle.contentTree).forEach(function (x) {
                        if (!x) {
                            return;
                        }
                        if (!x.folder) {
                            if (x.resourceType) {
                                insertUserResource(x, chronicle, onlyEncounters, callback);
                            }
                        }
                    });
                }


            });

        }
        function insertChronicle(sourceChronicle) {
            var newChronicle = {};
            newChronicle.name = sourceChronicle.name;
            newChronicle.userId = ObjectID(sessionUserId);
            newChronicle.contentTree = sourceChronicle.contentTree;
            newChronicle.lastModified = new Date().toISOString();
            newChronicle.synopsis = sourceChronicle.synopsis;
            collections.chronicles.insert(newChronicle, function (error, newResourceArray) {
                if (error) {
                    console.log(error);
                    response.send(500);
                }
                else {
                    var newResource = newResourceArray[0];
                    response.setHeader("Location", request.path + "/" + newResource._id);
                    response.status(201).json(newResource);
                }
            });
        }

        function insertUserResource(x, chronicle, onlyEncounters, callback) {
            if ((!onlyEncounters && x.resourceType === "encounter" ) ||
                (onlyEncounters && x.resourceType !== "encounter")) {
                return;
            }
            else {
                if (!x.userResource) {
                    return;
                }
                requestPending++;
                if (x.resourceType === "encounter") {
                    _.forEach(["Monsters", "Npcs", "items"], function (type) {
                        x.userResource[type] = _.transform(x.userResource[type], function (resources, resource, id) {
                            if (resource.userCreated && newId[id]) {
                                resources[newId[id]] = resource;
                            } else if (!resource.userCreated) {
                                resources[id] = resource;
                            }
                            else {
                                console.log("warning couldn't find new  id for: " + resource.Name + " id:" + id);
                            }
                        });
                    });
                }
                x.userResource.userId = ObjectID(sessionUserId);
                userResourceCollections[x.resourceType].insert(x.userResource, function (error, newResource) {
                    if (error) {
                        console.log(error);
                        return response.send(500);
                    }
                    newId[x.userResourceId] = newResource[0]._id.toString();
                    x.userResourceId = newResource[0]._id.toString();
                    if (newResource[0].url) {
                        var originalS3Id = newResource[0].url.substring(s3Service.urlPrefix.length, newResource[0].url.indexOf('?'));
                        s3Service.copyInS3(originalS3Id, x.userResourceId);
                        userResourceCollections[x.resourceType].update({_id: newResource._id}, {$set: {url: s3Service.getResourceURL(newResource._id)}}, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        });
                    }

                    delete x.userResource;
                    requestPending--;
                    if (requestPending === 0) {
                        callback(chronicle);
                    }
                });
            }
        }
    }

    route.createResource = createOrCopyChronicle;

    route.deleteResource = function (request, response) {
        var sessionUserId = request.user._id;
        var paramsResourceId = request.params.id;
        if (!paramsResourceId || !sessionUserId) {
            return response.send(400);
        }

        var tasks = [];
        collections.chronicles.findOne({_id: ObjectID(paramsResourceId), userId: ObjectID(sessionUserId)}, function (error, chronicle) {
            if (error) {
                return response.send(500);
            }
            else {
                traverse(chronicle.contentTree).forEach(function (node) {
                    if (node && node.resourceType) {
                        console.log(node);
                        tasks.push(function (taskCallback) {
                            userResourceCollections[node.resourceType].remove({_id: node.userResourceId, userId: ObjectID(sessionUserId)}, taskCallback);
                        })
                    }
                });

                async.parallel(tasks, function (error, numberOfDocumentDeleted) {
                    if (error) {
                        console.log(error);
                        return response.send(500);
                    }
                    else {
                        collections.chronicles.remove({_id: ObjectID(paramsResourceId), userId: ObjectID(sessionUserId)}, function (error) {
                            if (error) {
                                response.send(500)
                            }
                            else {
                                response.send(204);
                            }
                        });
                    }
                });

            }
        });
    };
    route.exportResource = function (request, response) {
        var sessionUserId = request.user._id;
        var paramsResourceId = request.params.id;
        if (!paramsResourceId || !sessionUserId) {
            return response.send(400);
        }
        fetchChronicleItems(paramsResourceId, sessionUserId, function (error, results) {
            if (error) {
                console.log(error);
                return response.send(500);
            }
            else {
                return response.json(results);
            }
        });
    };
    function fetchChronicleItems(chronicleId, sessionUserId, callback) {
        var tasks = [];
        collections.chronicles.findOne({_id: ObjectID(chronicleId), userId: ObjectID(sessionUserId)}, function (error, chronicle) {
            if (error) {
                callback(error, null);
            }
            else {
                traverse(chronicle.contentTree).forEach(function (node) {
                    if (node && node.resourceType) {
                        tasks.push(function (taskCallback) {
                            userResourceCollections[node.resourceType].findOne({_id: ObjectID(node.userResourceId), userId: ObjectID(sessionUserId)}, function (error, result) {
                                if (result) {
                                    result.resourceType = node.resourceType;
                                }
                                else {
                                    console.log("no result found for node");
                                    console.log(node);
                                }
                                taskCallback(error, result);
                            });
                        })
                    }
                    if (node && node.folder) {
                        tasks.push(function (taskCallback) {
                            taskCallback(null, {resourceType: "binder", title: node.title});
                        })
                    }
                });

                async.parallel(tasks, function (error, results) {
                    callback(error, results, chronicle.name);
                });
            }
        });
    }

    return route;
};

