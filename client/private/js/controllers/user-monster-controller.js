"use strict";

DEMONSQUID.encounterBuilderControllers.controller('UserMonsterController',
    ['$scope', '$timeout', '$routeParams', 'userMonsterService',
        function ($scope, $timeout, $routeParams, userMonsterService) {
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
        }
    ]);