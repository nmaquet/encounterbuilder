// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderServices.factory('contentTreeService',
    ['$rootScope', '$timeout', '$http', 'encounterService', 'userMonsterService', 'userNpcService', 'userTextService', 'locationService', 'userResourceService',
        function ($rootScope, $timeout, $http, encounterService, userMonsterService, userNpcService, userTextService, locationService, userResourceService) {

            var LOAD_SUCCESS = "contentTreeLoaded";

            var service = {};
            var chronicleId = null;
            var contentTree = null;
            var fancyTree = null;
            var nodeKey = null;

            //FIXME removeExtraClasses and addExtraClasses are both here and in content-tree.js
            function removeExtraClasses(dict) {
                if (dict.extraClasses) {
                    delete dict.extraClasses;
                }
            }

            function addExtraClasses(newNode) {
                if (newNode.userMonsterId) {
                    newNode.extraClasses = "fancytree-monster";
                } else if (newNode.encounterId) {
                    newNode.extraClasses = "fancytree-encounter";
                }
                else if (newNode.userNpcId) {
                    newNode.extraClasses = "fancytree-npc";
                }
                else if (newNode.userTextId) {
                    newNode.extraClasses = "fancytree-text";
                }
                else if (newNode.userResourceId && newNode.resourceType === "user-feat") {
                    newNode.extraClasses = "fancytree-feat";
                }
                else if (newNode.userResourceId && newNode.resourceType === "user-spell") {
                    newNode.extraClasses = "fancytree-spell";
                }
                else if (newNode.userResourceId && newNode.resourceType === "user-item") {
                    newNode.extraClasses = "fancytree-item";
                }
                else if (newNode.userResourceId && newNode.resourceType === "user-illustration") {
                    newNode.extraClasses = "fancytree-image";
                }
                else if (newNode.userResourceId && newNode.resourceType === "user-map") {
                    newNode.extraClasses = "fancytree-map";
                }
            }

            function getNextNodeKey() {
                while (fancyTree.getNodeByKey("" + ++nodeKey) !== null) {
                }
                return "" + nodeKey;
            }

            function addNode(node) {
                addExtraClasses(node);
                var activeNode = fancyTree.getActiveNode();
                if (activeNode === null) {
                    activeNode = fancyTree.rootNode;
                    var newNode = activeNode.addNode(node);
                    newNode.setActive(true);
                    service.goToNode(newNode);
                }
                else if (activeNode.folder === true) {
                    var newNode = activeNode.addNode(node);
                    newNode.setActive(true);
                    service.goToNode(newNode);
                }
                else {
                    var newNode = activeNode.appendSibling(node);
                    newNode.setActive(true);
                    service.goToNode(newNode);
                }
            }

            function removeNode(node) {
                var parent = node.getParent();
                var nextSibling = node.getNextSibling();
                var prevSibling = node.getPrevSibling();
                var active = node.isActive();
                node.remove();
                if (active) {
                    if (parent && !parent.isRoot()) { /* a child of the root node is effectively parentless */
                        parent.setActive(true);
                        service.goToNode(parent);
                    } else if (nextSibling) {
                        nextSibling.setActive(true);
                        service.goToNode(nextSibling);
                    } else if (prevSibling) {
                        prevSibling.setActive(true);
                        service.goToNode(prevSibling);
                    } else {
                        $rootScope.go("/");
                        /* no node is active -> go to home */
                    }
                }
            }

            $http.get('/api/chronicle')
                .success(function (data) {
                    if (data.chronicle.contentTree) {
                        contentTree = data.chronicle.contentTree;
                        chronicleId = data.chronicle._id;
                    }
                    $rootScope.$emit(LOAD_SUCCESS);
                })
                .error(function (error) {
                    console.log(error);
                    $window.location.href = '/';
                });

            service.goToNode = function (node) {
                if (node.data.encounterId) {
                    locationService.go("/encounter/" + node.data.encounterId);
                }
                else if (node.data.userMonsterId) {
                    locationService.go("/user-monster/" + node.data.userMonsterId);
                }
                else if (node.data.userNpcId) {
                    locationService.go("/user-npc/" + node.data.userNpcId);
                }
                else if (node.data.userTextId) {
                    locationService.go("/user-text/" + node.data.userTextId);
                }
                else if (node.data.userResourceId) {
                    locationService.go("/" + node.data.resourceType + "/" + node.data.userResourceId);
                }
                else if (node.folder) {
                    locationService.go("/binder/" + node.key);
                }
                node.makeVisible();
            };

            service.hasFirstNode = function () {
                return fancyTree.getFirstChild();
            };

            service.goToFirstNode = function () {
                if (fancyTree && fancyTree.getFirstChild()) {
                    service.goToNode(fancyTree.getFirstChild());
                }
            };

            service.setTree = function (tree) {
                fancyTree = tree;
                nodeKey = fancyTree.count();
            };

            service.getBinderByKey = function (key) {
                var node = fancyTree.getNodeByKey(key);
                return {Name: node.title, nodeKey: node.key, descendantCount: node.countChildren(true)};
            };

            service.createBinder = function () {
                addNode({title: "new Binder", folder: true, key: getNextNodeKey()})
                service.treeChanged(fancyTree.toDict(removeExtraClasses));
            };

            service.onLoadSuccess = function (callback) {
                $rootScope.$on(LOAD_SUCCESS, callback);
            };

            service.contentTree = function () {
                return contentTree;
            };

            service.binderChanged = function (binder) {
                if (binder) {
                    fancyTree.visit(function (node) {
                        if (node.key === binder.nodeKey) {
                            node.setTitle(binder.Name);
                        }
                    });
                    service.treeChanged(fancyTree.toDict(removeExtraClasses));
                }
            };

            service.removeBinder = function (binder) {
                var toRemove;
                fancyTree.visit(function (node) {
                    if (node.folder && node.key === binder.nodeKey) {
                        toRemove = node;
                    }
                });
                if (toRemove) {
                    removeNode(toRemove);
                    service.treeChanged(fancyTree.toDict(removeExtraClasses));
                } else {
                    console.log("could not remove content tree binder");
                }
            };

            service.createEncounter = function () {
                encounterService.createEncounter(function (encounter) {
                    addNode({title: encounter.Name, encounterId: encounter._id, key: getNextNodeKey()});
                    service.treeChanged(fancyTree.toDict(removeExtraClasses));
                });
            };

            service.createUserMonster = function () {
                userMonsterService.create(function (error, userMonster) {
                    if (error) {
                        console.log(error);
                    } else {
                        addNode({title: userMonster.Name, userMonsterId: userMonster._id, key: getNextNodeKey()});
                        service.treeChanged(fancyTree.toDict(removeExtraClasses));
                    }
                });
            };

            service.createUserNpc = function () {
                userNpcService.create(function (error, userNpc) {
                    if (error) {
                        console.log(error);
                    } else {
                        addNode({title: userNpc.Name, userNpcId: userNpc._id, key: getNextNodeKey()});
                        service.treeChanged(fancyTree.toDict(removeExtraClasses));
                    }
                });
            };

            service.createUserText = function () {
                userTextService.create(function (error, userText) {
                    if (error) {
                        console.log(error);
                    } else {
                        addNode({title: userText.title, userTextId: userText._id, key: getNextNodeKey()});
                        service.treeChanged(fancyTree.toDict(removeExtraClasses));
                    }
                });
            };
            var resourceNewName = {"user-item": "new Item", "user-spell": "new Spell", "user-feat": "new Feat", "user-illustration": "new Illustration", "user-map": "new Map"};
            service.createUserResource = function (resourceType) {
                var userResource = new userResourceService[resourceType]();
                if (resourceType === "user-item") {
                    userResource.Name = resourceNewName[resourceType];
                } else {
                    userResource.name = resourceNewName[resourceType];
                }
                userResource.$save(function () {
                    addNode({title: userResource.name || userResource.Name, userResourceId: userResource._id, resourceType: resourceType, key: getNextNodeKey()});
                    service.treeChanged(fancyTree.toDict(removeExtraClasses));
                });
            };

            service.copyUserMonster = function (monsterId, userCreated) {
                userMonsterService.copy(monsterId, userCreated, function (error, userMonster) {
                    if (error) {
                        console.log(error);
                    } else {
                        addNode({title: userMonster.Name, userMonsterId: userMonster._id, key: getNextNodeKey()});
                        service.treeChanged(fancyTree.toDict(removeExtraClasses));
                    }
                });
            };

            service.copyUserText = function (userTextId) {
                userTextService.copy(userTextId, function (error, userText) {
                    if (error) {
                        console.log(error);
                    } else {
                        addNode({title: userText.title, userTextId: userText._id, key: getNextNodeKey()});
                        service.treeChanged(fancyTree.toDict(removeExtraClasses));
                    }
                });
            };

            service.copyUserNpc = function (npcId, userCreated) {
                userNpcService.copy(npcId, userCreated, function (error, userNpc) {
                    if (error) {
                        console.log(error);
                    } else {
                        addNode({title: userNpc.Name, userNpcId: userNpc._id, key: getNextNodeKey()});
                        service.treeChanged(fancyTree.toDict(removeExtraClasses));
                    }
                });
            };

            service.copyResource = function (resourceId, resourceType) {
                userResourceService[resourceType].save({baseResourceId: resourceId}, function (userResource) {
                    addNode({title: userResource.name || userResource.Name, userResourceId: userResource._id, resourceType: resourceType, key: getNextNodeKey()});
                    service.treeChanged(fancyTree.toDict(removeExtraClasses));
                });
            };

            service.copyUserResource = function (resourceId, resourceType) {
                userResourceService[resourceType].save({userResourceId: resourceId}, function (userResource) {
                    addNode({title: userResource.name || userResource.Name, userResourceId: userResource._id, resourceType: resourceType, key: getNextNodeKey()});
                    service.treeChanged(fancyTree.toDict(removeExtraClasses));
                });
            };

            service.removeEncounter = function (encounter) {
                var toRemove;
                fancyTree.visit(function (node) {
                    if (node.data.encounterId && node.data.encounterId === encounter._id) {
                        toRemove = node;
                    }
                });
                if (toRemove) {
                    removeNode(toRemove);
                    service.treeChanged(fancyTree.toDict(removeExtraClasses));
                } else {
                    console.log("could not remove content tree encounter");
                }
            };

            service.changeEncounter = function (encounter) {
                fancyTree.visit(function (node) {
                    if (node.data.encounterId && node.data.encounterId === encounter._id) {
                        if (node.title !== encounter.Name) {
                            node.setTitle(encounter.Name);
                            return false;
                        }
                        //FIXME this saves every ecounter change to the fancyTree (including monsters and stuffs)
                        service.treeChanged(fancyTree.toDict(removeExtraClasses));
                    }
                });
            };

            service.userMonsterUpdated = function (userMonster) {
                fancyTree.visit(function (node) {
                    if (node.data.userMonsterId && node.data.userMonsterId === userMonster._id) {
                        if (node.title !== userMonster.Name) {
                            node.setTitle(userMonster.Name);
                            service.treeChanged(fancyTree.toDict(removeExtraClasses));
                        }
                    }
                });
            };

            service.userNpcUpdated = function (userNpc) {
                fancyTree.visit(function (node) {
                    if (node.data.userNpcId && node.data.userNpcId === userNpc._id) {
                        if (node.title !== userNpc.Name) {
                            node.setTitle(userNpc.Name);
                            service.treeChanged(fancyTree.toDict(removeExtraClasses));
                        }
                    }
                });
            };

            service.userTextUpdated = function (userText) {
                fancyTree.visit(function (node) {
                    if (node.data.userTextId && node.data.userTextId === userText._id) {
                        if (node.title !== userText.title) {
                            node.setTitle(userText.title);
                            service.treeChanged(fancyTree.toDict(removeExtraClasses));
                        }
                    }
                });
            };

            service.userResourceUpdated = function (userResource) {
                fancyTree.visit(function (node) {
                    if (node.data.userResourceId && node.data.userResourceId === userResource._id) {
                        var name = userResource.name || userResource.Name;
                        if (node.title !== name) {
                            node.setTitle(name);
                            service.treeChanged(fancyTree.toDict(removeExtraClasses));
                        }
                    }
                });
            };

            service.userMonsterDeleted = function (userMonster) {
                var toRemove;
                fancyTree.visit(function (node) {
                    if (node.data.userMonsterId && node.data.userMonsterId === userMonster._id) {
                        toRemove = node;
                    }
                });
                if (toRemove) {
                    removeNode(toRemove);
                    service.treeChanged(fancyTree.toDict(removeExtraClasses));
                } else {
                    console.log("could not remove content tree userMonster");
                }
            };

            service.userResourceDeleted = function (userResource) {
                var toRemove;
                fancyTree.visit(function (node) {
                    if (node.data.userResourceId && node.data.userResourceId === userResource._id) {
                        toRemove = node;
                    }
                });
                if (toRemove) {
                    removeNode(toRemove);
                    service.treeChanged(fancyTree.toDict(removeExtraClasses));
                } else {
                    console.log("could not remove content tree userResource");
                }
            };

            service.userNpcDeleted = function (userNpc) {
                var toRemove;
                fancyTree.visit(function (node) {
                    if (node.data.userNpcId && node.data.userNpcId === userNpc._id) {
                        toRemove = node;
                    }
                });
                if (toRemove) {
                    removeNode(toRemove);
                    service.treeChanged(fancyTree.toDict(removeExtraClasses));
                } else {
                    console.log("could not remove content tree userNpc");
                }
            };

            service.userTextDeleted = function (userText) {
                var toRemove;
                fancyTree.visit(function (node) {
                    if (node.data.userTextId && node.data.userTextId === userText._id) {
                        toRemove = node;
                    }
                });
                if (toRemove) {
                    removeNode(toRemove);
                    service.treeChanged(fancyTree.toDict(removeExtraClasses));
                } else {
                    console.log("could not remove content tree userText");
                }
            };

            service.treeChanged = function (tree) {
                contentTree = tree;
                if (contentTree && fancyTree) {
                    if (fancyTree.count() === 0) {
                        contentTree = [];
                    }
                    $http.post('/api/chronicle/' + chronicleId, { contentTree: contentTree})
                        .success(function (data) {
                        })
                        .error(function (error) {
                            console.log(error);
                        });
                }
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
                    if (children[i].data.encounterId) {
                        encounterIds.push(children[i].data.encounterId);
                    } else if (children[i].data.userTextId) {
                        userTextIds.push(children[i].data.userTextId);
                    }
                    else if (children[i].data.userMonsterId) {
                        userMonsterIds.push(children[i].data.userMonsterId);
                    }
                    else if (children[i].data.userNpcId) {
                        userNpcsIds.push(children[i].data.userNpcId);
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
                    userTextService.getMultiple(userTextIds, function (error, userTexts) {
                        taskCallback(error, userTexts);
                    });
                });
                tasks.push(function (taskCallback) {
                    userMonsterService.getMultiple(userMonsterIds, function (error, monsters) {
                        taskCallback(error, monsters);
                    });
                });
                tasks.push(function (taskCallback) {
                    userNpcService.getMultiple(userNpcsIds, function (error, npcs) {
                        taskCallback(error, npcs);
                    });
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
                            else if (children[j].data.encounterId) {
                                for (var k in encounters) {
                                    if (encounters[k]._id === children[j].data.encounterId) {
                                        encounters[k].$type = "encounter";
                                        enrichedLeaves.push(encounters[k]);
                                        break;
                                    }
                                }
                            }
                            else if (children[j].data.userTextId) {
                                for (var l in userTexts) {
                                    if (userTexts[l]._id === children[j].data.userTextId) {
                                        userTexts[l].$type = "userText";
                                        enrichedLeaves.push(userTexts[l]);
                                        break;
                                    }
                                }
                            }
                            else if (children[j].data.userMonsterId) {
                                for (var m in monsters) {
                                    if (monsters[m]._id === children[j].data.userMonsterId) {
                                        monsters[m].$type = "monster";
                                        enrichedLeaves.push(monsters[m]);
                                        break;
                                    }
                                }
                            }
                            else if (children[j].data.userNpcId) {
                                for (var n in npcs) {
                                    if (npcs[n]._id === children[j].data.userNpcId) {
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

