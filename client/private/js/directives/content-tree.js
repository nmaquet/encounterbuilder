'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('contentTree',
    ['$timeout', '$routeParams', 'contentTreeService',
        function ($timeout, $routeParams, contentTreeService) {

            function link(scope, element) {

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
                    } else if (tree.getActiveNode()) {
                        tree.getActiveNode().setActive(false);
                    }
                }

                scope.$on("$routeChangeSuccess", function () {
                    activateNodeBasedOnRouteParams();
                });

                function onClick(event, data) {
                    $timeout(function () {
                        var node = data.node;
                        if (node.data.encounterId) {
                            scope.go("/encounter/" + node.data.encounterId);
                        } else if (node.data.userMonsterId) {
                            scope.go("/user-monster/" + node.data.userMonsterId);
                        } else if (node.data.userNpcId) {
                            scope.go("/user-npc/" + node.data.userNpcId);
                        }
                        else if (node.data.userTextId) {
                            scope.go("/user-text/" + node.data.userTextId);
                        }
                        else if (node.folder) {
                            scope.go("/binder/" + node.key);
                            node.setExpanded(true);
                        }
                    });
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
                    }
                }

                function initTree() {

                    element.fancytree({
                        extensions: ["dnd"],
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
                    contentTreeService.onLoadSuccess(function() {
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