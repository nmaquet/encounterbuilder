// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

module.exports = function (collections, ObjectID) {
    var traverse = require("traverse");
    var async = require("async");

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

    return {
        deleteResource: function (request, response) {
            var sessionUserId = request.user._id;
            var paramsResourceId = request.params.id;
            if (!paramsResourceId||!sessionUserId){
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
                                console.log("task executing");
                                userResourceCollections[node.resourceType].remove({_id: ObjectID(node.userResourceId), userId: ObjectID(sessionUserId)}, taskCallback);
                            })
                        }
                    });

                    async.parallel(tasks, function (error,numberOfDocumentDeleted) {
                        if (error) {
                            console.log(error);
                            return response.send(500);
                        }
                        else {
                            console.log("deleting chronicle");
                            console.log(numberOfDocumentDeleted);
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
        }
    };
};

