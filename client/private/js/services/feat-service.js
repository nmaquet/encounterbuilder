'use strict';

DEMONSQUID.encounterBuilderServices.factory('featService', ['$http', function ($http) {
    var feats = null;
    $http.get('/api/search-feats/', {params: {findLimit: 2000}})
        .success(function (data) {
            feats = {names: []};
            for (var i in data.feats) {
                feats.names.push(data.feats[i].name);
                feats[data.feats[i].name.toLowerCase()] = data.feats[i].id;
            }
        });
    return {
        feats: function () {
            return feats;
        },
        search: function (params, callback) {
            var now = new Date().getTime();
            $http.get('/api/search-feats/', {params: params})
                .success(function (data) {
                    data["timestamp"] = now;
                    callback(data.error, data);
                })
                .error(function (error) {
                    callback(error, null);
                });
        },
        get: function (id, callback) {
            $http.get('/api/feat/' + id)
                .success(function (data) {
                    callback(data.error, data.feat);
                })
                .error(function (error) {
                    callback(error, null);
                });
        }
    };
}]);