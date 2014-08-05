// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EditUserMonsterController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', '$location', '$sce', 'userMonsterService', 'contentTreeService', 'locationService',
        function ($rootScope, $scope, $timeout, $routeParams, $location, $sce, userMonsterService, contentTreeService, locationService) {
            $scope.tinymceOptions = {
                resize: false,
                menubar: false,
                toolbar: "bold italic underline strikethrough alignleft aligncenter alignright alignjustify bullist numlist outdent indent blockquote formatselect undo redo removeformat subscript superscript"
            };

            $scope.viewUserMonster = function () {
                if ($scope.userMonster) {
                    locationService.go("/user-monster/" + $routeParams.userMonsterId);
                }
            };

            function updateUserMonster() {
                if ($scope.userMonster) {
                    userMonsterService.update($scope.userMonster, function (error) {
                        if (error) {
                            console.log(error);
                        } else {
                            contentTreeService.userMonsterUpdated($scope.userMonster);
                        }
                    });
                }
            }

            $scope.pending = true;

            userMonsterService.get($routeParams.userMonsterId, function (error, userMonster) {
                if (error) {
                    return console.log(error);
                }
                $scope.userMonster = userMonster;
                if ($routeParams.userMonsterId) {
                    $rootScope.globalTitle = "Encounter Builder - " + $scope.userMonster.Name;
                }
                $scope.pending = false;

                var lastWatchTime;

                $scope.$watch('userMonster', function (userMonster) {
                    var thisWatchTime = new Date().getTime();
                    lastWatchTime = thisWatchTime;
                    $timeout(function () {
                        if (angular.equals(userMonster, $scope.userMonster) && thisWatchTime === lastWatchTime) {
                            updateUserMonster();
                        } else {
                        }
                    }, 2000);
                }, true /* deep equality */);

                $scope.$on('$locationChangeStart', function (e) {
                    updateUserMonster();
                });
            });

        }
    ]);