"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EditUserFeatController',
    ['$scope', '$routeParams', 'UserFeatResource', 'contentTreeService', 'locationService',
        function ($scope, $routeParams, UserFeatResource, contentTreeService, locationService) {

            $scope.viewUserFeat = function () {
                locationService.go("/user-feat/" + $routeParams.userFeatId);
            };

            function updateUserFeat() {
                $scope.userFeat.$save();
                contentTreeService.userFeatUpdated($scope.userFeat);
            }

            $scope.userFeat = UserFeatResource.get({id: $routeParams.userFeatId});

            $scope.$on('$locationChangeStart', function () {
                updateUserFeat($scope.userFeat);
            });
        }
    ])
;