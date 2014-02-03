"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchMonsterController',
    ['$scope', '$timeout', 'monsterService','selectedMonsterService', 'encounterService',
    function ($scope, $timeout, monsterService, selectedMonsterService, encounterService) {

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
            selectedMonsterService.selectMonster(id);
        }

        $scope.addMonster = function (monster) {
            if (!/^(\d+)$/.exec(monster.amountToAdd)) {
                monster.amountToAdd = 1;
            }
            var simpleMonster = {Name: monster.Name, CR: monster.CR, amount: Number(monster.amountToAdd)};
            if (!encounterService.selectedEncounter.Monsters[monster.id]) {
                encounterService.selectedEncounter.Monsters[monster.id] = simpleMonster;
            }
            else {
                encounterService.selectedEncounter.Monsters[monster.id].amount += Number(monster.amountToAdd) || 1;
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

        selectedMonsterService.selectMonster('bat');

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