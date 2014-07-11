"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EditUserFeatController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', '$location', '$sce', 'UserFeatResource', 'contentTreeService', 'locationService',
        function ($rootScope, $scope, $timeout, $routeParams, $location, $sce, UserFeatResource, contentTreeService, locationService) {

            $scope.viewUserFeat = function () {
                if ($scope.userFeat) {
                    $scope.go("/user-text/" + $routeParams.userFeatId);
                }
            };

            function updateUserFeat() {
                if ($scope.userFeat) {
                    $scope.userFeat.$save(function() {
                        contentTreeService.userFeatUpdated($scope.userFeat)
                    });
                }
            }

            $scope.pending = true;

            $scope.userFeat = UserFeatResource.get({id: $routeParams.userFeatId});

            $scope.$watch('userFeat', function (userFeat) {
                /* FIXME */
            }, true /* deep equality */);

            $scope.$on('$locationChangeStart', function (e) {
                updateUserFeat();
            });
        }
    ])
;