"use strict";

DEMONSQUID.encounterBuilderControllers.controller('TutorialController', ['$scope', function($scope) {

    var popovers = [];

    popovers.push($('#create-dropdown').popover({
       title: '',
       content: "this is the create dropdown",
       placement: "right",
       trigger: 'manual',
       container: 'body'
    }));

    popovers.push($('#main-title').popover({
        title: '',
        content: "this is the main title",
        placement: "right",
        trigger: 'manual',
        container: 'body'
    }));

    for (var i in popovers) {
        popovers[i].popover('toggle');
    }

    $scope.$on("$locationChangeStart", function() {
        for (var i in popovers) {
            popovers[i].popover('destroy');
        }
    });
}]);