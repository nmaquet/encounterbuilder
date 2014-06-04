"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ContentController', ['$scope', 'sidebarService',
    function ($scope, sidebarService) {
        $scope.leftSidebarOpened = sidebarService.leftSidebarOpened;
        $scope.rightSidebarOpened = sidebarService.rightSidebarOpened;
        $scope.toggleLeftSidebar = function () {
            sidebarService.leftSidebarOpened = $scope.leftSidebarOpened = !$scope.leftSidebarOpened;
        };
        $scope.toggleRightSidebar = function () {
            sidebarService.rightSidebarOpened = $scope.rightSidebarOpened = !$scope.rightSidebarOpened;
        };
    }
]);