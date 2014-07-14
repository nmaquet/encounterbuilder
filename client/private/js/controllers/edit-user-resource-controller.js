"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EditUserResourceController',
    ['$scope', '$routeParams', 'userResourceService', 'contentTreeService', 'locationService',
        function ($scope, $routeParams, userResourceService, contentTreeService, locationService) {

            var resourceType = locationService.getResourceType();

            $scope.view = function () {
                locationService.go("/" + resourceType + "/" + $routeParams.userResourceId);
            };

            function updateUserResource() {
                $scope.userResource.$save();
                contentTreeService.userResourceUpdated($scope.userResource);
            }

            $scope.userResource = userResourceService[resourceType].get({id: $routeParams.userResourceId});

            $scope.$on('$locationChangeStart', function () {
                updateUserResource($scope.userResource);
            });

            // FIXME: change title !
        }
    ])
;