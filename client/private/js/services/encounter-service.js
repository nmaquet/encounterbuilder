'use strict';

DEMONSQUID.encounterBuilderServices.factory('encounterService', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {

        var SELECTED_ENCOUNTER_CHANGED = 'selectedEncounterChanged';

        var service = {};

        service.selectEncounter = function (encounter) {
            this.selectedEncounter = encounter;
            $rootScope.$emit(SELECTED_ENCOUNTER_CHANGED);
        };

        service.watchSelectedEncounter = function(callback) {
            $rootScope.$on(SELECTED_ENCOUNTER_CHANGED, callback);
        }

        service.newEncounter = function() {
            return { Name : "Untitled", CR : "0", Monsters: {}};
        }

        $timeout(function () {
            service.selectEncounter(service.encounters[0]);
        });

        service.encounters = [ service.newEncounter() ];

        return service;
    }]);
