"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchItemController', ['$scope', '$http',
    function ($scope, $http) {

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
    }
]);