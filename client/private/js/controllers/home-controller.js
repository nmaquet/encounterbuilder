"use strict";

DEMONSQUID.encounterBuilderControllers.controller('HomeController',
    ['contentTreeService', function (contentTreeService) {
        function goToFirstNodeOrShowTutorial() {
            contentTreeService.goToFirstNode();
        }
        if (contentTreeService.contentTree()) {
            goToFirstNodeOrShowTutorial();
        }
        else {
            contentTreeService.onLoadSuccess(function () {
                goToFirstNodeOrShowTutorial();
            });
        }
    }]
);