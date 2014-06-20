'use strict';

var DEMONSQUID = {};

DEMONSQUID.encounterBuilderApp = angular.module('encounterBuilderApp', [
    'ngRoute',
    'ngTouch',
    'encounterBuilderControllers',
    'encounterBuilderFilters',
    'encounterBuilderServices',
    'encounterBuilderDirectives',
    'ui.bootstrap'
]);

DEMONSQUID.encounterBuilderApp.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', { templateUrl: 'home.html' })
            .when('/encounter/:encounterId/:type/:detailsId', { templateUrl: 'encounter.html' })
            .when('/encounter/:encounterId', { templateUrl: 'encounter.html' })
            .when('/user-monster/:userMonsterId', { templateUrl: 'user-monster.html' })
            .when('/edit-user-monster/:userMonsterId/:type/:detailsId', { templateUrl: 'edit-user-monster.html' })
            .when('/edit-user-monster/:userMonsterId', { templateUrl: 'edit-user-monster.html' })
            .when('/print-encounter/:encounterId', { templateUrl: 'printable-encounter.html' })
            .when('/binder/:binderId', { templateUrl: 'binder.html' })
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

DEMONSQUID.encounterBuilderApp.run(['$rootScope', '$http', '$window',
    function ($rootScope, $http, $window) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if ($rootScope.user === undefined) {
                $http.post('/api/user-data')
                    .success(function (userData) {
                        $rootScope.user = userData.user;
                        if ($rootScope.user === undefined) {
                            $window.location.href = '/';
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
