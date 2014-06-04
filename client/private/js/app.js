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

DEMONSQUID.encounterBuilderApp.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/encounter/:encounterId', { templateUrl: 'encounter.html' })
            /* .when('/print-encounter', { templateUrl: 'printable-encounter.html' }) */
            .when('/monster/:monsterId', { templateUrl: 'monster.html'})
            .when('/npc/:npcId', { templateUrl: 'npc.html'})
            .when('/item/:itemId', { templateUrl: 'item.html'})
            .when('/spell/:spellId', { templateUrl: 'spell.html'})
            .when('/feat/:featId', { templateUrl: 'feat.html'})
            .otherwise({
                redirectTo: '/'
            });
        $httpProvider.interceptors.push('httpInterceptorService');
    }]);

DEMONSQUID.encounterBuilderApp.run(['$rootScope', '$http', '$location', '$window', '$routeParams', 'encounterService', 'selectedEncounterService',
    function ($rootScope, $http, $location, $window, $routeParams, encounterService, selectedEncounterService) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if ($rootScope.user === undefined) {
                $http.post('/api/user-data')
                    .success(function (userData) {
                        $rootScope.user = userData.user;
                        if ($rootScope.user === undefined) {
                            $window.location.href = '/';
                        } else {
                            $location.path(next.originalPath);
                        }
                    })
                    .error(function (error) {
                        console.log(error);
                        $window.location.href = '/';
                    });
            }
        });
    }]);

DEMONSQUID.encounterBuilderControllers = angular.module('encounterBuilderControllers', []);
DEMONSQUID.encounterBuilderServices = angular.module('encounterBuilderServices', ['ngResource']);
DEMONSQUID.encounterBuilderFilters = angular.module('encounterBuilderFilters', []);
DEMONSQUID.encounterBuilderDirectives = angular.module('encounterBuilderDirectives', []);
