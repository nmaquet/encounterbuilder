"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterController', ['$scope', 'encounterService', 'selectedMonsterService',
    function ($scope, encounterService, selectedMonsterService) {

        $scope.encounter = encounterService.selectedEncounter();

        $scope.selectMonster = function (id) {
            selectedMonsterService.selectedMonsterId(id);
        }

        $scope.incrementMonster = encounterService.incrementMonster;
        $scope.decrementMonster = encounterService.decrementMonster;
        $scope.removeMonster = encounterService.removeMonster;

        encounterService.watchSelectedEncounter(function() {
            $scope.encounter = encounterService.selectedEncounter();
        });
    }
]);