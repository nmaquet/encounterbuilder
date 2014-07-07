'use strict';

DEMONSQUID.encounterBuilderServices.factory('itemService', ['$http', function ($http) {
    var lastSearchParam = null;
    var lastSearchResults = null;
    return {
        lastSearchParam: function(){return lastSearchParam;},
        /* FIXME: we should implement some throttling at some point */
        search: function (params, callback) {
            if (lastSearchResults && JSON.stringify(params) === JSON.stringify(lastSearchParam)) {
                callback(null, lastSearchResults);
                return;
            }
            $http.get('/api/search-magic-items/', {params : params})
                .success(function (data) {
                    lastSearchParam = params;
                    lastSearchResults = data;
                    callback(null, data);
                })
                .error(function (error) {
                    callback(error, null);
                });
        },
        get: function (id, callback) {
            $http.get('/api/magic-item/' + id, {cache: true})
                .success(function (data) {
                    callback(null, data.magicItem);
                })
                .error(function (error) {
                    callback(error.error, null);
                });
        }
    };
}]);
