// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SpellDetailsController',
    ['$rootScope', '$scope', '$http', '$sce', '$routeParams', 'spellService', 'favouriteService', 'contentTreeService',
        function ($rootScope, $scope, $http, $sce, $routeParams, spellService, favouriteService, contentTreeService) {
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
                    $scope.favourite = favouriteService.isFavourite(spell.id);
                    $scope.spell = spell;
                    if ($routeParams.spellId) {
                        $rootScope.globalTitle = "Chronicle Forge - " + $scope.spell.name;
                    }
                    if ($scope.spell) {
                        $scope.spell.descriptionSafe = $sce.trustAsHtml($scope.spell.description_formated);
                    }
                }
            });
            $scope.copySpell = function () {
                contentTreeService.copyResource($scope.spell.id, "user-spell");
            }
        }
    ]);
