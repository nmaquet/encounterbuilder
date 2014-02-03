"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterController', ['$scope', 'selectedMonsterService',
    function ($scope, selectedMonsterService) {

        $scope.selectMonster = function (id) {
            selectedMonsterService.selectMonster(id);
        }
    }
]);