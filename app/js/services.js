'use strict';

/* Services */

var encounterBuilderServices = angular.module('encounterBuilderServices', ['ngResource']);

encounterBuilderServices.factory('Monster', ['$resource',
    function ($resource) {
        return $resource('monsters/:monsterId.json', {}, {
            query: {method: 'GET', params: {monsterId: 'monsters'}, isArray: true}
        });
    }]);
