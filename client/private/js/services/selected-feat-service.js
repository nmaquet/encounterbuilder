'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedFeatService', ['$rootScope', '$timeout', '$location',
    function ($rootScope, $timeout, $location) {

        var SELECTED_FEAT_CHANGED = 'selectedFeatChanged';
        var service = {};
        var selectedFeatId = "ability-focus";

        var regExp = /\/feat\/(.*)/;
        $rootScope.$on("$locationChangeStart", function (event, nextLocation, currentLocation) {
            if (nextLocation.toString().indexOf(':featId') !== -1) {
                event.preventDefault();
                return;
            }
            var match = regExp.exec($location.path());
            if (match) {
                var requestedFeat = match[1];
                if (requestedFeat && requestedFeat !== selectedFeatId) {
                    service.selectedFeatId(requestedFeat);
                }
            }
        });
        service.selectedFeatId = function (featId) {
            if (featId && featId !== selectedFeatId) {
                $location.path('feat/' + featId);
                selectedFeatId = featId;
                $rootScope.$emit(SELECTED_FEAT_CHANGED);
            } else {
                return selectedFeatId;
            }
        };

        service.register = function (callback) {
            callback();
            $rootScope.$on(SELECTED_FEAT_CHANGED, callback);
        }

        service.updateUrl=function(){
            $location.path('feat/' + selectedFeatId);
        }
        return service;
    }
])
;
