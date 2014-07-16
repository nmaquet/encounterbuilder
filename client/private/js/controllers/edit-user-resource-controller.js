"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EditUserResourceController',
    ['$scope', '$routeParams', 'userResourceService', 'contentTreeService', 'locationService', 'throttle',
        function ($scope, $routeParams, userResourceService, contentTreeService, locationService, throttle) {

            $scope.tinymceOptions = {
                resize: false,
                menubar: false,
                toolbar: "bold italic underline strikethrough alignleft aligncenter alignright alignjustify bullist numlist outdent indent blockquote formatselect undo redo removeformat subscript superscript",
                plugins: "autoresize",
                autoresize_min_height: 400
            };

            var resourceType = locationService.getResourceType();

            $scope.view = function () {
                locationService.go("/" + resourceType + "/" + $routeParams.userResourceId);
            };

            function updateUserResource() {
                $scope.userResource.$save();
                contentTreeService.userResourceUpdated($scope.userResource);
            }

            $scope.updateUserResource = updateUserResource;

            $scope.userResource = userResourceService[resourceType].get({id: $routeParams.userResourceId}, function() {
                var save = throttle(userResourceService[resourceType].save, 1000);
                $scope.$watch('userResource', function (userResource) {
                    save(userResource);
                }, true /* deep equality */);
            });

            $scope.$on('$locationChangeStart', function () {
                updateUserResource($scope.userResource);
            });

            // FIXME: change title !
        }
    ])
;