"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserNpcController',
    ['$scope', '$timeout', '$routeParams', '$location', '$sce', 'userNpcService', 'contentTreeService', 'locationService',
        function ($scope, $timeout, $routeParams, $location, $sce, userNpcService, contentTreeService, locationService) {

            $scope.deleteUserNpc = function () {
                if ($scope.userNpc) {
                    $scope.startFade = function () {
                        userNpcService.delete($scope.userNpc, function (error) {
                            if (error) {
                                console.log(error);
                            } else {
                                contentTreeService.userNpcDeleted($scope.userNpc);
                                if ($routeParams.detailsId) {
                                    locationService.closeDetails();
                                }
                            }
                        });
                    }
                }
            };

            $scope.editUserNpc = function () {
                if ($scope.userNpc) {
                    $scope.go("/edit-user-npc/" + ($routeParams.userNpcId || $routeParams.detailsId));
                }
            };

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

            userNpcService.get($routeParams.userNpcId || $routeParams.detailsId, function (error, userNpc) {
                if (error) {
                    return console.log(error);
                }

                if (userNpc.Description) {
                    userNpc.DescriptionHTML = $sce.trustAsHtml(userNpc.Description.replace(/\n/gm, "<br>"));
                }
                if (userNpc.SpecialAbilities) {
                    userNpc.SpecialAbilitiesHTML = $sce.trustAsHtml(userNpc.SpecialAbilities.replace(/\n/gm, "<br>"));
                }
                if (userNpc.SpellLikeAbilities) {
                    userNpc.SpellLikeAbilitiesHTML = $sce.trustAsHtml(userNpc.SpellLikeAbilities.replace(/\n/gm, "<br>"));
                }

                $scope.userNpc = userNpc;
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
                    /* update if leaving editor view */
                    if ($location.path().indexOf("/edit-user-npc/") === -1) {
                        updateUserNpc();
                    }
                });
            });

        }
    ]);