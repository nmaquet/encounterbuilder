'use strict';

DEMONSQUID.encounterBuilderServices.factory('encounterService', ['$rootScope', '$timeout', '$http',
    function ($rootScope, $timeout, $http) {

        var SELECTED_ENCOUNTER_CHANGED = 'selectedEncounterChanged';
        var ENCOUNTERS_CHANGED = 'encountersChanged';
        var service = {};
        var selectedEncounter;
        var encounters = [];
        var initialized = false;

        service.selectedEncounter = function (encounter) {
            if (encounter) {
                selectedEncounter = encounter;
                $rootScope.$emit(SELECTED_ENCOUNTER_CHANGED);
            }
            else {
                return selectedEncounter;
            }
        };

        service.encounters = function () {
            return encounters.slice();
        };

        service.addEncounter = function (encounter) {
            encounters.push(encounter);
            $rootScope.$emit(ENCOUNTERS_CHANGED);
            postEncounter(encounter);
        };

        service.removeEncounter = function (encounter) {
            var i = encounters.indexOf(encounter);
            if(i != -1) {
                encounters.splice(i, 1);
            }
            $rootScope.$emit(ENCOUNTERS_CHANGED);
            $http.post('/api/delete-encounter', { encounter: encounter })
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                    }
                })
                .error(function (response) {
                    console.log("delete of encounter failed !");
                });
            service.selectedEncounter(service.encounters()[0]);
        }

        service.watchSelectedEncounter = function (callback) {
            $rootScope.$on(SELECTED_ENCOUNTER_CHANGED, callback);
        }

        service.watchEncounters = function (callback) {
            $rootScope.$on(ENCOUNTERS_CHANGED, callback);
        }

        service.newEncounter = function () {
            return { Name: "Untitled", CR: "0", Monsters: {}};
        }

        service.init = function (Encounters) {
            if (Encounters && Encounters.length > 0) {
                encounters = Encounters;
                service.selectedEncounter(encounters[0]);
                $rootScope.$emit(ENCOUNTERS_CHANGED);
                initialized = true;
            }
        }

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

        service.incrementMonster = function (monster) {
            monster.amount++;
            service.notifyChange();
        }

        service.decrementMonster = function (monster) {
            if (monster.amount > 1) {
                monster.amount--;
            }
            service.notifyChange();
        }

        service.removeMonster = function (monsterId) {
            delete service.selectedEncounter().Monsters[monsterId];
            service.notifyChange();
        }

        service.notifyChange = function () {
            postEncounter(service.selectedEncounter());
        }

        function postEncounter(encounter) {
            if (!initialized) {
                return;
            }
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
