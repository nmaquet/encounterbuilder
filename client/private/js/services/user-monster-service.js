'use strict';

DEMONSQUID.encounterBuilderServices.factory('userMonsterService', ['$http', function ($http) {

    function nop() {}

    return {
        get: function (id, callback) {
            callback = callback || nop;
            $http.get('/api/user-monster/' + id)
                .success(function (response) {
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
        update: function (userMonster, callback) {
            callback = callback || nop;
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
        }
    };
}]);