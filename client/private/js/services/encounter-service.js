'use strict';

DEMONSQUID.encounterBuilderServices.factory('encounterService', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {

        var SELECTED_ENCOUNTER_CHANGED = 'selectedEncounterChanged';
        var ENCOUNTERS_CHANGED = 'encountersChanged';
        var service = {};
        var selectedEncounter;
        var encounters;

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
        };

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
            if (Encounters) {
                encounters = Encounters;
                service.selectedEncounter(encounters[0]);
                $rootScope.$emit(ENCOUNTERS_CHANGED);
            }
        }

        service.addMonsterToSelectedEncounter = function(monster, amount) {
            var encounter = service.selectedEncounter();
            if (!encounter.Monsters[monster.id]) {
                encounter.Monsters[monster.id] = {Name: monster.Name, CR: monster.CR, amount: Number(amount)};
            }
            else {
                encounter.Monsters[monster.id].amount += Number(amount) || 1;
            }
        }

        encounters = [ service.newEncounter() ];
        selectedEncounter = encounters[0];
        return service;
    }]);
