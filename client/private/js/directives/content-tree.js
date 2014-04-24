'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('contentTree', ['$rootScope','contentTreeService', 'encounterService', 'selectedEncounterService',
    function ($rootScope,contentTreeService, encounterService, selectedEncounterService) {
        return {
            restrict: "E",
            template: "<div></div>",
            replace: true,
            link: function (scope, element) {
                element.fancytree({
                    source: contentTreeService.contentTree(),
                    activate: function(event, data){
                        var node = data.node;
                        if (node.data.encounter) {
                            selectedEncounterService.selectedEncounter(node.data.encounter);
                            $rootScope.$apply();
                        }
                    }
                });
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