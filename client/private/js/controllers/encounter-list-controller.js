"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterListController',
    ['$scope', 'encounterService', 'selectedEncounterService',
        function ($scope, encounterService, selectedEncounterService) {

            $scope.encounters = encounterService.encounters;

            $scope.createEncounter = function () {
                function exists(name) {
                    for (var encounter in encounterService.encounters) {
                        if (encounterService.encounters[encounter].Name === name) {
                            return true;
                        }
                    }
                    return false;
                }
                var i = 0, encounter;
                do {
                    encounter = { Name: "Untitled #" + i, CR: "0", Monsters: {}};
                    ++i;
                } while(exists(encounter.Name));
                selectedEncounterService.selectedEncounter(encounter);
                encounterService.encounters.push(encounter);
                encounterService.encounterChanged(encounter);
            }

            $scope.selectEncounter = function (encounter) {
                selectedEncounterService.selectedEncounter(encounter);
            }

            selectedEncounterService.register(function () {
                $scope.selectedEncounter = selectedEncounterService.selectedEncounter();
            });
        }
    ]);