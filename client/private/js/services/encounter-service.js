'use strict';

DEMONSQUID.encounterBuilderServices.factory('encounterService', ['$timeout', '$http','crService',
    function ($timeout, $http,crService) {

        function calculateXp(encounter){
            var xp = 0;
            for (var i in encounter.Monsters){
                xp += Number(encounter.Monsters[i].xp) * encounter.Monsters[i].amount;
            }
            return xp;
        }

        function calculateLootValue(encounter) {
            var multipliers = {
                "cp" : 1,
                "sp" : 10,
                "gp" : 100,
                "pp" : 1000
            };
            var lootValue = Number(encounter.coins) * 100;
            for (var i in encounter.items) {
                var multiplier = multipliers[encounter.items[i].PriceUnit] || 100;
                var price = Number(encounter.items[i].Price) || 0;
                lootValue += price * multiplier * encounter.items[i].amount;
            }
            return lootValue;
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
            encounter.lootValue = calculateLootValue(encounter);
            encounter.CR = crService.calculateCR(encounter);
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
