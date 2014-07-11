'use strict';

DEMONSQUID.encounterBuilderServices.factory('contentTreeService',
    ['$rootScope', '$timeout', '$http', 'encounterService', 'userMonsterService', 'userNpcService', 'userTextService', 'locationService', 'UserFeatResource',
        function ($rootScope, $timeout, $http, encounterService, userMonsterService, userNpcService, userTextService, locationService, UserFeatResource) {

            var LOAD_SUCCESS = "contentTreeLoaded";

            var service = {};
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
                    newNode.makeVisible();
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

            $http.post('/api/user-data')
                .success(function (userData) {
                    if (userData.contentTree) {
                        contentTree = userData.contentTree;
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
                else if (node.data.userFeatId) {
                    locationService.go("/user-feat/" + node.data.userFeatId);
                }
                else if (node.folder) {
                    locationService.go("/binder/" + node.key);
                    node.setExpanded(true);
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
                addNode({title: "newBinder", folder: true, key: getNextNodeKey()})
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

            service.copyFeat = function (featId) {
                UserFeatResource.save({featId: featId}, function (userFeat) {
                    addNode({title: userFeat.name, userFeatId: userFeat._id, key: getNextNodeKey()});
                    service.treeChanged(fancyTree.toDict(removeExtraClasses));
                });
            };

            service.copyUserFeat = function (userFeatId) {
                UserFeatResource.save({userFeatId: userFeatId}, function (userFeat) {
                    addNode({title: userFeat.name, userFeatId: userFeat._id, key: getNextNodeKey()});
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
                $http.post('/api/save-content-tree', { contentTree: tree })
                    .success(function (data) {
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            };

            service.getBinderChildrenByKey = function (key, callback) {
                var children = fancyTree.getNodeByKey(key).getChildren();
                var encounterIds = [];
                var userMonsterIds = [];
                var userNpcsIds = [];
                var userTextIds = [];
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

                        for (var j in children) {
                            if (children[j].folder) {
                                enrichedLeaves.push({Name: children[j].title, nodeKey: children[j].key, descendantCount: children[j].countChildren(true), type: "binder"})
                            }
                            else if (children[j].data.encounterId) {
                                for (var k in encounters) {
                                    if (encounters[k]._id === children[j].data.encounterId) {
                                        encounters[k].type = "encounter";
                                        enrichedLeaves.push(encounters[k]);
                                        break;
                                    }
                                }
                            }
                            else if (children[j].data.userTextId) {
                                for (var l in userTexts) {
                                    if (userTexts[l]._id === children[j].data.userTextId) {
                                        userTexts[l].type = "userText";
                                        enrichedLeaves.push(userTexts[l]);
                                        break;
                                    }
                                }
                            }
                            else if (children[j].data.userMonsterId) {
                                for (var m in monsters) {
                                    if (monsters[m]._id === children[j].data.userMonsterId) {
                                        monsters[m].type = "monster";
                                        enrichedLeaves.push(monsters[m]);
                                        break;
                                    }
                                }
                            }
                            else if (children[j].data.userNpcId) {
                                for (var n in npcs) {
                                    if (npcs[n]._id === children[j].data.userNpcId) {
                                        npcs[n].type = "npc";
                                        enrichedLeaves.push(npcs[n]);
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

