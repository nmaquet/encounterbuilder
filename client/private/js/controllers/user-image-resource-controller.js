"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserImageResourceController',
    ['$rootScope', '$scope', '$routeParams', '$fileUploader', 'userResourceService', 'contentTreeService', 'locationService', '$http',
        function ($rootScope, $scope, $routeParams, $fileUploader, userResourceService, contentTreeService, locationService, $http) {

            var resourceType = locationService.getResourceType();

            function updateUserResource(userResource) {
                userResource.$save();
                contentTreeService.userResourceUpdated(userResource);
            }

            $scope.updateUserResource = updateUserResource;

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

            var errorMessage = null;

            var uploader = $scope.uploader = $fileUploader.create({
                scope: $scope,
                queueLimit: 1,
                autoUpload: false,
                removeAfterUpload: true
            });

            uploader.filters.push(function (fileOrInputElement) {
                var type = uploader.isHTML5 ? fileOrInputElement.type : '/' + fileOrInputElement.value.slice(fileOrInputElement.value.lastIndexOf('.') + 1);
                type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
                var filtered = '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                if (!filtered) {
                    errorMessage = "Invalid file type: " + type + " only 'jpg', 'png', 'jpeg', 'bmp', 'gif' extensions are accepted";
                }
                return filtered;
            });

            uploader.bind('afteraddingfile', function (event, item) {
                $scope.$apply(function () {
                    $scope.uploadedFileName = item.file.name;
                    $scope.userResource.fileType = item.file.type;
                    $scope.userResource.fileName = item.file.name;
                    $scope.userResource.$save(function() {
                        var credentials = $scope.userResource.s3Credentials;
                        var item = uploader.getNotUploadedItems()[0];
                        var s3FormData = {};
                        s3FormData.key = ($routeParams.userResourceId || $routeParams.detailsId);
                        s3FormData.acl = "public-read";
                        s3FormData["Content-Type"] = credentials["Content-Type"];
                        s3FormData.AWSAccessKeyId = credentials.AWSAccessKeyId;
                        s3FormData.policy = credentials.policy;
                        s3FormData.signature = credentials.signature;
                        item.formData.push(s3FormData);
                        item.withCredentials = true;
                        item.url = credentials.url;
                        uploader.uploadAll();
                    });
                    $scope.errorMessage = errorMessage = null;
                });
            });

            uploader.bind('whenaddingfilefailed', function (event, item) {
                $scope.$apply(function () {
                    $scope.errorMessage = errorMessage || "The file could not be added.";
                });
            });

            uploader.bind('success', function (event, xhr, item, response) {
                $scope.$apply(function () {
                    errorMessage = null;
                });
            });

            uploader.bind('error', function (event, xhr, item, response) {
                $scope.$apply(function () {
                    $scope.errorMessage = errorMessage || "An error occured.";
                });
            });

            uploader.bind('complete', function (event, xhr, item, response) {
                $scope.$apply(function () {
                    $scope.userResource = userResourceService[resourceType].get({id: $routeParams.userResourceId || $routeParams.detailsId});
                });
            });
        }
    ]
);














