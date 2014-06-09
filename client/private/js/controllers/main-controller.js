"use strict";

DEMONSQUID.encounterBuilderControllers.controller('MainController', ['$scope', '$rootScope', '$window', '$location',
    function ($scope, $rootScope, $window, $location) {
        $scope.slide = '';
        $rootScope.back = function (path) {
            $scope.slide = 'slide-right';
            if (path) {
                $location.url(path);
            } else {
                $window.history.back();
            }
        };
        $rootScope.go = function (path) {
            $scope.slide = 'slide-left';
            $location.url(path);
        }
    }]);