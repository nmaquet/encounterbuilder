'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedBinderService', ['$rootScope',
    function ($rootScope) {

        var SELECTED_BINDER_CHANGED = 'selectedBinderChanged';
        var service = {};
        var selectedBinder;

        service.selectedBinder = function (binder, setUndefined) {
            setUndefined = setUndefined || false;
            if (binder || setUndefined) {
                selectedBinder = binder;
                $rootScope.$emit(SELECTED_BINDER_CHANGED);
            } else {
                return selectedBinder;
            }
        };

        service.register = function (callback) {
            callback();
            $rootScope.$on(SELECTED_BINDER_CHANGED, callback);
        };

        return service;
    }]);
