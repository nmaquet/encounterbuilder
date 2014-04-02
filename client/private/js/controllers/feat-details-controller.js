"use strict";

DEMONSQUID.encounterBuilderControllers.controller('FeatDetailsController',
    ['$scope', '$http', '$sce', 'selectedFeatService', 'featService',
        function ($scope, $http, $sce, selectedFeatService, featService) {
            selectedFeatService.register(function () {
                featService.get(selectedFeatService.selectedFeatId(), function (error, feat) {
                    if (error) {
                        console.log(error);
                    } else {
                        $scope.feat = feat;
                    }
                });
            });
        }
    ]);
