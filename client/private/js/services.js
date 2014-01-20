'use strict';

/* Services */

var encounterBuilderServices = angular.module('encounterBuilderServices', ['ngResource']);

encounterBuilderServices.factory('monsterService', ['$http', function ($http) {
    return {
        search: function (params, callback) {
            $http.get('/api/search-monsters/', {params : params})
                .success(function (data) {
                    callback(null, data);
                })
                .error(function (error) {
                    callback(error, null);
                });
        },
        get: function (id, callback) {
            $http.get('/api/monster/' + id)
                .success(function (data) {
                    callback(null, data[0]);
                })
                .error(function (error) {
                    callback(error, null);
                });
        }
    };
}]);
