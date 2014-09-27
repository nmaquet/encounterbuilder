// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

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

        redirect(); /* TODO: check if chronicle has loaded first */
    }]
);