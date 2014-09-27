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
                if ($scope.filter) {
                    $timeout(function () {
                        $("input#filter-chronicle").focus();
                        /*FIXME DOM manipulation in controller is bad*/
                    }, 0);
                }
            };

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