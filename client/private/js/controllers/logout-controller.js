"use strict";

DEMONSQUID.encounterBuilderControllers.controller('LogoutController',
    ['$scope', '$rootScope', '$http', '$window',
        function ($scope, $rootScope, $http, $window) {
            $scope.logout = function () {
                delete $window.sessionStorage.token;
                $window.location.href = '/';
            };
        }
    ]);