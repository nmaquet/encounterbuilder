"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchSpellController',
    ['$scope', '$timeout', 'spellService', 'selectedSpellService',
        function ($scope, $timeout, spellService, selectedSpellService) {

            $scope.spellNameSubstring = '';
            $scope.class = 'any';
            $scope.sortBy = 'name';
            $scope.minLevel = 0;
            $scope.maxLevel = 9;

            $scope.totalSpells = 0;
            $scope.currentPage = 1;
            $scope.spellsPerPage = 15;
            $scope.maxSize = 5;

            $scope.spells = [];

            function refreshSpells() {
                var params = {
                    nameSubstring: $scope.spellNameSubstring,
                    class: $scope.class,
                    minLevel: $scope.minLevel,
                    maxLevel: $scope.maxLevel,
                    sortBy: $scope.sortBy,
                    skip: ($scope.currentPage - 1) * $scope.spellsPerPage,
                    findLimit: $scope.spellsPerPage
                };
                spellService.search(params, function (error, data) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        $scope.spells = data.spells;
                        $scope.totalSpells = data.count;
                    }
                });
            }

            $scope.$watchCollection("[sortBy, currentPage,class]", function () {
                refreshSpells();
            });

            $scope.selectSpellById = function (id) {
                selectedSpellService.selectedSpellId(id);
            }

            selectedSpellService.register(function () {
                $scope.selectedSpellId = selectedSpellService.selectedSpellId();
            });

            $scope.$watch('spellNameSubstring', function (spellNameSubstring) {
                $timeout(function () {
                    if (spellNameSubstring === $scope.spellNameSubstring) {
                        refreshSpells();
                    }
                }, 300);
            });

            $scope.$watchCollection("[minLevel, maxLevel]", function (levelRange) {
                $timeout(function () {
                    if (levelRange[0] === $scope.minLevel && levelRange[1] === $scope.maxLevel) {
                        refreshSpells();
                    }
                }, 300);
            });

            $("#spellLevelSlider").noUiSlider({
                start: [0, 9],
                connect: true,
                step: 1,
                range: {
                    'min': 0,
                    'max': 9
                }
            });

            $("#spellLevelSlider").on('slide', function () {
                $scope.minLevel = $("#spellLevelSlider").val()[0];
                $scope.maxLevel = $("#spellLevelSlider").val()[1];
                $scope.$apply();
            });
        }
    ]);