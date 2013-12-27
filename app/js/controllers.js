'use strict';

/* Controllers */

var encounterBuilderControllers = angular.module('encounterBuilderControllers', []);

encounterBuilderControllers.controller('MonsterListController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.orderProp = 'cr';

        $http.get('/api/monsters')
            .success(function (data) {
                $scope.monsters = data
            })
            .error(function (error) {
                console.log('Error in your face: ' + error);
            });
    }]);

encounterBuilderControllers.controller('MonsterDetailController', ['$scope', '$routeParams', '$sce', 'Monster',
    function ($scope, $routeParams, $sce, Monster) {
        $scope.monster = Monster.get({monsterId: $routeParams.monsterId}, function (monster) {
            $scope.monster.FullTextSafe = $sce.trustAsHtml($scope.monster.FullText);
        });
    }]);
