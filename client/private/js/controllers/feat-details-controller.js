"use strict";

DEMONSQUID.encounterBuilderControllers.controller('FeatDetailsController',
    ['$scope', '$http', '$sce', '$routeParams', 'featService',
        function ($scope, $http, $sce, $routeParams, featService) {
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
            featService.get($routeParams.featId || $routeParams.detailsId, function (error, feat) {
                $scope.pending = false;
                if (error) {
                    console.log(error);
                } else {
                    $scope.feat = feat;
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
        }
    ]);
