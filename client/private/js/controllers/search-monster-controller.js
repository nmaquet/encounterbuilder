"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchMonsterController',
    ['$scope', '$timeout', '$location', '$routeParams', 'monsterService', 'encounterService', 'encounterEditorService',
        function ($scope, $timeout, $location, $routeParams, monsterService, encounterService, encounterEditorService) {

            $scope.nameSubstring = '';
            $scope.orderProp = 'name';
            $scope.type = 'any';
            $scope.refreshingMonsters = false;

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
                $scope.refreshingMonsters = true;
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
                    $scope.refreshingMonsters = false;
                });
            };

            $scope.selectMonster = function (id) {
                $location.path('/monster/' + id);
            };

            function addMonsterToEditedEncounter(monster) {
                if (!/^(\d+)$/.exec(monster.amountToAdd)) {
                    monster.amountToAdd = 1;
                }
                var encounter = encounterEditorService.encounter;
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
            }

            $scope.addMonster = function (monster) {
                if ($routeParams.encounterId) {
                    addMonsterToEditedEncounter(monster);
                }
                // FIXME: binder
            };

            $scope.totalItems = 0;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 15;
            $scope.maxSize = 4;
            $scope.listTimestamp = 0;
            $scope.minCR = 0;
            $scope.maxCR = 40;
        }
    ]);