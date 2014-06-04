'use strict';

DEMONSQUID.encounterBuilderServices.factory('sidebarService', [
    function () {

        var leftSidebarOpened = true;
        var rightSidebarOpened = true;

        return {
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