// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserMonsterController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', '$location', '$sce', 'userResourceService', 'contentTreeService', 'locationService', 'templateService', 'throttle',
        function ($rootScope, $scope, $timeout, $routeParams, $location, $sce, userResourceService, contentTreeService, locationService, templateService, throttle) {

            var baseMonster = null;
            var resourceType = locationService.getResourceType();
            $scope.templateControlsCollapsed = true;
            $scope.showButtons = true;

            $scope.delete = function () {
                if ($scope.userResource) {
                    $scope.startFade = function () {
                        contentTreeService.userResourceDeleted($scope.userResource);
                        if ($routeParams.detailsId) {
                            locationService.closeDetails();
                        }
                        $scope.userResource.$delete();
                    }
                }
            };

            $scope.editUserMonster = function () {
                if ($scope.userResource) {
                    locationService.go("/chronicle/" + $routeParams.chronicleId + "/edit-" + resourceType + "/" + ($routeParams.userResourceId || $routeParams.detailsId));
                }
            };

            $scope.copyMonster = function () {
                contentTreeService.copyUserResource($scope.userResource._id, resourceType);
            };

            $scope.pending = true;

            function updateUserResource(userResource) {
                userResource.$save();
                contentTreeService.userResourceUpdated(userResource, resourceType);
            }

            function loadMonster() {
                userResourceService[resourceType].get({id: $routeParams.userResourceId || $routeParams.detailsId}, function (userMonster) {
                    userMonster.templates = userMonster.templates || {};
                    baseMonster = userMonster;
                    $scope.userResource = templateService.createTemplatedMonster(userMonster);

                    if ($routeParams.userMonsterId) {
                        $rootScope.globalTitle = "Chronicle Forge - " + $scope.userResource.Name;
                    }
                    $scope.pending = false;

                    var update = throttle(updateUserResource, 1000);
                    var userMonsterUpdated = throttle(contentTreeService.userResourceUpdated, 1000);

                    $scope.$watch("userResource.templates", function (value) {
                        $scope.userResource = templateService.createTemplatedMonster(baseMonster);
                        baseMonster.templates = $scope.userResource.templates;
                        update(baseMonster);
                        userMonsterUpdated($scope.userResource);
                    }, true /* deep equality */);
                }, function (error) {
                    return console.log(error);
                });
            }

            loadMonster();
        }
    ]);