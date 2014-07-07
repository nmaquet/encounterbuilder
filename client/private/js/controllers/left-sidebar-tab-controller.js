"use strict";

DEMONSQUID.encounterBuilderServices.factory('LeftSidebarTabModel', function () {
    return {
        selectedTab: 'campaigns'
    }
});

DEMONSQUID.encounterBuilderControllers.controller('LeftSidebarTabController', ['$scope', 'LeftSidebarTabModel',
    function ($scope, model) {

        $scope.selectedTab = model.selectedTab;

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