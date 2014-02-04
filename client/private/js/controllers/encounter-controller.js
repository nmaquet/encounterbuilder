"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterController',
    ['$scope', 'encounterService', 'selectedMonsterService', 'selectedEncounterService',
        function ($scope, encounterService, selectedMonsterService, selectedEncounterService) {

            function upsert() {
                if ($scope.encounter) {
                    encounterService.upsert($scope.encounter);
                }
            }

            $scope.encounter = undefined;

            $scope.encounterNameChanged = function() {
                upsert();
            }

            $scope.selectMonsterById = function (id) {
                selectedMonsterService.selectedMonsterId(id);
            }

            $scope.removeEncounter = function () {
                var index = encounterService.encounters.indexOf($scope.encounter);
                encounterService.encounters.splice(index, 1);
                encounterService.remove($scope.encounter);
                selectedEncounterService.selectedEncounter(encounterService.encounters[0], true /* allow undefined */);
            }

            $scope.incrementMonster = function (monster) {
                monster.amount++;
                upsert();
            }

            $scope.decrementMonster = function (monster) {
                if (monster.amount > 1) {
                    monster.amount--;
                    upsert();
                }
            }

            $scope.removeMonsterById = function (monsterId) {
                delete $scope.encounter.Monsters[monsterId];
                upsert();
            }

            selectedEncounterService.register(function () {
                $scope.encounter = selectedEncounterService.selectedEncounter();
            });
        }
    ]);