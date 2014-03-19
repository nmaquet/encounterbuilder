'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('spellList',[ '$compile',
    function ($compile) {
        var spellListTemplate =
            '<p>{{spells}}</p>';

        return {
            restrict: "E",
            replace: true,
            template: spellListTemplate,
            scope: {
                spellString: "@spellString"
            },
            link:function(scope){
                console.log(scope.spellString);
                scope.spells = scope.spellString;
            }
        };
    }]);