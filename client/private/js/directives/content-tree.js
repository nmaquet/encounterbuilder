'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('contentTree',
    ['$rootScope', 'contentTreeService', 'encounterService', 'selectedEncounterService', 'selectedBinderService', 'selectedContentTypeService',
        function ($rootScope, contentTreeService, encounterService, selectedEncounterService, selectedBinderService, selectedContentTypeService) {

            function link(scope, element) {

                function makeBinder(node) {
                    return {Name: node.title, nodeKey: node.key, descendantCount: node.countChildren(true)};
                }

                function onActivate(event, data) {
                    var node = data.node;
                    if (node.data.encounter) {
                        selectedEncounterService.selectedEncounter(node.data.encounter);
                        selectedContentTypeService.selectedContentType("encounter");
                    } else if (node.folder) {
                        selectedBinderService.selectedBinder(makeBinder(node));
                        selectedContentTypeService.selectedContentType("binder");
                    }
                    $rootScope.$apply();
                }

                function onNewEncounter(event, encounter) {
                    var activeNode = tree.getActiveNode();
                    if (activeNode === null) {
                        activeNode = tree.rootNode;
                        activeNode.addNode({title: encounter.Name, encounter: encounter}).setActive(true);
                    }
                    else if (activeNode.folder === true) {
                        var newNode = activeNode.addNode({title: encounter.Name, encounter: encounter});
                        newNode.setActive(true);
                        newNode.makeVisible();
                    }
                    else {
                        activeNode.appendSibling({title: encounter.Name, encounter: encounter}).setActive(true);
                    }
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
                }

                function onEncounterChanged(event, encounter) {
                    tree.visit(function (node) {
                        if (node.data.encounter && node.data.encounter._id === encounter._id) {
                            node.setTitle(encounter.Name);
                        }
                    });
                }

                function onEncounterRemoved(event, encounter) {
                    console.log("removing " + JSON.stringify(encounter));
                    var toRemove;
                    tree.visit(function (node) {
                        if (node.data.encounter && node.data.encounter._id === encounter._id) {
                            toRemove = node;
                        }
                    });
                    toRemove.remove();
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
                }

                function onRemoveBinder(event, binder) {
                    tree.visit(function (node) {
                        if (node.key === binder.nodeKey) {
                            node.remove();
                        }
                    });
                    var newActiveNode = tree.rootNode.getFirstChild();
                    if (newActiveNode === null) {
                        selectedContentTypeService.selectedContentType("none");
                    } else if (newActiveNode.folder === true) {
                        selectedBinderService.selectedBinder(makeBinder(newActiveNode));
                        selectedContentTypeService.selectedContentType("binder");
                    } else if (newActiveNode.encounter !== undefined) {
                        selectedEncounterService.selectedEncounter(newActiveNode.encounter);
                        selectedContentTypeService.selectedContentType("encounter");
                    }
                }

                element.fancytree({
                    source: contentTreeService.contentTree(),
                    activate: onActivate
                });

                var tree = element.fancytree("getTree");

                contentTreeService.register({newEncounter: onNewEncounter, newBinder: onNewBinder, removeBinder: onRemoveBinder, binderChanged: onBinderChanged});
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