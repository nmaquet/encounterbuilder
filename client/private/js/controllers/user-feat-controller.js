"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserFeatController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', '$location', '$sce', 'UserFeatResource', 'contentTreeService', 'locationService',
        function ($rootScope, $scope, $timeout, $routeParams, $location, $sce, UserFeatResource, contentTreeService, locationService) {

            $scope.deleteUserFeat = function () {
                if ($scope.userFeat) {
                    $scope.startFade = function () {
                        $scope.userFeat.$delete().then(function(){
                            contentTreeService.userFeatDeleted($scope.userFeat);
                            if ($routeParams.detailsId) {
                                locationService.closeDetails();
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
            UserFeatResource.get({id: $routeParams.userFeatId || $routeParams.detailsId}, function (userFeat) {
                $scope.userFeat = userFeat;
                if ($routeParams.userFeatId) {
                    $rootScope.globalTitle = "Encounter Builder - " + $scope.userFeat.title;
                }
                $scope.pending = false;
            });
        }
    ])
;