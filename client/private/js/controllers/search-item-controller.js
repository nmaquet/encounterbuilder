"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchItemController',
    ['$scope', '$http', '$timeout', '$routeParams', 'itemService', 'encounterService', 'encounterEditorService',
        function ($scope, $http, $timeout, $routeParams, itemService, encounterService, encounterEditorService) {

            var lastSearchParam = itemService.lastSearchParam();

            $scope.itemNameSubstring = lastSearchParam ? lastSearchParam.nameSubstring : '';
            $scope.sortOrder = lastSearchParam ? lastSearchParam.sortOrder : 'name';
            $scope.group = lastSearchParam ? lastSearchParam.group : 'any';
            $scope.slot = lastSearchParam ? lastSearchParam.slot : 'any';
            $scope.includeEnchanted = lastSearchParam ? lastSearchParam.enchanted : false;

            $scope.totalItems = 0;
            $scope.currentPage = lastSearchParam ? lastSearchParam.currentPage : 1;
            $scope.itemsPerPage = 15;
            $scope.maxSize = 5;

            $scope.minCL = lastSearchParam ? lastSearchParam.minCL : 0;
            $scope.maxCL = lastSearchParam ? lastSearchParam.maxCL : 20;

            $scope.items = [];
            $scope.refreshingItems = false;

            $scope.selectedItemId = $routeParams.itemId;

            function refreshItems() {
                $scope.refreshingItems = true;
                var params = {
                    nameSubstring: $scope.itemNameSubstring,
                    sortOrder: $scope.sortOrder,
                    group: $scope.group,
                    slot: $scope.slot,
                    skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
                    currentPage: $scope.currentPage,
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
                    $scope.refreshingItems = false;
                });
            }

            $scope.$watchCollection("[sortOrder, group, slot, currentPage, includeEnchanted]", function () {
                if ($scope.currentPage < 9) {
                    $scope.maxSize = 5;
                }
                else if ($scope.currentPage < 99) {
                    $scope.maxSize = 4;
                }
                else {
                    $scope.maxSize = 3;
                }
                refreshItems();
            });

            $scope.$watch('itemNameSubstring', function (itemNameSubstring) {
                $timeout(function () {
                    if (itemNameSubstring === $scope.itemNameSubstring) {
                        refreshItems();
                    }
                }, 300);
            });

            $scope.$watchCollection("[minCL, maxCL]", function (clRange) {
                $timeout(function () {
                    if (clRange[0] === $scope.minCL && clRange[1] === $scope.maxCL) {
                        refreshItems();
                    }
                }, 300);
            });


            $scope.selectItemById = function (id) {
                $scope.go('item', id);
            };

            function addItemToEditedEncounter(item) {
                if (!/^(\d+)$/.exec(item.amountToAdd)) {
                    item.amountToAdd = 1;
                }
                var encounter = encounterEditorService.encounter;
                if (!encounter.items) {
                    encounter.items = {};
                }
                if (!encounter.items[item.id]) {
                    encounter.items[item.id] = {Name: item.Name, Price: item.Price, PriceUnit: item.PriceUnit, amount: Number(item.amountToAdd)};
                }
                else {
                    encounter.items[item.id].amount += Number(item.amountToAdd) || 1;
                }
                delete item.amountToAdd;
                encounterService.encounterChanged(encounter);
            }

            $scope.addItem = function (item) {
                if ($routeParams.encounterId) {
                    addItemToEditedEncounter(item);
                }
                // FIXME: allow to add an item to a binder if a binderId is in routeParams
            };
        }
    ]);