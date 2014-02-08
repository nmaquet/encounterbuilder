'use strict';

DEMONSQUID.encounterBuilderServices.factory('itemService', ['$http', function ($http) {
    return {
        /* FIXME: we should implement some throttling at some point */
        search: function (params, callback) {
            $http.get('/api/search-magic-items/', {params : params})
                .success(function (data) {
                    callback(null, data);
                })
                .error(function (error) {
                    callback(error, null);
                });
        },
        get: function (id, callback) {
            $http.get('/api/magic-item/' + id)
                .success(function (data) {
                    callback(null, data.magicItem);
                })
                .error(function (error) {
                    callback(error.error, null);
                });
        }
    };
}]);
