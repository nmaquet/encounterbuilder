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
        getResource: function (request, response) {
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
                        if (error) {
                            console.log(error);
                            return response.send(500);
                        }
                        else {
                            return response.json(results);
                        }
                    });

                }
            });
        }
    };
};

