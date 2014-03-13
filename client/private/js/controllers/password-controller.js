"use strict";

DEMONSQUID.encounterBuilderControllers.controller('PasswordController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.close = function () {
            $scope.password = undefined;
            $scope.password1 = undefined;
            $scope.password2 = undefined;
        };
        $scope.save = function () {

            $http.post('/api/change-password', { oldPassword: $scope.password, newPassword: $scope.password1 })
                .success(function (response) {
                    console.log("success");
                    console.log(response);

                })
                .error(function (response) {
                    console.log("error");
                    console.log(response);
                });

        };
    }
]);