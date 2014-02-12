'use strict';

DEMONSQUID.encounterBuilderServices.factory('lootService', [
    function () {
        var service = {};

        service.generateMonsterLoot = function(monsterBrief) {
            var loot = {
                coins: 0,
                items: []
            };
            if (monsterBrief.TreasureBudget !== "none") {
                loot.coins = 1;
            }
            return loot;
        };

        service.generateEncounterLoot = function(encounter) {

        };

        return service;
    }]);
