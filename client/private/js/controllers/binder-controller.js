"use strict";

DEMONSQUID.encounterBuilderControllers.controller('BinderController',
    ['$scope', '$location', 'contentTreeService', 'encounterService',
    function ($scope, $location, contentTreeService, encounterService) {

        $scope.removeBinderMessage = "Are you sure ?";
        $scope.leaves = [];

        // FIXME: find a way to add this back
        // $scope.removeBinderMessage = "This binder contains " + $scope.binder.descendantCount + " elements. Are you sure ?";

        $scope.encounterChanged = function (encounter) {
            if (encounter) {
                encounterService.encounterChanged(encounter);
            }
        };

        $scope.selectLeaf = function (leaf) {
            if (leaf.type === 'binder') {
                $location.path("/binder/" + leaf.nodeKey);
            }
            else {
                $location.path("/encounter/" + leaf._id);
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