"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterListController', ['$scope', 'encounterService',
    function ($scope, encounterService) {

        $scope.createEncounter = function() {
            var encounter = encounterService.newEncounter();
            encounterService.encounters.push(encounter);
            encounterService.selectEncounter(encounter);
        }

        $scope.selectEncounter = function(encounter) {
            encounterService.selectEncounter(encounter);
        }
    }
]);