'use strict';

/* Controllers */

var encounterBuilderControllers = angular.module('encounterBuilderControllers', []);

encounterBuilderControllers.controller('MonsterListController', ['$scope', 'monsterService',
    function ($scope, monsterService) {
        $scope.query = '';
        $scope.orderProp = 'cr';

        $scope.$watchCollection("[query, orderProp]", function () {
            $scope.refreshMonsters();
        });

        $scope.refreshMonsters = function () {
            monsterService.search($scope.query, $scope.orderProp, function (error, data) {
                if (error) {
                    console.log('Error in your face: ' + error);
                } else {
                    $scope.monsters = data
                }
            });
        }
    }
]);

encounterBuilderControllers.controller('MonsterDetailController', ['$scope', '$routeParams', '$sce', 'monsterService',
    function ($scope, $routeParams, $sce, monsterService) {
        $scope.monster = monsterService.get($routeParams.monsterId, function (error, data) {
            if (error) {
                console.log('Error in your face: ' + error);
            } else {
                $scope.monster = data;
                $scope.monster.DescriptionSafe = $sce.trustAsHtml($scope.monster.Description);
                $scope.monster.SLASafe = $sce.trustAsHtml($scope.monster.SpellLikeAbilities);
                $scope.monster.SpecialAbilitiesSafe = $sce.trustAsHtml($scope.monster.SpecialAbilities);

            }
        });
    }]);
