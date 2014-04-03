'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('linkify',
    ['$compile', 'spellService', 'selectedSpellService', 'featService', 'selectedFeatService',
        function ($compile, spellService, selectedSpellService, featService, selectedFeatService) {

            var types = {
                spell: {
                    list: null,
                    regex: null,
                    getList: spellService.spells,
                    selectFunctionName: "selectSpell"
                },
                feat: {
                    list: null,
                    regex: null,
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
                        var typesArray = scope.type.split(",");
                        for (var i in typesArray) {
                            if (!types[typesArray[i]]) {
                                continue;
                            }
                            types[typesArray[i]].list = types[typesArray[i]].list || types[typesArray[i]].getList();
                            if (!types[typesArray[i]].list) {
                                continue;
                            }
                            types[typesArray[i]].regex = types[typesArray[i]].regex || new RegExp("\\b(" + types[typesArray[i]].list.names.join("|") + ")\\b", "ig");
                            if (!value) {
                                continue;
                            }
                            value = value.toString();
                            var match = null;
                            var parts = [];
                            var position = 0;
                            while (null !== (match = types[typesArray[i]].regex.exec(value))) {
                                parts.push(value.slice(position, match.index));
                                parts.push('<a class="pointer" ng-click="' + types[typesArray[i]].selectFunctionName + '(\'' + types[typesArray[i]].list[match[0].toLowerCase()] + '\')">' + match[0] + '</a>');
                                position = match.index + match[0].length;
                            }
                            parts.push(value.slice(position));
                            value = parts.join("");
                        }
                        element.html(value);
                        $compile(element.contents())(scope);
                    });
                }
            };
        }]);