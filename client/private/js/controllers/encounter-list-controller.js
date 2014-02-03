"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterListController', ['$scope', 'encounterService',
    function ($scope, encounterService) {

        $scope.selectedEncounter = encounterService.encounters[0];
        $scope.encounters = encounterService.encounters;

        $scope.createEncounter = function() {
            var encounter = encounterService.newEncounter();
            encounterService.encounters.push(encounter);
            encounterService.selectEncounter(encounter);
        }

        $scope.selectEncounter = function(encounter) {
            $scope.selectedEncounter = encounter;
            encounterService.selectEncounter(encounter);
        }
    }
]);