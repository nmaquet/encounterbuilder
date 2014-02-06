"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchItemController',
    ['$scope', '$http', '$timeout', 'selectedItemService', 'itemService',
    function ($scope, $http, $timeout, selectedItemService, itemService) {

        $scope.nameSubstring = '';
        $scope.sortOrder = 'name';
        $scope.group = 'any';
        $scope.slot = 'any';

        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 50;
        $scope.maxSize = 5;

        $scope.items = [];

        function refreshItems() {
            var params = {
                nameSubstring: $scope.nameSubstring,
                sortOrder: $scope.sortOrder,
                group: $scope.group,
                slot: $scope.slot,
                skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
                findLimit: $scope.itemsPerPage,
                minCL: $scope.minCL,
                maxCL: $scope.maxCL
            };
            itemService.search(params, function (error, data) {
                if (error) {
                    console.log(error);
                }
                else {
                    $scope.items = data.magicItems;
                    $scope.totalItems = data.count;
                }
            });
        }

        $scope.$watchCollection("[sortOrder, group, slot, currentPage]", function () {
            refreshItems();
        });

        $scope.$watch('nameSubstring', function (nameSubstring) {
            $timeout(function () {
                if (nameSubstring === $scope.nameSubstring) {
                    refreshItems();
                }
            }, 300);
        });

        $scope.$watch('clRange', function (clRange) {
            $timeout(function () {
                if (clRange === $scope.clRange) {
                    refreshItems();
                }
            }, 300);
        });

        $scope.selectItemById = function (id) {
            selectedItemService.selectedItemId(id);
        }
        selectedItemService.register(function(){
           $scope.selectedItemId = selectedItemService.selectedItemId();
        });

        $scope.minCL = 0;
        $scope.maxCL = 20;
        $scope.clRange = $scope.minCL + " - " + $scope.maxCL;

        $("#slider-cl-range").slider({
            range: true,
            min: 0,
            max: 20,
            values: [ 0, 20 ],
            slide: function (event, ui) {
                $scope.minCL = ui.values[0];
                $scope.maxCL = ui.values[1];
                $scope.clRange = $scope.minCL + " - " + $scope.maxCL;
                $scope.$apply();
            }
        });

    }
]);