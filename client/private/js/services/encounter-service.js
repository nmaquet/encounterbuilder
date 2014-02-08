'use strict';

DEMONSQUID.encounterBuilderServices.factory('encounterService', ['$timeout', '$http',
    function ($timeout, $http) {

        var service = {};

        service.encounters = [];

        service.remove = function (encounter) {
            $http.post('/api/remove-encounter', { encounter: encounter })
                .success(function (response) {
                    if (response.error) {
                        console.log(response.error);
                    }
                })
                .error(function (response) {
                    console.log("remove of encounter failed !");
                });
        }

        service.upsert = function (encounter) {
            $http.post('/api/upsert-encounter', { encounter: encounter })
                .success(function (response) {
                    if (response._id) {
                        encounter._id = response._id;
                    }
                    if (response.error) {
                        console.log(error);
                    }
                })
                .error(function (response) {
                    console.log("post of encounter failed !");
                });
        }

        return service;
    }]);
