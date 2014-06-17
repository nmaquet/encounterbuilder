"use strict";

DEMONSQUID.encounterBuilderControllers.controller('MonsterDetailController', ['$scope', '$sce', '$routeParams', 'monsterService','contentTreeService',
    function ($scope, $sce, $routeParams, monsterService,contentTreeService) {
        $scope.pending = true;
        monsterService.get($routeParams.monsterId || $routeParams.detailsId, function (error, monster) {
            $scope.pending = false;
            if (error) {
                console.log(error);
            } else {
                $scope.monster = monster;
                if ($scope.monster) {
                    $scope.monster.DescriptionSafe = $sce.trustAsHtml($scope.monster.Description);
                    $scope.monster.SLASafe = $sce.trustAsHtml($scope.monster.SpellLikeAbilities);
                    $scope.monster.SpecialAbilitiesSafe = $sce.trustAsHtml($scope.monster.SpecialAbilities);
                }
            }
        });
        $scope.copyMonster = function(){
            contentTreeService.copyUserMonster($scope.monster.id);
        }
    }
]);