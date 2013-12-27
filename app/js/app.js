'use strict';

/* App Module */

var encounterBuilderApp = angular.module('encounterBuilderApp', [
  'ngRoute',
  'encounterBuilderControllers',
  'encounterBuilderFilters',
  'encounterBuilderServices'
]);

encounterBuilderApp.directive('ebOnKeyup', function() {
    return function(scope, elm, attrs) {
        elm.bind("keyup", function() {
            scope.$apply(attrs.ebOnKeyup);
        });
    };
});

encounterBuilderApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/monsters', {
        templateUrl: 'partials/monster-list.html',
        controller: 'MonsterListController'
      }).
      when('/monsters/:monsterId', {
        templateUrl: 'partials/monster-detail.html',
        controller: 'MonsterDetailController'
      }).
      otherwise({
        redirectTo: '/monsters'
      });
  }]);
