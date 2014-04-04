'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedFeatService', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {

        var SELECTED_FEAT_CHANGED = 'selectedFeatChanged';
        var service = {};
        var selectedFeatId = "ability-focus";

        service.selectedFeatId = function (spellId) {
            if (spellId && spellId !== selectedFeatId) {
                selectedFeatId = spellId;
                $rootScope.$emit(SELECTED_FEAT_CHANGED);
            } else {
                return selectedFeatId;
            }
        };

        service.register = function (callback) {
            callback();
            $rootScope.$on(SELECTED_FEAT_CHANGED, callback);
        }

        return service;
    }]);
