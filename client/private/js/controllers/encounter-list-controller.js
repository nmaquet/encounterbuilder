"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterListController', ['$scope', 'encounterService',
    function ($scope, encounterService) {

        $scope.createEncounter = function () {
            var encounter = encounterService.newEncounter();
            encounterService.addEncounter(encounter);
            encounterService.selectedEncounter(encounter);
        }

        $scope.selectEncounter = function (encounter) {
            $scope.selectedEncounter = encounter;
            encounterService.selectedEncounter(encounter);
        }

        function refreshSelectedEncounter() {
            $scope.selectedEncounter = encounterService.selectedEncounter();
        };

        function refreshEncounters () {
            $scope.encounters = encounterService.encounters();
        };

        encounterService.watchSelectedEncounter(refreshSelectedEncounter);
        encounterService.watchEncounters(refreshEncounters);

        refreshSelectedEncounter();
        refreshEncounters();
    }
]);