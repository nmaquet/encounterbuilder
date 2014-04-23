'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('fancytree', ['contentTreeService', function (contentTreeService) {
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
        }
    };
}]);