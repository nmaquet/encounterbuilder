// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchNpcController',
    ['$scope', '$rootScope', '$timeout', '$routeParams', 'npcService', 'encounterService', 'encounterEditorService', 'locationService',
        function ($scope, $rootScope, $timeout, $routeParams, npcService, encounterService, encounterEditorService, locationService) {

            var lastSearchParam = npcService.lastSearchParam();
            $scope.nameSubstring = lastSearchParam ? lastSearchParam.nameSubstring : '';
            $scope.class = lastSearchParam ? lastSearchParam.class : 'any';
            $scope.minCR = lastSearchParam ? lastSearchParam.minCR : 0;
            $scope.maxCR = lastSearchParam ? lastSearchParam.maxCR : 20;
            $scope.sortBy = lastSearchParam ? lastSearchParam.sortBy : 'name';
            $scope.totalItems = 0;
            $scope.currentPage = lastSearchParam ? lastSearchParam.currentPage : 1;
            $scope.itemsPerPage = 15;
            $scope.maxSize = 5;
            $scope.listTimestamp = 0;
            $scope.refreshingNpcs = false;

            $scope.selectedNpcId = $routeParams.npcId || $routeParams.userNpcId || $routeParams.detailsId;

            $scope.userCreated = false;

            $scope.$on('$routeChangeSuccess', function () {
                $scope.selectedNpcId = $routeParams.npcId || $routeParams.userNpcId || $routeParams.detailsId;
            });

            $scope.$watchCollection("[sortBy, class]", function (newValue, oldValue) {
                if (angular.equals(newValue, oldValue)) {
                    return;
                }
                $scope.currentPage = 1;
                $scope.refreshNpcs();
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
                $scope.refreshNpcs();
            });

            $scope.$watch('userCreated', function (value, oldValue) {
                if (angular.equals(value, oldValue)) {
                    return;
                }
                $timeout(function () {
                    if (value === $scope.userCreated) {
                        $scope.currentPage = 1;
                        $scope.refreshNpcs();
                    }
                }, 300);
            });

            $scope.$watch('nameSubstring', function (search_string, oldValue) {
                if (angular.equals(search_string, oldValue)) {
                    return;
                }
                $timeout(function () {
                    if (search_string === $scope.nameSubstring) {
                        $scope.currentPage = 1;
                        $scope.refreshNpcs();
                    }
                }, 300);
            });

            $scope.$watchCollection("[minCR, maxCR]", function (crRange, oldValue) {
                if (angular.equals(crRange, oldValue)) {
                    return;
                }
                $timeout(function () {
                    if (crRange[0] === $scope.minCR && crRange[1] === $scope.maxCR) {
                        $scope.currentPage = 1;
                        $scope.refreshNpcs();
                    }
                }, 300);
            });

            $scope.refreshNpcs = function () {
                $scope.refreshingNpcs = true;
                var params = {
                    nameSubstring: $scope.nameSubstring,
                    sortBy: $scope.sortBy,
                    class: $scope.class,
                    skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
                    currentPage: $scope.currentPage,
                    findLimit: $scope.itemsPerPage,
                    minCR: $scope.minCR,
                    maxCR: $scope.maxCR,
                    userCreated: $scope.userCreated
                };
                npcService.search(params, function (error, data) {
                    if (error) {
                        console.log(error);
                    } else {
                        if (data.timestamp >= $scope.listTimestamp) {
                            $scope.npcs = data.npcs;
                            $scope.totalItems = data.count;
                            $scope.listTimestamp = data.timestamp;
                        }
                    }
                    $scope.refreshingNpcs = false;
                });
            };
            $scope.refreshNpcs();
            $scope.selectNpc = function (id) {
                if ($scope.userCreated) {
                    locationService.goToDetails('user-npc', id);
                } else {
                    locationService.goToDetails('npc', id);
                }
            };

            function addNpcToEditedEncounter(npc) {
                if (!/^(\d+)$/.exec(npc.amountToAdd)) {
                    npc.amountToAdd = 1;
                }
                var encounter = encounterEditorService.encounter;
                if (!encounter.Npcs) {
                    encounter.Npcs = {};
                }
                var id = npc.id || npc._id;
                if (!encounter.Npcs[id]) {
                    encounter.Npcs[id] = {
                        amount: Number(npc.amountToAdd),
                        Name: npc.Name,
                        XP: npc.XP,
                        CR: npc.CR,
                        Type: npc.Type,
                        Heroic: npc.Heroic,
                        Level: npc.Level
                    };
                    if (npc.id === undefined) {
                        encounter.Npcs[id].userCreated = true;
                    }
                }
                else {
                    encounter.Npcs[id].amount += Number(npc.amountToAdd) || 1;
                }
                delete npc.amountToAdd;
                encounterService.encounterChanged(encounter);
            }

            $scope.addNpc = function (npc) {
                if ($routeParams.encounterId) {
                    addNpcToEditedEncounter(npc);
                }
                // FIXME: also allow adding to binder
            };
        }
    ]);