"use strict";

DEMONSQUID.encounterBuilderControllers.controller('PrintableEncounterController',
    ['$scope', '$location', '$timeout', '$sce', '$routeParams', 'encounterService', 'monsterService', 'npcService',
        function ($scope, $location, $timeout, $sce, $routeParams, encounterService, monsterService, npcService) {

            $scope.monsters_rows = [];

            encounterService.get($routeParams.encounterId, function (error, encounter) {
                if (error) {
                    console.log(error);
                }
                else {
                    $scope.encounter = encounter;
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
                        npcService.getMultiple(Object.keys($scope.encounter.Npcs), function (error, npcs) {
                            $scope.npcs = npcs;

                            $timeout(function () {
                                window.print();
                            }, 0);
                        });
                    });
                }
            });

            $scope.back = function () {
                $location.path('/');
            }
        }
    ]);