"use strict";

DEMONSQUID.encounterBuilderControllers.controller('TutorialController', ['$scope', '$timeout', function($scope, $timeout) {
    var popovers = [];

    var template = "<div class='row'> " +
                   "    <div class='col'>" +
                   "        <p>{{tutorialText}}</p>"+
                   "    </div>" +
                   "</div>" +
                   "<div class='row'> " +
                   "    <div class='col'>" +
                   "        <div class='container'>" +
                   "            <button class='btn'>previous</button> <button class='btn'>next</button>" +
                   "        </div>" +
                   "    </div>" +
                   "</div>"

    function popover(element, placement, text) {
        popovers.push(element.popover({
            html: true,
            title: '',
            content: template,
            placement: placement,
            trigger: 'manual',
            container: '#tutorial'
        }));
    }

    $timeout(function() {
        popover($('#create-dropdown'), "right", "Use this dropdown to create new content.");
        popover($('#left-sidebar'), "right", "Organize your content here using binders. Drag & drop to move things around.");
        popover($('#search-tabs'), "right", "Use these tabs to switch between your Library, Favourites, and Database.");
        popover($('#right-sidebar'), "left", "Access the database from anywhere using this sidebar.");
        popover($('.icon-plus').first(), "left", "Use these buttons to add monsters, NPC's, and items to encounters.");
        $(popovers).popover('toggle');
    }, 1000);

    $scope.$on("$locationChangeStart", function() {
        $(popovers).popover('destroy');
    });
}]);