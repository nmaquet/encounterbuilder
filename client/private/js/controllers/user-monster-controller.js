// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserMonsterController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', '$location', '$sce', 'userResourceService', 'contentTreeService', 'locationService', 'templateService', 'throttle',
        function ($rootScope, $scope, $timeout, $routeParams, $location, $sce, userResourceService, contentTreeService, locationService, templateService, throttle) {

            var baseMonster = null;
            var resourceType = locationService.getResourceType();
            $scope.templateControlsCollapsed = true;

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
                if ($scope.userMonster) {
                    locationService.go("/edit-" + resourceType + "/" + ($routeParams.userResourceId || $routeParams.detailsId));
                }
            };

            $scope.copyMonster = function () {
                contentTreeService.copyUserResource($scope.userMonster._id, resourceType);
            };

            $scope.pending = true;

            function updateUserResource(userResource) {
                userResourceService[resourceType].save(userResource);
                contentTreeService.userResourceUpdated(userResource,resourceType);
            }

            function loadMonster() {
                userResourceService[resourceType].get({id: $routeParams.userResourceId || $routeParams.detailsId}, function (userMonster) {
                    userMonster.templates = userMonster.templates || {};
                    baseMonster = userMonster;
                    $scope.userMonster = templateService.createTemplatedMonster(userMonster);

                    if ($routeParams.userMonsterId) {
                        $rootScope.globalTitle = "Chronicle Forge - " + $scope.userMonster.Name;
                    }
                    $scope.pending = false;

                    var update = throttle(updateUserResource, 1000);
                    var userMonsterUpdated = throttle(contentTreeService.userMonsterUpdated, 1000);

                    $scope.$watch("userMonster.templates", function (value) {
                        $scope.userMonster = templateService.createTemplatedMonster(baseMonster);
                        baseMonster.templates = $scope.userMonster.templates;
                        update(baseMonster);
                        userMonsterUpdated($scope.userMonster);
                    }, true /* deep equality */);
                }, function (error) {
                    return console.log(error);
                });
            }

            loadMonster();
        }
    ]);