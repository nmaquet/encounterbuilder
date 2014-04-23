'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('fancytree', ['contentTreeService', 'encounterService',
    function (contentTreeService, encounterService) {
        return {
            restrict: "E",
            template: "<div></div>",
            replace: true,
            link: function (scope, element) {
                element.fancytree({source: contentTreeService.contentTree()});
                var tree = element.fancytree("getTree");
                var callbacks = {newEncounter: function (event, encounter) {
                    tree.rootNode.addNode({title: encounter.Name, encounter: encounter});
                }};
                contentTreeService.register(callbacks);
                encounterService.onEncounterChanged(function (event, encounter) {
                    tree.visit(function (node) {
                        if (node.data.encounter && node.data.encounter._id === encounter._id) {
                            node.setTitle(encounter.Name);
                        }
                    });
                });
            }
        };
    }
]);