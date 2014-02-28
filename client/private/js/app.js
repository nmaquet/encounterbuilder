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
            .when('/app', {
                templateUrl: 'encounter-builder.html',
                css : ['css/encounterbuilder.min.css']
            })
            .when('/login', {
                templateUrl: 'login.html',
                css : ['css/encounterbuilder.min.css']
            })
            .when('/print-encounter', {
                templateUrl: 'printable-encounter.html'
            })
            .otherwise({
                redirectTo: '/app'
            });
    }]);

DEMONSQUID.encounterBuilderApp.run(['$rootScope', '$http', '$location', 'encounterService', 'selectedEncounterService',
    function ($rootScope, $http, $location, encounterService, selectedEncounterService) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            function loadEncounters(serverEncounters) {
                var encounters = encounterService.encounters;
                while (encounters.length) {
                    encounters.pop();
                }
                while (serverEncounters.length) {
                    encounters.push(serverEncounters.pop())
                }
                selectedEncounterService.selectedEncounter(encounters[0], true /* allow undefined */);
            }
            if (!$rootScope.username) {
                $http.get('/api/user-data')
                    .success(function (userData) {
                        $rootScope.user = userData.user;
                        if (!$rootScope.user) {
                            $location.path('/login');
                        } else {
                            loadEncounters(userData.Encounters);
                        }
                    })
                    .error(function (error) {
                        console.log(error);
                        $location.path('/login');
                    });
            }
        });
    }]);

DEMONSQUID.encounterBuilderControllers = angular.module('encounterBuilderControllers', []);
DEMONSQUID.encounterBuilderServices = angular.module('encounterBuilderServices', ['ngResource']);
DEMONSQUID.encounterBuilderFilters = angular.module('encounterBuilderFilters', []);
DEMONSQUID.encounterBuilderDirectives = angular.module('encounterBuilderDirectives', []);