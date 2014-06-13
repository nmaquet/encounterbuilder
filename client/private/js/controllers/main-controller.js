"use strict";

DEMONSQUID.encounterBuilderControllers.controller('MainController', ['$scope', '$rootScope', '$window', '$location', 'sidebarService', 'viewportService',
    function ($scope, $rootScope, $window, $location, sidebarService, viewportService) {

        var viewport = $rootScope.viewport = viewportService.viewport;

        $rootScope.back = function (url) {
            if (url) {
                $location.url(url);
            } else {
                $window.history.back();
            }
            if (viewport.xs) {
                sidebarService.closeSidebars();
            }
        };

        $rootScope.go = function (url) {
            $location.url(url);
            if (viewport.xs) {
                sidebarService.closeSidebars();
            }
        };

        $scope.toggleLeftSidebar = function () {
            sidebarService.leftSidebarOpened.toggle();
        };

        $scope.toggleRightSidebar = function () {
            sidebarService.rightSidebarOpened.toggle();
        };

        $scope.anySidebarIsOpened = function () {
            return sidebarService.leftSidebarOpened.get() || sidebarService.rightSidebarOpened.get();
        };

        $scope.leftSidebarIsOpened = function () {
            return sidebarService.leftSidebarOpened.get();
        };

        $scope.rightSidebarIsOpened = function () {
            return sidebarService.rightSidebarOpened.get();
        };

        $scope.swipeRight = function () {
            var rightSidebarOpened = sidebarService.rightSidebarOpened.get();
            var leftSidebarClosed = !sidebarService.leftSidebarOpened.get();
            if (rightSidebarOpened) {
                sidebarService.rightSidebarOpened.toggle(); // close right sidebar
            } else if (leftSidebarClosed) {
                sidebarService.leftSidebarOpened.toggle(); // open left sidebar
            }
        };

        $scope.swipeLeft = function () {
            var leftSidebarOpened = sidebarService.leftSidebarOpened.get();
            var rightSidebarClosed = !sidebarService.rightSidebarOpened.get();
            if (leftSidebarOpened) {
                sidebarService.leftSidebarOpened.toggle(); // close left sidebar
            } else if (rightSidebarClosed) {
                sidebarService.rightSidebarOpened.toggle(); // open right sidebar
            }
        };
    }
]);