'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('linkify', ['$compile', 'spellService', 'selectedSpellService',
    function ($compile, spellService, selectedSpellService) {
        var spells;
        var regex;
        return {
            restrict: 'A',
            replace: true,
            scope: {watchedExpression: "&linkify", type: "@linkifyType"},
            link: function compile(scope, element) {
                scope.selectSpell = function (spellId) {
                    selectedSpellService.selectedSpellId(spellId);
                    $('#spellsTab').click();
                }
                scope.$watch(scope.watchedExpression, function (value) {
                    spells = spells || spellService.spells();
                    if (!spells) {
                        return;
                    }
                    regex = regex || new RegExp("\\b(" + spells.names.join("|") + ")\\b", "ig");
                    if (!value) {
                        return;
                    }
                    value = value.toString();
                    var match = null;
                    var parts = [];
                    var position = 0;
                    while (null !== (match = regex.exec(value))) {
                        parts.push(value.slice(position, match.index));
                        parts.push('<a class="pointer" ng-click="selectSpell(\'' + spells[match[0].toLowerCase()] + '\')">' + match[0] + '</a>');
                        position = match.index + match[0].length;
                    }
                    parts.push(value.slice(position));
                    element.html(parts.join(""));
                    $compile(element.contents())(scope);
                });
            }
        };
    }]);