"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchSpellController',
    ['$scope', '$timeout', '$routeParams', 'spellService',
        function ($scope, $timeout, $routeParams, spellService) {

            var lastSearchParam = spellService.lastSearchParam();

            $scope.spellNameSubstring = lastSearchParam ? lastSearchParam.nameSubstring : '';
            $scope.class = lastSearchParam ? lastSearchParam.class : 'any';
            $scope.sortBy = lastSearchParam ? lastSearchParam.sortBy : 'name';
            $scope.minLevel = lastSearchParam ? lastSearchParam.minLevel : 0;
            $scope.maxLevel = lastSearchParam ? lastSearchParam.maxLevel : 9;

            $scope.totalSpells = 0;
            $scope.currentPage = lastSearchParam ? lastSearchParam.currentPage : 1;
            $scope.spellsPerPage = 15;
            $scope.maxSize = 5;

            $scope.spells = [];
            $scope.refreshingSpells = false;

            $scope.selectedSpellId = $routeParams.spellId;

            function refreshSpells() {
                $scope.refreshingSpells = true;
                var params = {
                    nameSubstring: $scope.spellNameSubstring,
                    class: $scope.class,
                    minLevel: $scope.minLevel,
                    maxLevel: $scope.maxLevel,
                    sortBy: $scope.sortBy,
                    skip: ($scope.currentPage - 1) * $scope.spellsPerPage,
                    currentPage: $scope.currentPage,
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
                $scope.go('spell', id);
            }

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