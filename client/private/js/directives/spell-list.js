'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('spellList',[ '$compile',
    function ($compile) {
        var templateLines = [
            '<span>',
            '<p><strong>{{title}}</strong> (CL {{CL}})</p>',
            '<ul>',
            '<li class="spell-list-item" ng-repeat="item in spellListItems">{{item}}</li>',
            '</ul>',
            '</span>'
        ] ;
        return {
            restrict: "E",
            replace: true,
            template: templateLines.join(""),
            scope: {
                spellString: "@spellString"
            },
            link:function(scope){
                scope.title = "Spells Barely Known";
                scope.CL = "0";
                scope.spellListItems = ["0 (at will)&emdash;detect magic"];
            }
        };
    }]);