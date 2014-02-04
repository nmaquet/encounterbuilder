"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterController', ['$scope', 'encounterService', 'selectedMonsterService',
    function ($scope, encounterService, selectedMonsterService) {

        $scope.encounter = encounterService.selectedEncounter();

        $scope.$watch('encounter.Name', function() {
            encounterService.notifyChange();
        });

        $scope.selectMonster = function (id) {
            selectedMonsterService.selectedMonsterId(id);
        }

        $scope.removeEncounter = encounterService.removeEncounter;
        $scope.incrementMonster = encounterService.incrementMonster;
        $scope.decrementMonster = encounterService.decrementMonster;
        $scope.removeMonster = encounterService.removeMonster;

        encounterService.watchSelectedEncounter(function() {
            $scope.encounter = encounterService.selectedEncounter();
        });
    }
]);