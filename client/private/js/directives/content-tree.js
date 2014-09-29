// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('contentTree',
    ['$timeout', '$routeParams', 'encounterEditorService', 'ChronicleResource', 'locationService', 'contentTreeService', 'userResourceService', 'encounterService', 'throttle',
        function ($timeout, $routeParams, encounterEditorService, ChronicleResource, locationService, contentTreeService, userResourceService, encounterService, throttle) {

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

            var saveChronicle = throttle(function (fancyTree, callbackNotGuaranteedToBeCalledBecauseOfThrottling) {
                if (!fancyTree.chronicle) return;
                if (fancyTree.count() === 0) {
                    fancyTree.chronicle.contentTree = [];
                } else {
                    fancyTree.chronicle.contentTree = fancyTree.toDict();
                }
                fancyTree.chronicle.$save(callbackNotGuaranteedToBeCalledBecauseOfThrottling);
            }, 500);

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

            function removeNodeAndReturnNextBestNode(node) {
                var parent = node.getParent();
                var nextSibling = node.getNextSibling();
                var prevSibling = node.getPrevSibling();
                node.remove();
                if (parent && !parent.isRoot()) { /* a child of the root node is effectively parentless */
                    parent.setActive(true);
                    return parent;
                }
                else if (nextSibling) {
                    nextSibling.setActive(true);
                    return nextSibling;
                }
                else if (prevSibling) {
                    prevSibling.setActive(true);
                    return prevSibling;
                } else {
                    return null;
                    /* no node is active -> go to home */
                }
            }

            function removeNodeSaveChronicleAndGotoNextBestNode(fancyTree, node) {
                var nextBestNode = removeNodeAndReturnNextBestNode(node);
                saveChronicle(fancyTree, function () {
                    if (nextBestNode) {
                        goToNode(nextBestNode);
                    } else {
                        locationService.go("/chronicles");
                    }
                });
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

                var fancyTree = [];

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
                        if (fancyTree.chronicle && fancyTree.chronicle._id === $routeParams.chronicleId) {
                            activateNodeBasedOnRouteParams();
                        } else {
                            ChronicleResource.get({id: $routeParams.chronicleId}, function (chronicle) {
                                fancyTree.reload((chronicle && chronicle.contentTree) || []);
                                fancyTree.chronicle = chronicle;
                                contentTreeService.treeLoaded();
                                activateNodeBasedOnRouteParams();
                            });
                        }
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

                contentTreeService.hasLoaded = function () {
                    return fancyTree && fancyTree.chronicle;
                };

                contentTreeService.getChronicleName = function () {
                    if (fancyTree && fancyTree.chronicle) {
                        return fancyTree.chronicle.name;
                    }
                };

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

                contentTreeService.copyUserResource = function (resourceId, resourceType) {
                    userResourceService[resourceType].save({userResourceId: resourceId}, function (userResource) {
                        var nodeBrief = {title: userResource.name || userResource.Name, userResourceId: userResource._id, resourceType: resourceType, key: getNextNodeKey(fancyTree)};
                        addNodeSaveChronicleAndGotoNode(fancyTree, nodeBrief);
                    });
                };

                contentTreeService.userResourceDeleted = function (userResource) {
                    var toRemove;
                    fancyTree.visit(function (node) {
                        if (node.data.userResourceId && node.data.userResourceId === userResource._id) {
                            toRemove = node;
                        }
                    });
                    if (toRemove) {
                        removeNodeSaveChronicleAndGotoNextBestNode(fancyTree, toRemove);
                    }
                };

                contentTreeService.removeEncounter = function (encounter) {
                    contentTreeService.userResourceDeleted(encounter);
                };

                contentTreeService.hasFirstNode = function () {
                    return fancyTree.getFirstChild();
                };

                contentTreeService.goToFirstNode = function () {
                    if (fancyTree.getFirstChild()) {
                        goToNode(fancyTree.getFirstChild());
                    }
                };

                contentTreeService.getBinderByKey = function (key) {
                    var node = fancyTree.getNodeByKey(key);
                    return {Name: node.title, nodeKey: node.key, descendantCount: node.countChildren(true)};
                };

                contentTreeService.binderChanged = function (binder) {
                    if (binder) {
                        fancyTree.visit(function (node) {
                            if (node.key === binder.nodeKey) {
                                node.setTitle(binder.Name);
                                return false;
                            }
                        });
                        saveChronicle(fancyTree);
                    }
                };

                contentTreeService.changeEncounter = function (encounter) {
                    if (encounter) {
                        fancyTree.visit(function (node) {
                            if (node.data.userResourceId && node.data.userResourceId === encounter._id && node.title !== encounter.Name) {
                                node.setTitle(encounter.Name);
                                return false;
                            }
                        });
                        saveChronicle(fancyTree);
                    }
                };

                contentTreeService.userResourceUpdated = function (userResource) {
                    if (userResource) {
                        fancyTree.visit(function (node) {
                            if (node.data.userResourceId && node.data.userResourceId === userResource._id) {
                                var name = userResource.name || userResource.Name;
                                if (node.title !== name) {
                                    node.setTitle(name);
                                    return false;
                                }
                            }
                        });
                        saveChronicle(fancyTree);
                    }
                };

                contentTreeService.removeBinder = function (binder) {
                    var toRemove;
                    fancyTree.visit(function (node) {
                        if (node.folder && node.key === binder.nodeKey) {
                            toRemove = node;
                        }
                    });
                    if (toRemove) {
                        removeNodeSaveChronicleAndGotoNextBestNode(fancyTree, toRemove);
                    }
                };

                contentTreeService.getBinderChildrenByKey = function (key, callback) {
                    if (!fancyTree.getNodeByKey(key)) return;
                    /* TODO / FIXME: what id the chronicle is not loaded ? */
                    var children = fancyTree.getNodeByKey(key).getChildren();
                    var encounterIds = [];
                    var userMonsterIds = [];
                    var userNpcsIds = [];
                    var userTextIds = [];
                    var userSpellIds = [];
                    var userFeatIds = [];
                    var userItemIds = [];
                    var userIllustrationIds = [];
                    var userMapIds = [];
                    for (var i in children) {
                        if (children[i].data.resourceType === "encounter") {
                            encounterIds.push(children[i].data.userResourceId);
                        } else if (children[i].data.resourceType === "user-text") {
                            userTextIds.push(children[i].data.userResourceId);
                        }
                        else if (children[i].data.resourceType === "user-monster") {
                            userMonsterIds.push(children[i].data.userResourceId);
                        }
                        else if (children[i].data.resourceType === "user-npc") {
                            userNpcsIds.push(children[i].data.userResourceId);
                        }
                        else if (children[i].data.resourceType === "user-spell") {
                            userSpellIds.push(children[i].data.userResourceId);
                        }
                        else if (children[i].data.resourceType === "user-feat") {
                            userFeatIds.push(children[i].data.userResourceId);
                        }
                        else if (children[i].data.resourceType === "user-item") {
                            userItemIds.push(children[i].data.userResourceId);
                        }
                        else if (children[i].data.resourceType === "user-illustration") {
                            userIllustrationIds.push(children[i].data.userResourceId);
                        }
                        else if (children[i].data.resourceType === "user-map") {
                            userMapIds.push(children[i].data.userResourceId);
                        }
                    }
                    var tasks = [];
                    tasks.push(function (taskCallback) {
                        encounterService.getMultiple(encounterIds, function (error, encounters) {
                            taskCallback(error, encounters);
                        });
                    });
                    tasks.push(function (taskCallback) {
                        userResourceService["user-text"].getMultiple(userTextIds, taskCallback);
                    });
                    tasks.push(function (taskCallback) {
                        userResourceService["user-monster"].getMultiple(userMonsterIds, taskCallback);
                    });
                    tasks.push(function (taskCallback) {
                        userResourceService["user-npc"].getMultiple(userNpcsIds, taskCallback);
                    });
                    tasks.push(function (taskCallback) {
                        userResourceService["user-item"].getMultiple(userItemIds, taskCallback);
                    });
                    tasks.push(function (taskCallback) {
                        userResourceService["user-spell"].getMultiple(userSpellIds, taskCallback);
                    });
                    tasks.push(function (taskCallback) {
                        userResourceService["user-feat"].getMultiple(userFeatIds, taskCallback);
                    });
                    tasks.push(function (taskCallback) {
                        userResourceService["user-illustration"].getMultiple(userIllustrationIds, taskCallback);
                    });
                    tasks.push(function (taskCallback) {
                        userResourceService["user-map"].getMultiple(userMapIds, taskCallback);
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
                            var items = results[4];
                            var spells = results[5];
                            var feats = results[6];
                            var illustrations = results[7];
                            var maps = results[8];

                            for (var j in children) {
                                if (children[j].folder) {
                                    enrichedLeaves.push({Name: children[j].title, nodeKey: children[j].key, descendantCount: children[j].countChildren(true), $type: "binder"})
                                }
                                else if (children[j].data.resourceType === "encounter") {
                                    for (var k in encounters) {
                                        if (encounters[k]._id === children[j].data.userResourceId) {
                                            encounters[k].$type = "encounter";
                                            enrichedLeaves.push(encounters[k]);
                                            break;
                                        }
                                    }
                                }
                                else if (children[j].data.resourceType === "user-text") {
                                    for (var l in userTexts) {
                                        if (userTexts[l]._id === children[j].data.userResourceId) {
                                            userTexts[l].$type = "user-text";
                                            enrichedLeaves.push(userTexts[l]);
                                            break;
                                        }
                                    }
                                }
                                else if (children[j].data.resourceType === "user-monster") {
                                    for (var m in monsters) {
                                        if (monsters[m]._id === children[j].data.userResourceId) {
                                            monsters[m].$type = "monster";
                                            enrichedLeaves.push(monsters[m]);
                                            break;
                                        }
                                    }
                                }
                                else if (children[j].data.resourceType === "user-npc") {
                                    for (var n in npcs) {
                                        if (npcs[n]._id === children[j].data.userResourceId) {
                                            npcs[n].$type = "npc";
                                            enrichedLeaves.push(npcs[n]);
                                            break;
                                        }
                                    }
                                }
                                else if (children[j].data.resourceType === "user-item") {
                                    for (var n in items) {
                                        if (items[n]._id === children[j].data.userResourceId) {
                                            items[n].$type = "user-item";
                                            enrichedLeaves.push(items[n]);
                                            break;
                                        }
                                    }
                                }
                                else if (children[j].data.resourceType === "user-spell") {
                                    for (var n in spells) {
                                        if (spells[n]._id === children[j].data.userResourceId) {
                                            spells[n].$type = "user-spell";
                                            enrichedLeaves.push(spells[n]);
                                            break;
                                        }
                                    }
                                }
                                else if (children[j].data.resourceType === "user-feat") {
                                    for (var n in feats) {
                                        if (feats[n]._id === children[j].data.userResourceId) {
                                            feats[n].$type = "user-feat";
                                            enrichedLeaves.push(feats[n]);
                                            break;
                                        }
                                    }
                                }
                                else if (children[j].data.resourceType === "user-illustration") {
                                    for (var n in illustrations) {
                                        if (illustrations[n]._id === children[j].data.userResourceId) {
                                            illustrations[n].$type = "user-illustration";
                                            enrichedLeaves.push(illustrations[n]);
                                            break;
                                        }
                                    }
                                }
                                else if (children[j].data.resourceType === "user-map") {
                                    for (var n in maps) {
                                        if (maps[n]._id === children[j].data.userResourceId) {
                                            maps[n].$type = "user-map";
                                            enrichedLeaves.push(maps[n]);
                                            break;
                                        }
                                    }
                                }
                            }
                            callback(enrichedLeaves);
                        }
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