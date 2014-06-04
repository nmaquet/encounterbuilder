"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ContentController', ['$scope', 'sidebarService',
    function ($scope, sidebarService) {

        $scope.toggleLeftSidebar = function () {
            sidebarService.leftSidebarOpened.toggle();
        };

        $scope.toggleRightSidebar = function () {
            sidebarService.rightSidebarOpened.toggle();
        };
    }
]);