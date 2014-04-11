"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchFeatController',
    ['$scope', '$timeout','$routeParams', 'featService', 'selectedFeatService',
        function ($scope, $timeout,$routeParams, featService, selectedFeatService) {

            $scope.featNameSubstring = '';
            $scope.type = 'any';

            $scope.totalItems = 0;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 15;
            $scope.maxSize = 5;

            $scope.feats = [];

            if ($routeParams.featId) {
                $timeout(function () {
                    selectedFeatService.selectedFeatId($routeParams.featId);
                    $('#featsTab').click();
                });
            }

            function refreshFeats() {
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
                selectedFeatService.selectedFeatId(id);
            }

            selectedFeatService.register(function () {
                $scope.selectedFeatId = selectedFeatService.selectedFeatId();
            });

            $scope.$watch('featNameSubstring', function (featNameSubstring) {
                $timeout(function () {
                    if (featNameSubstring === $scope.featNameSubstring) {
                        refreshFeats();
                    }
                }, 300);
            });
        }
    ]);