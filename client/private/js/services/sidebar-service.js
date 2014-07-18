'use strict';

DEMONSQUID.encounterBuilderServices.factory('sidebarService', [ 'viewportService', 'LeftSidebarTabModel',

    function (viewportService, LeftSidebarTabModel) {

        var viewport = viewportService.viewport;

        var leftSidebarOpened = !viewport.xs;
        var rightSidebarOpened = viewport.lg;
        var selectedTab = "monsters";

        function viewportOverride() {
            if (!viewport.xs) {
                leftSidebarOpened = true;
            }
            if (viewport.xs && leftSidebarOpened && rightSidebarOpened) {
                rightSidebarOpened = false;
            }
            if (viewport.md || viewport.sm) {
                rightSidebarOpened = false;
            }
        }

        viewportService.register(function () {
            viewportOverride();
        });

        return {
            selectedTab: selectedTab,
            closeSidebars: function () {
                leftSidebarOpened = rightSidebarOpened = false;
            },
            leftSidebarOpened: {
                get: function () {
                    return leftSidebarOpened;
                },
                toggle: function () {
                    leftSidebarOpened = !leftSidebarOpened;
                    viewportOverride();
                }, openAndSelectTab: function (tab) {
                    LeftSidebarTabModel.selectedTab = tab;

                    if (!leftSidebarOpened) {
                        leftSidebarOpened = true;
                        viewportOverride();
                    }

                }
            },
            rightSidebarOpened: {
                get: function () {
                    return rightSidebarOpened;
                },
                toggle: function () {

                    rightSidebarOpened = !rightSidebarOpened;
                    viewportOverride();
                }
            }
        };
    }]);