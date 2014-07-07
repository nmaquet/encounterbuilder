"use strict";

DEMONSQUID.encounterBuilderControllers.controller('TutorialController', ['$scope', '$timeout', 'viewportService',
    function($scope, $timeout, viewportService) {
        var TEMPLATE = '<div class="popover tutorial-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';

        if (!viewportService.viewport.lg) {
            return;
        }

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

        $timeout(function() {
            createPopover($('#create-dropdown'), "right", "Use this dropdown to create new content.");
            createPopover($('#left-sidebar'), "right", "Organize your content here using binders. Drag & drop to move things around.");
            createPopover($('#search-tabs'), "right", "Use these tabs to switch between your Library, Favourites, and Database.");
            createPopover($('#right-sidebar'), "left", "Access the database from anywhere using this sidebar.");
            createPopover($('.icon-plus').first(), "left", "Use these buttons to add monsters, NPC's, and items to encounters.");
            createPopover($('#database-tabs'), "left", "Use these tabs to switch between Monsters, NPC's, Items, Spells and Feats.");
            $(popovers).popover('toggle');
        }, 1000);

        $scope.$on("$locationChangeStart", function() {
            $(popovers).popover('destroy');
            $('.popover.tutorial-popover').remove();
        });

        viewportService.register(function() {
            if (!viewportService.viewport.lg) {
                $(popovers).popover('destroy');
            }
        });
    }
]);