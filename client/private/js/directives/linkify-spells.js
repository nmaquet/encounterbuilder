'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('linkifySpells', [ 'spellService', function (spellService) {
    var spellNames;
    var regex;
    return {
        restrict: 'A',
        replace: true,
        scope: {watchedExpression: "&linkifySpells"},
        link: function compile(scope, element, attrs, controller) {
            scope.$watch(scope.watchedExpression, function (value) {
                spellNames = spellNames || spellService.spells();
                if (!spellNames) {
                    return;
                }
                regex = regex || new RegExp("\\b(" + spellNames.join("|") + ")\\b", "ig");
                if (!value) {
                    return;
                }
                value = value.toString();
                var match = null;
                var parts = [];
                var position = 0;
                while (null !== (match = regex.exec(value))) {
                    parts.push(value.slice(position, match.index));
                    parts.push('<a href="#">' + match[0] + '</a>');
                    position = match.index + match[0].length;
                }
                parts.push(value.slice(position));
                element.html(parts.join(""));

            });
        }
    };
}]);