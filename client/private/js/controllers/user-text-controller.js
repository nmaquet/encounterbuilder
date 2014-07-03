"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserTextController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', '$location', '$sce', 'userTextService', 'contentTreeService', 'locationService',
        function ($rootScope, $scope, $timeout, $routeParams, $location, $sce, userTextService, contentTreeService, locationService) {
            $scope.tinymceOptions = {
                resize: "false",
                menubar: "edit format"
//                ,
//                plugins: "fullscreen",
//                toolbar: "fullscreen"
            };

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
                    $scope.go("/edit-user-text/" + ($routeParams.userTextId || $routeParams.detailsId));
                }
            };

            $scope.viewUserText = function () {
                if ($scope.userText) {
                    $scope.go("/user-text/" + $routeParams.userTextId);
                }
            };

            $scope.copyText = function () {
                contentTreeService.copyUserText($scope.userText._id, true);
            };

            function updateUserText() {
                if ($scope.userText) {
                    userTextService.update($scope.userText, function (error) {
                        if (error) {
                            console.log(error);
                        } else {
                            contentTreeService.userTextUpdated($scope.userText);
                        }
                    });
                }
            }

            $scope.pending = true;

            userTextService.get($routeParams.userTextId || $routeParams.detailsId, function (error, userText) {
                if (error) {
                    return console.log(error);
                }

                $scope.userText = userText;
                if ($routeParams.userTextId) {
                    $rootScope.globalTitle = "Encounter Builder - " + $scope.userText.title;
                }
                $scope.pending = false;

                var lastWatchTime;

                $scope.$watch('userText', function (userText) {
                    var thisWatchTime = new Date().getTime();
                    lastWatchTime = thisWatchTime;
                    $timeout(function () {
                        if (angular.equals(userText, $scope.userText) && thisWatchTime === lastWatchTime) {
                            updateUserText();
                        } else {
                        }
                    }, 2000);
                }, true /* deep equality */);

                $scope.$on('$locationChangeStart', function (e) {
                    /* update if leaving editor view */
                    if ($location.path().indexOf("/edit-user-text/") === -1) {
                        updateUserText();
                    }
                });
            });

        }
    ]);