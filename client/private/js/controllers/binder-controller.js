"use strict";

DEMONSQUID.encounterBuilderControllers.controller('BinderController',
    ['$scope', 'selectedBinderService', 'contentTreeService',
        function ($scope, selectedBinderService, contentTreeService) {

            $scope.removeBinderMessage = "Are you sure ?";

            selectedBinderService.register(function () {
                $scope.binder = selectedBinderService.selectedBinder();
                if ($scope.binder) {
                    if ($scope.binder.descendantCount === 0) {
                        $scope.removeBinderMessage = "Are you sure ?";
                    } else {
                        $scope.removeBinderMessage = "This binder contains " + $scope.binder.descendantCount + " elements. Are you sure ?";
                    }
                }
            });

            $scope.binderChanged = function () {
                contentTreeService.binderChanged($scope.binder);
            };

            $scope.removeBinder = function () {
                $scope.startFade = function() {
                    contentTreeService.removeBinder($scope.binder);
                };
            };

            $scope.hasDescendants = function () {
                return $scope.binder !== undefined && $scope.binder.descendantCount != 0;
            };

            $scope.hasNoDescendants = function () {
                return $scope.binder !== undefined && $scope.binder.descendantCount == 0;
            };
        }
    ]);