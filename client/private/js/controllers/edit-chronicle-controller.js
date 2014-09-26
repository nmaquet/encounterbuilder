// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EditChronicleController', ['$scope', '$controller', '$window', '$location', 'locationService',
    function ($scope, $controller, $window, $location, locationService) {

        var justDeletedAChronicle = false;
        var deleteChronicleModal = $('#delete-chronicle-modal');

        deleteChronicleModal.on('hidden.bs.modal', function () {
            $scope.$apply(function (){
                if (justDeletedAChronicle) {
                    justDeletedAChronicle = false;
                    locationService.go('/');
                }
            });
        });

        angular.extend(this, $controller('EditUserResourceController', {$scope: $scope}));
        $scope.delete = function () {
            if ($scope.userResource.name === $scope.confirmName) {
                $scope.userResource.$delete(function () {
                    $scope.confirmName = "";
                    deleteChronicleModal.modal('hide');
                    justDeletedAChronicle = true;
                });
            }
        }
    }
]);