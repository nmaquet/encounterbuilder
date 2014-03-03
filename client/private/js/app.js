'use strict';
var DEMONSQUID = {};

DEMONSQUID.encounterBuilderApp = angular.module('encounterBuilderApp', [
    'ngRoute',
    'encounterBuilderControllers',
    'encounterBuilderFilters',
    'encounterBuilderServices',
    'encounterBuilderDirectives',
    'ui.bootstrap'
]);

DEMONSQUID.encounterBuilderApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/app', {
                templateUrl: 'encounter-builder.html'
            })
            .when('/login', {
                templateUrl: 'login.html'
            })
            .when('/print-encounter', {
                templateUrl: 'printable-encounter.html',
                css : []
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
            if ($rootScope.user === undefined) {
                $http.get('/api/user-data')
                    .success(function (userData) {

                        $rootScope.user = userData.user;
                        if ($rootScope.user === undefined) {
                            $location.path('/login');
                        } else {
                            loadEncounters(userData.Encounters);
                            $location.path(next.originalPath);
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