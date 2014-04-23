'use strict';

DEMONSQUID.encounterBuilderServices.factory('contentTreeService', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {

        var NEW_ENCOUNTER = 'newEncounter';
        var service = {};
        var contentTree = [
            {title: "timmy", key: "timmy"}
        ];

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
