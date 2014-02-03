"use strict";

DEMONSQUID.encounterBuilderControllers.controller('LoginController', ['$scope', '$rootScope', '$http', '$location',
    function ($scope, $rootScope, $http, $location) {
        $scope.loginFailed = false;
        $scope.submit = function () {
            var data = {
                username: $scope.username,
                password: $scope.password
            }
            $http.post("/login", data).success(function (response) {
                if (response.error) {
                    $scope.loginFailed = true;
                } else {
                    $location.path('/monsters');
                }
            });
        };
    }
]);
