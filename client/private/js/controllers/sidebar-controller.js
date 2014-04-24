"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SidebarController',
    ['$scope', 'encounterService', 'selectedEncounterService','contentTreeService',
        function ($scope, encounterService, selectedEncounterService,contentTreeService) {

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
                    //FIXME this is duplicated in encounter-controller
                    encounter = { Name: "Untitled #" + i, CR: "0", Monsters: {}, coins: {pp:0,gp:0,sp:0,cp:0}};
                    ++i;
                } while(exists(encounter.Name));

                contentTreeService.newEncounter(encounter);
                selectedEncounterService.selectedEncounter(encounter);
                encounterService.encounters.unshift(encounter);
                encounterService.encounterChanged(encounter);
            };

            $scope.selectEncounter = function (encounter) {
                selectedEncounterService.selectedEncounter(encounter);
            };

            $scope.createBinder = function(){
                contentTreeService.newBinder();
            };

            selectedEncounterService.register(function () {
                $scope.selectedEncounter = selectedEncounterService.selectedEncounter();
            });
        }
    ]);