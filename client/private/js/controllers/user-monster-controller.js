"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserMonsterController',
    ['$scope', '$timeout', '$routeParams', '$location', '$sce', 'userMonsterService', 'contentTreeService', 'locationService',
        function ($scope, $timeout, $routeParams, $location, $sce, userMonsterService, contentTreeService, locationService) {
            $scope.tinymceOptions = {
                resize: false
            };

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

            $scope.viewUserMonster = function () {
                if ($scope.userMonster) {
                    $scope.go("/user-monster/" + $routeParams.userMonsterId);
                }
            };

            $scope.copyMonster = function () {
                contentTreeService.copyUserMonster($scope.userMonster._id, true);
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

            userMonsterService.get($routeParams.userMonsterId || $routeParams.detailsId, function (error, userMonster) {
                if (error) {
                    return console.log(error);
                }

                if (userMonster.Description) {
                    userMonster.DescriptionHTML = $sce.trustAsHtml(userMonster.Description);
                }
                if (userMonster.SpecialAbilities) {
                    userMonster.SpecialAbilitiesHTML = $sce.trustAsHtml(userMonster.SpecialAbilities);
                }
                if (userMonster.SpellLikeAbilities) {
                    userMonster.SpellLikeAbilitiesHTML = $sce.trustAsHtml(userMonster.SpellLikeAbilities);
                }

                $scope.userMonster = userMonster;
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
                    /* update if leaving editor view */
                    if ($location.path().indexOf("/edit-user-monster/") === -1) {
                        updateUserMonster();
                    }
                });
            });

        }
    ]);