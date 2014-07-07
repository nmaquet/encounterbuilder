"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ContentController', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.contentType = $routeParams.type;
    }
]);