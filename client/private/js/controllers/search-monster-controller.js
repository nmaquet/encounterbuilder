"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchMonsterController',
    ['$scope', '$timeout', 'monsterService', 'selectedMonsterService', 'encounterService', 'selectedEncounterService',
        function ($scope, $timeout, monsterService, selectedMonsterService, encounterService, selectedEncounterService) {

            $scope.nameSubstring = '';
            $scope.orderProp = 'cr';
            $scope.type = 'any';

            $scope.$watchCollection("[orderProp, type, currentPage]", function () {
                $scope.refreshMonsters();
            });

            $scope.$watch('nameSubstring', function (search_string) {
                $timeout(function () {
                    if (search_string === $scope.nameSubstring) {
                        $scope.refreshMonsters();
                    }
                }, 300);
            });

            $scope.$watch('crRange', function (crRange) {
                $timeout(function () {
                    if (crRange === $scope.crRange) {
                        $scope.refreshMonsters();
                    }
                }, 300);
            });

            $scope.refreshMonsters = function () {
                var params = {
                    nameSubstring: $scope.nameSubstring,
                    order: $scope.orderProp,
                    type: $scope.type,
                    skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
                    findLimit: $scope.itemsPerPage,
                    minCR: $scope.minCR,
                    maxCR: $scope.maxCR
                };
                monsterService.search(params, function (error, data) {
                    if (error) {
                        console.log('Error in your face: ' + error);
                    } else {
                        if (data.timestamp >= $scope.listTimestamp) {
                            $scope.monsters = data.monsters;
                            $scope.totalItems = data.count;
                            $scope.listTimestamp = data.timestamp;

                            if (!$scope.selectedMonsterId && $scope.monsters) {
                                $scope.selectedMonsterId = $scope.monsters[0].id;
                            }
                        }
                    }
                });
            }

            $scope.selectMonster = function (id) {
                selectedMonsterService.selectedMonsterId(id);
            }

            $scope.addMonster = function (monster) {
                if (!/^(\d+)$/.exec(monster.amountToAdd)) {
                    monster.amountToAdd = 1;
                }
                var encounter = selectedEncounterService.selectedEncounter();
                if (!encounter.Monsters) {
                    encounter.Monsters = {};
                }
                if (!encounter.Monsters[monster.id]) {
                    encounter.Monsters[monster.id] = {Name: monster.Name, CR: monster.CR, amount: Number(monster.amountToAdd)};
                }
                else {
                    encounter.Monsters[monster.id].amount += Number(monster.amountToAdd) || 1;
                }
                delete monster.amountToAdd;
            }

            $scope.totalItems = 0;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 50;
            $scope.maxSize = 5;
            $scope.listTimestamp = 0;
            $scope.minCR = 0;
            $scope.maxCR = 40;
            $scope.crRange = $scope.minCR + " - " + $scope.maxCR;

            selectedMonsterService.selectedMonsterId('bat');

            $("#slider-range").slider({
                range: true,
                min: 0,
                max: 40,
                values: [ 0, 40 ],
                slide: function (event, ui) {
                    $scope.minCR = ui.values[0];
                    $scope.maxCR = ui.values[1];
                    $scope.crRange = $scope.minCR + " - " + $scope.maxCR;
                    $scope.$apply();
                }
            });
        }
    ]);