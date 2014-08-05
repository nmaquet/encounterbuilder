// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('LootGeneratorController', ['$scope', 'lootService', 'encounterEditorService',
    function ($scope, lootService, encounterEditorService) {
        $scope.budgetOverride = 'default';
        $scope.lootTypeOverride = 'default';

        $scope.generateLoot = function () {
            lootService.generateEncounterLoot(encounterEditorService.encounter, 'medium', {budget: $scope.budgetOverride, lootType: $scope.lootTypeOverride});
        }
    }
]);