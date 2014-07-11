"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserFeatController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', '$location', '$sce', 'UserFeatResource', 'contentTreeService', 'locationService',
        function ($rootScope, $scope, $timeout, $routeParams, $location, $sce, UserFeatResource, contentTreeService, locationService) {

            $scope.deleteUserText = function () {
                if ($scope.userFeat) {
                    $scope.startFade = function () {
                        userFeatService.delete($scope.userFeat, function (error) {
                            if (error) {
                                console.log(error);
                            } else {
                                contentTreeService.userFeatDeleted($scope.userFeat);
                                if ($routeParams.detailsId) {
                                    locationService.closeDetails();
                                }
                            }
                        });
                    }
                }
            };

//            $scope.editUserText = function () {
//                if ($scope.userFeat) {
//                    locationService.go("/edit-user-text/" + ($routeParams.userFeatId || $routeParams.detailsId));
//                }
//            };

//            $scope.copyUserText = function () {
//                contentTreeService.copyUserText($scope.userFeat._id);
//            };

            $scope.pending = true;

            userFeatService.get($routeParams.userFeatId || $routeParams.detailsId, function (error, userFeat) {
                if (error) {
                    return console.log(error);
                }

                $scope.userFeat = userFeat;
                if ($routeParams.userFeatId) {
                    $rootScope.globalTitle = "Encounter Builder - " + $scope.userFeat.title;
                }
                $scope.pending = false;
            });
        }
    ])
;