'use strict';

DEMONSQUID.encounterBuilderServices.factory('contentTreeService',
    ['$rootScope', '$timeout', '$http', 'encounterService', 'userMonsterService', 'userNpcService', 'userTextService',
        function ($rootScope, $timeout, $http, encounterService, userMonsterService, userNpcService, userTextService) {

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
                    activeNode.addNode(node).setActive(true);
                }
                else if (activeNode.folder === true) {
                    var newNode = activeNode.addNode(node);
                    newNode.setActive(true);
                    newNode.makeVisible();
                }
                else {
                    activeNode.appendSibling(node).setActive(true);
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
                    } else if (nextSibling) {
                        nextSibling.setActive(true);
                    } else if (prevSibling) {
                        prevSibling.setActive(true);
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
                var ids = [];
                for (var i in children) {
                    if (children[i].data.encounterId) {
                        ids.push(children[i].data.encounterId);
                    }
                }
                encounterService.getMultiple(ids, function (error, encounters) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        var enrichedLeaves = [];
                        for (var j in children) {
                            if (children[j].folder) {
                                enrichedLeaves.push({Name: children[j].title, nodeKey: children[j].key, descendantCount: children[j].countChildren(true), type: "binder"})
                            }
                            else if (children[j].data.encounterId) {
                                for (var k in encounters) {
                                    if (encounters[k]._id === children[j].data.encounterId) {
                                        enrichedLeaves.push(encounters[k]);
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
        }]);
