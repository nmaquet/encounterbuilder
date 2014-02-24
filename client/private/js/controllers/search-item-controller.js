"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchItemController',
    ['$scope', '$http', '$timeout', 'selectedItemService', 'itemService','selectedEncounterService','encounterService',
    function ($scope, $http, $timeout, selectedItemService, itemService,selectedEncounterService,encounterService) {

        $scope.itemNameSubstring = '';
        $scope.sortOrder = 'name';
        $scope.group = 'any';
        $scope.slot = 'any';
        $scope.includeEnchanted = false;

        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 50;
        $scope.maxSize = 5;

        $scope.items = [];

        function refreshItems() {
            var params = {
                nameSubstring: $scope.itemNameSubstring,
                sortOrder: $scope.sortOrder,
                group: $scope.group,
                slot: $scope.slot,
                skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
                findLimit: $scope.itemsPerPage,
                minCL: $scope.minCL,
                maxCL: $scope.maxCL,
                enchanted: $scope.includeEnchanted
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

        $scope.$watchCollection("[sortOrder, group, slot, currentPage, includeEnchanted]", function () {
            refreshItems();
        });

        $scope.$watch('itemNameSubstring', function (itemNameSubstring) {
            $timeout(function () {
                if (itemNameSubstring === $scope.itemNameSubstring) {
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



        $scope.addItem = function (item) {
            if (!/^(\d+)$/.exec(item.amountToAdd)) {
                item.amountToAdd = 1;
            }
            var encounter = selectedEncounterService.selectedEncounter();
            if (!encounter.items) {
                encounter.items = {};
            }
            if (!encounter.items[item.id]) {
                encounter.items[item.id] = {Name: item.Name, Price: item.Price,PriceUnit: item.PriceUnit, amount: Number(item.amountToAdd)};
            }
            else {
                encounter.items[item.id].amount += Number(item.amountToAdd) || 1;
            }
            delete item.amountToAdd;
            encounterService.encounterChanged(encounter);
        }

        selectedEncounterService.register(function() {
            $scope.selectedEncounter = selectedEncounterService.selectedEncounter();
        })

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