"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EditUserTextController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', '$location', '$sce', 'userTextService', 'contentTreeService', 'locationService',
        function ($rootScope, $scope, $timeout, $routeParams, $location, $sce, userTextService, contentTreeService, locationService) {
            $scope.tinymceOptions = {
                resize: false,
                menubar: false,
                toolbar: "bold italic underline strikethrough alignleft aligncenter alignright alignjustify bullist numlist outdent indent blockquote formatselect undo redo removeformat subscript superscript",
                plugins: "autoresize",
                autoresize_min_height: 400
            };
            $scope.expanded = false;

            $scope.toggleExpanded = function () {
                $scope.expanded = !$scope.expanded;
            };

            $scope.viewUserText = function () {
                if ($scope.userText) {
                    $scope.go("/user-text/" + $routeParams.userTextId);
                }
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

            userTextService.get($routeParams.userTextId, function (error, userText) {

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
                        }
                    }, 2000);
                }, true /* deep equality */);

                $scope.$on('$locationChangeStart', function (e) {
                    updateUserText();
                });
            });

        }
    ])
;