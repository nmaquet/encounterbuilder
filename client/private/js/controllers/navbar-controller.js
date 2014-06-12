"use strict";

DEMONSQUID.encounterBuilderControllers.controller('NavbarController', ['$scope', '$rootScope', '$location', 'sidebarService',
    function ($scope, $rootScope, $location, sidebarService) {

        $scope.toggleLeftSidebar = function () {
            sidebarService.leftSidebarOpened.toggle();
        };

        $scope.toggleRightSidebar = function () {
            sidebarService.rightSidebarOpened.toggle();
        };

    }
]);