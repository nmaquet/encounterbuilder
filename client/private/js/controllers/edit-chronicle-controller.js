// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EditChronicleController', ['$scope','$controller',
    function ($scope,$controller) {
        angular.extend(this, $controller('EditUserResourceController', {$scope: $scope}));
    }
]);