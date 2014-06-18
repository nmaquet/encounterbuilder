"use strict";

DEMONSQUID.encounterBuilderControllers.controller('NpcDetailController',
    ['$scope', '$sce', '$routeParams', 'npcService', 'favouriteService',
        function ($scope, $sce, $routeParams, npcService, favouriteService) {
            $scope.pending = true;
            $scope.toggleFavourite = function () {
                if ($scope.favourite) {
                    favouriteService.removeFavourite($scope.npc.id);
                } else {
                    favouriteService.addFavourite($scope.npc.Name, $scope.npc.id, 'npc', false);
                }
                $scope.favourite = !$scope.favourite;
            };
            npcService.get($routeParams.npcId || $routeParams.detailsId, function (error, npc) {
                $scope.pending = false;
                if (error) {
                    console.log(error);
                } else {
                    $scope.npc = npc;
                    $scope.favourite = favouriteService.isFavourite(npc.id);
                    if ($scope.npc) {
                        $scope.npc.DescriptionSafe = $sce.trustAsHtml($scope.npc.Description);
                        $scope.npc.SLASafe = $sce.trustAsHtml($scope.npc.SpellLikeAbilities);
                        $scope.npc.SpecialAbilitiesSafe = $sce.trustAsHtml($scope.npc.SpecialAbilities);
                    }
                }
            });
        }
    ]);

// FIXME remove this ?
function parseSpellknown(spells) {
    spells = spells.replace("Spells Known ", "");
    var CL = spells.substring(1, spells.indexOf(')'));
    spells = spells.slice(0, spells.indexOf(')'));
    var spellsByLevel = spells.split("-");
    return spells;
}