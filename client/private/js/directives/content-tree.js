// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('contentTree',
    ['$timeout', '$routeParams', 'contentTreeService', 'encounterEditorService',
        function ($timeout, $routeParams, contentTreeService, encounterEditorService) {

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
                    $timeout(function () {
                        contentTreeService.goToNode(data.node);
                    });
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

                    console.log("init tree");
                    console.log(contentTreeService.contentTree());
                    element.fancytree({
                        extensions: ["dnd", "add-to-encounter", "filter"],
                        source: contentTreeService.contentTree(),
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

                    $("input#filter-chronicle").keyup(function (e) {
                        var n,
                            match = $(this).val();

                        if (e && e.which === $.ui.keyCode.ESCAPE || $.trim(match) === "") {
                            $("i#btnResetSearch").click();
                            return;
                        }
                        // Pass a string to perform case insensitive matching
                        n = tree.filterNodes(match, false);
                        console.log("filterNodes");
                        $("button#btnResetSearch").attr("disabled", false);
                    }).focus();

                    $("i#btnResetSearch").click(function (e) {
                        $("input#filter-chronicle").val("");
                        tree.clearFilter();
                    }).attr("disabled", true);

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