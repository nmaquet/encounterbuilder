"use strict";

DEMONSQUID.encounterBuilderControllers.controller('LogoutController',
    ['$scope', '$rootScope', '$http',
        function ($scope, $rootScope, $http) {
            $scope.logout = function () {
                $http.get("/logout").success(function () {
                    delete $rootScope.username;
                    window.location.reload();
            });
            };
        }
    ]);