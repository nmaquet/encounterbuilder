'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedMonsterService', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {
        var service = {};
        var selectedMonsterId;

        service.selectedMonsterId = function(monsterId) {
            if (monsterId) {
                selectedMonsterId = monsterId;
                $rootScope.$emit('selectedMonsterChanged');
            } else {
                return selectedMonsterId;
            }
        };

        service.register = function(callback) {
            $rootScope.$on('selectedMonsterChanged', callback);
        }

        $timeout(function () {
            service.selectedMonsterId('bat')
        });

        return service;
    }]);
