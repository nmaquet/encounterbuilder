"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EncounterListController', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        function newEncounter() {
            return { Name : "Untitled", CR : "0", Monsters: {}};
        }
        $rootScope.encounters = $rootScope.encounters || [ newEncounter() ];
        $rootScope.selectedEncounter = $rootScope.encounters[0];
        $rootScope.createEncounter = function() {
            var encounter = newEncounter();
            $rootScope.encounters.push(encounter);
            $rootScope.selectedEncounter = encounter;
        }

        $scope.selectEncounter = function(encounter) {
            $rootScope.selectedEncounter = encounter;
        }
    }
]);