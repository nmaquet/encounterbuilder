'use strict';

/* Controllers */

var encounterBuilderControllers = angular.module('encounterBuilderControllers', []);

encounterBuilderControllers.controller('MonsterListController', ['$scope', 'monsterService',
    function ($scope, monsterService) {
        $scope.query = ''; /* FIXME: rename this */
        $scope.orderProp = 'cr'; /* FIXME: rename this */
        $scope.type = 'any';

        $scope.$watchCollection("[query, orderProp, type]", function () {
            $scope.refreshMonsters();
        });

        $scope.refreshMonsters = function () {
            var params = {nameSubstring: $scope.query, order: $scope.orderProp, type: $scope.type};
            monsterService.search(params, function (error, data) {
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
