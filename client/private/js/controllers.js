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

encounterBuilderControllers.controller('MonsterDetailController', ['$scope', '$routeParams', '$sce', 'Monster',
    function ($scope, $routeParams, $sce, Monster) {
        $scope.monster = Monster.get({monsterId: $routeParams.monsterId}, function (monster) {
            $scope.monster.FullTextSafe = $sce.trustAsHtml($scope.monster.FullText);
        });
    }]);
