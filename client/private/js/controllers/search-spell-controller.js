// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchSpellController',
    ['$scope', '$rootScope', '$timeout', '$routeParams', 'spellService', 'locationService',
        function ($scope, $rootScope, $timeout, $routeParams, spellService, locationService) {

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
            $scope.$on('$routeChangeSuccess', function () {
                $scope.selectedSpellId = $routeParams.spellId;
            });

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

            refreshSpells();
            $scope.$watchCollection("[sortBy,class]", function (newValue, oldValue) {
                if (angular.equals(newValue, oldValue)) {
                    return;
                }
                $scope.currentPage = 1;
                refreshSpells();
            });

            $scope.$watch("currentPage", function (newValue, oldValue) {
                if (angular.equals(newValue, oldValue)) {
                    return;
                }
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
                locationService.goToDetails('spell', id);

            };

            $scope.$watch('spellNameSubstring', function (spellNameSubstring, oldValue) {
                if (angular.equals(spellNameSubstring, oldValue)) {
                    return;
                }
                $timeout(function () {
                    if (spellNameSubstring === $scope.spellNameSubstring) {
                        $scope.currentPage = 1;
                        refreshSpells();
                    }
                }, 300);
            });

            $scope.$watchCollection("[minLevel, maxLevel]", function (levelRange, oldValue) {
                if (angular.equals(levelRange, oldValue)) {
                    return;
                }
                $timeout(function () {
                    if (levelRange[0] === $scope.minLevel && levelRange[1] === $scope.maxLevel) {
                        $scope.currentPage = 1;
                        refreshSpells();
                    }
                }, 300);
            });
        }
    ]);