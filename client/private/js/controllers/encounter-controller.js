"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterController', ['$scope', 'encounterService', 'selectedMonsterService',
    function ($scope, encounterService, selectedMonsterService) {

        $scope.encounter = {};

        $scope.selectMonster = function (id) {
            selectedMonsterService.selectMonster(id);
        }

        $scope.incrementMonster = function (monster) {
            monster.amount++;
        }

        $scope.decrementMonster = function (monster) {
            if (monster.amount > 1) {
                monster.amount--;
            }
        }

        $scope.removeMonster = function (id) {
            delete encounterService.selectedEncounter.Monsters[id];
        }

        encounterService.watchSelectedEncounter(function() {
            $scope.encounter = encounterService.selectedEncounter;
        });
    }
]);