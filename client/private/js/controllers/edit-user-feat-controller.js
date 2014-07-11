"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EditUserFeatController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', '$location', 'throttle', 'UserFeatResource', 'contentTreeService', 'locationService',
        function ($rootScope, $scope, $timeout, $routeParams, $location, throttle, UserFeatResource, contentTreeService, locationService) {

            $scope.viewUserFeat = function () {
                if ($scope.userFeat) {
                    $scope.userFeat.$save();
                    locationService.go("/user-feat/" + $routeParams.userFeatId);
                }
            };

            function updateUserFeat() {
                if ($scope.userFeat) {
                    $scope.userFeat.$save(function() {
//                        contentTreeService.userFeatUpdated($scope.userFeat)
                    });
                }
            }

            $scope.userFeat = UserFeatResource.get({id: $routeParams.userFeatId});

            $scope.$watch('userFeat', throttle(function (userFeat) {
                if (angular.equals(userFeat, $scope.userFeat)) {
                    updateUserFeat();
                }
            }, 2000), true /* deep equality */);

            $scope.$on('$locationChangeStart', function () {
                updateUserFeat();
            });
        }
    ])
;