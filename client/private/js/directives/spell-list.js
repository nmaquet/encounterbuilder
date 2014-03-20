'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('spellList', [ '$compile',

    function ($compile) {
        var templateLines = [
            '<span>',
            '<p><strong class="spell-title">{{title}}</strong><span class="spell-cl">(CL {{CL}})</span></p>',
            '<ul>',
            '<li class="spell-list-item" ng-repeat="item in spellListItems">{{item}}</li>',
            '</ul>',
            '</span>'
        ];
        return {
            restrict: "E",
            replace: true,
            template: templateLines.join(""),
            scope: {
                spellString: "@spellString"
            },
            link: function (scope) {

                var titleAndCLEnd = scope.spellString.indexOf(")") + 1;
                var titleAndCL = scope.spellString.slice(0, titleAndCLEnd);
                var spellList = scope.spellString.slice(titleAndCLEnd);

                scope.title = /([^\(]*) \(CL ([^\)]+)\)/.exec(titleAndCL)[1].trim();
                scope.CL = /\(CL ([^\)]+)\)/.exec(titleAndCL)[1].trim();
                scope.spellListItems = [];

                var match;
                var nextMatch;
                var matches = [];
                var spellLevelRegex = /(0|1st|2nd|3rd|4th|5th|6th|7th|8th|9th)([^-]*)-/g;
                while (null !== (match = spellLevelRegex.exec(spellList))) {
                    matches.push(match);
                }
                for (var i in matches) {
                    match = matches[i];
                    nextMatch = matches[Number(i) + 1];
                    if (nextMatch) {
                        scope.spellListItems.push(spellList.slice(match.index, nextMatch.index).trim().replace("-", "—"));
                    } else {
                        scope.spellListItems.push(spellList.slice(match.index).trim().replace("-", "—"));
                    }
                }
            }
        };
    }]);