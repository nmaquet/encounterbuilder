'use strict';

/* Controllers */

var encounterBuilderControllers = angular.module('encounterBuilderControllers', ['ui.bootstrap']);

encounterBuilderControllers.controller('MonsterListController', ['$scope', 'monsterService',
    function ($scope, monsterService) {
        $scope.nameSubstring = '';
        $scope.orderProp = 'cr';
        /* FIXME: rename this */
        $scope.type = 'any';

        $scope.$watchCollection("[orderProp, type, currentPage]", function () {
            $scope.refreshMonsters();
        });

        $scope.$watch('nameSubstring', function (search_string) {
            setTimeout(function () {
                if (search_string === $scope.nameSubstring) {
                    $scope.refreshMonsters();
                }
            }, 300);
        });

        $scope.$watch('crRange', function (crRange) {
            setTimeout(function () {
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
            $scope.selectedMonsterId = id;
        }

        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 50;
        $scope.maxSize = 5;
        $scope.listTimestamp = 0;
        $scope.minCR = 0;
        $scope.maxCR = 40;
        $scope.crRange = $scope.minCR + " - " + $scope.maxCR;

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

    }])
;

encounterBuilderControllers.controller('MonsterDetailController', ['$scope', '$sce', 'monsterService',
    function ($scope, $sce, monsterService) {
        $scope.$watch('selectedMonsterId', function (selectedMonsterId) {
            $scope.monster = monsterService.get(selectedMonsterId, function (error, data) {
                if (error) {
                    console.log('Error in your face: ' + error);
                } else {
                    $scope.monster = data;
                    $scope.monster.DescriptionSafe = $sce.trustAsHtml($scope.monster.Description);
                    $scope.monster.SLASafe = $sce.trustAsHtml($scope.monster.SpellLikeAbilities);
                    $scope.monster.SpecialAbilitiesSafe = $sce.trustAsHtml($scope.monster.SpecialAbilities);
                }
            });
        });

    }]);
