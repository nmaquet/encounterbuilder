"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', 'encounterService', 'lootService', 'encounterEditorService', 'contentTreeService', 'locationService',
        function ($rootScope, $scope, $timeout, $routeParams, encounterService, lootService, encounterEditorService, contentTreeService, locationService) {

            $scope.encounterChanged = function () {
                if ($scope.encounter) {
                    encounterService.encounterChanged($scope.encounter);
                    contentTreeService.changeEncounter($scope.encounter);
                }
            };

            $scope.pending = true;
            encounterService.get($routeParams.encounterId, function (error, encounter) {
                $scope.pending = false;
                if (error) {
                    console.log(error);
                }
                else {
                    $scope.encounter = encounterEditorService.encounter = encounter;
                    encounterService.updateUserContent($scope.encounter);
                    $rootScope.globalTitle = "Encounter Builder - " + $scope.encounter.Name;
                }
            });

            $scope.selectMonsterById = function (id, userCreated) {
                if (userCreated) {
                    locationService.goToDetails('user-monster', id);
                } else {
                    locationService.goToDetails('monster', id);
                }

            };

            $scope.selectNpcById = function (id, userCreated) {
                if (userCreated) {
                    locationService.goToDetails('user-npc', id);
                } else {
                    locationService.goToDetails('npc', id);
                }
            };

            $scope.selectItemById = function (id, userCreated) {
                if (userCreated) {
                    locationService.goToDetails('user-item', id);
                }
                else {
                    locationService.goToDetails('item', id);
                }
            };

            $scope.removeEncounter = function () {
                $scope.startFade = function () {
                    var index = encounterService.encounters.indexOf($scope.encounter);
                    encounterService.encounters.splice(index, 1);
                    encounterService.remove($scope.encounter);
                    contentTreeService.removeEncounter($scope.encounter);
                    $scope.go("/"); // FIXME: should go to the parent binder ?
                };
            };

            $scope.atLeastOneMonster = function () {
                return ($scope.encounter !== undefined) && ($scope.encounter.Monsters !== undefined) && (Object.keys($scope.encounter.Monsters).length > 0);
            };

            $scope.atLeastOneNpc = function () {
                return ($scope.encounter !== undefined) && ($scope.encounter.Npcs !== undefined) && (Object.keys($scope.encounter.Npcs).length > 0);
            };


            $scope.incrementMonster = function (monster) {
                monster.amount++;
                $scope.encounterChanged();
            };

            $scope.decrementMonster = function (monster) {
                if (monster.amount > 1) {
                    monster.amount--;
                    $scope.encounterChanged();
                }
            };

            $scope.removeMonsterById = function (monsterId) {
                delete $scope.encounter.Monsters[monsterId];
                $scope.encounterChanged();
            };

            $scope.removeNpcById = function (monsterId) {
                delete $scope.encounter.Npcs[monsterId];
                $scope.encounterChanged();
            };

            $scope.incrementItem = function (item) {
                item.amount++;
                $scope.encounterChanged();
            };

            $scope.decrementItem = function (item) {
                if (item.amount > 1) {
                    item.amount--;
                    $scope.encounterChanged();
                }
            };

            $scope.removeItemById = function (itemId) {
                delete $scope.encounter.items[itemId];
                $scope.encounterChanged();
            };

            $scope.printSelectedEncounter = function () {
                $scope.go('/print-encounter/' + $scope.encounter._id);
            };

            $scope.createFirstEncounter = function () {
                /* FIXME: this is duplicated with encounter-list-controller */
                var encounter = { Name: "Untitled #0", CR: "0", Monsters: {}, coins: {pp: 0, gp: 0, sp: 0, cp: 0}};
                encounterService.encounters.unshift(encounter);
                encounterService.encounterChanged(encounter);
            };

            $scope.$watch(function () {
                return lootService.generatedLoot;
            }, function () {
                if ($scope.encounter && $scope.encounter._id === lootService.encounterId && lootService.generatedLoot) {
                    $scope.encounter.coins = lootService.generatedLoot.coins;
                    $scope.encounter.items = lootService.generatedLoot.items;
                    encounterService.encounterChanged($scope.encounter);
                }
                else {
                    lootService.generatedLoot = null;
                    lootService.encounterId = null;
                }
            });

//            $scope.randomizeLoot = function (encounter) {
//                lootService.generateEncounterLoot(encounter, 'medium', function (coins, items) {
//                    encounter.coins = coins;
//                    encounter.items = items;
//                    /* FIXME: this works, but makes a wasteful upsert */
//                    encounterService.encounterChanged(encounter);
//                });
//            }
        }
    ]);