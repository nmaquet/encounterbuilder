"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchFeatController',
    ['$scope', '$rootScope', '$timeout', '$routeParams', 'locationService', 'featService',
        function ($scope, $rootScope, $timeout, $routeParams, locationService, featService) {

            var lastSearchParam = featService.lastSearchParam();

            $scope.featNameSubstring = lastSearchParam ? lastSearchParam.nameSubstring : '';
            $scope.type = lastSearchParam ? lastSearchParam.type : 'any';

            $scope.totalItems = 0;
            $scope.currentPage = lastSearchParam ? lastSearchParam.currentPage : 1;
            $scope.itemsPerPage = 15;
            $scope.maxSize = 5;

            $scope.feats = [];
            $scope.refreshingFeats = false;

            $scope.selectedFeatId = $routeParams.featId;
            $scope.$on('$routeChangeSuccess', function () {
                $scope.selectedFeatId = $routeParams.featId;
            });

            function refreshFeats() {
                $scope.refreshingFeats = true;
                var params = {
                    nameSubstring: $scope.featNameSubstring,
                    type: $scope.type,
                    skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
                    currentPage: $scope.currentPage,
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
                locationService.goToDetails('feat', id);
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