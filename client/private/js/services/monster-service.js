'use strict';

DEMONSQUID.encounterBuilderServices.factory('monsterService', ['$http', function ($http) {
    return {
        search: function (params, callback) {
            var now = new Date().getTime();
            $http.get('/api/search-monsters/', {params : params})
                .success(function (data) {
                    data["timestamp"] = now;
                    callback(null, data);
                })
                .error(function (error) {
                    callback(error, null);
                });
        },
        get: function (id, callback) {
            $http.get('/api/monster/' + id)
                .success(function (data) {
                    callback(data.error, data.monster);
                })
                .error(function (error) {
                    callback(error, null);
                });
        }
    };
}]);
