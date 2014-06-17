"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SpellDetailsController',
    ['$scope', '$http', '$sce', '$routeParams', 'spellService', 'favouriteService',
        function ($scope, $http, $sce, $routeParams, spellService, favouriteService) {
            $scope.pending = true;
            $scope.toggleFavourite = function () {
                if ($scope.favourite) {
                    favouriteService.removeFavourite($scope.spell.id);
                } else {
                    favouriteService.addFavourite($scope.spell.name, $scope.spell.id, 'spell', false);
                }
                $scope.favourite = !$scope.favourite;
            };
            spellService.get($routeParams.spellId || $routeParams.detailsId, function (error, spell) {
                $scope.pending = false;
                if (error) {
                    console.log(error);
                } else {
                    $scope.spell = spell;
                    $scope.favourite = favouriteService.isFavourite(spell.id);
                    if ($scope.spell) {
                        $scope.spell.descriptionSafe = $sce.trustAsHtml($scope.spell.description_formated);
                    }
                }
            });
        }
    ]);
