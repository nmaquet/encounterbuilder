"use strict";

DEMONSQUID.encounterBuilderControllers.controller('PrintableEncounterController',
    ['$scope', '$location', '$timeout', 'selectedEncounterService', 'encounterService', 'monsterService',
        function ($scope, $location, $timeout, selectedEncounterService, encounterService, monsterService) {

            $scope.monstersOdd = [];
            $scope.monstersEven = [];

            selectedEncounterService.register(function () {
                $scope.encounter = selectedEncounterService.selectedEncounter();
                monsterService.getMultiple(Object.keys($scope.encounter.Monsters), function (error, monsters) {
                    for (var i in monsters) {
                        if (i % 2 === 0) {
                            $scope.monstersOdd.push(monsters[i]);
                        } else{
                            $scope.monstersEven.push(monsters[i]);
                        }
                    }
                    $timeout(function () {
                        window.print();
                    }, 0);
                });
            });

            $scope.back = function () {
                $location.path('/');
            }
        }
    ]);