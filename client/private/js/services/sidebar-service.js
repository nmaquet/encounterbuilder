'use strict';

DEMONSQUID.encounterBuilderServices.factory('sidebarService', [ 'viewportService',
    
    function (viewportService) {

        var viewport = viewportService.viewport;

        var leftSidebarOpened = !viewport.xs;
        var rightSidebarOpened = viewport.lg;
        var selectedTab = "monsters";

        function viewportOverride() {
            if (!viewport.xs) {
                leftSidebarOpened = true;
            }
        }

        viewportService.register(function(){
            viewportOverride();
        });

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
                    viewportOverride();
                }
            },
            rightSidebarOpened: {
                get: function() {
                    return rightSidebarOpened;
                },
                toggle: function() {
                    rightSidebarOpened = !rightSidebarOpened
                    viewportOverride();
                }
            }
        };
    }]);