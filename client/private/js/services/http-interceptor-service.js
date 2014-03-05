'use strict';

DEMONSQUID.encounterBuilderServices.factory('httpInterceptorService', ['$q', '$window',
    function ($q, $window) {
        return {
            'responseError': function (rejection) {
                if (rejection.status === 401) {
                    $window.location.href = "/";
                }
                return $q.reject(rejection);
            }
        };
    }]);