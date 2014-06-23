"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SidebarController',
    ['$scope', 'encounterService', 'encounterEditorService', 'contentTreeService',
        function ($scope, encounterService, encounterEditorService, contentTreeService) {

            $scope.createEncounter = function () {
                contentTreeService.createEncounter();
            };

            $scope.selectEncounter = function (encounter) {
                $scope.go("/encounter/" + encounter._id);
            };

            $scope.createBinder = function () {
                contentTreeService.createBinder();
            };

            $scope.createUserMonster = function () {
                contentTreeService.createUserMonster();
            };
            $scope.createUserNpc = function () {
                contentTreeService.createUserNpc();
            };
        }
    ]);