'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('contentTree', ['$rootScope', 'contentTreeService', 'encounterService', 'selectedEncounterService',
    function ($rootScope, contentTreeService, encounterService, selectedEncounterService) {
        return {
            restrict: "E",
            template: "<div></div>",
            replace: true,
            link: function (scope, element) {
                element.fancytree({
                    source: contentTreeService.contentTree(),
                    activate: function (event, data) {
                        var node = data.node;
                        if (node.data.encounter) {
                            selectedEncounterService.selectedEncounter(node.data.encounter);
                            $rootScope.$apply();
                        }
                    }
                });
                var tree = element.fancytree("getTree");
                var callbacks = {
                    newEncounter: function (event, encounter) {
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
                    },
                    newBinder: function () {
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

                    }};
                contentTreeService.register(callbacks);
                encounterService.onEncounterChanged(function (event, encounter) {
                    tree.visit(function (node) {
                        if (node.data.encounter && node.data.encounter._id === encounter._id) {
                            node.setTitle(encounter.Name);
                        }
                    });
                });
                encounterService.onEncounterRemoved(function (event, encounter) {
                    tree.visit(function (node) {
                        if (node.data.encounter && node.data.encounter._id === encounter._id) {
                            node.remove();
                        }
                    });
                });
            }
        };
    }
]);