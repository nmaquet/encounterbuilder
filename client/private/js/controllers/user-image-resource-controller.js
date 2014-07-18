"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserImageResourceController',
    ['$rootScope', '$scope', '$routeParams', '$fileUploader', 'userResourceService', 'contentTreeService', 'locationService', '$http',
        function ($rootScope, $scope, $routeParams, $fileUploader, userResourceService, contentTreeService, locationService, $http) {

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

            var errorMessage = null;
            var credentials = null;

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
                    var type = uploader.isHTML5 ? item.type : 'image/' + item.value.slice(item.value.lastIndexOf('.') + 1);
                    var name = uploader.isHTML5 ? item.name : item.value;
                    var id = ($routeParams.userResourceId || $routeParams.detailsId);
                    var url = "/api/upload-user-illustration-image-smart/" + id;
                    $http.post(url, {fileName: name, fileType:type}).success(function(response){
                        credentials = response;
                        uploader.uploadAll();
                    });
                    errorMessage = null;
                });
            });

            uploader.bind('beforeupload', function (event, item) {
                if (credentials) {
                    item.formData.redirect = credentials.s3Redirect;
                    item.formData.AWSAccessKeyId = credentials.s3KeyId;
                    item.formData.Policy = credentials.s3PolicyBase64;
                    item.formData.Signature = credentials.s3Signature;
//                    item.headers['Access-Control-Request-Method'] = "POST";
//                    item.headers['Access-Control-Request-Headers'] = "*";
                    item.withCredentials = true;
                    item.url = credentials.url;
                    credentials = null;
                    console.log(item.formData);
                }
            });

            uploader.bind('whenaddingfilefailed', function (event, item) {
                $scope.$apply(function () {
                    $scope.errorMessage = errorMessage || "The file could not be added.";
                });
            });

            uploader.bind('success', function (event, xhr, item, response) {
                $scope.$apply(function () {
                    errorMessage = null;
                    $scope.userResource.removeFromCache();
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