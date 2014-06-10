"use strict";

DEMONSQUID.encounterBuilderControllers.controller('NavbarController', ['$scope', '$route', 'sidebarService',
    function ($scope, $route, sidebarService) {

        $scope.toggleLeftSidebar = function () {
            sidebarService.leftSidebarOpened.toggle();
        };

        $scope.toggleRightSidebar = function () {
            sidebarService.rightSidebarOpened.toggle();
        };

        // FIXME
        // $scope.notHome = $route.current.templateUrl !== 'home.html';
    }
]);