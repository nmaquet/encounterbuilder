'use strict';

DEMONSQUID.encounterBuilderServices.factory('lootService', [ '$http',
    function ($http) {

        var service = {};

        service.generatedLoot = null;

        service.generateEncounterLoot = function (encounter, speed, options) {
            $http.post('/api/generate-encounter-loot', { encounter: encounter, options: options })
                .success(function (response) {
                    if (response.error) {
                        console.log(response.error);
                    }
                    else {
                        service.generatedLoot = {coins: response.coins, items: response.items};
                    }
                })
                .error(function (response) {
                    console.log("remove of encounter failed !");
                });
        };

        return service;
    }
]);
