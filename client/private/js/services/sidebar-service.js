'use strict';

DEMONSQUID.encounterBuilderServices.factory('sidebarService', [
    function () {

        var leftSidebarOpened = true;
        var rightSidebarOpened = false;
        var selectedTab = "monsters";

        return {
            selectedTab: selectedTab,
            closeSidebars: function() {
                leftSidebarOpened = rightSidebarOpened = false;
            },
            leftSidebarOpened: {
                get: function() {
                    return leftSidebarOpened;
                },
                toggle: function() {
                    leftSidebarOpened = !leftSidebarOpened;
                }
            },
            rightSidebarOpened: {
                get: function() {
                    return rightSidebarOpened;
                },
                toggle: function() {
                    rightSidebarOpened = !rightSidebarOpened
                }
            }
        };
    }]);