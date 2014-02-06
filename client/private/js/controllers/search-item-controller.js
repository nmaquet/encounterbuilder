"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchItemController', ['$scope', '$http', 'selectedItemService',
    function ($scope, $http, selectedItemService) {


        $scope.nameSubstring = '';
        $scope.sortOrder = 'name';
        $scope.group = 'any';
        $scope.slot = 'any';

        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 50;
        $scope.maxSize = 5;

        $scope.items = [];

        $scope.$watch('currentPage', function () {
            var params = {
                skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
                findLimit: $scope.itemsPerPage
            };
            refreshItems(params, function (error, data) {
                if (error) {
                    console.log(error);
                }
                else {
                    $scope.items = data.magicItems;
                    $scope.totalItems = data.count;
                }
            });
        })

        function refreshItems(params, callback) {
            var now = new Date().getTime();
            $http.get('/api/search-magic-items/', {params: params})
                .success(function (data) {
                    data["timestamp"] = now;
                    callback(null, data);
                })
                .error(function (error) {
                    callback(error, null);
                });
        }

        $scope.selectItemById = function (id) {
            selectedItemService.selectedItemId(id);
        }

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