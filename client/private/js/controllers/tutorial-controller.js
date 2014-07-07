"use strict";

DEMONSQUID.encounterBuilderControllers.controller('TutorialController', ['$scope', '$timeout', 'viewportService', 'sidebarService',
    function($scope, $timeout, viewportService, sidebarService) {
        var TEMPLATE = '<div class="popover tutorial-popover is-pointer" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';

        var popovers = [];

        function createPopover(element, placement, text) {
            var p = element.popover({
                title: '',
                content: text,
                placement: placement,
                trigger: 'manual',
                container: 'body',
                template: TEMPLATE
            });
            popovers.push(p);
        }

        $timeout(function() {
            $("#campaignsTab").click();
            $("#monstersTab").click();
        });

        function createDesktopPopovers() {
            createPopover($('#create-dropdown'), "right", "Use this dropdown to create new content.");
            createPopover($('#left-sidebar'), "right", "Organize your content here using binders. Drag & drop to move things around.");
            createPopover($('#search-tabs'), "right", "Use these tabs to switch between your Library, Favourites, and Database.");
            createPopover($('#right-sidebar'), "left", "Access the database from anywhere using this sidebar.");
            createPopover($('.icon-plus').first(), "left", "Use these buttons to add monsters, NPC's, and items to encounters.");
            createPopover($('#database-tabs'), "left", "Use these tabs to switch between Monsters, NPC's, Items, Spells and Feats.");
            createPopover($('#example-monster-copy-btn'), "left", "Copy");
            createPopover($('#example-monster-favourite-btn'), "bottom", "Favourite");
            createPopover($('#example-monster-edit-btn'), "top", "Edit");
            createPopover($('#example-monster-delete-btn'), "right", "Delete");
        }

        function createPhonePopovers() {
            createPopover($('#open-sidebar-and-select-db-tab'), "bottom", "Use these to access your Library, Favourites, and Database.");
            createPopover($('#example-monster-delete-btn'), "bottom", "Use these to Copy, Edit, Favourite, and Delete.");
            createPopover($('#left-tutorial-popover-anchor'), "right", "Swipe right to access your Library, Favourites, and Database.");
            createPopover($('#right-tutorial-popover-anchor'), "left", "Swipe left to the Database.");
        }

        function destroyAndRemovePopovers() {
            $(popovers).popover('destroy');
            $('.popover.tutorial-popover').remove();
        }

        function createPopovers() {
            if (viewportService.viewport.lg) {
                createDesktopPopovers();
            } else if (viewportService.viewport.xs || viewportService.viewport.sm) {
                createPhonePopovers();
            }
            $(popovers).popover('toggle');
            $('.popover.tutorial-popover').click(function (event) {
                $(event.currentTarget).remove();
            });
        }

        $timeout(function() {
            createPopovers();
        }, 1000);

        $scope.$on("$locationChangeStart", function() {
            destroyAndRemovePopovers();
        });

        if (viewportService.viewport.lg) {
            $scope.$watch(sidebarService.rightSidebarOpened.get, function (opened) {
                if (!opened) {
                    destroyAndRemovePopovers();
                }
            });
        }
        else if (viewportService.viewport.xs || viewportService.viewport.sm) {
            $scope.$watch(sidebarService.leftSidebarOpened.get, function (opened) {
                if (opened) {
                    destroyAndRemovePopovers();
                }
            });
            $scope.$watch(sidebarService.rightSidebarOpened.get, function (opened) {
                if (opened) {
                    destroyAndRemovePopovers();
                }
            });
        }
    }
]);