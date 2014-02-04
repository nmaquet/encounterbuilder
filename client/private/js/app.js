'use strict';

var DEMONSQUID = {};

DEMONSQUID.encounterBuilderApp = angular.module('encounterBuilderApp', [
    'ngRoute',
    'encounterBuilderControllers',
    'encounterBuilderFilters',
    'encounterBuilderServices',
    'encounterBuilderDirectives'
]);

DEMONSQUID.encounterBuilderApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'encounter-builder.html'
            })
            .when('/login', {
                templateUrl: 'login.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

DEMONSQUID.encounterBuilderApp.run(['$rootScope', '$http', '$location','encounterService',
    function ($rootScope, $http, $location,encounterService) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (!$rootScope.username) {
                $http.get('/api/user-data')
                    .success(function (userData) {
                        $rootScope.user = userData.user;
                        encounterService.init(userData.Encounters);
                        if (!$rootScope.user) {
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

DEMONSQUID.encounterBuilderControllers = angular.module('encounterBuilderControllers', ['ui.bootstrap']);
DEMONSQUID.encounterBuilderServices = angular.module('encounterBuilderServices', ['ngResource']);
DEMONSQUID.encounterBuilderFilters = angular.module('encounterBuilderFilters', []);
DEMONSQUID.encounterBuilderDirectives = angular.module('encounterBuilderDirectives', []);