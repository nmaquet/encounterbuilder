"use strict";

DEMONSQUID.encounterBuilderControllers.controller('MainController', ['$scope', '$rootScope', '$window', '$location', 'sidebarService', 'viewportService',
    function ($scope, $rootScope, $window, $location, sidebarService, viewportService) {

        var viewport = $rootScope.viewport = viewportService.viewport;

        $rootScope.back = function (path) {
            if (path) {
                $location.url(path);
            } else {
                $window.history.back();
            }
            if (viewport.xs) {
                sidebarService.closeSidebars();
            }
        };

        $rootScope.go = function (type, id) {

            //FIXME This feels like a completely stupid way of doing this, but right now it's all my brain seems to be able to do...

            if (!viewport.xs && $location.path() !== "/") {
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

            if (viewport.xs) {
                sidebarService.closeSidebars();
            }
        };

        $scope.toggleLeftSidebar = function () {
            sidebarService.leftSidebarOpened.toggle();
        };

        $scope.toggleRightSidebar = function () {
            sidebarService.rightSidebarOpened.toggle();
        };

        $scope.anySidebarIsOpened = function () {
            return sidebarService.leftSidebarOpened.get() || sidebarService.rightSidebarOpened.get();
        };

        $scope.leftSidebarIsOpened = function () {
            return sidebarService.leftSidebarOpened.get();
        };

        $scope.rightSidebarIsOpened = function () {
            return sidebarService.rightSidebarOpened.get();
        };

        $scope.swipeRight = function () {
            var rightSidebarOpened = sidebarService.rightSidebarOpened.get();
            var leftSidebarClosed = !sidebarService.leftSidebarOpened.get();
            if (rightSidebarOpened) {
                sidebarService.rightSidebarOpened.toggle(); // close right sidebar
            } else if (leftSidebarClosed) {
                sidebarService.leftSidebarOpened.toggle(); // open left sidebar
            }
        };

        $scope.swipeLeft = function () {
            var leftSidebarOpened = sidebarService.leftSidebarOpened.get();
            var rightSidebarClosed = !sidebarService.rightSidebarOpened.get();
            if (leftSidebarOpened) {
                sidebarService.leftSidebarOpened.toggle(); // close left sidebar
            } else if (rightSidebarClosed) {
                sidebarService.rightSidebarOpened.toggle(); // open right sidebar
            }
        };
    }
]);