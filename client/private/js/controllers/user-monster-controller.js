"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserMonsterController',
    ['$scope', '$timeout', '$routeParams', 'userMonsterService', 'contentTreeService',
        function ($scope, $timeout, $routeParams, userMonsterService, contentTreeService) {
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

            $scope.userMonsterChanged = function() {
                userMonsterService.update($scope.userMonster, function(error) {
                    if(error) {
                        console.log(error);
                    } else {
                        contentTreeService.userMonsterChanged($scope.userMonster);
                    }
                });
            }
        }
    ]);