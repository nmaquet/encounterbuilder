"use strict";

DEMONSQUID.encounterBuilderControllers.controller('PrintableEncounterController',
    ['$scope', '$location', '$timeout', 'selectedEncounterService', 'encounterService', 'monsterService',
        function ($scope, $location, $timeout, selectedEncounterService, encounterService, monsterService) {

            $scope.monsters = [];

            $scope.encounter = selectedEncounterService.selectedEncounter();
            monsterService.getMultiple(Object.keys($scope.encounter.Monsters), function (error, monsters) {
                $scope.monsters = monsters;
                $timeout(function () {
                    window.print();
                }, 0);
            });

            $scope.back = function () {
                $location.path('/');
            }
        }
    ]);