"use strict";

DEMONSQUID.encounterBuilderControllers.controller('NpcDetailController', ['$scope', '$sce', 'npcService', 'selectedNpcService',
    function ($scope, $sce, npcService, selectedNpcService) {
        selectedNpcService.register(function () {
            npcService.get(selectedNpcService.selectedNpcId(), function (error, npc) {
                if (error) {
                    console.log(error);
                } else {
                    $scope.npc = npc;
                    if ($scope.npc) {
                        $scope.npc.DescriptionSafe = $sce.trustAsHtml($scope.npc.Description);
                        $scope.npc.SLASafe = $sce.trustAsHtml($scope.npc.SpellLikeAbilities);
                        $scope.npc.SpecialAbilitiesSafe = $sce.trustAsHtml($scope.npc.SpecialAbilities);
                    }
                }
            });
        });
    }
]);