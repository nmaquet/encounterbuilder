"use strict";

DEMONSQUID.encounterBuilderControllers.controller('TabController', ['$scope', '$location', '$timeout', '$routeParams',
    function ($scope, $location, $timeout, $routeParams) {

        var tabs = {
            monster: $('#monstersTab'),
            item: $('#itemsTab'),
            npc: $('#npcTab'),
            spell: $('#spellsTab'),
            feat: $('#featsTab')
        }

        $scope.$on("$locationChangeStart", function (event, nextLocation, currentLocation) {

            var match = /\/(.*)\//.exec($location.path());
            if (match) {
                var requestedTab = match[1];
                if ($scope.selectedTab.indexOf(requestedTab) === -1) {
                    if (tabs[requestedTab]) {
                        $timeout(function () {
                            tabs[requestedTab].click();
                        });
                    }
                }
            }
        });

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
])
;