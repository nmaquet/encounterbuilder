"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchNpcController',
    ['$scope','$rootScope', '$timeout', '$routeParams', 'npcService', 'encounterService', 'encounterEditorService',
        function ($scope,$rootScope, $timeout, $routeParams, npcService, encounterService, encounterEditorService) {

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

            $scope.selectedNpcId = $routeParams.npcId;
            $rootScope.$on('$routeChangeSuccess', function () {
                $scope.selectedNpcId = $routeParams.npcId;
            });

            $scope.$watchCollection("[sortBy, currentPage, class]", function () {
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

            $scope.$watch('nameSubstring', function (search_string) {
                $timeout(function () {
                    if (search_string === $scope.nameSubstring) {
                        $scope.refreshNpcs();
                    }
                }, 300);
            });

            $scope.$watchCollection("[minCR, maxCR]", function (crRange) {
                $timeout(function () {
                    if (crRange[0] === $scope.minCR && crRange[1] === $scope.maxCR) {
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
                    maxCR: $scope.maxCR
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

            $scope.selectNpc = function (id) {
                if ($routeParams.encounterId) {
                    $scope.go('/encounter/' + $routeParams.encounterId + '/npc/' + id);
                } else {
                    $scope.go('/npc/' + id);
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
                if (!encounter.Npcs[npc.id]) {
                    encounter.Npcs[npc.id] = {
                        amount: Number(npc.amountToAdd),
                        Name: npc.Name,
                        XP: npc.XP,
                        CR: npc.CR,
                        Type: npc.Type,
                        Heroic: npc.Heroic,
                        Level: npc.Level
                    };
                }
                else {
                    encounter.Npcs[npc.id].amount += Number(npc.amountToAdd) || 1;
                }
                delete npc.amountToAdd;
                encounterService.encounterChanged(encounter);
            }

            $scope.addNpc = function (npc) {
                if ($routeParams.npcId) {
                    addNpcToEditedEncounter(npc);
                }
                // FIXME: also allow adding to binder
            };
        }
    ]);