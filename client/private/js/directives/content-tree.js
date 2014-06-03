'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('contentTree',
    ['$rootScope', '$timeout', 'contentTreeService', 'encounterService', 'selectedEncounterService', 'selectedBinderService', 'selectedContentTypeService',
        function ($rootScope, $timeout, contentTreeService, encounterService, selectedEncounterService, selectedBinderService, selectedContentTypeService) {

            function link(scope, element) {

                function makeBinder(node) {
                    return {Name: node.title, nodeKey: node.key, descendantCount: node.countChildren(true)};
                }

                function onActivate(event, data) {
                    $timeout(function () {
                        var node = data.node;
                        if (node.data.encounterId) {
                            selectedEncounterService.selectedEncounterId(node.data.encounterId);
                            selectedContentTypeService.selectedContentType("encounter");
                        } else if (node.folder) {
                            selectedBinderService.selectedBinder(makeBinder(node));
                            selectedContentTypeService.selectedContentType("binder");
                            contentTreeService.updateBinderLeaves(node.getChildren());
                        }
                    });

                }

                function onNewEncounter(event, encounter) {
                    var activeNode = tree.getActiveNode();
                    if (activeNode === null) {
                        activeNode = tree.rootNode;
                        activeNode.addNode({title: encounter.Name, encounterId: encounter._id}).setActive(true);
                    }
                    else if (activeNode.folder === true) {
                        var newNode = activeNode.addNode({title: encounter.Name, encounterId: encounter._id});
                        newNode.setActive(true);
                        newNode.makeVisible();
                    }
                    else {
                        activeNode.appendSibling({title: encounter.Name, encounterId: encounter._id}).setActive(true);
                    }
                    contentTreeService.treeChanged(tree.toDict());
                }

                function onNewBinder(event) {
                    var activeNode = tree.getActiveNode();
                    if (activeNode === null) {
                        activeNode = tree.rootNode;
                        activeNode.addNode({title: "newBinder", folder: true});
                    }
                    else if (activeNode.folder === true) {
                        var newNode = activeNode.addNode({title: "newBinder", folder: true});
                        newNode.setActive(true);
                        newNode.makeVisible();
                    }
                    else {
                        activeNode.appendSibling({title: "newBinder", folder: true}).setActive(true);
                    }
                    contentTreeService.treeChanged(tree.toDict());
                }

                function onEncounterChanged(event, encounter) {
                    tree.visit(function (node) {
                        if (node.data.encounterId && node.data.encounterId === encounter._id) {
                            if (node.title !== encounter.Name) {
                                node.setTitle(encounter.Name);
                            }
                            //FIXME this saves every ecounter change to the tree (including monsters and stuffs)
                            contentTreeService.treeChanged(tree.toDict());
                        }
                    });

                }

                function onSelectedEncounterChanged(event) {
                    var encounter = selectedEncounterService.selectedEncounter();
                    if (tree) {
                        tree.visit(function (node) {
                            if (node.data.encounterId && node.data.encounterId === encounter._id) {
                                node.setActive(true);
                                return false;//stop iteration
                            }
                        });
                    }

                }
                function onSelectedBinderChanged(event) {
                    var binder = selectedBinderService.selectedBinder();
                    if (tree && binder) {
                        tree.visit(function (node) {
                            if (node.key && node.key === binder.nodeKey) {
                                node.setActive(true);
                                return false;//stop iteration
                            }
                        });
                    }

                }

                function onEncounterRemoved(event, encounter) {
                    var toRemove;
                    tree.visit(function (node) {
                        if (node.data.encounterId && node.data.encounterId === encounter._id) {
                            toRemove = node;
                        }
                    });
                    toRemove.remove();
                    contentTreeService.treeChanged(tree.toDict());
                    if (tree.rootNode.getFirstChild() === null) {
                        selectedContentTypeService.selectedContentType("none");
                    }
                }

                function onBinderChanged(event, binder) {
                    if (binder) {
                        tree.visit(function (node) {
                            if (node.key === binder.nodeKey) {
                                node.setTitle(binder.Name);
                            }
                        });
                        contentTreeService.treeChanged(tree.toDict());
                    }
                }

                function onRemoveBinder(event, binder) {
                    var toRemove;
                    tree.visit(function (node) {
                        if (node.key === binder.nodeKey) {
                            toRemove = node;
                        }
                    });
                    toRemove.remove();
                    contentTreeService.treeChanged(tree.toDict());
                    var newActiveNode = tree.rootNode.getFirstChild();
                    if (newActiveNode === null) {
                        selectedContentTypeService.selectedContentType("none");
                    } else if (newActiveNode.folder === true) {
                        selectedBinderService.selectedBinder(makeBinder(newActiveNode));
                        selectedContentTypeService.selectedContentType("binder");
                        newActiveNode.setActive(true);
                    } else if (newActiveNode.encounter !== undefined) {
                        selectedEncounterService.selectedEncounter(newActiveNode.encounter);
                        selectedContentTypeService.selectedContentType("encounter");
                        newActiveNode.setActive(true);
                    }
                }

                var tree;
                contentTreeService.register({newBinder: onNewBinder, removeBinder: onRemoveBinder, binderChanged: onBinderChanged});

                function initTree() {
                    element.fancytree({
                        extensions: ["dnd"],
                        source: contentTreeService.contentTree(),
                        activate: onActivate,
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
                                contentTreeService.treeChanged(tree.toDict());
                            },
                            draggable: {
                                zIndex: 1000,
                                scroll: false
                            }
                        }
                    });

                    tree = element.fancytree("getTree");
                    tree.getFirstChild().setActive(true);
                }

                if (contentTreeService.contentTree()) {
                    initTree();
                }
                else {
                    contentTreeService.onLoadSuccess(initTree);
                }

                encounterService.onNewEncounterSuccess(onNewEncounter);
                encounterService.onEncounterChanged(onEncounterChanged);
                encounterService.onEncounterRemoved(onEncounterRemoved);
                selectedEncounterService.register(onSelectedEncounterChanged);
                selectedBinderService.register(onSelectedBinderChanged);
            }

            return {
                restrict: "E",
                template: "<div></div>",
                replace: true,
                link: link
            };
        }
    ]);