'use strict';

DEMONSQUID.encounterBuilderServices.factory('httpInterceptorService', ['$q', '$window',
    function ($q, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
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