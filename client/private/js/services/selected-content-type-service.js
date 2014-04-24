'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedContentTypeService', ['$rootScope',
    function ($rootScope) {

        var SELECTED_CONTENT_TYPE_CHANGED = 'selectedContentTypeChanged';
        var service = {};
        var selectedContentType;

        service.selectedContentType = function (contentType, setUndefined) {
            setUndefined = setUndefined || false;
            if (contentType || setUndefined) {
                selectedContentType = contentType;
                $rootScope.$emit(SELECTED_CONTENT_TYPE_CHANGED);
            } else {
                return selectedContentType;
            }
        };

        service.register = function (callback) {
            callback();
            $rootScope.$on(SELECTED_CONTENT_TYPE_CHANGED, callback);
        };

        return service;
    }]);
