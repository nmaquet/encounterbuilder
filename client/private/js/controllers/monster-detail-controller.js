"use strict";

DEMONSQUID.encounterBuilderControllers.controller('MonsterDetailController', ['$scope', '$sce', 'monsterService', 'selectedMonsterService',
    function ($scope, $sce, monsterService, selectedMonsterService) {
        $scope.pending = false;
        selectedMonsterService.register(function () {
            $scope.pending = true;
            monsterService.get(selectedMonsterService.selectedMonsterId(), function (error, monster) {
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
        });
    }
]);