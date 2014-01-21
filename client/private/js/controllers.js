'use strict';

/* Controllers */

var encounterBuilderControllers = angular.module('encounterBuilderControllers', ['ui.bootstrap']);

encounterBuilderControllers.controller('MonsterListController', ['$scope', 'monsterService',
    function ($scope, monsterService) {
        $scope.nameSubstring = '';
        $scope.orderProp = 'cr'; /* FIXME: rename this */
        $scope.type = 'any';

        $scope.$watchCollection("[nameSubstring, orderProp, type]", function () {
            $scope.refreshMonsters();
        });

        $scope.refreshMonsters = function () {
            var params = {nameSubstring: $scope.nameSubstring, order: $scope.orderProp, type: $scope.type};
            monsterService.search(params, function (error, data) {
                if (error) {
                    console.log('Error in your face: ' + error);
                } else {
                    $scope.monsters = data
                }
            });
        }

        $scope.totalItems = 1000;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 50; /* FIXME: how to get this from the server if possible */
        $scope.maxSize = 10;
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
