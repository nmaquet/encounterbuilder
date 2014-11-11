// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ChronicleController',
    ['$scope', '$location', '$routeParams', 'locationService', 'ChronicleResource', 'throttle', 'contentTreeService',
        function ($scope, $location, $routeParams, locationService, ChronicleResource, throttle, contentTreeService) {

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

            $scope.copyPending = false;
            $scope.copy = function () {
                $scope.copyPending = true;
                ChronicleResource.save({baseChronicleId: $scope.chronicle._id}, function (newChronicle) {
                    $scope.copyPending = false;
                    locationService.go("/chronicle/" + newChronicle._id);
                });
            };

            $scope.view = function () {
                locationService.go("/chronicle-full/" + $routeParams.chronicleId);
            };

            $scope.exceptLastModified = function (userResource) {
                var result = angular.copy(userResource);
                delete result.lastModified;
                return result;
            };

            function getChronicleAndWatchChanges() {
                $scope.chronicle = contentTreeService.getChronicle();
                $scope.chronicle.minLevel = $scope.chronicle.minLevel || 1;
                $scope.chronicle.maxLevel = $scope.chronicle.maxLevel || 20;
                var throttledSaveChronicle = throttle(contentTreeService.saveChronicle, 500);
                $scope.$watch("exceptLastModified(chronicle)", function (newValue, oldValue) {
                    if (angular.equals(newValue, oldValue)) {
                        return;
                    }
                    throttledSaveChronicle()
                }, true /* deep equality */);
            }

            if (contentTreeService.hasLoaded()) {
                getChronicleAndWatchChanges();
            }
            else {
                contentTreeService.onLoadSuccess(function () {
                    getChronicleAndWatchChanges();
                });
            }
        }
    ]);