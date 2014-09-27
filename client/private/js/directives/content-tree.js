// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('contentTree',
    ['$timeout', '$routeParams', 'encounterEditorService', 'ChronicleResource',
        function ($timeout, $routeParams, encounterEditorService, ChronicleResource) {

            function initializeChronicleFilter(fancyTree) {
                $("input#filter-chronicle").keyup(function (e) {
                    var match = $(this).val();

                    if (e && e.which === $.ui.keyCode.ESCAPE || $.trim(match) === "") {
                        $("i#btnResetSearch").click();
                        return;
                    }
                    fancyTree.filterNodes(match, false);
                    $("button#btnResetSearch").attr("disabled", false);
                }).focus();

                $("i#btnResetSearch").click(function (e) {
                    $("input#filter-chronicle").val("");
                    fancyTree.clearFilter();
                }).attr("disabled", true);
            }

            function link(scope, element) {

                var fancyTree;

                function activateNodeBasedOnRouteParams() {
                    if (!fancyTree) {
                        return;
                    }
                    if ($routeParams.encounterId) {
                        fancyTree.visit(function (node) {
                            if (node.data.encounterId && node.data.encounterId === $routeParams.encounterId) {
                                node.setActive(true);
                                return false;
                            }
                        });
                    }
                    else if ($routeParams.binderId) {
                        fancyTree.visit(function (node) {
                            if (node.folder && node.key === $routeParams.binderId) {
                                node.setActive(true);
                                return false;
                            }
                        });
                    }
                    else if ($routeParams.userNpcId) {
                        fancyTree.visit(function (node) {
                            if (node.data.userNpcId && node.data.userNpcId === $routeParams.userNpcId) {
                                node.setActive(true);
                                return false;
                            }
                        });
                    }
                    else if ($routeParams.userTextId) {
                        fancyTree.visit(function (node) {
                            if (node.data.userTextId && node.data.userTextId === $routeParams.userTextId) {
                                node.setActive(true);
                                return false;
                            }
                        });
                    }
                    else if ($routeParams.userResourceId) {
                        fancyTree.visit(function (node) {
                            if (node.data.userResourceId && node.data.userResourceId === $routeParams.userResourceId) {
                                node.setActive(true);
                                return false;
                            }
                        });
                    }
                    else if (fancyTree.getActiveNode()) {
                        fancyTree.getActiveNode().setActive(false);
                    }
                }

                scope.$on("$routeChangeSuccess", function() {
                    if ($routeParams.chronicleId) {
                        ChronicleResource.get({id: $routeParams.chronicleId}, function (chronicle) {
                            var contentTree = (chronicle && chronicle.contentTree) || [];
                            console.log("RELOADING");
                            console.log(JSON.stringify(contentTree, null, 4));
                            fancyTree.reload(contentTree);
                            activateNodeBasedOnRouteParams();
                        })
                    } else {
                        fancyTree.reload([]);
                    }
                });

                function onClick(event, data) {
                    /* todo goto data.node */
                }

                function onPlusButtonClick(node) {
                    var type = null;
                    if (node.data.resourceType === "user-monster") {
                        type = "monster"
                    }
                    else if (node.data.resourceType === "user-npc") {
                        type = "npc"
                    }
                    else {
                        type = "item";
                    }
                    var id = node.data.userResourceId;
                    if (type === "item") {
                        encounterEditorService.addUserItem(id);
                    } else {
                        encounterEditorService.addUserNpcOrMonster(type, id);
                    }
                }

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

                element.fancytree({
                    extensions: ["dnd", "add-to-encounter", "filter"],
                    source: [],
                    filter: {
                        mode: "hide"
                    },
                    scrollParent: $('.sp-menu-content'),
                    click: onClick,
                    clickFolderMode: 4,
                    addToEncounter: {
                        onPlusButtonClick: onPlusButtonClick
                    },
                    dnd: {
                        preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                        preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
                        autoExpandMS: 400,
                        dragStart: function (node, data) {
                            // This function MUST be defined to enable dragging for the fancyTree.
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
                            // This function MUST be defined to enable dropping of items on the fancyTree.
                            // hitMode is 'before', 'after', or 'over'.
                            // We could for example move the source to the new target:
                            data.otherNode.moveTo(node, data.hitMode);
                            /* TODO: save fancyTree */
                        },
                        draggable: {
                            zIndex: 1000,
                            scroll: false
                        }
                    }
                });

                fancyTree = element.fancytree("getTree");
                fancyTree.visit(addExtraClasses);
                initializeChronicleFilter(fancyTree);
            }

            return {
                restrict: "E",
                template: "<div></div>",
                replace: true,
                link: link
            };
        }
    ]);