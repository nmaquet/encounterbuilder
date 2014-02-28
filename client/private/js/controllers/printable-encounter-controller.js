"use strict";

DEMONSQUID.encounterBuilderControllers.controller('PrintableEncounterController',
    ['$scope', '$location', '$timeout', '$sce', 'selectedEncounterService', 'encounterService', 'monsterService',
        function ($scope, $location, $timeout, $sce, selectedEncounterService, encounterService, monsterService) {

            $scope.monsters_rows = [];

            $scope.encounter = selectedEncounterService.selectedEncounter();
            monsterService.getMultiple(Object.keys($scope.encounter.Monsters), function (error, monsters) {
                var row;
                var col = 0;
                for (var i in monsters) {
                    var monster = monsters[i];
                    if (monster.SpecialAbilities) {
                        row = [monster];
                        $scope.monsters_rows.push(row);
                        col = 0;
                    }
                    else if (col === 0) {
                        row = [monster];
                        $scope.monsters_rows.push(row);
                        col = 1;
                    } else {
                        row.push(monster);
                        col = 0;
                    }
                    monster.DescriptionSafe = $sce.trustAsHtml(monster.Description);
                    monster.SLASafe = $sce.trustAsHtml(monster.SpellLikeAbilities);
                    monster.SpecialAbilitiesSafe = $sce.trustAsHtml(monster.SpecialAbilities);
                }
                console.log($scope.monsters_rows.map(function (row) {
                    row.map(function (monster) {
                        return monster.Name;
                    })
                }));
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