"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchNpcController',
    ['$scope', '$timeout', '$routeParams', 'npcService', 'encounterService', 'encounterEditorService',
        function ($scope, $timeout, $routeParams, npcService, encounterService, encounterEditorService) {

            $scope.nameSubstring = '';
            $scope.class = 'any';
            $scope.minCR = 0;
            $scope.maxCR = 20;
            $scope.sortBy = 'name';
            $scope.totalItems = 0;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 15;
            $scope.maxSize = 5;
            $scope.listTimestamp = 0;
            $scope.refreshingNpcs = false;

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
                    findLimit: $scope.itemsPerPage,
                    minCR: $scope.minCR,
                    maxCR: $scope.maxCR
                };
                npcService.search(params, function (error, data) {
                    if (error) {
                        console.log('Error in your face: ' + error);
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
                $location.path('/npc/' + id);
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