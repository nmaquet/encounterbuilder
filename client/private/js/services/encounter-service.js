'use strict';

DEMONSQUID.encounterBuilderServices.factory('encounterService', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {

        var SELECTED_ENCOUNTER_CHANGED = 'selectedEncounterChanged';
        var service = {};
        var selectedEncounter;
        var encounters;

        service.selectedEncounter = function (encounter) {
            if (encounter) {
                selectedEncounter = encounter;
                $rootScope.$emit(SELECTED_ENCOUNTER_CHANGED);
            }
            else{
                return selectedEncounter;
            }
        };

        service.encounters = function () {
                return encounters;
        };

        service.addEncounter = function (encounter) {
            encounters.push(encounter);
        };

        service.watchSelectedEncounter = function (callback) {
            $rootScope.$on(SELECTED_ENCOUNTER_CHANGED, callback);
        }

        service.newEncounter = function () {
            return { Name: "Untitled", CR: "0", Monsters: {}};
        }

        encounters = [ service.newEncounter() ];
        selectedEncounter = encounters[0];
        return service;
    }]);
