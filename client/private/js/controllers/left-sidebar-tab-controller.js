// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderServices.factory('LeftSidebarTabModel', function () {
    return {
        selectedTab: 'campaigns'
    }
});

DEMONSQUID.encounterBuilderControllers.controller('LeftSidebarTabController', ['$scope', '$http', 'LeftSidebarTabModel', 'userResourceService',
    function ($scope, $http, model, userResourceService) {

        $scope.selectedTab = model.selectedTab;

//        $http.get('/api/chronicle')
//            .success(function (data) {
//                if (data.chronicle) {
//                    $scope.chronicles = data.chronicle;
//                }
//            })
//            .error(function (error) {
//                console.log(error);
//            });

        $scope.chronicles = userResourceService["chronicle"].query();
        console.log($scope.chronicles);

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