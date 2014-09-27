// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('contentTree',
    ['$timeout', '$routeParams', 'encounterEditorService', 'ChronicleResource', 'locationService', 'contentTreeService', 'userResourceService', 'encounterService',
        function ($timeout, $routeParams, encounterEditorService, ChronicleResource, locationService, contentTreeService, userResourceService, encounterService) {

            var NEW_RESOURCE_NAMES = {
                "user-item": "new Item",
                "user-spell": "new Spell",
                "user-feat": "new Feat",
                "user-illustration": "new Illustration",
                "user-map": "new Map",
                "user-monster": "new Monster",
                "user-npc": "new NPC",
                "user-text": "new Text"
            };

            function saveChronicle(fancyTree, callback) {
                if (!fancyTree.chronicle) return;
                if (fancyTree.count() === 0) {
                    fancyTree.chronicle.contentTree = [];
                } else {
                    fancyTree.chronicle.contentTree = fancyTree.toDict();
                }
                fancyTree.chronicle.$save(callback);
            }

            function goToNode(node) {
                if (node.data.encounterId) {
                    locationService.go("/chronicle/" + $routeParams.chronicleId + "/encounter/" + node.data.encounterId);
                }
                else if (node.data.userTextId) {
                    locationService.go("/chronicle/" + $routeParams.chronicleId + "/user-text/" + node.data.userTextId);
                }
                else if (node.data.userResourceId) {
                    locationService.go("/chronicle/" + $routeParams.chronicleId + "/" + node.data.resourceType + "/" + node.data.userResourceId);
                }
                else if (node.folder) {
                    locationService.go("/chronicle/" + $routeParams.chronicleId + "/binder/" + node.key);
                }
                node.makeVisible();
            }

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

            function addExtraClasses(newNode) {
                if (newNode.userResourceId && newNode.resourceType === "encounter") {
                    newNode.extraClasses = "fancytree-encounter";
                }
                else if (newNode.userResourceId && newNode.resourceType === "user-npc") {
                    newNode.extraClasses = "fancytree-npc";
                }
                else if (newNode.userResourceId && newNode.resourceType === "user-text") {
                    newNode.extraClasses = "fancytree-text";
                }
                else if (newNode.userResourceId && newNode.resourceType === "user-monster") {
                    newNode.extraClasses = "fancytree-monster";
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

            function addNode(fancyTree, node) {
                if (!fancyTree.chronicle) return;
                addExtraClasses(node);
                var newNode;
                var activeNode = fancyTree.getActiveNode();
                if (activeNode === null) {
                    activeNode = fancyTree.rootNode;
                    newNode = activeNode.addNode(node);
                    newNode.setActive(true);
                }
                else if (activeNode.folder === true) {
                    newNode = activeNode.addNode(node);
                    newNode.setActive(true);
                }
                else {
                    newNode = activeNode.appendSibling(node);
                    newNode.setActive(true);
                }
                return newNode;
            }

            function addNodeSaveChronicleAndGotoNode(fancyTree, nodeBrief) {
                if (!fancyTree.chronicle) return;
                var newNode = addNode(fancyTree, nodeBrief);
                saveChronicle(fancyTree, function () {
                    goToNode(newNode);
                });
            }

            function getNextNodeKey(fancyTree) {
                var nodeKey = 0;
                while (fancyTree.getNodeByKey(String(nodeKey)) !== null) {
                    nodeKey += 1;
                }
                return String(nodeKey);
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

                scope.$on("$routeChangeSuccess", function () {
                    if ($routeParams.chronicleId) {
                        ChronicleResource.get({id: $routeParams.chronicleId}, function (chronicle) {
                            var contentTree = (chronicle && chronicle.contentTree) || [];
                            fancyTree.reload(contentTree);
                            fancyTree.chronicle = chronicle;
                            activateNodeBasedOnRouteParams();
                        })
                    } else {
                        fancyTree.reload([]);
                        fancyTree.chronicle = null;
                    }
                });

                function onClick(event, data) {
                    $timeout(function () {
                        goToNode(data.node);
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
                            saveChronicle(fancyTree);
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

                contentTreeService.createBinder = function () {
                    var nodeBrief = {title: "new Binder", folder: true, key: getNextNodeKey(fancyTree)};
                    addNodeSaveChronicleAndGotoNode(fancyTree, nodeBrief);
                };

                contentTreeService.createEncounter = function () {
                    encounterService.createEncounter(function (encounter) {
                        var nodeBrief = {title: encounter.Name, userResourceId: encounter._id, resourceType: "encounter", key: getNextNodeKey(fancyTree)};
                        addNodeSaveChronicleAndGotoNode(fancyTree, nodeBrief);
                    });
                };

                contentTreeService.createUserResource = function (resourceType) {
                    var userResource = new userResourceService[resourceType]();
                    if (resourceType === "user-item" || resourceType === "user-monster" || resourceType === "user-npc") {
                        userResource.Name = NEW_RESOURCE_NAMES[resourceType];
                    } else {
                        userResource.name = NEW_RESOURCE_NAMES[resourceType];
                    }
                    if (resourceType === "user-monster" || resourceType === "user-npc") {
                        userResource.XP = 0;
                        userResource.CR = 0;
                    }
                    userResource.$save(function () {
                        var nodeBrief = {title: userResource.name || userResource.Name, userResourceId: userResource._id, resourceType: resourceType, key: getNextNodeKey(fancyTree)};
                        addNodeSaveChronicleAndGotoNode(fancyTree, nodeBrief);
                    });
                };

                contentTreeService.copyResource = function (resourceId, resourceType) {
                    userResourceService[resourceType].save({baseResourceId: resourceId}, function (userResource) {
                        var nodeBrief = {title: userResource.name || userResource.Name, userResourceId: userResource._id, resourceType: resourceType, key: getNextNodeKey(fancyTree)};
                        addNodeSaveChronicleAndGotoNode(fancyTree, nodeBrief);
                    });
                };
            }

            return {
                restrict: "E",
                template: "<div></div>",
                replace: true,
                link: link
            };
        }
    ]);