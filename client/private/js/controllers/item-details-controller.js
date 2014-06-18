"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ItemDetailsController',
    ['$scope', '$http', '$routeParams', 'itemService','favouriteService',
        function ($scope, $http, $routeParams, itemService,favouriteService) {
            $scope.pending = true;
            $scope.toggleFavourite = function () {
                if ($scope.favourite) {
                    favouriteService.removeFavourite($scope.item.id);
                } else {
                    favouriteService.addFavourite($scope.item.Name, $scope.item.id, 'item', false);
                }
                $scope.favourite = !$scope.favourite;
            };
            itemService.get($routeParams.itemId || $routeParams.detailsId, function (error, item) {
                $scope.pending = false;
                if (error) {
                    console.log(error);
                } else {
                    $scope.item = item;
                    $scope.favourite = favouriteService.isFavourite(item.id);
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
