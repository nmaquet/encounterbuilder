// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ChroniclesController', ['$scope', 'ChronicleResource',
    function ($scope, ChronicleResource) {
        $scope.chronicles = ChronicleResource.query();
    }
]);
