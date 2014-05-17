"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ContentController', ['$scope', 'selectedContentTypeService',
    function ($scope, selectedContentTypeService) {
        $scope.openSidebar = true;
        selectedContentTypeService.register(function () {
            $scope.contentType = selectedContentTypeService.selectedContentType();
        });
        $scope.toggleSidebar = function () {
            $scope.openSidebar = !$scope.openSidebar;
        }
    }
]);