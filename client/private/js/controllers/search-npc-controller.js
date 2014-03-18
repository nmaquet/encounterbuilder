"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchNpcController',
    ['$scope', '$timeout', 'npcService', 'encounterService', 'selectedEncounterService',
        function ($scope, $timeout, npcService, encounterService, selectedEncounterService) {

            $scope.nameSubstring = '';
            $scope.orderProp = 'cr';
            $scope.minCR = 0;
            $scope.maxCR = 39;

            $scope.$watchCollection("[orderProp, currentPage]", function () {
                $scope.refreshNpcs();
            });

            $scope.$watch('nameSubstring', function (search_string) {
                $timeout(function () {
                    if (search_string === $scope.nameSubstring) {
                        $scope.refreshNpcs();
                    }
                }, 300);
            });

            $scope.refreshNpcs = function () {
                var params = {
                    nameSubstring: $scope.nameSubstring,
                    order: $scope.orderProp,
                    skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
                    findLimit: $scope.itemsPerPage
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
                /* selectedMonsterService.selectedMonsterId(id) */;
            }

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
                        Type : npc.Type,
                        TreasureBudget : npc.TreasureBudget,
                        Heroic : npc.Heroic,
                        Level : npc.Level
                    };
                }
                else {
                    encounter.Npcs[npc.id].amount += Number(npc.amountToAdd) || 1;
                }
                delete npc.amountToAdd;
                encounterService.encounterChanged(encounter);
            }

            $scope.totalItems = 0;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 15;
            $scope.maxSize = 5;
            $scope.listTimestamp = 0;
            $scope.minCR = 0;
            $scope.maxCR = 40;
            $scope.crRange = $scope.minCR + " - " + $scope.maxCR;

            console.log("initializing slider");

            $("#npcCRSlider").noUiSlider({
                start: [0, 20],
                connect: true,
                range: {
                    'min': 0,
                    'max': 39
                }
            });

            /* selectedMonsterService.selectedMonsterId('bat'); */

            /* selectedMonsterService.register(function () {
                $scope.selectedMonsterId = selectedMonsterService.selectedMonsterId();
            }); */

            /* selectedEncounterService.register(function () {
                $scope.selectedEncounter = selectedEncounterService.selectedEncounter();
            }); */
        }
    ]);