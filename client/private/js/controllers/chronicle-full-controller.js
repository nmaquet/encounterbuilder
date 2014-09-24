// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ChronicleFullController', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
        $http.get("api/chronicle-full/" + $routeParams.userResourceId).success(function (result) {
            $scope.chronicle = result;
        }).error(function (error) {
            console.log(error);
        });
    }
]);