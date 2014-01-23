'use strict';

/* App Module */

var encounterBuilderApp = angular.module('encounterBuilderApp', [
  'ngRoute',
  'ngCookies',
  'encounterBuilderControllers',
  'encounterBuilderFilters',
  'encounterBuilderServices',
]);

encounterBuilderApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/monsters', {
        templateUrl: 'partials/monster-list.html'
      }).
      otherwise({
        redirectTo: '/monsters'
      });
  }]);
