"use strict";

DEMONSQUID.encounterBuilderControllers.controller('TutorialController', ['$scope', '$timeout', function($scope, $timeout) {

    var popovers = [];
    var popoverIndex = 0;

    var template = "<div class='row'> " +
                   "    <div class='col'>" +
                   "        <p>TEXT</p>"+
                   "    </div>" +
                   "</div>" +
                   "<div class='row'> " +
                   "    <div class='col'>" +
                   "        <div class='container'>" +
                   "            <button class='btn tutorial-previous-btn'>previous</button> " +
                   "            <button class='btn tutorial-next-btn'>next</button>" +
                   "        </div>" +
                   "    </div>" +
                   "</div>";

    function createPopover(element, placement, text) {
        var p = element.popover({
            html: true,
            title: '',
            content: template.replace('TEXT', text),
            placement: placement,
            trigger: 'manual',
            container: '#tutorial'
        });
        popovers.push(p);
    }

    function previous() {
        popovers[popoverIndex].popover('toggle');
        popoverIndex -= 1;
        if (popoverIndex === -1) {
            popoverIndex = popovers.length - 1;
        }
        popovers[popoverIndex].popover('toggle');
        $(".tutorial-previous-btn").click(previous);
        $(".tutorial-next-btn").click(next);
    }

    function next() {
        popovers[popoverIndex].popover('toggle');
        popoverIndex += 1;
        popoverIndex %= popovers.length;
        popovers[popoverIndex].popover('toggle');
        $(".tutorial-previous-btn").click(previous);
        $(".tutorial-next-btn").click(next);
    }

    $timeout(function() {
        createPopover($('#create-dropdown'), "right", "Use this dropdown to create new content.");
        createPopover($('#left-sidebar'), "right", "Organize your content here using binders. Drag & drop to move things around.");
        createPopover($('#search-tabs'), "right", "Use these tabs to switch between your Library, Favourites, and Database.");
        createPopover($('#right-sidebar'), "left", "Access the database from anywhere using this sidebar.");
        createPopover($('.icon-plus').first(), "left", "Use these buttons to add monsters, NPC's, and items to encounters.");
        popovers[popoverIndex].popover('toggle');
        $(".tutorial-previous-btn").click(previous);
        $(".tutorial-next-btn").click(next);
    }, 1000);

    $scope.$on("$locationChangeStart", function() {
        $(popovers).popover('destroy');
    });
}]);