'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedMonsterService', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {

        var SELECTED_MONSTER_CHANGED = 'selectedMonsterChanged';
        var service = {};
        var selectedMonsterId = "bat";

        service.selectedMonsterId = function (monsterId) {
            if (monsterId && monsterId !== selectedMonsterId) {
                selectedMonsterId = monsterId;
                $rootScope.$emit(SELECTED_MONSTER_CHANGED);
            } else {
                return selectedMonsterId;
            }
        };

        service.register = function (callback) {
            callback();
            $rootScope.$on(SELECTED_MONSTER_CHANGED, callback);
        };

        return service;
    }]);
