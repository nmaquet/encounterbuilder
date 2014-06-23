'use strict';

DEMONSQUID.encounterBuilderServices.factory('userNpcService', ['$http', function ($http) {

    function nop() {
    }

    var lastUserNpc = null;
    var lastUserNpcId = null;

    return {
        get: function (id, callback) {
            callback = callback || nop;
            if (lastUserNpcId && lastUserNpcId === id) {
                return callback(null, lastUserNpc);
            }
            $http.get('/api/user-npc/' + id)
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                        lastUserNpcId = lastUserNpc = null;
                    } else {
                        lastUserNpcId = response.userNpc._id;
                        lastUserNpc = response.userNpc;
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
                        lastUserNpcId = lastUserNpc = null;
                    } else {
                        lastUserNpcId = response.userNpc._id;
                        lastUserNpc = response.userNpc;
                    }
                    callback(response.error, response.userNpc);
                })
                .error(function (response) {
                    console.log("post of npc failed !");
                    callback(response.error);
                });
        },
        copy: function (id, callback) {
            callback = callback || nop;
            $http.post('/api/copy-npc', {id: id})
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                        lastUserNpcId = lastUserNpc = null;
                    } else {
                        lastUserNpcId = response.userNpc._id;
                        lastUserNpc = response.userNpc;
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
            $http.post('/api/update-user-npc', { userNpc: userNpc })
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                        lastUserNpcId = lastUserNpc = null;
                    } else {
//                        lastUserNpcId = userNpc._id;
//                        lastUserNpc = userNpc;
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
            $http.post('/api/delete-user-npc', { userNpc: userNpc })
                .success(function (response) {
                    if (response.error) {
                        console.log(response.error);
                    }
                    lastUserNpcId = lastUserNpc = null;
                    callback(response.error);
                })
                .error(function (response) {
                    console.log("delete of userNpc failed !");
                    callback(response.error);
                });
        }
    };
}]);