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
                        if ($scope.item.Derived) {
                            if ($scope.item.Group === "Potion") {
                                $scope.item.Requirements = "Brew Potion, " + item.SpellName;
                                $scope.item.Cost = Number(item.Price) / 2;
                                $scope.item.CostUnit = $scope.item.PriceUnit;
                            }
                        }
                    }
                });
            });
        }
    ]);
