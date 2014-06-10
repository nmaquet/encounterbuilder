"use strict";

DEMONSQUID.encounterBuilderControllers.controller('MainController', ['$scope', '$rootScope', '$window', '$location',
    function ($scope, $rootScope, $window, $location) {
        $scope.routeChangeTransition = '';
        $rootScope.back = function (path) {
            $scope.routeChangeTransition = 'slide-right';
            if (path) {
                $location.url(path);
            } else {
                $window.history.back();
            }
        };
        $rootScope.go = function (path) {
            $scope.routeChangeTransition = 'slide-left';
            $location.url(path);
        }
    }]);