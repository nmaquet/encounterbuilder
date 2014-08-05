// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('linkify',
    ['$rootScope', '$compile', '$timeout', '$routeParams', 'spellService', 'featService',
        function ($rootScope, $compile, $timeout, $routeParams, spellService, featService) {

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
                    scope.selectSpell = function (id) {
                        $timeout(function () {
                            if ($routeParams.encounterId) {
                                $rootScope.go('/encounter/' + $routeParams.encounterId + '/spell/' + id);
                            } else {
                                $rootScope.go('/spell/' + id);
                            }
                        });
                    };
                    scope.selectFeat = function (id) {
                        $timeout(function () {
                            if ($routeParams.encounterId) {
                                $rootScope.go('/encounter/' + $routeParams.encounterId + '/feat/' + id);
                            } else {
                                $rootScope.go('/feat/' + id);
                            }
                        });
                    };
                    scope.$watch(scope.watchedExpression, function (value) {
                        var typesArray = scope.type.split(",");
                        for (var i in typesArray) {
                            if (!types[typesArray[i]]) {
                                continue;
                            }
                            if (!value) {
                                continue;
                            }
                            types[typesArray[i]].getList(function (list) {
                                types[typesArray[i]].regex = types[typesArray[i]].regex || new RegExp("\\b(" + list.names.join("|") + ")\\b", "ig");

                                value = value.toString();
                                if (scope.mythic) {
                                    value = processMythicSuperscript(value);
                                }

                                var match = null;
                                var parts = [];
                                var position = 0;
                                while (null !== (match = types[typesArray[i]].regex.exec(value))) {
                                    parts.push(value.slice(position, match.index));
                                    var id = list[match[0].toLowerCase()];
                                    position = match.index + match[0].length;
                                    if (scope.mythic && scope.type === "feat" && value.slice(position, position + "<sup>M</sup>".length) === "<sup>M</sup>") {
                                        id += "-mythic";
                                    }
                                    var clickHandler = types[typesArray[i]].selectFunctionName + '(\'' + id + '\')';
                                    parts.push('<a class="is-pointer" ng-click="' + clickHandler + '">' + match[0] + '</a>');
                                }
                                parts.push(value.slice(position));
                                value = parts.join("");
                                element.html(value);
                                $compile(element.contents())(scope);
                            });
                        }
                    });
                }
            };
        }]);