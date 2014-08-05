// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('LogoutController',
    ['$scope', '$rootScope', '$http', '$window',
        function ($scope, $rootScope, $http, $window) {
            $scope.logout = function () {
                $window.sessionStorage.removeItem('token');
                $window.localStorage.removeItem('token');
                $window.location.href = '/';
            };
        }
    ]);