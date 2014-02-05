"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ItemDetailsController', ['$scope', '$http', 'selectedItemService',
    function ($scope, $http, selectedItemService) {
        selectedItemService.register(function () {
            $scope.item = $http.get('/api/magic-item/' + selectedItemService.selectedItemId())
                .success(function (data) {
                    $scope.item = data.magicItem;
                })
                .error(function(error) {
                    console.log(error);
                });
        });
    }
])
;