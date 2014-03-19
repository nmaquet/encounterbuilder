"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchNpcController',
    ['$scope', '$timeout', 'npcService', 'encounterService', 'selectedEncounterService', 'selectedNpcService',
        function ($scope, $timeout, npcService, encounterService, selectedEncounterService, selectedNpcService) {

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

            $scope.$watchCollection("[sortBy, currentPage, class]", function () {
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
                });
            }

            $scope.selectNpc = function (id) {
                selectedNpcService.selectedNpcId(id);
            }

            selectedNpcService.register(function () {
                $scope.selectedNpcId = selectedNpcService.selectedNpcId();
            });

            selectedNpcService.selectedNpcId("12-headed-hydra");

            $scope.addNpc = function (npc) {
                if (!/^(\d+)$/.exec(npc.amountToAdd)) {
                    npc.amountToAdd = 1;
                }
                var encounter = selectedEncounterService.selectedEncounter();
                if (!encounter.Npcs) {
                    encounter.Npcs = {};
                }
                if (!encounter.Npcs[npc.id]) {
                    //FIXME use DEMONSQUID.clone
                    encounter.Npcs[npc.id] = {
                        amount: Number(npc.amountToAdd),
                        Name: npc.Name,
                        xp: npc.XP,
                        CR: npc.CR,
                        Type: npc.Type,
                        TreasureBudget: npc.TreasureBudget,
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

            $("#npcCRSlider").noUiSlider({
                start: [0, 20],
                connect: true,
                step: 1,
                range: {
                    'min': 0,
                    'max': 20
                }
            });

            $("#npcCRSlider").on('slide', function () {
                $scope.minCR = $("#npcCRSlider").val()[0];
                $scope.maxCR = $("#npcCRSlider").val()[1];
                $scope.$apply();
            });
        }
    ]);