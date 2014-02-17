"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterController',
    ['$scope', 'encounterService', 'selectedMonsterService', 'selectedEncounterService', 'selectedItemService', 'lootService',
        function ($scope, encounterService, selectedMonsterService, selectedEncounterService, selectedItemService, lootService) {

            $scope.encounterChanged = function () {
                if ($scope.encounter) {
                    encounterService.encounterChanged($scope.encounter);
                }
            }

            $scope.encounter = undefined;

            $scope.selectMonsterById = function (id) {
                selectedMonsterService.selectedMonsterId(id);
                $('#monstersTab').click();
            }

            $scope.selectItemById = function (id) {
                selectedItemService.selectedItemId(id);
                $('#itemsTab').click();
            }

            $scope.removeEncounter = function () {
                $(".encounter-well").fadeOut(200, function () {
                    var index = encounterService.encounters.indexOf($scope.encounter);
                    encounterService.encounters.splice(index, 1);
                    encounterService.remove($scope.encounter);
                    selectedEncounterService.selectedEncounter(encounterService.encounters[0], true /* allow undefined */);
                    $(".encounter-well").fadeIn(200);
                });
            }

            $scope.incrementMonster = function (monster) {
                monster.amount++;
                $scope.encounterChanged();
            }

            $scope.decrementMonster = function (monster) {
                if (monster.amount > 1) {
                    monster.amount--;
                    $scope.encounterChanged();
                }
            }

            $scope.removeMonsterById = function (monsterId) {
                delete $scope.encounter.Monsters[monsterId];
                $scope.encounterChanged();
            }

            $scope.incrementItem = function (item) {
                item.amount++;
                $scope.encounterChanged();
            }

            $scope.decrementItem = function (item) {
                if (item.amount > 1) {
                    item.amount--;
                    $scope.encounterChanged();
                }
            }

            $scope.removeItemById = function (itemId) {
                delete $scope.encounter.items[itemId];
                $scope.encounterChanged();
            }

            selectedEncounterService.register(function () {
                $scope.encounter = selectedEncounterService.selectedEncounter();
            });

            $scope.createFirstEncounter = function () {
                /* FIXME: this is duplicated with encounter-list-controller */
                var encounter = { Name: "Untitled #0", CR: "0", Monsters: {}, coins: {pp:0,gp:0,sp:0,cp:0}};
                selectedEncounterService.selectedEncounter(encounter);
                encounterService.encounters.push(encounter);
                encounterService.encounterChanged(encounter);
            }

            $scope.randomizeLoot = function (encounter) {
                var loot = lootService.generateEncounterLoot(encounter, 'medium');
                encounter.coins = loot.coins;
                encounter.items = {};
                for (var i in loot.items) {
                    var item = loot.items[i];
                    encounter.items[item.id] = item;
                }
                encounterService.encounterChanged(encounter);
            }
        }
    ]);