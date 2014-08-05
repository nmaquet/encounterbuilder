// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderServices.factory('userNpcService', ['$http', '$cacheFactory', function ($http, $cacheFactory) {

    var httpCache = $cacheFactory.get('$http');

    function nop() {
    }

    return {
        get: function (id, callback) {
            callback = callback || nop;
            $http.get('/api/user-npc/' + id, {cache: true})
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                    }
                    callback(response.error, response.userNpc);
                })
                .error(function (error) {
                    callback(error);
                });
        },
        create: function (callback) {
            callback = callback || nop;
            $http.post('/api/create-user-npc')
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                    }
                    callback(response.error, response.userNpc);
                })
                .error(function (response) {
                    console.log("post of npc failed !");
                    callback(response.error);
                });
        },
        copy: function (id, userCreated, callback) {
            callback = callback || nop;
            $http.post('/api/copy-npc', {id: id, userCreated: userCreated})
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                    }
                    callback(response.error, response.userNpc);
                })
                .error(function (response) {
                    console.log("post of npc failed !");
                    callback(response.error);
                });
        },
        update: function (userNpc, callback) {
            callback = callback || nop;
            httpCache.put('/api/user-npc/' + userNpc._id, { userNpc: userNpc });
            $http.post('/api/update-user-npc', { userNpc: userNpc })
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                    }
                    callback(response.error);
                })
                .error(function (response) {
                    console.log("post of userNpc failed !");
                    callback(response.error);
                });
        },
        delete: function (userNpc, callback) {
            callback = callback || nop;
            httpCache.remove('/api/user-npc/' + userNpc._id);
            $http.post('/api/delete-user-npc', { userNpc: userNpc })
                .success(function (response) {
                    if (response.error) {
                        console.log(response.error);
                    }
                    callback(response.error);
                })
                .error(function (response) {
                    console.log("delete of userNpc failed !");
                    callback(response.error);
                });
        },
        getMultiple: function (ids, callback) {
            function pushTask(id) {
                tasks.push(function (taskCallback) {
                    $http.get('/api/user-npc/' + id, {cache: true})
                        .success(function (data) {
                            taskCallback(null, data.userNpc);
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