// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderServices.factory('userMonsterService', ['$http', '$cacheFactory', function ($http, $cacheFactory) {

    var httpCache = $cacheFactory.get('$http');

    function nop() {
    }

    return {
        get: function (id, callback) {
            callback = callback || nop;
            $http.get('/api/user-monster/' + id, {cache: true})
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                    }
                    callback(response.error, response.userMonster);
                })
                .error(function (error) {
                    callback(error);
                });
        },
        create: function (callback) {
            callback = callback || nop;
            $http.post('/api/create-user-monster')
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                    }
                    callback(response.error, response.userMonster);
                })
                .error(function (response) {
                    console.log("post of monster failed !");
                    callback(response.error);
                });
        },
        copy: function (id, userCreated, callback) {
            callback = callback || nop;
            $http.post('/api/copy-monster', {id: id, userCreated: userCreated})
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                    }
                    callback(response.error, response.userMonster);
                })
                .error(function (response) {
                    console.log("post of monster failed !");
                    callback(response.error);
                });
        },
        update: function (userMonster, callback) {
            callback = callback || nop;
            httpCache.put('/api/user-monster/' + userMonster._id, { userMonster: userMonster });
            $http.post('/api/update-user-monster', { userMonster: userMonster })
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                    }
                    callback(response.error);
                })
                .error(function (response) {
                    console.log("post of userMonster failed !");
                    callback(response.error);
                });
        },
        delete: function (userMonster, callback) {
            callback = callback || nop;
            httpCache.remove('/api/user-monster/' + userMonster._id);
            $http.post('/api/delete-user-monster', { userMonster: userMonster })
                .success(function (response) {
                    if (response.error) {
                        console.log(response.error);
                    }
                    callback(response.error);
                })
                .error(function (response) {
                    console.log("delete of userMonster failed !");
                    callback(response.error);
                });
        },
        getMultiple: function (ids, callback) {
            function pushTask(id) {
                tasks.push(function (taskCallback) {
                        $http.get('/api/user-monster/' + id, {cache: true})
                            .success(function (data) {
                                taskCallback(null, data.userMonster);
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