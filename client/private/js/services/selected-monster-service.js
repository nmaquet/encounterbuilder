'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedMonsterService', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {
        var service = {};

        service.selectMonster = function (monsterId) {
            this.selectedMonsterId = monsterId;
            $rootScope.$emit('selectedMonsterChanged');
        };

        service.register = function(callback) {
            $rootScope.$on('selectedMonsterChanged', callback);
        }

        $timeout(function () {
            service.selectMonster('bat')
        });

        return service;
    }]);
