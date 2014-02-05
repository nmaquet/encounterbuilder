"use strict";

DEMONSQUID.encounterBuilderControllers.controller('TabController', ['$scope',
    function ($scope) {
        $scope.selectedTab = 'monsters';
        $scope.showTab = function(tab){
            $scope.selectedTab =tab;
        }
    }
]);