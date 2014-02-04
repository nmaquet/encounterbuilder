"use strict";

DEMONSQUID.encounterBuilderControllers.controller('LogoutController',
    ['$scope', '$rootScope', '$http', '$location', '$route', '$timeout',
        function ($scope, $rootScope, $http, $location, $route, $timeout) {
            $scope.logout = function () {
                $http.get("/logout").success(function () {
                    delete $rootScope.username;
                    window.location.reload();
                });
            };
        }
    ]);