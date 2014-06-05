'use strict';

DEMONSQUID.encounterBuilderServices.factory('monsterService', ['$http', function ($http) {
    var lastSearchParam = null;
    var lastSearchResults = null;
    return {
        search: function (params, callback) {
            if (lastSearchResults && JSON.stringify(params) === JSON.stringify(lastSearchParam)) {
                callback(null, lastSearchResults);
                return;
            }
            var now = new Date().getTime();
            $http.get('/api/search-monsters/', {params: params})
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
            $http.get('/api/monster/' + id)
                .success(function (data) {
                    callback(data.error, data.monster);
                })
                .error(function (error) {
                    callback(error, null);
                });
        },
        getMultiple: function (ids, callback) {
            function pushTask(id) {
                tasks.push(function (taskCallback) {
                        $http.get('/api/monster/' + id)
                            .success(function (data) {
                                taskCallback(null, data.monster);
                            })
                            .error(function (error) {
                                taskCallback(error, null);
                            });
                    }
                );
            }

            var tasks = [];
            for (var i in ids) {
                pushTask(ids[i]);
            }
            window.async.parallel(tasks, function (error, results) {
                callback(error, results);
            });
        }
    };
}]);