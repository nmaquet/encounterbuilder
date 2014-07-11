"use strict";

DEMONSQUID.encounterBuilderControllers.controller('FeatDetailsController',
    ['$rootScope','$scope', '$http', '$sce', '$routeParams', 'featService', 'favouriteService', 'contentTreeService',
        function ($rootScope,$scope, $http, $sce, $routeParams, featService, favouriteService, contentTreeService) {
            var TYPE_FLAGS = {
                "teamwork": "Teamwork",
                "critical": "Critical",
                "grit": "Grit",
                "style": "Style",
                "performance": "Performance",
                "racial": "Racial",
                "companion_familiar": "Companion / Familiar"
            };
            $scope.pending = true;
            $scope.toggleFavourite = function () {
                if ($scope.favourite) {
                    favouriteService.removeFavourite($scope.feat.id);
                } else {
                    favouriteService.addFavourite($scope.feat.name, $scope.feat.id, 'feat', false);
                }
                $scope.favourite = !$scope.favourite;
            };
            featService.get($routeParams.featId || $routeParams.detailsId, function (error, feat) {
                $scope.pending = false;
                if (error) {
                    console.log(error);
                } else {
                    $scope.feat = feat;
                    if ($routeParams.featId) {
                        $rootScope.globalTitle = "Encounter Builder - " + $scope.feat.name;
                    }
                    $scope.favourite = favouriteService.isFavourite(feat.id);
                    var typeFlags = [];
                    if (feat.type !== "General") {
                        typeFlags.push(feat.type);
                    }
                    for (var property in TYPE_FLAGS) {
                        if (TYPE_FLAGS.hasOwnProperty(property)) {

                            if (feat[property] === true) {
                                typeFlags.push(TYPE_FLAGS[property]);
                            }
                        }
                    }
                    if (typeFlags.length > 0) {
                        $scope.feat.typeFlags = "(" + typeFlags.join(", ") + ")";
                    }
                }
            });
            $scope.copyFeat = function () {
                contentTreeService.copyFeat($scope.feat.id);
            }
        }
    ]);
