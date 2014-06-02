"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchSpellController',
    ['$scope', '$timeout','$routeParams', 'spellService', 'selectedSpellService',
        function ($scope, $timeout,$routeParams, spellService, selectedSpellService) {

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
            $scope.refreshingSpells = false;

            if ($routeParams.spellId) {
                $timeout(function () {
                    selectedSpellService.selectedSpellId($routeParams.spellId);
                    $('#spellsTab').click();
                });
            }


            function refreshSpells() {
                $scope.refreshingSpells = true;
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
                    $scope.refreshingSpells = false;
                });
            }

            $scope.$watchCollection("[sortBy, currentPage,class]", function () {
                if ($scope.currentPage < 9) {
                    $scope.maxSize = 5;
                }
                else if ($scope.currentPage < 99) {
                    $scope.maxSize = 4;
                }
                else {
                    $scope.maxSize = 3;
                }
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
        }
    ]);