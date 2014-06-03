"use strict";

DEMONSQUID.encounterBuilderControllers.controller('BinderController',
    ['$scope', 'selectedBinderService', 'contentTreeService', 'encounterService', 'selectedEncounterService','selectedContentTypeService',
    function ($scope, selectedBinderService, contentTreeService, encounterService, selectedEncounterService,selectedContentTypeService) {

        $scope.removeBinderMessage = "Are you sure ?";
        $scope.leaves = [];

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

        $scope.encounterChanged = function (encounter) {
            if (encounter) {
                encounterService.encounterChanged(encounter);
            }
        };

        $scope.selectLeaf = function (leaf) {
            if (leaf.type === 'binder') {
                selectedBinderService.selectedBinder(leaf);
                selectedContentTypeService.selectedContentType("binder");
            }
            else {
                selectedEncounterService.selectedEncounter(leaf);
                selectedContentTypeService.selectedContentType('encounter');
            }
        };

        $scope.removeEncounter = function (encounter) {
            $scope.startFade = function () {
                var index = $scope.leaves.indexOf(encounter);
                $scope.leaves.splice(index, 1);
                encounterService.remove(encounter);
            };
        };

        $scope.binderChanged = function (optBinder) {
            contentTreeService.binderChanged((optBinder === undefined) ? $scope.binder : optBinder);
        };

        $scope.removeBinder = function (optBinder) {
            $scope.startFade = function () {
                contentTreeService.removeBinder((optBinder === undefined) ? $scope.binder : optBinder);
            };
        };

        $scope.hasDescendants = function () {
            return $scope.binder !== undefined && $scope.binder.descendantCount != 0;
        };

        $scope.hasNoDescendants = function () {
            return $scope.binder !== undefined && $scope.binder.descendantCount == 0;
        };

        contentTreeService.onLeavesChange(function (event, leaves) {
            $scope.leaves = leaves;
        });
    }
    ]);