'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedMonsterService', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {

        var SELECTED_MONSTER_CHANGED = 'selectedMonsterChanged';
        var service = {};
        var selectedMonsterId;

        service.selectedMonsterId = function (monsterId) {
            if (monsterId) {
                selectedMonsterId = monsterId;
                $rootScope.$emit(SELECTED_MONSTER_CHANGED);
            } else {
                return selectedMonsterId;
            }
        };

        service.register = function (callback) {
            $rootScope.$on(SELECTED_MONSTER_CHANGED, callback);
        }

        $timeout(function () {
            service.selectedMonsterId('bat')
        });

        return service;
    }]);
