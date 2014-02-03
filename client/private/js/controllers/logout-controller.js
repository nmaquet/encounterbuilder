"use strict";

DEMONSQUID.encounterBuilderControllers.controller('LogoutController', ['$scope', '$rootScope', '$http', '$location',
    function ($scope, $rootScope, $http, $location) {
        $scope.logout = function () {
            $http.get("/logout").success(function () {
                delete $rootScope.username;
                $location.path('/login');
            });
        };
    }
]);