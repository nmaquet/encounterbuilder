'use strict';

/* App Module */

var encounterBuilderApp = angular.module('encounterBuilderApp', [
  'ngRoute',
  'encounterBuilderControllers',
  'encounterBuilderFilters',
  'encounterBuilderServices'
]);

encounterBuilderApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/monsters', {
        templateUrl: 'partials/monster-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/monsters/:phoneId', {
        templateUrl: 'partials/monster-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/monsters'
      });
  }]);
