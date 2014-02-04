"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterController',
    ['$scope', 'encounterService', 'selectedMonsterService', 'selectedEncounterService',
        function ($scope, encounterService, selectedMonsterService, selectedEncounterService) {
            $scope.encounter = undefined;

            $scope.$watch('encounter.Name', function () {
                encounterService.upsert($scope.encounter);
            });

            $scope.selectMonster = function (id) {
                selectedMonsterService.selectedMonsterId(id);
            }

            $scope.removeEncounter = function () {

            }

            $scope.incrementMonster = function () {

            }

            $scope.decrementMonster = function () {

            }

            $scope.removeMonsterById = function (monsterId) {
                delete $scope.encounter.Monsters[monsterId];
            }

            selectedEncounterService.register(function () {
                $scope.encounter = selectedEncounterService.selectedEncounter();
            });
        }
    ]);