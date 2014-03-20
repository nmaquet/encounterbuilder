'use strict';

DEMONSQUID.encounterBuilderServices.factory('npcService', ['$http', function ($http) {
    return {
        search: function (params, callback) {
            var now = new Date().getTime();
            $http.get('/api/search-npcs/', {params: params})
                .success(function (data) {
                    data["timestamp"] = now;
                    callback(data.error, data);
                })
                .error(function (error) {
                    callback(error, null);
                });
        }
        ,
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