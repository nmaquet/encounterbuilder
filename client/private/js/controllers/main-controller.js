// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('MainController',
    ['$scope', '$rootScope', '$window', '$location', 'sidebarService', 'viewportService', 'locationService', '$routeParams', 'contentTreeService', /* FIXME */
        function ($scope, $rootScope, $window, $location, sidebarService, viewportService, locationService, $routeParams, contentTreeService) {

            var viewport = $rootScope.viewport = viewportService.viewport;

            $rootScope.back = locationService.back;

            $rootScope.go = locationService.go;
            $scope.schronicles = "'s chronicles";
            if ($location.path() === "/" && $.cookie('lastUrl')) {
                locationService.go($.cookie('lastUrl'));
            }
            function getChronicleName() {
                if (contentTreeService.getChronicle()) {
                    return contentTreeService.getChronicle().name;
                }
            }

            if (contentTreeService.hasLoaded()) {
                $scope.chronicleName = getChronicleName();
                $scope.$watch(getChronicleName, function () {
                    $scope.chronicleName = getChronicleName();
                });
            }
            else {
                contentTreeService.onLoadSuccess(function () {
                    $scope.chronicleName = getChronicleName();
                    $scope.$watch(getChronicleName, function () {
                        $scope.chronicleName = getChronicleName();
                    });
                })
            }

            $scope.goToChronicle = function () {
                locationService.go("/chronicle/" + $routeParams.chronicleId);
            };
            $scope.goToChronicles = function () {
                locationService.go("/chronicles");
            };
            $scope.toggleLeftSidebar = function () {
                sidebarService.leftSidebarOpened.toggle();
            };

            $scope.openLeftSidebarAndSelectTab = function (tab) {
                sidebarService.leftSidebarOpened.openAndSelectTab(tab);
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