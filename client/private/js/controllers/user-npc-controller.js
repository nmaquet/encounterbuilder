// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserNpcController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', '$location', '$sce', 'userNpcService', 'contentTreeService', 'locationService',
        function ($rootScope, $scope, $timeout, $routeParams, $location, $sce, userNpcService, contentTreeService, locationService) {

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
                    locationService.go("/edit-user-npc/" + ($routeParams.userNpcId || $routeParams.detailsId));
                }
            };

            $scope.copyNpc = function () {
                contentTreeService.copyUserNpc($scope.userNpc._id, true);
            };

            $scope.pending = true;

            userNpcService.get($routeParams.userNpcId || $routeParams.detailsId, function (error, userNpc) {
                if (error) {
                    return console.log(error);
                }
                // FIXME use the filter
                if (userNpc.Description) {
                    userNpc.DescriptionHTML = $sce.trustAsHtml(userNpc.Description);
                }
                // FIXME use the filter
                if (userNpc.SpecialAbilities) {
                    userNpc.SpecialAbilitiesHTML = $sce.trustAsHtml(userNpc.SpecialAbilities);
                }
                // FIXME use the filter
                if (userNpc.SpellLikeAbilities) {
                    userNpc.SpellLikeAbilitiesHTML = $sce.trustAsHtml(userNpc.SpellLikeAbilities);
                }

                $scope.userNpc = userNpc;
                if ($routeParams.userNpcId) {
                    $rootScope.globalTitle = "Chronicle Forge - " + $scope.userNpc.Name;
                }
                $scope.pending = false;
            });

        }
    ]);