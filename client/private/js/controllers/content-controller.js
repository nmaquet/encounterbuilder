// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ContentController', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.contentType = $routeParams.type;
    }
]);