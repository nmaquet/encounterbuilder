"use strict";

DEMONSQUID.encounterBuilderControllers.controller('GlobalController', ['$scope', '$rootScope',
    function ($scope, $rootScope) {

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