"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserMonsterController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', '$location', '$sce', 'userMonsterService', 'contentTreeService', 'locationService',
        function ($rootScope, $scope, $timeout, $routeParams, $location, $sce, userMonsterService, contentTreeService, locationService) {

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

            userMonsterService.get($routeParams.userMonsterId || $routeParams.detailsId, function (error, userMonster) {
                if (error) {
                    return console.log(error);
                }
                // FIXME: use filter
                if (userMonster.Description) {
                    userMonster.DescriptionHTML = $sce.trustAsHtml(userMonster.Description);
                }
                // FIXME: use filter
                if (userMonster.SpecialAbilities) {
                    userMonster.SpecialAbilitiesHTML = $sce.trustAsHtml(userMonster.SpecialAbilities);
                }
                // FIXME: use filter
                if (userMonster.SpellLikeAbilities) {
                    userMonster.SpellLikeAbilitiesHTML = $sce.trustAsHtml(userMonster.SpellLikeAbilities);
                }

                $scope.userMonster = userMonster;
                if ($routeParams.userMonsterId) {
                    $rootScope.globalTitle = "Encounter Builder - " + $scope.userMonster.Name;
                }
                $scope.pending = false;
            });
        }
    ]);