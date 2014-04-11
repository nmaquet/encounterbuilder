'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedNpcService', ['$rootScope', '$timeout', '$location',
    function ($rootScope, $timeout, $location) {

        var SELECTED_NPC_CHANGED = 'selectedNpcChanged';
        var service = {};
        var selectedNpcId = "12-headed-hydra";

        var regExp = /\/npc\/(.*)/;
        $rootScope.$on("$locationChangeStart", function (event, nextLocation, currentLocation) {
            if (nextLocation.toString().indexOf(':npcId') !== -1) {
                event.preventDefault();
                return;
            }
            var match = regExp.exec($location.path());
            if (match) {
                var requestedNpc = match[1];
                if (requestedNpc && requestedNpc !== selectedNpcId) {
                    service.selectedNpcId(requestedNpc);
                }
            }
        });

        service.selectedNpcId = function (npcId) {
            if (npcId && npcId !== selectedNpcId) {
                $location.path('npc/' + npcId);
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
        service.updateUrl = function () {
            $location.path('npc/' + selectedNpcId);
        }
        return service;
    }]);
