"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EditUserNpcController',
    ['$rootScope', '$scope', '$timeout', '$routeParams', '$location', '$sce', 'userNpcService', 'contentTreeService', 'locationService',
        function ($rootScope, $scope, $timeout, $routeParams, $location, $sce, userNpcService, contentTreeService, locationService) {
            $scope.tinymceOptions = {
                resize: false,
                menubar: false,
                toolbar: "bold italic underline strikethrough alignleft aligncenter alignright alignjustify bullist numlist outdent indent blockquote formatselect undo redo removeformat subscript superscript"
            };

            $scope.viewUserNpc = function () {
                if ($scope.userNpc) {
                    $scope.go("/user-npc/" + $routeParams.userNpcId);
                }
            };

            $scope.copyNpc = function () {
                contentTreeService.copyUserNpc($scope.userNpc._id, true);
            };

            function updateUserNpc() {
                if ($scope.userNpc) {
                    userNpcService.update($scope.userNpc, function (error) {
                        if (error) {
                            console.log(error);
                        } else {
                            contentTreeService.userNpcUpdated($scope.userNpc);
                        }
                    });
                }
            }

            $scope.pending = true;

            userNpcService.get($routeParams.userNpcId, function (error, userNpc) {
                if (error) {
                    return console.log(error);
                }
                // FIXME: use the filter
                if (userNpc.Description) {
                    userNpc.DescriptionHTML = $sce.trustAsHtml(userNpc.Description);
                }
                // FIXME: use the filter
                if (userNpc.SpecialAbilities) {
                    userNpc.SpecialAbilitiesHTML = $sce.trustAsHtml(userNpc.SpecialAbilities);
                }
                // FIXME: use the filter
                if (userNpc.SpellLikeAbilities) {
                    userNpc.SpellLikeAbilitiesHTML = $sce.trustAsHtml(userNpc.SpellLikeAbilities);
                }

                $scope.userNpc = userNpc;
                if ($routeParams.userNpcId) {
                    $rootScope.globalTitle = "Encounter Builder - " + $scope.userNpc.Name;
                }
                $scope.pending = false;

                var lastWatchTime;

                $scope.$watch('userNpc', function (userNpc) {
                    var thisWatchTime = new Date().getTime();
                    lastWatchTime = thisWatchTime;
                    $timeout(function () {
                        if (angular.equals(userNpc, $scope.userNpc) && thisWatchTime === lastWatchTime) {
                            updateUserNpc();
                        } else {
                        }
                    }, 2000);
                }, true /* deep equality */);

                $scope.$on('$locationChangeStart', function (e) {
                    updateUserNpc();
                });
            });

        }
    ]);