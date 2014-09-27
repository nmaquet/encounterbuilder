// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderServices.factory('contentTreeService',
    ['$rootScope', '$timeout', '$http', '$routeParams', 'encounterService', 'locationService', 'userResourceService',
        function ($rootScope, $timeout, $http, $routeParams, encounterService, locationService, userResourceService) {

            var service = {};
            var fancyTree = null;

            var currentChronicle = null;

            service.hasFirstNode = function () {
            };

            service.goToFirstNode = function () {
            };

            service.getBinderByKey = function () {
            };

            service.createBinder = function () {
            };

            service.binderChanged = function () {
            };

            service.removeBinder = function (binder) {
                var toRemove;
                fancyTree.visit(function (node) {
                    if (node.folder && node.key === binder.nodeKey) {
                        toRemove = node;
                    }
                });
                if (toRemove) {
//                    removeNode(toRemove);
//                    service.treeChanged(fancyTree.toDict(removeExtraClasses));
                } else {
                    console.log("could not remove content tree binder");
                }
            };

            service.createEncounter = function () {
            };

            service.createUserResource = function () {
            };

            service.copyResource = function () {
            };

            service.copyUserResource = function () {
            };

            service.removeEncounter = function () {
            };

            service.changeEncounter = function (encounter) {
                fancyTree.visit(function (node) {
                    if (node.data.userResourceId && node.data.userResourceId === encounter._id) {
                        if (node.title !== encounter.Name) {
                            node.setTitle(encounter.Name);
                            return false;
                        }
                        //FIXME this saves every ecounter change to the fancyTree (including monsters and stuffs)
//                        service.treeChanged(fancyTree.toDict(removeExtraClasses));
                    }
                });
            };

            service.userResourceUpdated = function (userResource, resourceType) {
                if (resourceType && resourceType === "chronicle") {
                    currentChronicle = userResource;
                    return;
                }
                fancyTree.visit(function (node) {
                    if (node.data.userResourceId && node.data.userResourceId === userResource._id) {
                        var name = userResource.name || userResource.Name;
                        if (node.title !== name) {
                            node.setTitle(name);
//                            service.treeChanged(fancyTree.toDict(removeExtraClasses));
                        }
                    }
                });
            };

            service.userResourceDeleted = function () {
            };

            service.getBinderChildrenByKey = function (key, callback) {
                var children = fancyTree.getNodeByKey(key).getChildren();
                var encounterIds = [];
                var userMonsterIds = [];
                var userNpcsIds = [];
                var userTextIds = [];
                var userSpellIds = [];
                var userFeatIds = [];
                var userItemIds = [];
                var userIllustrationIds = [];
                var userMapIds = [];
                for (var i in children) {
                    if (children[i].data.resourceType === "encounter") {
                        encounterIds.push(children[i].data.userResourceId);
                    } else if (children[i].data.resourceType === "user-text") {
                        userTextIds.push(children[i].data.userResourceId);
                    }
                    else if (children[i].data.resourceType === "user-monster") {
                        userMonsterIds.push(children[i].data.userResourceId);
                    }
                    else if (children[i].data.resourceType === "user-npc") {
                        userNpcsIds.push(children[i].data.userResourceId);
                    }
                    else if (children[i].data.resourceType === "user-spell") {
                        userSpellIds.push(children[i].data.userResourceId);
                    }
                    else if (children[i].data.resourceType === "user-feat") {
                        userFeatIds.push(children[i].data.userResourceId);
                    }
                    else if (children[i].data.resourceType === "user-item") {
                        userItemIds.push(children[i].data.userResourceId);
                    }
                    else if (children[i].data.resourceType === "user-illustration") {
                        userIllustrationIds.push(children[i].data.userResourceId);
                    }
                    else if (children[i].data.resourceType === "user-map") {
                        userMapIds.push(children[i].data.userResourceId);
                    }
                }
                var tasks = [];
                tasks.push(function (taskCallback) {
                    encounterService.getMultiple(encounterIds, function (error, encounters) {
                        taskCallback(error, encounters);
                    });
                });
                tasks.push(function (taskCallback) {
                    userResourceService["user-text"].getMultiple(userTextIds, taskCallback);
                });
                tasks.push(function (taskCallback) {
                    userResourceService["user-monster"].getMultiple(userMonsterIds, taskCallback);
                });
                tasks.push(function (taskCallback) {
                    userResourceService["user-npc"].getMultiple(userNpcsIds, taskCallback);
                });
                tasks.push(function (taskCallback) {
                    userResourceService["user-item"].getMultiple(userItemIds, taskCallback);
                });
                tasks.push(function (taskCallback) {
                    userResourceService["user-spell"].getMultiple(userSpellIds, taskCallback);
                });
                tasks.push(function (taskCallback) {
                    userResourceService["user-feat"].getMultiple(userFeatIds, taskCallback);
                });
                tasks.push(function (taskCallback) {
                    userResourceService["user-illustration"].getMultiple(userIllustrationIds, taskCallback);
                });
                tasks.push(function (taskCallback) {
                    userResourceService["user-map"].getMultiple(userMapIds, taskCallback);
                });
                window.async.parallel(tasks, function (error, results) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        var enrichedLeaves = [];
                        var encounters = results[0];
                        var userTexts = results[1];
                        var monsters = results[2];
                        var npcs = results[3];
                        var items = results[4];
                        var spells = results[5];
                        var feats = results[6];
                        var illustrations = results[7];
                        var maps = results[8];

                        for (var j in children) {
                            if (children[j].folder) {
                                enrichedLeaves.push({Name: children[j].title, nodeKey: children[j].key, descendantCount: children[j].countChildren(true), $type: "binder"})
                            }
                            else if (children[j].data.resourceType === "encounter") {
                                for (var k in encounters) {
                                    if (encounters[k]._id === children[j].data.userResourceId) {
                                        encounters[k].$type = "encounter";
                                        enrichedLeaves.push(encounters[k]);
                                        break;
                                    }
                                }
                            }
                            else if (children[j].data.resourceType === "user-text") {
                                for (var l in userTexts) {
                                    if (userTexts[l]._id === children[j].data.userResourceId) {
                                        userTexts[l].$type = "user-text";
                                        enrichedLeaves.push(userTexts[l]);
                                        break;
                                    }
                                }
                            }
                            else if (children[j].data.resourceType === "user-monster") {
                                for (var m in monsters) {
                                    if (monsters[m]._id === children[j].data.userResourceId) {
                                        monsters[m].$type = "monster";
                                        enrichedLeaves.push(monsters[m]);
                                        break;
                                    }
                                }
                            }
                            else if (children[j].data.resourceType === "user-npc") {
                                for (var n in npcs) {
                                    if (npcs[n]._id === children[j].data.userResourceId) {
                                        npcs[n].$type = "npc";
                                        enrichedLeaves.push(npcs[n]);
                                        break;
                                    }
                                }
                            }
                            else if (children[j].data.resourceType === "user-item") {
                                for (var n in items) {
                                    if (items[n]._id === children[j].data.userResourceId) {
                                        items[n].$type = "user-item";
                                        enrichedLeaves.push(items[n]);
                                        break;
                                    }
                                }
                            }
                            else if (children[j].data.resourceType === "user-spell") {
                                for (var n in spells) {
                                    if (spells[n]._id === children[j].data.userResourceId) {
                                        spells[n].$type = "user-spell";
                                        enrichedLeaves.push(spells[n]);
                                        break;
                                    }
                                }
                            }
                            else if (children[j].data.resourceType === "user-feat") {
                                for (var n in feats) {
                                    if (feats[n]._id === children[j].data.userResourceId) {
                                        feats[n].$type = "user-feat";
                                        enrichedLeaves.push(feats[n]);
                                        break;
                                    }
                                }
                            }
                            else if (children[j].data.resourceType === "user-illustration") {
                                for (var n in illustrations) {
                                    if (illustrations[n]._id === children[j].data.userResourceId) {
                                        illustrations[n].$type = "user-illustration";
                                        enrichedLeaves.push(illustrations[n]);
                                        break;
                                    }
                                }
                            }
                            else if (children[j].data.resourceType === "user-map") {
                                for (var n in maps) {
                                    if (maps[n]._id === children[j].data.userResourceId) {
                                        maps[n].$type = "user-map";
                                        enrichedLeaves.push(maps[n]);
                                        break;
                                    }
                                }
                            }
                        }
                        callback(enrichedLeaves);
                    }
                });
            };
            return service;
        }
    ]);

