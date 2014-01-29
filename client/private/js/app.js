'use strict';

var DEMONSQUID = {};

DEMONSQUID.encounterBuilderApp = angular.module('encounterBuilderApp', [
    'ngRoute',
    'encounterBuilderControllers',
    'encounterBuilderFilters',
    'encounterBuilderServices'
]);

DEMONSQUID.encounterBuilderApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/monsters', {
                templateUrl: 'partials/monster-list.html'
            })
            .when('/login', {
                templateUrl: 'partials/login.html'
            })
            .otherwise({
                redirectTo: '/monsters'
            });
    }]);

DEMONSQUID.encounterBuilderApp.run(['$rootScope', '$http', '$location',
    function ($rootScope, $http, $location) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (!$rootScope.username) {
                $http.get('/api/connected-user')
                    .success(function (response) {
                        $rootScope.username = response.username;
                        if (!$rootScope.username) {
                            $location.path('/login');
                        }
                    })
                    .error(function (error) {
                        console.log(error);
                        $location.path('/login');
                    });
            }
        });
    }]);

