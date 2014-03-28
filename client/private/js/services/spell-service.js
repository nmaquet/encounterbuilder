'use strict';

DEMONSQUID.encounterBuilderServices.factory('spellService', ['$http', function ($http) {
    var spells = null;
    $http.get('/api/search-spells/', {params: {findLimit: 2000}})
        .success(function (data) {
            spells = {names: []};
            for (var i in data.spells) {
                spells.names.push(data.spells[i].name);
                spells[data.spells[i].name.toLowerCase()] = data.spells[i].id;
            }
        });
    return {
        spells: function () {
            return spells;
        },
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