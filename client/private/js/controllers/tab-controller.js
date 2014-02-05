"use strict";

DEMONSQUID.encounterBuilderControllers.controller('TabController', ['$scope',
    function ($scope) {
        $scope.selectedTab = 'monsters';
        $scope.showTab = function(tab){
            $scope.selectedTab = tab;
        }
        $('#monstersTab').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
        $('#itemsTab').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        })
        $('#monstersTab').tab('show');
    }
]);