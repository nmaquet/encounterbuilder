// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderServices.factory('httpInterceptorService', ['$q', '$window',
    function ($q, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                var token = $window.sessionStorage.token || $window.localStorage.token;
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            'responseError': function (rejection) {
                if (rejection.status === 401) {
                    $window.location.href = "/?promptLogin=true";
                }
                return $q.reject(rejection);
            }
        };
    }]);