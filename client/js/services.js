'use strict';

/* Services */

var encounterBuilderServices = angular.module('encounterBuilderServices', ['ngResource']);

encounterBuilderServices.factory('monsterService', ['$http', function ($http) {
    return {
        search: function (nameSubstring, order, callback) {
            $http.get('/api/search-monsters/', {params: {nameSubstring: nameSubstring, order: order}})
                .success(function (data) {
                    callback(null, data);
                })
                .error(function (error) {
                    callback(error, null);
                });
        }
    };
}]);
