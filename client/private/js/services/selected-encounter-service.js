'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedEncounterService', ['$rootScope', '$timeout', 'encounterService',
    function ($rootScope, $timeout, encounterService) {

        var SELECTED_ENCOUNTER_CHANGED = 'selectedEncounterChanged';
        var service = {};
        var selectedEncounter;

        service.selectedEncounter = function (encounter, setUndefined) {
            setUndefined = setUndefined || false;
            if (encounter || setUndefined) {
                selectedEncounter = encounter;
                $rootScope.$emit(SELECTED_ENCOUNTER_CHANGED);
            } else {
                return selectedEncounter;
            }
        };
        service.selectedEncounterId = function (encounterId) {
            if (!selectedEncounter || selectedEncounter._id !== encounterId) {
                encounterService.get(encounterId, function (error, encounter) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log("encounter fetched : " + encounter);
                        service.selectedEncounter(encounter);
                    }
                });
            }
        };
        service.register = function (callback) {
            callback();
            $rootScope.$on(SELECTED_ENCOUNTER_CHANGED, callback);
        };

        return service;
    }]);
