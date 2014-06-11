"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ContentController', ['$scope', '$routeParams', '$rootScope',
    function ($scope, $routeParams, $rootScope) {

        $scope.contentType = $routeParams.type;

        $rootScope.$on('$routeChangeSuccess', function () {
            $scope.contentType = $routeParams.type;
        });
    }
]);