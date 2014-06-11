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

        $rootScope.go = function (type, id) {

            //FIXME This feels like a completely stupid way of doing this, but right now it's all my brain seems to be able to do...

            if ($scope.tabletWidthOrLarger && $location.path() !== "/") {
                if (type === 'binder') {
                    $location.path("/" + type + "/" + id);
                }
                else {
                    var params = $location.path().split('/');
                    if (type === 'encounter') {
                        params[1] = type;
                        params[2] = id;

                    }
                    else {
                        if (params[1] === 'encounter' && params.length === 3) {
                            params.push(type);
                            params.push(id);
                        } else {
                            params[params.length - 2] = type;
                            params[params.length - 1] = id;
                        }
                    }
                    $location.path(params.join("/"));
                }
            }
            else {
                $location.path("/" + type + "/" + id);
            }
        };

        slideRightAfterPageLoad();
    }
]);