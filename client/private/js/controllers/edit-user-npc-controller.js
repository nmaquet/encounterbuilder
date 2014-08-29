// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EditUserNpcController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', '$location', '$sce', '$filter', 'userNpcService', 'contentTreeService', 'locationService',
        function ($rootScope, $scope, $timeout, $routeParams, $location, $sce, $filter, userNpcService, contentTreeService, locationService) {
            $scope.tinymceOptions = {
                resize: false,
                menubar: false,
                toolbar: "bold italic underline strikethrough alignleft aligncenter alignright alignjustify bullist numlist outdent indent blockquote formatselect undo redo removeformat subscript superscript"
            };


            function parseClass(Class) {
                var basicClasses = ['commoner', 'aristocrat', 'expert', 'warrior', 'adept'];

                function parseSingleClass(singleClass) {
                    var words = singleClass.split(" ");
                    var readClass = '';
                    var classLevel = 0;
                    for (var i in words) {
                        if (isNaN(Number(words[i]))) {
                            if (i > 0) {
                                readClass += " ";
                            }
                            readClass += words[i]
                        }
                        else {
                            classLevel = Number(words[i]);
                        }
                    }
                    return {Class: readClass.trim(), Level: classLevel};
                }

                if (Class.indexOf('/') === -1) {
                    var singleClass = parseSingleClass(Class);
                    var heroic = basicClasses.indexOf(singleClass.class) === -1;
                    return {'Heroic': heroic, 'Level': singleClass.Level, 'Classes': [singleClass]};
                }
                else {
                    var classes = Class.split('/');
                    var multipleClasses = [];
                    var heroic = false;
                    var level = 0;
                    for (var j in classes) {
                        multipleClasses[j] = parseSingleClass(classes[j]);
                        level += multipleClasses[j].Level;
                        if (!heroic) {
                            heroic = basicClasses.indexOf(multipleClasses[j].class) === -1;
                        }
                    }
                    return {'Heroic': heroic, 'Level': level, 'Classes': multipleClasses};
                }
            }

            $scope.viewUserNpc = function () {
                if ($scope.userNpc) {
                    $scope.go("/user-npc/" + $routeParams.userNpcId);
                }
            };

            $scope.copyNpc = function () {
                contentTreeService.copyUserNpc($scope.userNpc._id, true);
            };

            function updateUserNpc() {
                if ($scope.userNpc) {
                    if ($scope.classesString) {
                        var classesObject = parseClass($scope.classesString);
                        $scope.userNpc.Classes = classesObject.Classes;
                        $scope.userNpc.Heroic = classesObject.Heroic;
                        $scope.userNpc.Level = classesObject.Level;
                        $scope.classesString = $filter("classesToString")($scope.userNpc.Classes);
                    }

                    userNpcService.update($scope.userNpc, function (error) {
                        if (error) {
                            console.log(error);
                        } else {
                            contentTreeService.userNpcUpdated($scope.userNpc);
                        }
                    });
                }
            }

            $scope.pending = true;

            userNpcService.get($routeParams.userNpcId, function (error, userNpc) {
                if (error) {
                    return console.log(error);
                }
                // FIXME: use the filter
                if (userNpc.Description) {
                    userNpc.DescriptionHTML = $sce.trustAsHtml(userNpc.Description);
                }
                // FIXME: use the filter
                if (userNpc.SpecialAbilities) {
                    userNpc.SpecialAbilitiesHTML = $sce.trustAsHtml(userNpc.SpecialAbilities);
                }
                // FIXME: use the filter
                if (userNpc.SpellLikeAbilities) {
                    userNpc.SpellLikeAbilitiesHTML = $sce.trustAsHtml(userNpc.SpellLikeAbilities);
                }

                $scope.userNpc = userNpc;
                if ($scope.userNpc.Classes) {
                    $scope.classesString = $filter("classesToString")($scope.userNpc.Classes);
                }
                if ($routeParams.userNpcId) {
                    $rootScope.globalTitle = "Chronicle Forge - " + $scope.userNpc.Name;
                }
                $scope.pending = false;

                var lastWatchTime;

                $scope.$watch('userNpc', function (userNpc) {
                    var thisWatchTime = new Date().getTime();
                    lastWatchTime = thisWatchTime;
                    $timeout(function () {
                        if (angular.equals(userNpc, $scope.userNpc) && thisWatchTime === lastWatchTime) {
                            updateUserNpc();
                        } else {
                        }
                    }, 2000);
                }, true /* deep equality */);

                $scope.$on('$locationChangeStart', function (e) {
                    updateUserNpc();
                });
            });

        }
    ]);