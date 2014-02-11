'use strict';

DEMONSQUID.encounterBuilderServices.factory('encounterService', ['$timeout', '$http',
    function ($timeout, $http) {

        function calculateXp(encounter){
            var xp = 0;
            for (var i in encounter.Monsters){
                xp += Number(encounter.Monsters[i].xp) * encounter.Monsters[i].amount;
            }
            return xp;
        }

        var service = {};

        service.encounters = [];

        /* FIXME: don't we need a user callback ? */
        /* FIXME: The client of this function has no way to know whether this succeeds or not. */
        service.remove = function (encounter) {
            $http.post('/api/remove-encounter', { encounter: encounter })
                .success(function (response) {
                    if (response.error) {
                        console.log(response.error);
                    }
                })
                .error(function (response) {
                    console.log("remove of encounter failed !");
                });
        }

        /* FIXME: don't we need a user callback ? */
        /* FIXME: The client of this function has no way to know whether this succeeds or not. */
        service.encounterChanged = function (encounter) {
            encounter.xp = calculateXp(encounter);
            $http.post('/api/upsert-encounter', { encounter: encounter })
                .success(function (response) {
                    if (response._id) {
                        encounter._id = response._id;
                    }
                    if (response.error) {
                        console.log(error);
                    }
                })
                .error(function (response) {
                    console.log("post of encounter failed !");
                });
        }

        return service;
    }]);
