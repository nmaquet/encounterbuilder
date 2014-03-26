"use strict";

DEMONSQUID.encounterBuilderControllers.controller('TabController', ['$scope',
    function ($scope) {
        $scope.selectedTab = 'monsters';
        $('#monstersTab').tab('show');
        $scope.showTab = function (tab) {
            $scope.selectedTab = tab;
        }
    }
]);