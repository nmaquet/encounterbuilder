"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserFeatController',
    ['$rootScope', '$scope', '$routeParams', 'UserFeatResource', 'contentTreeService', 'locationService',
        function ($rootScope, $scope, $routeParams, UserFeatResource, contentTreeService, locationService) {

            $scope.deleteUserFeat = function () {
                if ($scope.userFeat) {
                    $scope.startFade = function () {
                        contentTreeService.userFeatDeleted($scope.userFeat);
                        if ($routeParams.detailsId) {
                            locationService.closeDetails();
                        }
                        $scope.userFeat.$delete();
                    }
                }
            };

            $scope.editUserFeat = function () {
                if ($scope.userFeat) {
                    locationService.go("/edit-user-feat/" + ($routeParams.userFeatId || $routeParams.detailsId));
                }
            };

            $scope.copyUserFeat = function () {
                contentTreeService.copyUserFeat($scope.userFeat._id);
            };

            $scope.userFeat = UserFeatResource.get({id: $routeParams.userFeatId || $routeParams.detailsId}, function () {
                if ($routeParams.userFeatId) {
                    $rootScope.globalTitle = "Encounter Builder - " + $scope.userFeat.title;
                }
            });
        }
    ])
;