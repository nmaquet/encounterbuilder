'use strict';

/* Services */

var encounterBuilderServices = angular.module('encounterBuilderServices', ['ngResource']);

encounterBuilderServices.factory('Monster', ['$resource',
  function($resource){
    return $resource('monsters/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);
