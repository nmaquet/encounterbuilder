'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('contentTree', ['$rootScope', 'contentTreeService', 'encounterService', 'selectedEncounterService',
    function ($rootScope, contentTreeService, encounterService, selectedEncounterService) {

        function link(scope, element) {

            function onActivate(event, data) {
                var node = data.node;
                if (node.data.encounter) {
                    selectedEncounterService.selectedEncounter(node.data.encounter);
                    $rootScope.$apply();
                }
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
                tree.visit(function (node) {
                    if (node.data.encounter && node.data.encounter._id === encounter._id) {
                        node.remove();
                    }
                });
            }

            element.fancytree({
                source: contentTreeService.contentTree(),
                activate: onActivate
            });

            var tree = element.fancytree("getTree");

            contentTreeService.register({newEncounter: onNewEncounter, newBinder: onNewBinder});
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