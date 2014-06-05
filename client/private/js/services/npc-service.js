'use strict';

DEMONSQUID.encounterBuilderServices.factory('npcService', ['$http', function ($http) {
    var lastSearchParam = null;
    var lastSearchResults = null;
    return {
        search: function (params, callback) {
            if (params.maxCR >= 20) {
                params.maxCR = 40;
            }
            if (lastSearchResults && JSON.stringify(params) === JSON.stringify(lastSearchParam)) {
                callback(null, lastSearchResults);
                return;
            }
            var now = new Date().getTime();

            $http.get('/api/search-npcs/', {params: params})
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
            $http.get('/api/npc/' + id)
                .success(function (data) {
                    callback(data.error, data.npc);
                })
                .error(function (error) {
                    callback(error, null);
                });
        },
        getMultiple: function (ids, callback) {
            function pushTask(id) {
                tasks.push(function (taskCallback) {
                        $http.get('/api/npc/' + id)
                            .success(function (data) {
                                taskCallback(null, data.npc);
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