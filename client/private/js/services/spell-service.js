'use strict';

DEMONSQUID.encounterBuilderServices.factory('spellService', ['$http', function ($http) {
    var lastSearchParam = null;
    var lastSearchResults = null;
    var spells = null;
    $http.get('/api/search-spells/', {params: {findLimit: 2000}})
        .success(function (data) {
            spells = {names: []};
            for (var i in data.spells) {
                spells.names.push(data.spells[i].name);
                spells[data.spells[i].name.toLowerCase()] = data.spells[i].id;
            }
            /* we need to have longest names first so that they get matched in priority in the linkify directive */
            /* e.g. "Accursed Hex" needs to be before "Accursed" */
            spells.names.sort();
            spells.names.reverse();
        });
    return {
        lastSearchParam: function(){return lastSearchParam;},
        spells: function () {
            return spells;
        },
        search: function (params, callback) {
            if (lastSearchResults && JSON.stringify(params) === JSON.stringify(lastSearchParam)) {
                callback(null, lastSearchResults);
                return;
            }
            var now = new Date().getTime();
            $http.get('/api/search-spells/', {params: params})
                .success(function (data) {
                    lastSearchParam = params;
                    lastSearchResults = data;
                    data["timestamp"] = now;
                    callback(data.error, data);
                })
                .error(function (error) {
                    callback(error, null);
                });
        },
        get: function (id, callback) {
            $http.get('/api/spell/' + id, {cache: true})
                .success(function (data) {
                    callback(data.error, data.spell);
                })
                .error(function (error) {
                    callback(error, null);
                });
        }
    };
}]);