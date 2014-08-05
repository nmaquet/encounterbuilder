// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserTextController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', '$location', '$sce', 'userTextService', 'contentTreeService', 'locationService',
        function ($rootScope, $scope, $timeout, $routeParams, $location, $sce, userTextService, contentTreeService, locationService) {

            $scope.deleteUserText = function () {
                if ($scope.userText) {
                    $scope.startFade = function () {
                        userTextService.delete($scope.userText, function (error) {
                            if (error) {
                                console.log(error);
                            } else {
                                contentTreeService.userTextDeleted($scope.userText);
                                if ($routeParams.detailsId) {
                                    locationService.closeDetails();
                                }
                            }
                        });
                    }
                }
            };

            $scope.editUserText = function () {
                if ($scope.userText) {
                    locationService.go("/edit-user-text/" + ($routeParams.userTextId || $routeParams.detailsId));
                }
            };

            $scope.copyUserText = function () {
                contentTreeService.copyUserText($scope.userText._id);
            };

            $scope.pending = true;

            userTextService.get($routeParams.userTextId || $routeParams.detailsId, function (error, userText) {
                if (error) {
                    return console.log(error);
                }

                $scope.userText = userText;
                if ($routeParams.userTextId) {
                    $rootScope.globalTitle = "Chronicle Forge - " + $scope.userText.title;
                }
                $scope.pending = false;
            });
        }
    ])
;