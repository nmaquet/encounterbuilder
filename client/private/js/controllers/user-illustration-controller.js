"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserIllustrationController',
    ['$rootScope', '$scope', '$routeParams', '$fileUploader', 'userResourceService', 'contentTreeService', 'locationService',
        function ($rootScope, $scope, $routeParams, $fileUploader, userResourceService, contentTreeService, locationService) {

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

            // Creates a uploader
            var uploader = $scope.uploader = $fileUploader.create({
                scope: $scope,
                queueLimit: 1,
                autoUpload: true,
                url: 'api/upload-user-illustration-image/' + $routeParams.userResourceId
            });

            var errorMessage = null;

            $('#image-upload-modal').on('show.bs.modal', function (e) {
                errorMessage = null;
            });

            // ADDING FILTERS

            // Images only
            uploader.filters.push(function (item /*{File|HTMLInputElement}*/) {
                var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
                type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
                var filtered = '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                if (!filtered) {
                    errorMessage = "Invalid file type: " + type + " only jpg,png,jpeg,bmp,gif extensions are accepted";
                }
                console.log(errorMessage);
                return filtered;
            });

            // REGISTER HANDLERS

            uploader.bind('afteraddingfile', function (event, item) {
                errorMessage = null;
                console.info('After adding a file', item);
            });

            uploader.bind('whenaddingfilefailed', function (event, item) {
                $scope.$apply(function () {
                    $scope.errorMessage = errorMessage || "The file could not be added.";
                });
            });

            uploader.bind('success', function (event, xhr, item, response) {
                errorMessage = null;
                userResource.removeFromCache();
            });

            uploader.bind('error', function (event, xhr, item, response) {
                $scope.$apply(function () {
                    $scope.errorMessage = errorMessage || "An error occured.";
                });
                console.info('Error', xhr, item, response);
            });

            uploader.bind('complete', function (event, xhr, item, response) {
                // TODO:
            });
        }
    ]
);