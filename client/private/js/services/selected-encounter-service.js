'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedEncounterService', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {

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

        service.register = function (callback) {
            $rootScope.$on(SELECTED_ENCOUNTER_CHANGED, callback);
        }

        return service;
    }]);
