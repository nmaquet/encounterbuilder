'use strict';

/* Controllers */

var encounterBuilderControllers = angular.module('encounterBuilderControllers', []);

encounterBuilderControllers.controller('MonsterListController', ['$scope', 'Monster',
  function($scope, Monster) {
    $scope.monsters = Monster.query();
    $scope.orderProp = 'cr';
  }]);

encounterBuilderControllers.controller('MonsterDetailController', ['$scope', '$routeParams', '$sce', 'Monster',
  function($scope, $routeParams, $sce, Monster) {
    $scope.monster = Monster.get({monsterId: $routeParams.monsterId}, function(monster) {
    $scope.monster.FullTextSafe = $sce.trustAsHtml($scope.monster.FullText);
    });
  }]);
