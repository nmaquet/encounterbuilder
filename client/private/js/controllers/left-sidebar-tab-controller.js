// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderServices.factory('LeftSidebarTabModel', function () {
    return {
        selectedTab: 'campaigns'
    }
});

DEMONSQUID.encounterBuilderControllers.controller('LeftSidebarTabController',
    ['$scope', '$http', '$timeout', 'LeftSidebarTabModel', 'userResourceService', 'contentTreeService', 'locationService',
        function ($scope, $http, $timeout, model, userResourceService, contentTreeService, locationService) {

            $scope.selectedTab = model.selectedTab;
            $scope.chronicles = userResourceService["chronicle"].query();
            $scope.filter = false;
            $scope.toggleFilterInput = function () {
                $scope.filter = !$scope.filter;
            };


            $scope.selectChronicle = function (chronicleId) {
                contentTreeService.reloadChronicleTree(chronicleId);
                locationService.go("/chronicle/" + chronicleId);
            };
            $scope.createChronicle = function () {
                console.log("create chronicle");
                var newChronicle = new userResourceService["chronicle"]();
                newChronicle.name = "new Chronicle";
                newChronicle.contentTree = [];
                newChronicle.$save(function (newChronicle) {
                    contentTreeService.reloadChronicleTree(newChronicle._id);
                    $scope.chronicles = userResourceService["chronicle"].query();
                    locationService.go("/chronicle/" + newChronicle._id);
                });
            };

            $scope.$watch(contentTreeService.chronicleName, function () {
                if ($scope.chronicleName !== contentTreeService.chronicleName()) {
                    $scope.chronicleName = contentTreeService.chronicleName();
                    $timeout(function () {
                        $scope.chronicles = userResourceService["chronicle"].query();
                    }, 250);

                }
            });

            $scope.$watch(function () {
                return model.selectedTab
            }, function () {
                $scope.selectedTab = model.selectedTab;
            });

            $('#' + $scope.selectedTab + 'Tab').tab('show');

            $scope.selectTab = function (tab) {
                $scope.selectedTab = model.selectedTab = tab;
            };

        }
    ]);