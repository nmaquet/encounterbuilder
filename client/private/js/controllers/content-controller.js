"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ContentController', ['$scope', 'selectedContentTypeService', 'contentTreeService',
    function ($scope, selectedContentTypeService, contentTreeService) {
        $scope.leftSidebarOpened = true;
        $scope.rightSidebarOpened = true;
        selectedContentTypeService.register(function () {
            $scope.contentType = selectedContentTypeService.selectedContentType();
        });
        $scope.toggleLeftSidebar = function () {
            $scope.leftSidebarOpened = !$scope.leftSidebarOpened;
        };
        $scope.toggleRightSidebar = function () {
            $scope.rightSidebarOpened = !$scope.rightSidebarOpened;
        };
    }
]);