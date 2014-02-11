"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterController',
    ['$scope', 'encounterService', 'selectedMonsterService', 'selectedEncounterService', 'selectedItemService',
        function ($scope, encounterService, selectedMonsterService, selectedEncounterService, selectedItemService) {

            function encounterChanged() {
                if ($scope.encounter) {
                    encounterService.encounterChanged($scope.encounter);
                }
            }

            $scope.encounter = undefined;

            $scope.encounterNameChanged = function () {
                encounterChanged();
            }

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
                encounterChanged();
            }

            $scope.decrementMonster = function (monster) {
                if (monster.amount > 1) {
                    monster.amount--;
                    encounterChanged();
                }
            }

            $scope.removeMonsterById = function (monsterId) {
                delete $scope.encounter.Monsters[monsterId];
                encounterChanged();
            }

            $scope.incrementItem = function (item) {
                item.amount++;
                encounterChanged();
            }

            $scope.decrementItem = function (item) {
                if (item.amount > 1) {
                    item.amount--;
                    encounterChanged();
                }
            }

            $scope.removeItemById = function (itemId) {
                delete $scope.encounter.items[itemId];
                encounterChanged();
            }

            selectedEncounterService.register(function () {
                $scope.encounter = selectedEncounterService.selectedEncounter();
            });

            $scope.createFirstEncounter = function () {
                var encounter = { Name: "Untitled #0", CR: "0", Monsters: {}};
                selectedEncounterService.selectedEncounter(encounter);
                encounterService.encounters.push(encounter);
                encounterService.encounterChanged(encounter);
            }
        }
    ]);