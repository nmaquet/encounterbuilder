// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ChroniclesController',
    ['$scope', 'ChronicleResource', 'contentTreeService', 'locationService',
        function ($scope, ChronicleResource, contentTreeService, locationService) {

            $scope.chronicles = ChronicleResource.query();

            $scope.createChronicle = function() {
                var newChronicle = new ChronicleResource();
                newChronicle.name = "new Chronicle";
                newChronicle.contentTree = [];
                newChronicle.$save(function (newChronicle) {
                    $scope.selectChronicle(newChronicle);
                });
            };

            $scope.selectChronicle = function(chronicle) {
                locationService.go("/chronicle/" + chronicle._id);
            };
            
        }
    ]);
