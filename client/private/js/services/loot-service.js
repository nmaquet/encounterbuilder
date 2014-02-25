'use strict';

DEMONSQUID.encounterBuilderServices.factory('lootService', [ '$http',
    function ($http) {

        var service = {};

        service.generateEncounterLoot = function (encounter, speed, callback) {
            $http.post('/api/generate-encounter-loot', { encounter: encounter })
                .success(function (response) {
                    if (response.error) {
                        console.log(response.error);
                    }
                    else {
                        callback(response.coins, response.items)
                    }
                })
                .error(function (response) {
                    console.log("remove of encounter failed !");
                });
        };

        return service;
    }
]);
