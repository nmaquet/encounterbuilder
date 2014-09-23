// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EditChronicleController', ['$scope','$controller','$window',
    function ($scope,$controller,$window) {
        angular.extend(this, $controller('EditUserResourceController', {$scope: $scope}));
        $scope.delete = function(){
            if ($scope.userResource.name === $scope.confirmName){
                console.log("delete chronicle");
                $scope.userResource.$delete(function(){
                    $window.location.reload(true);
                });
            }
        }
    }
]);