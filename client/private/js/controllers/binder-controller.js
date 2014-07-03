"use strict";

DEMONSQUID.encounterBuilderControllers.controller('BinderController',
    ['$rootScope', '$scope', '$routeParams', 'contentTreeService', 'encounterService',
        function ($rootScope, $scope, $routeParams, contentTreeService, encounterService) {

            $scope.removeBinderMessage = "Are you sure ?";

            $scope.pending = true;
            contentTreeService.getBinderChildrenByKey($routeParams.binderId, function (children) {
                $scope.leaves = children;
                //binder is initialized inside the callback to limit flickering
                // (angular renders binder empty then when the children are loaded re render again with the children)
                $scope.binder = contentTreeService.getBinderByKey($routeParams.binderId);
                $rootScope.globalTitle = "Encounter Builder - " + $scope.binder.Name;
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
                else if (leaf.type === 'encounter') {
                    $scope.go("/encounter/" + leaf._id);
                }
                else if (leaf.type === 'userText') {
                    $scope.go("/user-text/" + leaf._id);
                }
                else if (leaf.type === 'monster') {
                    $scope.go("/user-monster/" + leaf._id);
                }
                else if (leaf.type === 'npc') {
                    $scope.go("/user-npc/" + leaf._id);
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