// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ChronicleController',
    ['$scope', '$location', '$routeParams', 'locationService', 'ChronicleResource',
        function ($scope, $location, $routeParams, locationService, ChronicleResource) {

            var justDeletedAChronicle = false;
            var deleteChronicleModal = $('#delete-chronicle-modal');

            deleteChronicleModal.on('hidden.bs.modal', function () {
                $scope.$apply(function () {
                    if (justDeletedAChronicle) {
                        justDeletedAChronicle = false;
                        locationService.go('/chronicles');
                    }
                });
            });

            $scope.delete = function () {
                if ($scope.chronicle.name === $scope.confirmName) {
                    $scope.chronicle.$delete(function () {
                        $scope.confirmName = "";
                        deleteChronicleModal.modal('hide');
                        justDeletedAChronicle = true;
                    });
                }
            };

            $scope.chronicleRenamed = function () {
                $scope.chronicle.$save();
            };

            $scope.chronicle = ChronicleResource.get({id: $routeParams.chronicleId});
        }
    ]);