// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ChroniclesController',
    ['$scope', 'ChronicleResource', 'contentTreeService', 'locationService',
        function ($scope, ChronicleResource, contentTreeService, locationService) {

            $scope.chronicles = ChronicleResource.query();

            $scope.copyPending = false;

            var justDeletedAChronicle = false;
            var deleteChronicleModal = $('#delete-chronicle-modal');

            deleteChronicleModal.on('hidden.bs.modal', function () {
                $scope.$apply(function () {
                    $scope.chronicle = null;
                    if (justDeletedAChronicle) {
                        justDeletedAChronicle = false;
                        locationService.refresh();
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
            $scope.toDelete = function (chronicle) {
                $scope.chronicle = chronicle;
            };

            $scope.copy = function (chronicle) {
                $scope.copyPending = true;
                ChronicleResource.save({baseChronicleId: chronicle._id}, function (newChronicle) {
                    $scope.copyPending = false;
                    locationService.go("/chronicle/" + newChronicle._id);
                });
            };

            $scope.chronicleRenamed = function () {
                $scope.chronicle.$save();
            };

            $scope.view = function (chronicle) {
                locationService.go("/chronicle-full/" + chronicle._id);
            };

            $scope.createChronicle = function () {
                var newChronicle = new ChronicleResource();
                newChronicle.name = "new Chronicle";
                newChronicle.contentTree = [];
                newChronicle.$save(function (newChronicle) {
                    $scope.selectChronicle(newChronicle);
                });
            };

            $scope.selectChronicle = function (chronicle) {
                locationService.go("/chronicle/" + chronicle._id);
            };


        }
    ]);
