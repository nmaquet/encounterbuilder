'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedNpcService', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {

        var SELECTED_NPC_CHANGED = 'selectedNpcChanged';
        var service = {};
        var selectedNpcId = "";

        service.selectedNpcId = function (npcId) {
            if (npcId && npcId !== selectedNpcId) {
                selectedNpcId = npcId;
                $rootScope.$emit(SELECTED_NPC_CHANGED);
            } else {
                return selectedNpcId;
            }
        };

        service.register = function (callback) {
            callback();
            $rootScope.$on(SELECTED_NPC_CHANGED, callback);
        };

        return service;
    }]);
