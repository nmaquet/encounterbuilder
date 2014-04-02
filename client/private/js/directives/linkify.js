'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('linkify',
    ['$compile', 'spellService', 'selectedSpellService', 'featService', 'selectedFeatService',
    function ($compile, spellService, selectedSpellService, featService, selectedFeatService) {

        var types = {
            spell: {
                list : null,
                regex : null,
                getList: spellService.spells,
                selectFunctionName: "selectSpell"
            },
            feat: {
                list : null,
                regex : null,
                getList: featService.feats,
                selectFunctionName: "selectFeat"
            }
        };

        return {
            restrict: 'A',
            replace: true,
            scope: {watchedExpression: "&linkify", type: "@linkifyType"},
            link: function compile(scope, element) {
                scope.selectSpell = function (spellId) {
                    selectedSpellService.selectedSpellId(spellId);
                    $('#spellsTab').click();
                };
                scope.selectFeat = function (featId) {
                    selectedFeatService.selectedFeatId(featId);
                    $('#featsTab').click();
                };
                scope.$watch(scope.watchedExpression, function (value) {
                    types[scope.type].list = types[scope.type].list || types[scope.type].getList();
                    if (!types[scope.type]) {
                        return;
                    }
                    types[scope.type].regex = types[scope.type].regex || new RegExp("\\b(" + types[scope.type].list.names.join("|") + ")\\b", "ig");
                    if (!value) {
                        return;
                    }
                    value = value.toString();
                    var match = null;
                    var parts = [];
                    var position = 0;
                    while (null !== (match = types[scope.type].regex.exec(value))) {
                        parts.push(value.slice(position, match.index));
                        parts.push('<a class="pointer" ng-click="' + types[scope.type].selectFunctionName + '(\'' + types[scope.type].list[match[0].toLowerCase()] + '\')">' + match[0] + ' </a>');
                        position = match.index + match[0].length;
                    }
                    parts.push(value.slice(position));
                    element.html(parts.join(""));
                    $compile(element.contents())(scope);
                });
            }
        };
    }]);