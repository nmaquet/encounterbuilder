"use strict";

DEMONSQUID.encounterBuilderControllers.controller('BinderController',
    ['$scope', '$routeParams', 'contentTreeService', 'encounterService',
        function ($scope, $routeParams, contentTreeService, encounterService) {

            $scope.removeBinderMessage = "Are you sure ?";

            $scope.pending = true;
            contentTreeService.getBinderChildrenByKey($routeParams.binderId, function (children) {
                $scope.leaves = children;
                //binder is initialized inside the callback to limit flickering
                // (angular renders binder empty then when the children are loaded re render again with the children)
                $scope.binder = contentTreeService.getBinderByKey($routeParams.binderId);
                //FIXME this only works for the parent binder, not for the children ones.
                $scope.removeBinderMessage = "This binder contains " + $scope.binder.descendantCount + " elements. Are you sure ?";

                $scope.pending = false;
            });


            $scope.encounterChanged = function (encounter) {
                if (encounter) {
                    encounterService.encounterChanged(encounter);
                }
            };

            $scope.selectLeaf = function (leaf) {
                if (leaf.type === 'binder') {
                    $scope.go("/binder/" + leaf.nodeKey);
                }
                else {
                    $scope.go("/encounter/" + leaf._id);
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
        }
    ]);