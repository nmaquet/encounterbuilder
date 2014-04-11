'use strict';

DEMONSQUID.encounterBuilderServices.factory('selectedItemService', ['$rootScope', '$timeout', '$location',
    function ($rootScope, $timeout, $location) {

        var SELECTED_ITEM_CHANGED = 'selectedItemChanged';
        var service = {};
        var selectedItemId = '-2-cursed-sword';

        var regExp = /\/item\/(.*)/;
        $rootScope.$on("$locationChangeStart", function (event, nextLocation, currentLocation) {
            if (nextLocation.toString().indexOf(':itemId') !== -1) {
                console.log('next' + nextLocation);
                console.log('current' + currentLocation);
                event.preventDefault();
                return;
            }
            var match = regExp.exec($location.path());
            if (match) {
                var requestedItem = match[1];
                if (requestedItem && requestedItem !== selectedItemId) {
                    service.selectedItemId(requestedItem);
                }
            }
        });

        service.selectedItemId = function (itemId) {
            if (itemId && itemId !== selectedItemId) {
                $location.path('item/' + itemId);
                selectedItemId = itemId;
                $rootScope.$emit(SELECTED_ITEM_CHANGED);
            } else {
                return selectedItemId;
            }
        };

        service.register = function (callback) {
            callback();
            $rootScope.$on(SELECTED_ITEM_CHANGED, callback);
        };
        service.updateUrl = function () {
            $location.path('item/' + selectedItemId);
        }
        return service;
    }]);
