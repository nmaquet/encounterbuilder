"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchFeatController',
    ['$scope', '$timeout', 'featService', 'selectedFeatService',
        function ($scope, $timeout, featService, selectedFeatService) {

            $scope.featNameSubstring = '';
            $scope.type = 'any';

            $scope.totalItems = 0;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 15;
            $scope.maxSize = 5;

            $scope.feats = [];

            function refreshFeats() {
                var params = {
                    nameSubstring: $scope.featNameSubstring,
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
                refreshFeats();
            });

            $scope.selectFeatById = function (id) {
                selectedFeatService.selectedFeatId(id);
            }

            selectedFeatService.register(function () {
                $scope.selectedFeatId = selectedFeatService.selectedFeatId();
            });

            selectedFeatService.selectedFeatId("create-pit");

            $scope.$watch('featNameSubstring', function (featNameSubstring) {
                $timeout(function () {
                    if (featNameSubstring === $scope.featNameSubstring) {
                        refreshFeats();
                    }
                }, 300);
            });
        }
    ]);