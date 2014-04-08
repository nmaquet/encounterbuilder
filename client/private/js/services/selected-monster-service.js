'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedMonsterService', ['$rootScope', '$timeout', '$location',
    function ($rootScope, $timeout, $location) {

        var SELECTED_MONSTER_CHANGED = 'selectedMonsterChanged';
        var service = {};
        var selectedMonsterId = "aashaq-s-wyvern";

        var regExp = /\/monster\/(.*)/;
        $rootScope.$on("$locationChangeStart", function (event, nextLocation, currentLocation) {
            if (nextLocation.toString().indexOf(':monsterId') !== -1) {
                event.preventDefault();
                return;
            }
            var match = regExp.exec($location.path());
            if (match) {
                var requestedMonster = match[1];
                if (requestedMonster && requestedMonster !== selectedMonsterId) {
                    service.selectedMonsterId(requestedMonster);
                }
            }
        });

        service.selectedMonsterId = function (monsterId) {
            if (monsterId && monsterId !== selectedMonsterId) {
                $location.path('monster/' + monsterId);
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
        service.updateUrl = function () {
            $location.path('monster/' + selectedMonsterId);
        }
        return service;
    }]);
