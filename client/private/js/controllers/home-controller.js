"use strict";

DEMONSQUID.encounterBuilderControllers.controller('HomeController',
    ['$location', 'contentTreeService', function ($location, contentTreeService) {

        function redirect() {
            if (contentTreeService.hasFirstNode()) {
                contentTreeService.goToFirstNode();
            } else {
                $location.path('/tutorial');
            }
        }

        if (contentTreeService.contentTree()) {
            redirect();
        }
        else {
            console.log("expecting to redirect later");
            contentTreeService.onLoadSuccess(function () {
                redirect();
            });
        }
    }]
);