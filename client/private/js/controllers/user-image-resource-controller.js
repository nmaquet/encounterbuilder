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
                    var type = item.file.type;
                    var name = item.file.name;
                    var id = ($routeParams.userResourceId || $routeParams.detailsId);
                    var url = "/api/upload-user-illustration-image-smart/" + id;
                    $http.post(url, {fileName: name, fileType: type}).success(function (response) {
                        credentials = response;
                        var item = uploader.getNotUploadedItems()[0];
                        item.formData = [{}];
                        item.formData[0].key = ($routeParams.userResourceId || $routeParams.detailsId);
                        item.formData[0].acl = "public-read";
                        item.formData[0]["Content-Type"]= credentials.contentType;
                        item.formData[0].AWSAccessKeyId = credentials.s3KeyId;
                        item.formData[0].policy = credentials.s3PolicyBase64;
                        item.formData[0].signature = credentials.s3Signature;
                        uploader.uploadAll();
                    });
                    errorMessage = null;
                });
            });

            uploader.bind('beforeupload', function (event, item) {
                if (credentials) {
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

var x = { "expiration": "2013-08-07T12:00:00.000Z",
    "conditions": [
        {"bucket": "examplebucket"},
        ["starts-with", "$key", "user/user1/"],
        {"acl": "public-read"},
        {"success_action_redirect": "http://examplebucket.s3.amazonaws.com/successful_upload.html"},
        ["starts-with", "$Content-Type", "image/"],
        {"x-amz-meta-uuid": "14365123651274"},
        ["starts-with", "$x-amz-meta-tag", ""],

        {"x-amz-credential": "AKIAIOSFODNN7EXAMPLE/20130806/us-east-1/s3/aws4_request"},
        {"x-amz-algorithm": "AWS4-HMAC-SHA256"},
        {"x-amz-date": "20130806T000000Z" }
    ]
};

var y = {"expiration": "2014-7-18T20:38:40Z", "conditions": [
    {"bucket": "dscf-test"},
    ["starts-with", "$Content-Disposition", ""],
    ["starts-with", "$key", "53c89b0e2a681a006ac10539"],
    {"acl": "public-read"},
    {"success_action_redirect": "http://example.com/uploadsuccess"},
    ["content-length-range", 0, 2147483648],
    ["eq", "$Content-Type", null]
]};




















