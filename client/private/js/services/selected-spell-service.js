'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedSpellService', ['$rootScope', '$timeout','$location',
    function ($rootScope, $timeout, $location) {

        var SELECTED_SPELL_CHANGED = 'selectedSpellChanged';
        var service = {};
        var selectedSpellId = "ablative-barrier";

        var regExp = /\/spell\/(.*)/;
        $rootScope.$on("$locationChangeStart", function (event, nextLocation, currentLocation) {
            if (nextLocation.toString().indexOf(':spellId') !== -1) {
                event.preventDefault();
                return;
            }
            var match = regExp.exec($location.path());
            if (match) {
                var requestedSpell = match[1];
                if (requestedSpell && requestedSpell !== selectedSpellId) {
                    service.selectedSpellId(requestedSpell);
                }
            }
        });

        service.selectedSpellId = function (spellId) {
            if (spellId && spellId !== selectedSpellId) {
                $location.path('spell/' + spellId);
                selectedSpellId = spellId;
                $rootScope.$emit(SELECTED_SPELL_CHANGED);
            } else {
                return selectedSpellId;
            }
        };

        service.register = function (callback) {
            callback();
            $rootScope.$on(SELECTED_SPELL_CHANGED, callback);
        };
        service.updateUrl=function(){
            $location.path('spell/' + selectedSpellId);
        }
        return service;
    }]);
