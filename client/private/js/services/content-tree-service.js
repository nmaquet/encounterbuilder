'use strict';

DEMONSQUID.encounterBuilderServices.factory('contentTreeService', ['$rootScope', '$timeout', '$http', 'encounterService', 'userMonsterService',
    function ($rootScope, $timeout, $http, encounterService, userMonsterService) {

        var LOAD_SUCCESS = "contentTreeLoaded";

        var service = {};
        var contentTree = null;

        var fancyTree = null;

        var nodeKey = null;

        function getNextNodeKey() {
            while (fancyTree.getNodeByKey("" + ++nodeKey) !== null) {
            }
            return "" + nodeKey;
        }

        function addNode(node) {
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
            service.treeChanged(fancyTree.toDict());
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
                service.treeChanged(fancyTree.toDict());
            }
        };

        service.removeBinder = function (binder) {
            var toRemove;
            fancyTree.visit(function (node) {
                if (node.folder && node.key === binder.nodeKey) {
                    toRemove = node;
                }
            });
            toRemove.remove();
            service.treeChanged(fancyTree.toDict());
            var newActiveNode = fancyTree.rootNode.getFirstChild();
            if (newActiveNode.folder === true) {
                $rootScope.go("/binder/" + newActiveNode.nodeKey);
                newActiveNode.setActive(true);
            } else if (newActiveNode.encounter !== undefined) {
                $rootScope.go("/encounter/" + newActiveNode.data.encounterId);
                newActiveNode.setActive(true);
            }
        };

        service.createEncounter = function () {
            encounterService.createEncounter(function (encounter) {
                addNode({title: encounter.Name, encounterId: encounter._id, key: getNextNodeKey()});
                service.treeChanged(fancyTree.toDict());
            });
        };

        service.createUserMonster = function() {
            userMonsterService.create(function(error, userMonster) {
                if (error) {
                    console.log(error);
                } else {
                    addNode({title: userMonster.Name, userMonsterId: userMonster._id, key: getNextNodeKey()});
                    service.treeChanged(fancyTree.toDict());
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
            toRemove.remove();
            service.treeChanged(fancyTree.toDict());
        };

        service.changeEncounter = function (encounter) {
            fancyTree.visit(function (node) {
                if (node.data.encounterId && node.data.encounterId === encounter._id) {
                    if (node.title !== encounter.Name) {
                        node.setTitle(encounter.Name);
                        return false;
                    }
                    //FIXME this saves every ecounter change to the fancyTree (including monsters and stuffs)
                    service.treeChanged(fancyTree.toDict());
                }
            });
        };

        service.userMonsterUpdated = function (userMonster) {
            fancyTree.visit(function (node) {
                if (node.data.userMonsterId && node.data.userMonsterId === userMonster._id) {
                    if (node.title !== userMonster.Name) {
                        node.setTitle(userMonster.Name);
                        return false;
                    }
                    //FIXME this saves every ecounter change to the fancyTree (including monsters and stuffs)
                    service.treeChanged(fancyTree.toDict());
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
                toRemove.remove();
                service.treeChanged(fancyTree.toDict());
            } else {
                console.log("could not remove content tree userMonster");
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
