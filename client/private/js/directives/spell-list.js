'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('spellList', [ '$sce',
    function ($sce) {

        function processDomainSpells(spellList) {
            return spellList.replace(/([a-z])D/g, "$1<sup>D</sup>")
        }

        function processMissingAtWill(spellList) {
            return spellList.replace(/0-/g, "0 (at will)-")
        }

        var templateLines = [
            '<span>',
            '<strong class="spell-title">{{title}}</strong> <span class="spell-cl">(CL {{CL}})</span>',
            '<ul class="list-unstyled">',
            '<li class="spell-list-item" ng-repeat="item in spellListItems" ng-bind-html="item"></li>',
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
                scope.$watch("spellString", function () {
                    var titleAndCLEnd = scope.spellString.indexOf(")") + 1;
                    var titleAndCL = scope.spellString.slice(0, titleAndCLEnd);
                    var spellList = processMissingAtWill(processDomainSpells(scope.spellString.slice(titleAndCLEnd)));

                    scope.title = /([^\(]*) \(CL ([^\)]+)\)/.exec(titleAndCL)[1].trim();
                    scope.CL = /\(CL ([^\)]+)\)/.exec(titleAndCL)[1].trim();
                    scope.spellListItems = [];

                    var match;
                    var nextMatch;
                    var matches = [];
                    var spellLevelRegex = /(0 \(at will\)|1st|2nd|3rd|4th|5th|6th|7th|8th|9th)([^-]*)-/g;
                    while (null !== (match = spellLevelRegex.exec(spellList))) {
                        matches.push(match);
                    }
                    for (var i in matches) {
                        match = matches[i];
                        nextMatch = matches[Number(i) + 1];
                        if (nextMatch) {
                            scope.spellListItems.push($sce.trustAsHtml(spellList.slice(match.index, nextMatch.index).trim().replace("-", "—")));
                        } else {
                            scope.spellListItems.push($sce.trustAsHtml(spellList.slice(match.index).trim().replace("-", "—")));
                        }
                    }
                });
            }
        };
    }]);