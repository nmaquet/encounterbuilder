"use strict";

DEMONSQUID.encounterBuilderControllers.controller('LootGeneratorController', ['$scope', 'lootService',
    function ($scope, lootService) {
        $scope.budgetOverride = 'default';
        $scope.overrideLootType = false;

    }
]);