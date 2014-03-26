'use strict';

DEMONSQUID.encounterBuilderServices.factory('spellService', ['$http', function ($http) {
    return {
        search: function (params, callback) {
            var now = new Date().getTime();
            $http.get('/api/search-spells/', {params: params})
                .success(function (data) {
                    data["timestamp"] = now;
                    callback(data.error, data);
                })
                .error(function (error) {
                    callback(error, null);
                });
        },
        get: function (id, callback) {
            $http.get('/api/spell/' + id)
                .success(function (data) {
                    callback(data.error, data.spell);
                })
                .error(function (error) {
                    callback(error, null);
                });
        }
    };
}]);