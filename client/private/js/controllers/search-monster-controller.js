"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchMonsterController',
    ['$scope', '$rootScope', '$timeout', '$routeParams', 'monsterService', 'encounterService', 'encounterEditorService', 'locationService',
        function ($scope, $rootScope, $timeout, $routeParams, monsterService, encounterService, encounterEditorService, locationService) {

            var lastSearchParam = monsterService.lastSearchParam();

            $scope.nameSubstring = lastSearchParam ? lastSearchParam.nameSubstring : '';
            $scope.orderProp = lastSearchParam ? lastSearchParam.order : 'name';
            $scope.type = lastSearchParam ? lastSearchParam.type : 'any';
            $scope.refreshingMonsters = false;

            $scope.totalItems = 0;
            $scope.currentPage = lastSearchParam ? lastSearchParam.currentPage : 1;
            $scope.itemsPerPage = 15;
            $scope.maxSize = 4;
            $scope.listTimestamp = 0;
            $scope.minCR = lastSearchParam ? lastSearchParam.minCR : 0;
            $scope.maxCR = lastSearchParam ? lastSearchParam.maxCR : 40;

            $scope.selectedMonsterId = $routeParams.monsterId;

            $scope.userCreated = false;

            $scope.$on('$routeChangeSuccess', function () {
                $scope.selectedMonsterId = $routeParams.monsterId;
            });

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
            $scope.$watch('userCreated', function (value) {
                $timeout(function () {
                    if (value === $scope.userCreated) {
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
                    currentPage: $scope.currentPage,
                    findLimit: $scope.itemsPerPage,
                    minCR: $scope.minCR,
                    maxCR: $scope.maxCR,
                    userCreated: $scope.userCreated
                };
                $scope.refreshingMonsters = true;
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
                if ($scope.userCreated) {
                    locationService.goToDetails('user-monster', id);
                } else {
                    locationService.goToDetails('monster', id);
                }
            };

            function addMonsterToEditedEncounter(monster) {
                if (!/^(\d+)$/.exec(monster.amountToAdd)) {
                    monster.amountToAdd = 1;
                }
                var encounter = encounterEditorService.encounter;
                if (!encounter.Monsters) {
                    encounter.Monsters = {};
                }
                var id = monster.id || monster._id;
                if (!encounter.Monsters[id]) {
                    //FIXME use DEMONSQUID.clone
                    encounter.Monsters[id] = {
                        amount: Number(monster.amountToAdd),
                        Name: monster.Name,
                        XP: monster.XP,
                        CR: monster.CR,
                        Type: monster.Type,
                        TreasureBudget: monster.TreasureBudget,
                        Heroic: monster.Heroic,
                        Level: monster.Level
                    };
                    if (monster.id === undefined) {
                        encounter.Monsters[id].userCreated = true;
                    }
                }
                else {
                    encounter.Monsters[id].amount += Number(monster.amountToAdd) || 1;
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

        }
    ]);