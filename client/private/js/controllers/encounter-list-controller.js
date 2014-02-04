"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterListController',
    ['$scope', 'encounterService', 'selectedEncounterService',
        function ($scope, encounterService, selectedEncounterService) {

            $scope.encounters = encounterService.encounters;

            $scope.createEncounter = function () {
                var encounter = { Name: "Untitled", CR: "0", Monsters: {}};
                selectedEncounterService.selectedEncounter(encounter);
                encounterService.encounters.push(encounter);
                encounterService.upsert(encounter);
            }

            $scope.selectEncounter = function (encounter) {
                selectedEncounterService.selectedEncounter(encounter);
            }

            selectedEncounterService.register(function () {
                $scope.selectedEncounter = selectedEncounterService.selectedEncounter();
            });
        }
    ]);