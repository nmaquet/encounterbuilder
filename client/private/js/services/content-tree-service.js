'use strict';

DEMONSQUID.encounterBuilderServices.factory('contentTreeService', ['$rootScope', '$timeout', 'encounterService',
    function ($rootScope, $timeout, encounterService) {

        var NEW_ENCOUNTER = 'newEncounter';
        var service = {};
        var contentTree = [];

        encounterService.onLoadSuccess(function () {
            var encounters = encounterService.encounters;
            for (var i in  encounters) {
                var encounter = encounters[i];
                $rootScope.$emit(NEW_ENCOUNTER, encounter);
            }
        });

        service.contentTree = function () {
            return contentTree;
        };

        service.newEncounter = function (encounter) {
            $rootScope.$emit(NEW_ENCOUNTER, encounter);
        };

        service.register = function (callbacks) {
            $rootScope.$on(NEW_ENCOUNTER, callbacks[NEW_ENCOUNTER]);
        };

        return service;
    }]);
