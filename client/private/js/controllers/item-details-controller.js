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
                            $scope.item.Cost = Number(item.Price) / 2;
                            $scope.item.CostUnit = $scope.item.PriceUnit;
                            if ($scope.item.Group === "Potion" || $scope.item.Group === "Oil") {
                                $scope.item.Requirements = "Brew Potion, " + item.SpellName;
                            }
                            if ($scope.item.Group === "Scroll") {
                                $scope.item.Requirements = "Scribe Scroll, " + item.SpellName;

                            }
                            if ($scope.item.Group === "Wand") {
                                $scope.item.Requirements = "Craft Wand, " + item.SpellName;
                            }
                        }
                    }
                });
            });
        }
    ]);
