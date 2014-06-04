"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ContentController', ['$scope', 'contentTreeService',
    function ($scope, contentTreeService) {
        $scope.leftSidebarOpened = true;
        $scope.rightSidebarOpened = true;
        $scope.toggleLeftSidebar = function () {
            $scope.leftSidebarOpened = !$scope.leftSidebarOpened;
        };
        $scope.toggleRightSidebar = function () {
            $scope.rightSidebarOpened = !$scope.rightSidebarOpened;
        };
    }
]);