// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('BinderController',
    ['$rootScope', '$scope', '$routeParams', 'contentTreeService', 'encounterService',
        function ($rootScope, $scope, $routeParams, contentTreeService, encounterService) {

            $scope.removeBinderMessage = "Are you sure ?";

            $scope.pending = true;
            function loadBinderChildren() {
                contentTreeService.getBinderChildrenByKey($routeParams.binderId, function (children) {
                    $scope.leaves = children;
                    //binder is initialized inside the callback to limit flickering
                    // (angular renders binder empty then when the children are loaded re render again with the children)
                    $scope.binder = contentTreeService.getBinderByKey($routeParams.binderId);
                    $rootScope.globalTitle = "Chronicle Forge - " + $scope.binder.Name;
                    $scope.removeBinderMessage = "This binder contains " + $scope.binder.descendantCount + " elements. Are you sure ?";

                    $scope.pending = false;
                });
            }

            if (contentTreeService.hasLoaded()) {
                loadBinderChildren();
            }
            else {
                contentTreeService.onLoadSuccess(loadBinderChildren);
            }

            $scope.encounterChanged = function (encounter) {
                if (encounter) {
                    encounterService.encounterChanged(encounter);
                }
            };

            $scope.selectLeaf = function (leaf) {
                if (leaf.$type === 'binder') {
                    $scope.go("/chronicle/" + $routeParams.chronicleId + "/binder/" + leaf.nodeKey);
                }
                else if (leaf.$type === 'encounter') {
                    $scope.go("/chronicle/" + $routeParams.chronicleId + "/encounter/" + leaf._id);
                }
                else if (leaf.$type === 'userText') {
                    $scope.go("/chronicle/" + $routeParams.chronicleId + "/user-text/" + leaf._id);
                }
                else if (leaf.$type === 'monster') {
                    $scope.go("/chronicle/" + $routeParams.chronicleId + "/user-monster/" + leaf._id);
                }
                else if (leaf.$type === 'npc') {
                    $scope.go("/chronicle/" + $routeParams.chronicleId + "/user-npc/" + leaf._id);
                }
                else {
                    $scope.go("/chronicle/" + $routeParams.chronicleId + "/" + leaf.$type + "/" + leaf._id);
                }
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