"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SpellDetailsController',
    ['$scope', '$http', '$sce', '$routeParams', 'spellService',
        function ($scope, $http, $sce, $routeParams, spellService) {
            $scope.pending = true;
            spellService.get($routeParams.spellId || $routeParams.detailsId, function (error, spell) {
                $scope.pending = false;
                if (error) {
                    console.log(error);
                } else {
                    $scope.spell = spell;
                    if ($scope.spell) {
                        $scope.spell.descriptionSafe = $sce.trustAsHtml($scope.spell.description_formated);
                    }
                }
            });
        }
    ]);
