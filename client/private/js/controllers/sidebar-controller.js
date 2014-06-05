"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SidebarController',
    ['$scope', '$location', 'encounterService', 'encounterEditorService', 'contentTreeService',
        function ($scope, $location, encounterService, encounterEditorService, contentTreeService) {

            $scope.encounters = encounterService.encounters;
            $scope.createEncounter = function () {
                function exists(name) {
                    for (var encounter in encounterService.encounters) {
                        if (encounterService.encounters[encounter].Name === name) {
                            return true;
                        }
                    }
                    return false;
                }

                var i = 0, encounter;
                do {
                    //FIXME this is duplicated in encounter-controller
                    encounter = { Name: "Untitled #" + i, CR: "0", Monsters: {}, coins: {pp: 0, gp: 0, sp: 0, cp: 0}};
                    ++i;
                } while (exists(encounter.Name));

                contentTreeService.newEncounter(encounter);
                encounterService.encounters.unshift(encounter);
                encounterService.newEncounter(encounter, function (encounterWithId) {
                    encounterEditorService.encounter = encounterWithId;
                    contentTreeService.newEncounter(encounter);
                    $scope.selectEncounter(encounter);
                });
            };

            $scope.selectEncounter = function (encounter) {
                $location.path("/encounter/" + encounter._id);
            };

            $scope.createBinder = function () {
                contentTreeService.createBinder();
            };
        }
    ]);