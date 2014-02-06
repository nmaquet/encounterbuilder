'use strict';

DEMONSQUID.encounterBuilderServices.factory('itemService', ['$http', function ($http) {
    return {
        search: function (params, callback) {
            var now = new Date().getTime();
            $http.get('/api/search-magic-items/', {params : params})
                .success(function (data) {
                    data["timestamp"] = now;
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
