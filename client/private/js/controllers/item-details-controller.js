"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ItemDetailsController',
    ['$scope', '$http', 'selectedItemService', 'itemService',
        function ($scope, $http, selectedItemService, itemService) {
            selectedItemService.register(function () {
                itemService.get(selectedItemService.selectedItemId(), function (error, item) {
                    if (error) {
                        console.log(error);
                    } else {
                        $scope.item = item;
                    }
                });
            });
        }
    ]);
