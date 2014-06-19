'use strict';

DEMONSQUID.encounterBuilderServices.factory('userMonsterService', ['$http', function ($http) {

    function nop() {
    }

    var lastUserMonster = null;
    var lastUserMonsterId = null;

    return {
        get: function (id, callback) {
            callback = callback || nop;
            if (lastUserMonsterId && lastUserMonsterId === id) {
                return callback(null, lastUserMonster);;
            }
            $http.get('/api/user-monster/' + id)
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                        lastUserMonsterId = lastUserMonster = null;
                    } else {
                        lastUserMonsterId = response.userMonster._id;
                        lastUserMonster = response.userMonster;
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
                        lastUserMonsterId = lastUserMonster = null;
                    } else {
                        lastUserMonsterId = response.userMonster._id;
                        lastUserMonster = response.userMonster;
                    }
                    callback(response.error, response.userMonster);
                })
                .error(function (response) {
                    console.log("post of monster failed !");
                    callback(response.error);
                });
        },
        copy: function (id, callback) {
            callback = callback || nop;
            $http.post('/api/copy-monster', {id: id})
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                        lastUserMonsterId = lastUserMonster = null;
                    } else {
                        lastUserMonsterId = response.userMonster._id;
                        lastUserMonster = response.userMonster;
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
            $http.post('/api/update-user-monster', { userMonster: userMonster })
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                        lastUserMonsterId = lastUserMonster = null;
                    } else {
                        lastUserMonsterId = userMonster._id;
                        lastUserMonster = userMonster;
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
            $http.post('/api/delete-user-monster', { userMonster: userMonster })
                .success(function (response) {
                    if (response.error) {
                        console.log(response.error);
                    }
                    lastUserMonsterId = lastUserMonster = null;
                    callback(response.error);
                })
                .error(function (response) {
                    console.log("delete of userMonster failed !");
                    callback(response.error);
                });
        }
    };
}]);