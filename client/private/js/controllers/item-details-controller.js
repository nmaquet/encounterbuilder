"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ItemDetailsController',
    ['$scope', '$http', '$routeParams', 'itemService',
        function ($scope, $http, $routeParams, itemService) {
            $scope.pending = true;
            itemService.get($routeParams.itemId, function (error, item) {
                $scope.pending = false;
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
        }
    ]);
