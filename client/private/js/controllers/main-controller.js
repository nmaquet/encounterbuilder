"use strict";

DEMONSQUID.encounterBuilderControllers.controller('MainController', ['$scope', '$rootScope', '$window', '$location', '$timeout', '$animate',
    function ($scope, $rootScope, $window, $location, $timeout, $animate) {

        $scope.tabletWidthOrLarger = $(window).width() > 767;
        $rootScope.tabletWidthOrLarger = $scope.tabletWidthOrLarger;

        if ($scope.tabletWidthOrLarger) {
            $animate.enabled(false);
        }

        function slideRightAfterPageLoad() {
            $timeout(function () {
                $scope.routeChangeTransition = 'slide-right';
            }, 1500);
        }

        $rootScope.back = function (path) {
            if (path) {
                $location.url(path);
            } else {
                $window.history.back();
            }
        };

        $rootScope.go = function (path) {
            $scope.routeChangeTransition = 'slide-left';
            $location.url(path);
            slideRightAfterPageLoad();
        };

        slideRightAfterPageLoad();
    }
]);