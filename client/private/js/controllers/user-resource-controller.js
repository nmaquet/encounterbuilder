// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

io = io.connect();

DEMONSQUID.encounterBuilderControllers.controller('UserResourceController',
    ['$rootScope', '$scope', '$routeParams', 'userResourceService', 'contentTreeService', 'locationService', 'socketService',
        function ($rootScope, $scope, $routeParams, userResourceService, contentTreeService, locationService, socketService) {

//            console.log("setting up listener");
//            socketService.on("updateUserResource", function (data) {
//                console.log("received data", data);
//            });
//            console.log("setting up listener done");

            console.log("setting up listener");
            console.log("emitting ready...");
            io.emit('ready');
            io.on('updateUserResource', function (data) {
                $scope.$apply(function () {
                    console.log("received data with id", data._id);
                    if ($scope.userResource._id === data._id) {
                        console.log("updating data!");
                        $scope.userResource.name = data.name;
                    } else {
                        console.log("NOT updating data");
                    }
                });
            });
            console.log("setting up listener done");

            var resourceType = locationService.getResourceType();
            $scope.showButtons = false;
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

            $scope.edit = function () {
                if ($scope.userResource) {
                    locationService.go("/chronicle/" + $routeParams.chronicleId + "/edit-" + resourceType + "/" + ($routeParams.userResourceId || $routeParams.detailsId));
                }
            };

            $scope.copy = function () {
                contentTreeService.copyUserResource($scope.userResource._id, resourceType);
            };

            $scope.userResource = userResourceService[resourceType].get({id: $routeParams.userResourceId || $routeParams.detailsId}, function () {
                $scope.showButtons = true;
            });

            // FIXME: change title !
        }
    ]
);