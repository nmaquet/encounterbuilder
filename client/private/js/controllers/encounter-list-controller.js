"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterListController', ['$scope', 'encounterService',
    function ($scope, encounterService) {

        $scope.selectedEncounter = encounterService.encounters()[0];
        $scope.encounters = encounterService.encounters();

        $scope.createEncounter = function() {
            var encounter = encounterService.newEncounter();
            encounterService.addEncounter(encounter);
            encounterService.selectedEncounter(encounter);
        }

        $scope.selectEncounter = function(encounter) {
            $scope.selectedEncounter = encounter;
            encounterService.selectedEncounter(encounter);
        }

        encounterService.watchEncounters(function(){
            $scope.encounters = encounterService.encounters();
        });
    }
]);