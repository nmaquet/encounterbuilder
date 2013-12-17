'use strict';

/* Services */

var encounterBuilderServices = angular.module('encounterBuilderServices', ['ngResource']);

encounterBuilderServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);
