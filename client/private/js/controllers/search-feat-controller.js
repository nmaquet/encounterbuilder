"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchFeatController',
    ['$scope', '$timeout','$routeParams', '$location', 'featService',
        function ($scope, $timeout,$routeParams, $location, featService) {

            $scope.featNameSubstring = '';
            $scope.type = 'any';

            $scope.totalItems = 0;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 15;
            $scope.maxSize = 5;

            $scope.feats = [];
            $scope.refreshingFeats = false;

            function refreshFeats() {
                $scope.refreshingFeats = true;
                var params = {
                    nameSubstring: $scope.featNameSubstring,
                    type: $scope.type,
                    skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
                    findLimit: $scope.itemsPerPage
                };
                featService.search(params, function (error, data) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        $scope.feats = data.feats;
                        $scope.totalItems = data.count;
                    }
                    $scope.refreshingFeats = false;
                });
            }

            $scope.$watchCollection("[currentPage, type]", function () {
                if ($scope.currentPage < 9) {
                    $scope.maxSize = 5;
                }
                else if ($scope.currentPage < 99) {
                    $scope.maxSize = 4;
                }
                else {
                    $scope.maxSize = 3;
                }
                refreshFeats();
            });

            $scope.selectFeatById = function (id) {
                $location.path('/feat/' + id);
            };

            $scope.$watch('featNameSubstring', function (featNameSubstring) {
                $timeout(function () {
                    if (featNameSubstring === $scope.featNameSubstring) {
                        refreshFeats();
                    }
                }, 300);
            });
        }
    ]);