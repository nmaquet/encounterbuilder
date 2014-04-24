'use strict';

DEMONSQUID.encounterBuilderServices.factory('contentTreeService', ['$rootScope', '$timeout', 'encounterService',
    function ($rootScope, $timeout, encounterService) {

        var NEW_ENCOUNTER = 'newEncounter';
        var NEW_BINDER = 'newBinder';
        var BINDER_CHANGED = 'binderChanged';
        var REMOVE_BINDER = 'removeBinder';

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

        service.newBinder = function (encounter) {
            $rootScope.$emit(NEW_BINDER, encounter);
        };

        service.register = function (callbacks) {
            $rootScope.$on(NEW_ENCOUNTER, callbacks[NEW_ENCOUNTER]);
            $rootScope.$on(NEW_BINDER, callbacks[NEW_BINDER]);
            $rootScope.$on(BINDER_CHANGED, callbacks[BINDER_CHANGED]);
            $rootScope.$on(REMOVE_BINDER, callbacks[REMOVE_BINDER]);
        };

        service.binderChanged = function(binder) {
            $rootScope.$emit(BINDER_CHANGED, binder);
        };

        service.removeBinder = function(binder) {
            $rootScope.$emit(REMOVE_BINDER, binder);
        };

        return service;
    }]);
