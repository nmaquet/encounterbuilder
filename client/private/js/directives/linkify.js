'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('linkify',
    ['$rootScope', '$compile', '$timeout', 'spellService', 'featService',
        function ($rootScope, $compile, $timeout, spellService, featService) {

            function processMythicSuperscript(string) {
                return string.replace(/([a-z])(M|B|UM|APG|UC)/g, "$1<sup>$2</sup>")
            }

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
                scope: {watchedExpression: "&linkify", type: "@linkifyType", mythic: "@mythic"},
                link: function compile(scope, element) {
                    scope.selectSpell = function (spellId) {
                        $timeout(function () {
                            $rootScope.go('spell', spellId);
                            $('#spellsTab').click();
                        });
                    };
                    scope.selectFeat = function (featId) {
                        $timeout(function () {
                            $rootScope.go('feat', featId);
                            $('#featsTab').click();
                        });
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
                            if (scope.mythic) {
                                value = processMythicSuperscript(value);
                            }

                            var match = null;
                            var parts = [];
                            var position = 0;
                            while (null !== (match = types[typesArray[i]].regex.exec(value))) {
                                parts.push(value.slice(position, match.index));
                                var id = types[typesArray[i]].list[match[0].toLowerCase()];
                                position = match.index + match[0].length;
                                if (scope.mythic && scope.type === "feat" && value.slice(position, position + "<sup>M</sup>".length) === "<sup>M</sup>") {
                                    id += "-mythic";
                                }
                                var clickHandler = types[typesArray[i]].selectFunctionName + '(\'' + id + '\')';
                                parts.push('<a class="is-pointer" ng-click="' + clickHandler + '">' + match[0] + '</a>');
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