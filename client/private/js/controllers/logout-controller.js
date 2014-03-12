"use strict";

DEMONSQUID.encounterBuilderControllers.controller('LogoutController',
    ['$scope', '$rootScope', '$http', '$window',
        function ($scope, $rootScope, $http, $window) {
            $scope.logout = function () {
                delete $rootScope.user;
                $http.post("/logout").success(function () {
                    $window.location.reload();
                });
            };
        }
    ]);