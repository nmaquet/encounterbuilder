"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterController', ['$scope', '$rootScope', 'selectedMonsterService',
    function ($scope, $rootScope, selectedMonsterService) {

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
            delete $rootScope.selectedEncounter.Monsters[id];
        }
    }
]);