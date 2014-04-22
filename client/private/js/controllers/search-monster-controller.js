"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchMonsterController',
    ['$scope', '$timeout', '$location', '$routeParams', 'monsterService', 'selectedMonsterService', 'encounterService', 'selectedEncounterService', 'doNotReloadCurrentTemplate',
        function ($scope, $timeout, $location, $routeParams, monsterService, selectedMonsterService, encounterService, selectedEncounterService, doNotReloadCurrentTemplate) {
            doNotReloadCurrentTemplate($scope);

            if ($routeParams.monsterId) {
                $timeout(function () {
                    if (selectedMonsterService.selectedMonsterId() === $routeParams.monsterId) {
                        selectedMonsterService.updateUrl()
                    } else {
                        selectedMonsterService.selectedMonsterId($routeParams.monsterId);
                    }
                    $('#monstersTab').click();
                });
            }

            $scope.nameSubstring = '';
            $scope.orderProp = 'name';
            $scope.type = 'any';

            $scope.$watchCollection("[orderProp, type, currentPage]", function () {
                if ($scope.currentPage < 9) {
                    $scope.maxSize = 5;
                }
                else if ($scope.currentPage < 99) {
                    $scope.maxSize = 4;
                }
                else {
                    $scope.maxSize = 3;
                }
                $scope.refreshMonsters();
            });

            $scope.$watch('nameSubstring', function (search_string) {
                $timeout(function () {
                    if (search_string === $scope.nameSubstring) {
                        $scope.refreshMonsters();
                    }
                }, 300);
            });

            $scope.$watchCollection("[minCR, maxCR]", function (crRange) {
                $timeout(function () {
                    if (crRange[0] === $scope.minCR && crRange[1] === $scope.maxCR) {
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
                        }
                    }
                });
            };

            $scope.selectMonster = function (id) {
                selectedMonsterService.selectedMonsterId(id);
            };

            $scope.addMonster = function (monster) {
                if (!/^(\d+)$/.exec(monster.amountToAdd)) {
                    monster.amountToAdd = 1;
                }
                var encounter = selectedEncounterService.selectedEncounter();
                if (!encounter.Monsters) {
                    encounter.Monsters = {};
                }
                if (!encounter.Monsters[monster.id]) {
                    //FIXME use DEMONSQUID.clone
                    encounter.Monsters[monster.id] = {
                        amount: Number(monster.amountToAdd),
                        Name: monster.Name,
                        XP: monster.XP,
                        CR: monster.CR,
                        Type: monster.Type,
                        TreasureBudget: monster.TreasureBudget,
                        Heroic: monster.Heroic,
                        Level: monster.Level
                    };
                }
                else {
                    encounter.Monsters[monster.id].amount += Number(monster.amountToAdd) || 1;
                }
                delete monster.amountToAdd;
                encounterService.encounterChanged(encounter);
            };

            $scope.totalItems = 0;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 15;
            $scope.maxSize = 4;
            $scope.listTimestamp = 0;
            $scope.minCR = 0;
            $scope.maxCR = 40;

            selectedMonsterService.register(function () {
                $scope.selectedMonsterId = selectedMonsterService.selectedMonsterId();
            });

            selectedEncounterService.register(function () {
                $scope.selectedEncounter = selectedEncounterService.selectedEncounter();
            });
        }
    ]);