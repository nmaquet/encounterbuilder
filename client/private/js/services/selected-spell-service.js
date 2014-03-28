'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedSpellService', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {

        var SELECTED_SPELL_CHANGED = 'selectedSpellChanged';
        var service = {};
        var selectedSpellId = "";

        service.selectedSpellId = function (spellId) {
            if (spellId && spellId !== selectedSpellId) {
                selectedSpellId = spellId;
                $rootScope.$emit(SELECTED_SPELL_CHANGED);
            } else {
                return selectedSpellId;
            }
        };

        service.register = function (callback) {
            $rootScope.$on(SELECTED_SPELL_CHANGED, callback);
            $timeout(function () {
                callback();
            });
        }

        return service;
    }]);
