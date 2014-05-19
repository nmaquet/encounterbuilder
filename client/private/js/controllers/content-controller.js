"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ContentController', ['$scope', 'selectedContentTypeService', 'contentTreeService',
    function ($scope, selectedContentTypeService, contentTreeService) {
        $scope.openSidebar = true;
        selectedContentTypeService.register(function () {
            $scope.contentType = selectedContentTypeService.selectedContentType();
        });
        $scope.toggleSidebar = function () {
            $scope.openSidebar = !$scope.openSidebar;
        };
    }
]);