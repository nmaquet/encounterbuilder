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
            $scope.createUserText = function () {
                contentTreeService.createUserText();
            };
            $scope.createUserFeat = function () {
                contentTreeService.createUserResource("user-feat");
            };
            $scope.createUserItem = function () {
                contentTreeService.createUserResource("user-item");
            };
            $scope.createUserSpell = function () {
                contentTreeService.createUserResource("user-spell");
            };
            $scope.createUserIllustration = function () {
                contentTreeService.createUserResource("user-illustration");
            };
            $scope.createUserMap = function () {
                contentTreeService.createUserResource("user-map");
            };
        }
    ])
;