"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserResourceController',
    ['$rootScope', '$scope', '$routeParams', 'userResourceService', 'contentTreeService', 'locationService',
        function ($rootScope, $scope, $routeParams, userResourceService, contentTreeService, locationService) {

            var resourceType = locationService.getResourceType();

            $scope.delete = function () {
                if ($scope.userResource) {
                    $scope.startFade = function () {
                        contentTreeService.userResourceDeleted($scope.userResource);
                        if ($routeParams.detailsId) {
                            locationService.closeDetails();
                        }
                        $scope.userResource.$delete();
                    }
                }
            };

            $scope.edit = function () {
                if ($scope.userResource) {
                    locationService.go("/edit-" + resourceType + "/" + ($routeParams.userResourceId || $routeParams.detailsId));
                }
            };

            $scope.copy = function () {
                contentTreeService.copyUserResource($scope.userResource._id, resourceType);
            };

            $scope.userResource = userResourceService[resourceType].get({id: $routeParams.userResourceId || $routeParams.detailsId});

            // FIXME: change title !
        }
    ]
);