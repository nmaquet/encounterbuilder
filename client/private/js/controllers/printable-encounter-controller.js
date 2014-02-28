"use strict";

DEMONSQUID.encounterBuilderControllers.controller('PrintableEncounterController',
    ['$scope', '$location', '$timeout', 'selectedEncounterService', 'encounterService', 'monsterService',
        function ($scope, $location, $timeout, selectedEncounterService, encounterService, monsterService) {

            $scope.monsters_rows = [];

            $scope.encounter = selectedEncounterService.selectedEncounter();
            monsterService.getMultiple(Object.keys($scope.encounter.Monsters), function (error, monsters) {
                var row;
                for (var i in monsters) {
                    var monster = monsters[i];
                    if (i % 2 === 0) {
                        row = [monster];
                        $scope.monsters_rows.push(row);
                    } else {
                        row.push(monster);
                    }
                }
                console.log($scope.monsters_rows);
                $timeout(function () {
                    window.print();
                }, 0);
            });

            $scope.back = function () {
                $location.path('/');
            }
        }
    ]);