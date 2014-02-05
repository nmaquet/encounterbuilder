'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedItemService', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {

        var SELECTED_ITEM_CHANGED = 'selectedItemChanged';
        var service = {};
        var selectedItemId;

        service.selectedItemId = function (monsterId) {
            if (monsterId) {
                selectedItemId = monsterId;
                $rootScope.$emit(SELECTED_ITEM_CHANGED);
            } else {
                return selectedItemId;
            }
        };

        service.register = function (callback) {
            $rootScope.$on(SELECTED_ITEM_CHANGED, callback);
        }

        $timeout(function () {
            service.selectedItemId('chelish-crux')
        });

        return service;
    }]);
