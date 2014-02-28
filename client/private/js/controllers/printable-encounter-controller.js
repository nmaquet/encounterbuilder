"use strict";

DEMONSQUID.encounterBuilderControllers.controller('PrintableEncounterController',
    ['$scope', '$location', 'selectedEncounterService', 'monsterService',
        function ($scope, $location, selectedEncounterService, monsterService) {

            $scope.encounter = selectedEncounterService.selectedEncounter();

            $scope.monsters = [];

            monsterService.getMultiple(Object.keys($scope.encounter.Monsters), function (error, monsters) {
                $scope.monsters = monsters;
                console.log(monsters);
            });

            $scope.back = function () {
                $location.path('/');
            }
        }
    ]);