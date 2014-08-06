// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserMonsterController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', '$location', '$sce', 'userMonsterService', 'contentTreeService', 'locationService', 'templateService', 'throttle',
        function ($rootScope, $scope, $timeout, $routeParams, $location, $sce, userMonsterService, contentTreeService, locationService, templateService, throttle) {

            var baseMonster = null;

            $scope.templateControlsCollapsed = true;

            $scope.deleteUserMonster = function () {
                if ($scope.userMonster) {
                    $scope.startFade = function () {
                        userMonsterService.delete($scope.userMonster, function (error) {
                            if (error) {
                                console.log(error);
                            } else {
                                contentTreeService.userMonsterDeleted($scope.userMonster);
                                if ($routeParams.detailsId) {
                                    locationService.closeDetails();
                                }
                            }
                        });
                    }
                }
            };

            $scope.editUserMonster = function () {
                if ($scope.userMonster) {
                    $scope.go("/edit-user-monster/" + ($routeParams.userMonsterId || $routeParams.detailsId));
                }
            };

            $scope.copyMonster = function () {
                contentTreeService.copyUserMonster($scope.userMonster._id, true);
            };

            $scope.pending = true;

            function loadMonster() {
                userMonsterService.get($routeParams.userMonsterId || $routeParams.detailsId, function (error, userMonster) {
                    if (error) {
                        return console.log(error);
                    }

                    userMonster.templates = userMonster.templates || {};
                    baseMonster = userMonster;
                    $scope.userMonster = templateService.createTemplatedMonster(userMonster);

                    if ($routeParams.userMonsterId) {
                        $rootScope.globalTitle = "Chronicle Forge - " + $scope.userMonster.Name;
                    }
                    $scope.pending = false;

                    var update = throttle(userMonsterService.update, 1000);
                    var userMonsterUpdated = throttle(contentTreeService.userMonsterUpdated, 1000);

                    $scope.$watch("userMonster.templates", function(value) {
                        $scope.userMonster = templateService.createTemplatedMonster(baseMonster);
                        baseMonster.templates = $scope.userMonster.templates;
                        update(baseMonster);
                        userMonsterUpdated($scope.userMonster);
                    }, true /* deep equality */);
                });
            }

            loadMonster();
        }
    ]);