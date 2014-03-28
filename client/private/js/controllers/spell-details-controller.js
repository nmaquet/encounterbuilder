"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SpellDetailsController',
    ['$scope', '$http', '$sce', 'selectedSpellService', 'spellService',
        function ($scope, $http, $sce, selectedSpellService, spellService) {
            selectedSpellService.register(function () {
                spellService.get(selectedSpellService.selectedSpellId(), function (error, spell) {
                    if (error) {
                        console.log(error);
                    } else {
                        $scope.spell = spell;
                        if ($scope.spell) {
                            $scope.spell.descriptionSafe = $sce.trustAsHtml($scope.spell.description_formated);
                        }
                    }
                });
            });
        }
    ]);
