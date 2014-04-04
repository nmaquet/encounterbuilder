"use strict";

DEMONSQUID.encounterBuilderControllers.controller('TabController', ['$scope',
    function ($scope) {
        $scope.selectedTab = 'monsters';
        $('#monstersTab').tab('show');
        $scope.showTab = function (tab) {
            $scope.selectedTab = tab;
        }
        $('#monstersTab').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
            $scope.showTab("monsters");
        });
        $('#itemsTab').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
            $scope.showTab("items");
        });
        $('#npcTab').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
            $scope.showTab("npcs");
        });
        $('#spellsTab').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
            $scope.showTab("spells");
        });
        $('#featsTab').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
            $scope.showTab("feats");
        });
    }
]);