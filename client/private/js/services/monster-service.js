'use strict';

DEMONSQUID.encounterBuilderServices.factory('monsterService', ['$http', function ($http) {
    return {
        search: function (params, callback) {
            var now = new Date().getTime();
            $http.get('/api/search-monsters/', {params: params})
                .success(function (data) {
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
            var tasks = [];
            for (var i in ids) {
                tasks.push(function (taskCallback) {
                    $http.get('/api/monster/' + ids[i])
                        .success(function (data) {
                            console.log("success " + data);
                            taskCallback(null, data.monster);
                        })
                        .error(function (error) {
                            taskCallback(error, null);
                        });
                })
            }
            window.async.parallel(tasks, function (error, results) {
                console.log("final parallel callback " + results + "error " + error);
                callback(error, results);
            });
        }
    };
}]);
