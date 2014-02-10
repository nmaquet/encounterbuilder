'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedItemService', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {

        var SELECTED_ITEM_CHANGED = 'selectedItemChanged';
        var service = {};
        var selectedItemId = 'chelish-crux';

        service.selectedItemId = function (itemId) {
            if (itemId && itemId !== selectedItemId) {
                selectedItemId = itemId;
                $rootScope.$emit(SELECTED_ITEM_CHANGED);
            } else {
                return selectedItemId;
            }
        };

        service.register = function (callback) {
            $rootScope.$on(SELECTED_ITEM_CHANGED, callback);
            $timeout(function () {
                callback();
            });
        }

        return service;
    }]);
