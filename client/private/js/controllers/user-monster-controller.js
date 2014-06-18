"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserMonsterController',
    ['$scope', '$timeout', '$routeParams', '$rootScope', 'userMonsterService', 'contentTreeService',
        function ($scope, $timeout, $routeParams, $rootScope, userMonsterService, contentTreeService) {

            $scope.deleteUserMonster = function() {
                if ($scope.userMonster) {
                    $scope.startFade = function () {
                        userMonsterService.delete($scope.userMonster, function (error) {
                            if (error) {
                                console.log(error);
                            } else {
                                contentTreeService.userMonsterDeleted($scope.userMonster);
                            }
                        });
                    }
                }
            };

            $scope.editUserMonster = function(){
                if ($scope.userMonster) {
                    $scope.go("/edit-user-monster/" + $routeParams.userMonsterId);
                }
            };

            $scope.viewUserMonster = function() {
                if ($scope.userMonster) {
                    $scope.go("/user-monster/" + $routeParams.userMonsterId);
                }
            };

            function updateUserMonster() {
                if ($scope.userMonster) {
                    userMonsterService.update($scope.userMonster, function(error) {
                        if(error) {
                            console.log(error);
                        } else {
                            contentTreeService.userMonsterUpdated($scope.userMonster);
                        }
                    });
                }
            }

            $scope.pending = true;

            userMonsterService.get($routeParams.userMonsterId, function (error, userMonster) {
                $scope.pending = false;
                if (error) {
                    console.log(error);
                }
                else {
                    $scope.userMonster = userMonster;
                }
            });

            $scope.$watch('userMonster', function(userMonster){
                $timeout(function () {
                    if (angular.equals(userMonster, $scope.userMonster)) {
                        updateUserMonster();
                    }
                }, 500);
            }, true /* deep equality */);

            $rootScope.$on('$locationChangeStart', function (e) {
                updateUserMonster();
            });
        }
    ]);