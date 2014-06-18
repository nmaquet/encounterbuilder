"use strict";

DEMONSQUID.encounterBuilderControllers.controller('MonsterDetailController',
    ['$scope', '$sce', '$routeParams', 'monsterService', 'contentTreeService', 'favouriteService',
        function ($scope, $sce, $routeParams, monsterService, contentTreeService,favouriteService) {
            $scope.pending = true;
            $scope.toggleFavourite = function () {
                if ($scope.favourite) {
                    favouriteService.removeFavourite($scope.monster.id);
                } else {
                    favouriteService.addFavourite($scope.monster.Name, $scope.monster.id, 'monster', false);
                }
                $scope.favourite = !$scope.favourite;
            };
            monsterService.get($routeParams.monsterId || $routeParams.detailsId, function (error, monster) {
                $scope.pending = false;
                if (error) {
                    console.log(error);
                } else {
                    $scope.monster = monster;
                    $scope.favourite = favouriteService.isFavourite(monster.id);
                    if ($scope.monster) {
                        $scope.monster.DescriptionSafe = $sce.trustAsHtml($scope.monster.Description);
                        $scope.monster.SLASafe = $sce.trustAsHtml($scope.monster.SpellLikeAbilities);
                        $scope.monster.SpecialAbilitiesSafe = $sce.trustAsHtml($scope.monster.SpecialAbilities);
                    }
                }
            });
            $scope.copyMonster = function () {
                contentTreeService.copyUserMonster($scope.monster.id);
            }
        }
    ]);