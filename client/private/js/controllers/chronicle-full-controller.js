// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ChronicleFullController', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
        $scope.templateControlsCollapsed = true;
        $scope.pending = true;
        $http.get("api/chronicle-full/" + $routeParams.chronicleId).success(function (result) {
            $scope.chronicle = result;
            $scope.pending = false;
        }).error(function (error) {
            $scope.pending = false;
            console.log(error);
        });
    }
]);