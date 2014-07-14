'use strict';

var DEMONSQUID = {};

DEMONSQUID.encounterBuilderApp = angular.module('encounterBuilderApp', [
    'ngRoute',
    'ngTouch',
    'encounterBuilderControllers',
    'encounterBuilderFilters',
    'encounterBuilderServices',
    'encounterBuilderDirectives',
    'ui.bootstrap',
    'ui.tinymce',
    'angularFileUpload'
]);

DEMONSQUID.encounterBuilderApp.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $routeProvider
//            .when('/', { templateUrl: 'home.html' })
            .when('/', { redirectTo: '/tutorial' })
            .when('/tutorial', { templateUrl: 'tutorial.html' })
            .when('/encounter/:encounterId/:type/:detailsId', { templateUrl: 'encounter.html' })
            .when('/encounter/:encounterId', { templateUrl: 'encounter.html' })
            .when('/user-monster/:userMonsterId', { templateUrl: 'user-monster.html' })
            .when('/user-npc/:userNpcId', { templateUrl: 'user-npc.html' })
            .when('/user-text/:userTextId', { templateUrl: 'user-text.html' })

            /* user-feat */
            .when('/user-feat/:userResourceId', { templateUrl: 'user-feat.html' })
            .when('/edit-user-feat/:userResourceId', { templateUrl: 'edit-user-feat.html' })
            .when('/edit-user-feat/:userResourceId/:type/:detailsId', { templateUrl: 'edit-user-feat.html' })
            /* user-spell */
            .when('/user-spell/:userResourceId', { templateUrl: 'user-spell.html' })
            .when('/edit-user-spell/:userResourceId', { templateUrl: 'edit-user-spell.html' })
            .when('/edit-user-spell/:userResourceId/:type/:detailsId', { templateUrl: 'edit-user-spell.html' })
            /* user-item */
            .when('/user-item/:userResourceId', { templateUrl: 'user-item.html' })
            .when('/edit-user-item/:userResourceId', { templateUrl: 'edit-user-item.html' })
            .when('/edit-user-item/:userResourceId/:type/:detailsId', { templateUrl: 'edit-user-item.html' })

            .when('/edit-user-monster/:userMonsterId/:type/:detailsId', { templateUrl: 'edit-user-monster.html' })
            .when('/edit-user-npc/:userNpcId/:type/:detailsId', { templateUrl: 'edit-user-npc.html' })
            .when('/edit-user-text/:userTextId/:type/:detailsId', { templateUrl: 'edit-user-text.html' })
            .when('/edit-user-monster/:userMonsterId', { templateUrl: 'edit-user-monster.html' })
            .when('/edit-user-npc/:userNpcId', { templateUrl: 'edit-user-npc.html' })
            .when('/edit-user-text/:userTextId', { templateUrl: 'edit-user-text.html' })
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
        $rootScope.globalTitle = "Encounter Builder - Home";
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
