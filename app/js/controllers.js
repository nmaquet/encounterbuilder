'use strict';

/* Controllers */

var encounterBuilderControllers = angular.module('encounterBuilderControllers', []);

encounterBuilderControllers.controller('MonsterListController', ['$scope', 'Monster',
  function($scope, Monster) {
    $scope.monsters = Monster.query();
    $scope.orderProp = 'age';
  }]);

encounterBuilderControllers.controller('MonsterDetailController', ['$scope', '$routeParams', 'Monster',
  function($scope, $routeParams, Monster) {
    $scope.phone = Monster.get({monsterId: $routeParams.monsterId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
