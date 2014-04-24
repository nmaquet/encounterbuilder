"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ContentController', ['$scope', 'selectedContentTypeService',
    function ($scope, selectedContentTypeService) {
        selectedContentTypeService.register(function() {
            $scope.contentType = selectedContentTypeService.selectedContentType();
        });
    }
]);