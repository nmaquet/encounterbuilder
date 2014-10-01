// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('spellList', [ '$sce',
    function ($sce) {

        function processDomainSpells(spellList) {
            return spellList.replace(/([a-z])D/g, "$1<sup>D</sup>")
        }

        function processMissingAtWill(spellList) {
            return spellList.replace(/0[-|—]/g, "0 (at will)-")
        }

        var templateLines = [
            '<span>',
            '<strong class="spell-title">{{title}}</strong> <span class="spell-cl">(CL {{CL}})</span>',
            '<ul class="list-unstyled">',
            '<li class="spell-list-item" ng-repeat="item in spellListItems" ng-bind-html="item" linkify="item" linkify-type="spell" mythic="{{mythic}}"></li>',
            '</ul>',
            '</span>'
        ];

        return {
            restrict: "E",
            replace: true,
            template: templateLines.join(""),
            scope: {
                spellString: "@spellString",
                mythic: "@mythic"
            },
            link: function (scope) {
                function cleanString(string) {
                    return string.replace(/\r?\n|\r/g, ' ').replace(/\s+/g, ' ');
                }

                scope.$watch("spellString", function (newValue, oldValue) {
                    if (angular.equals(newValue, oldValue)) {
                        return;
                    }
                    var cleanedString = cleanString(scope.spellString);
                    var titleAndCLEnd = cleanedString.indexOf(")") + 1;
                    var titleAndCL = cleanedString.slice(0, titleAndCLEnd);
                    var spellList = processMissingAtWill(processDomainSpells(cleanedString.slice(titleAndCLEnd)));
                    scope.title = "Spells";
                    var titleMatch = /([^\(]*) \(CL ([^\)]+)\)/.exec(titleAndCL);
                    if (titleMatch && titleMatch.length > 0) {
                        scope.title = titleMatch[1].trim();
                    }
                    scope.CL = /\(CL ([^\)]+)\)/.exec(titleAndCL)[1].trim();
                    scope.spellListItems = [];

                    var match;
                    var nextMatch;
                    var matches = [];
                    var spellLevelRegex = /(0 \(at will\)|1st|2nd|3rd|4th|5th|6th|7th|8th|9th)([^-—]*)-?—?/g;
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