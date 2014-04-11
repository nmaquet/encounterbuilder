"use strict";

DEMONSQUID.encounterBuilderControllers.controller('NpcDetailController', ['$scope', '$sce', 'npcService', 'selectedNpcService',
    function ($scope, $sce, npcService, selectedNpcService) {
        $scope.pending = false;
        selectedNpcService.register(function () {
            $scope.pending = true;
            npcService.get(selectedNpcService.selectedNpcId(), function (error, npc) {
                $scope.pending = false;
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

function parseSpellknown(spells){
    spells = spells.replace("Spells Known ","");
    var CL = spells.substring(1, spells.indexOf(')'));
    spells = spells.slice(0,spells.indexOf(')'));
    var spellsByLevel = spells.split("-");
    return spells;
}