// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', 'encounterService', 'lootService', 'encounterEditorService', 'contentTreeService', 'locationService',
        function ($rootScope, $scope, $timeout, $routeParams, encounterService, lootService, encounterEditorService, contentTreeService, locationService) {
            $scope.showButtons = true;
            $scope.editable = true;
            $scope.userResourceChanged = function () {
                if ($scope.userResource) {
                    encounterService.encounterChanged($scope.userResource);
                    contentTreeService.changeEncounter($scope.userResource);
                }
            };

            $scope.pending = true;
            encounterService.get($routeParams.encounterId, function (error, encounter) {
                $scope.pending = false;
                if (error) {
                    console.log(error);
                }
                else {
                    $scope.userResource = encounterEditorService.encounter = encounter;
                    encounterService.updateUserContent($scope.userResource);
                    $rootScope.globalTitle = "Chronicle Forge - " + $scope.userResource.Name;
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
                    var index = encounterService.encounters.indexOf($scope.userResource);
                    encounterService.encounters.splice(index, 1);
                    encounterService.remove($scope.userResource);
                    contentTreeService.removeEncounter($scope.userResource);
                    $scope.go("/"); // FIXME: should go to the parent binder ?
                };
            };

            $scope.atLeastOneMonster = function () {
                return ($scope.userResource !== undefined) && ($scope.userResource.Monsters !== undefined) && (Object.keys($scope.userResource.Monsters).length > 0);
            };

            $scope.atLeastOneNpc = function () {
                return ($scope.userResource !== undefined) && ($scope.userResource.Npcs !== undefined) && (Object.keys($scope.userResource.Npcs).length > 0);
            };


            $scope.incrementMonster = function (monster) {
                monster.amount++;
                $scope.userResourceChanged();
            };

            $scope.decrementMonster = function (monster) {
                if (monster.amount > 1) {
                    monster.amount--;
                    $scope.userResourceChanged();
                }
            };

            $scope.removeMonsterById = function (monsterId) {
                delete $scope.userResource.Monsters[monsterId];
                $scope.userResourceChanged();
            };

            $scope.removeNpcById = function (monsterId) {
                delete $scope.userResource.Npcs[monsterId];
                $scope.userResourceChanged();
            };

            $scope.incrementItem = function (item) {
                item.amount++;
                $scope.userResourceChanged();
            };

            $scope.decrementItem = function (item) {
                if (item.amount > 1) {
                    item.amount--;
                    $scope.userResourceChanged();
                }
            };

            $scope.removeItemById = function (itemId) {
                delete $scope.userResource.items[itemId];
                $scope.userResourceChanged();
            };

            $scope.printSelectedEncounter = function () {
                $scope.go('/print-encounter/' + $scope.userResource._id);
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
                if ($scope.userResource && $scope.userResource._id === lootService.encounterId && lootService.generatedLoot) {
                    $scope.userResource.coins = lootService.generatedLoot.coins;
                    $scope.userResource.items = lootService.generatedLoot.items;
                    encounterService.encounterChanged($scope.userResource);
                }
                else {
                    lootService.generatedLoot = null;
                    lootService.encounterId = null;
                }
            });
        }
    ]);