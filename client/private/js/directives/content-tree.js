'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('contentTree',
    ['$timeout', '$routeParams', 'contentTreeService', 'userMonsterService', 'userNpcService', 'encounterEditorService', 'encounterService', 'templateService',
        function ($timeout, $routeParams, contentTreeService, userMonsterService, userNpcService, encounterEditorService, encounterService, templateService) {

            function link(scope, element) {

                function addNpcOrMonster(type, id) {
                    if ($routeParams.encounterId) {
                        if (type === "monster") {
                            userMonsterService.get(id, function (error, monster) {
                                if (error) {
                                    return console.log(error);
                                }
                                monster = templateService.createTemplatedMonster(monster);
                                var encounter = encounterEditorService.encounter;
                                if (!encounter.Monsters) {
                                    encounter.Monsters = {};
                                }
                                var id = monster.id || monster._id;
                                if (!encounter.Monsters[id]) {
                                    encounter.Monsters[id] = {
                                        amount: 1,
                                        Name: monster.Name,
                                        XP: monster.XP,
                                        CR: monster.CR,
                                        Type: monster.Type,
                                        TreasureBudget: monster.TreasureBudget,
                                        Heroic: monster.Heroic,
                                        Level: monster.Level
                                    };
                                    if (monster.id === undefined) {
                                        encounter.Monsters[id].userCreated = true;
                                    }
                                }
                                else {
                                    encounter.Monsters[id].amount += 1;
                                }
                                encounterService.encounterChanged(encounter);
                            });

                        }
                        else {
                            userNpcService.get(id, function (error, npc) {
                                if (error) {
                                    return console.log(error);
                                }
                                var encounter = encounterEditorService.encounter;
                                if (!encounter.Npcs) {
                                    encounter.Npcs = {};
                                }
                                var id = npc.id || npc._id;
                                if (!encounter.Npcs[id]) {
                                    encounter.Npcs[id] = {
                                        amount: 1,
                                        Name: npc.Name,
                                        XP: npc.XP,
                                        CR: npc.CR,
                                        Type: npc.Type,
                                        Heroic: npc.Heroic,
                                        Level: npc.Level
                                    };
                                    if (npc.id === undefined) {
                                        encounter.Npcs[id].userCreated = true;
                                    }
                                }
                                else {
                                    encounter.Npcs[id].amount += 1;
                                }
                                encounterService.encounterChanged(encounter);
                            });

                        }
                    }
                }

                function activateNodeBasedOnRouteParams() {
                    if (!tree) {
                        return;
                    }
                    if ($routeParams.encounterId) {
                        tree.visit(function (node) {
                            if (node.data.encounterId && node.data.encounterId === $routeParams.encounterId) {
                                node.setActive(true);
                                return false;
                            }
                        });
                    }
                    else if ($routeParams.binderId) {
                        tree.visit(function (node) {
                            if (node.folder && node.key === $routeParams.binderId) {
                                node.setActive(true);
                                return false;
                            }
                        });
                    }
                    else if ($routeParams.userMonsterId) {
                        tree.visit(function (node) {
                            if (node.data.userMonsterId && node.data.userMonsterId === $routeParams.userMonsterId) {
                                node.setActive(true);
                                return false;
                            }
                        });
                    }
                    else if ($routeParams.userNpcId) {
                        tree.visit(function (node) {
                            if (node.data.userNpcId && node.data.userNpcId === $routeParams.userNpcId) {
                                node.setActive(true);
                                return false;
                            }
                        });
                    }
                    else if ($routeParams.userTextId) {
                        tree.visit(function (node) {
                            if (node.data.userTextId && node.data.userTextId === $routeParams.userTextId) {
                                node.setActive(true);
                                return false;
                            }
                        });
                    }
                    else if ($routeParams.userResourceId) {
                        tree.visit(function (node) {
                            if (node.data.userResourceId && node.data.userResourceId === $routeParams.userResourceId) {
                                node.setActive(true);
                                return false;
                            }
                        });
                    }
                    else if (tree.getActiveNode()) {
                        tree.getActiveNode().setActive(false);
                    }
                }

                scope.$on("$routeChangeSuccess", function () {
                    activateNodeBasedOnRouteParams();
                });

                function onClick(event, data) {
                    if ($(event.toElement).text() === "+") {
                        var node = data.node;
                        var type = (node.data.userMonsterId) ? "monster" : "npc";
                        var id = node.data.userMonsterId || node.data.userNpcId;
                        addNpcOrMonster(type, id);
                    }
                    else {
                        $timeout(function () {
                            contentTreeService.goToNode(data.node);
                        });
                    }
                }

                var tree;

                function removeExtraClasses(dict) {
                    if (dict.extraClasses) {
                        delete dict.extraClasses;
                    }
                }

                function addExtraClasses(node) {
                    if (node.data.userMonsterId) {
                        node.extraClasses = "fancytree-monster";
                    } else if (node.data.encounterId) {
                        node.extraClasses = "fancytree-encounter";
                    } else if (node.data.userNpcId) {
                        node.extraClasses = "fancytree-npc";
                    } else if (node.data.userTextId) {
                        node.extraClasses = "fancytree-text";
                    } else if (node.data.userFeatId) {
                        node.extraClasses = "fancytree-feat";
                    }
                    node.render();
                }

                function initTree() {

                    element.fancytree({
                        extensions: ["dnd", "add-to-encounter"],
                        source: contentTreeService.contentTree(),
                        click: onClick,
                        dnd: {
                            preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                            preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
                            autoExpandMS: 400,
                            dragStart: function (node, data) {
                                // This function MUST be defined to enable dragging for the tree.
                                // Return false to cancel dragging of node.
                                //    if( data.originalEvent.shiftKey ) ...
                                return true;
                            },
                            dragEnter: function (node, data) {
                                return node.folder || ["before", "after"];
                            },
                            dragOver: function (node, data) {
                            },
                            dragLeave: function (node, data) {
                            },
                            dragStop: function (node, data) {
                            },
                            dragDrop: function (node, data) {
                                // This function MUST be defined to enable dropping of items on the tree.
                                // hitMode is 'before', 'after', or 'over'.
                                // We could for example move the source to the new target:
                                data.otherNode.moveTo(node, data.hitMode);
                                contentTreeService.treeChanged(tree.toDict(removeExtraClasses));
                            },
                            draggable: {
                                zIndex: 1000,
                                scroll: false
                            }
                        }
                    });

                    tree = element.fancytree("getTree");
                    contentTreeService.setTree(tree);
                    tree.visit(addExtraClasses);
                }

                if (contentTreeService.contentTree()) {
                    initTree();
                    activateNodeBasedOnRouteParams();
                }
                else {
                    contentTreeService.onLoadSuccess(function () {
                        initTree();
                        activateNodeBasedOnRouteParams();
                    });
                }
            }

            return {
                restrict: "E",
                template: "<div></div>",
                replace: true,
                link: link
            };
        }
    ]);