"use strict";

DEMONSQUID.encounterBuilderControllers.controller('LogoutController',
    ['$scope', '$rootScope', '$http', '$window',
        function ($scope, $rootScope, $http, $window) {
            $scope.logout = function () {
                $http.get("/logout").success(function () {
                    delete $rootScope.username;
                    $window.location.reload();
                });
            };
        }
    ]);