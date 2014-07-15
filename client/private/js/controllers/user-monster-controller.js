"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserMonsterController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', '$location', '$sce', 'userMonsterService', 'contentTreeService', 'locationService', 'templateService',
        function ($rootScope, $scope, $timeout, $routeParams, $location, $sce, userMonsterService, contentTreeService, locationService, templateService) {

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
                        $rootScope.globalTitle = "Encounter Builder - " + $scope.userMonster.Name;
                    }
                    $scope.pending = false;

                    $scope.$watch("userMonster.templates", function(value) {
                        $scope.userMonster = templateService.createTemplatedMonster(baseMonster);
                        baseMonster.templates = $scope.userMonster.templates;
                        userMonsterService.update(baseMonster, function() {
                            contentTreeService.userMonsterUpdated(baseMonster);
                        });
                    }, true /* deep equality */);
                });
            }

            loadMonster();
        }
    ]);