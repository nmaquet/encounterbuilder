'use strict';

DEMONSQUID.encounterBuilderServices.factory('encounterService', ['$timeout', '$http',
    function ($timeout, $http) {

        var service = {};

        service.encounters = [];

        service.remove = function (encounter) {
            $http.post('/api/remove-encounter', { encounter: encounter })
                .success(function (response) {
                    if (response.error) {
                        console.log(response.error);
                    }
                })
                .error(function (response) {
                    console.log("delete of encounter failed !");
                });
        }

        service.upsert = function (encounter) {
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

        /*
         service.addMonsterToSelectedEncounter = function (monster, amount) {
         var encounter = service.selectedEncounter();
         if (!encounter.Monsters) {
         encounter.Monsters = {};
         }
         if (!encounter.Monsters[monster.id]) {
         encounter.Monsters[monster.id] = {Name: monster.Name, CR: monster.CR, amount: Number(amount)};
         }
         else {
         encounter.Monsters[monster.id].amount += Number(amount) || 1;
         }
         service.notifyChange();
         }
         */
        /*
         service.removeMonster = function (monsterId) {
         delete service.selectedEncounter().Monsters[monsterId];
         service.notifyChange();
         }
         */

        return service;
    }]);
