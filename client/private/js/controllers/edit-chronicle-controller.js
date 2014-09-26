// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EditChronicleController', ['$scope', '$controller', '$window', '$location', 'locationService',
    function ($scope, $controller, $window, $location, locationService) {
        angular.extend(this, $controller('EditUserResourceController', {$scope: $scope}));
        $scope.delete = function () {
            if ($scope.userResource.name === $scope.confirmName) {
                console.log("delete chronicle");
                $scope.userResource.$delete(function () {
                    $scope.confirmName = "";
                    $('#delete-chronicle-modal').modal('hide');
                    $scope.$apply();
                    locationService.go('/');
//                    $window.location.reload(true);
                });
            }
        };
        $scope.view = function () {
            locationService.go('/chronicle-full/' + $scope.userResource._id);
        }
    }
]);