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
                            if (node.getTitle() !== encounter.Name) {
                                node.setTitle(encounter.Name);
                            }
                            //FIXME this saves every ecounter change to the tree (including monsters and stuffs)
                            contentTreeService.treeChanged(tree.toDict());
                        }
                    });

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
                    tree.visit(function (node) {
                        if (node.key === binder.nodeKey) {
                            node.setTitle(binder.Name);
                        }
                    });
                    contentTreeService.treeChanged(tree.toDict());
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
                contentTreeService.onLoadSuccess(function () {
                    console.log("contentTreeService.onLoadSuccess");
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
                                /* data.otherNode may be null for non-fancytree droppables.
                                 * Return false to disallow dropping on node. In this case
                                 * dragOver and dragLeave are not called.
                                 * Return 'over', 'before, or 'after' to force a hitMode.
                                 * Return ['before', 'after'] to restrict available hitModes.
                                 * Any other return value will calc the hitMode from the cursor position.
                                 */
                                // Prevent dropping a parent below another parent (only sort
                                // nodes under the same parent):
                                //    if(node.parent !== data.otherNode.parent){
                                //      return false;
                                //    }
                                // Don't allow dropping *over* a node (would create a child). Just
                                // allow changing the order:
                                //    return ["before", "after"];
                                // Accept everything:
                                return node.folder;
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
                });
                encounterService.onNewEncounterSuccess(onNewEncounter)
                encounterService.onEncounterChanged(onEncounterChanged);
                encounterService.onEncounterRemoved(onEncounterRemoved);
            }

            return {
                restrict: "E",
                template: "<div></div>",
                replace: true,
                link: link
            };
        }
    ]);