// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

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
            .when('/', { templateUrl: 'home.html' })
//            .when('/tutorial', { templateUrl: 'tutorial.html' })
            .when('/chronicles', { templateUrl: 'chronicles.html' })
            .when('/chronicle/:chronicleId', { templateUrl: 'chronicle.html'})
            .when('/chronicle/:chronicleId/encounter/:encounterId/:type/:detailsId', { templateUrl: 'encounter.html' })
            .when('/chronicle/:chronicleId/encounter/:encounterId', { templateUrl: 'encounter.html' })
            .when('/chronicle/:chronicleId/user-monster/:userResourceId', { templateUrl: 'user-monster.html' })
            .when('/chronicle/:chronicleId/user-npc/:userResourceId', { templateUrl: 'user-npc.html' })
            .when('/chronicle/:chronicleId/user-text/:userResourceId', { templateUrl: 'user-text.html' })

            /* user-feat */
            .when('/chronicle/:chronicleId/user-feat/:userResourceId', { templateUrl: 'user-feat.html' })
            .when('/chronicle/:chronicleId/edit-user-feat/:userResourceId', { templateUrl: 'edit-user-feat.html' })
            .when('/chronicle/:chronicleId/edit-user-feat/:userResourceId/:type/:detailsId', { templateUrl: 'edit-user-feat.html' })
            /* user-spell */
            .when('/chronicle/:chronicleId/user-spell/:userResourceId', { templateUrl: 'user-spell.html' })
            .when('/chronicle/:chronicleId/edit-user-spell/:userResourceId', { templateUrl: 'edit-user-spell.html' })
            .when('/chronicle/:chronicleId/edit-user-spell/:userResourceId/:type/:detailsId', { templateUrl: 'edit-user-spell.html' })
            /* user-item */
            .when('/chronicle/:chronicleId/user-item/:userResourceId', { templateUrl: 'user-item.html' })
            .when('/chronicle/:chronicleId/edit-user-item/:userResourceId', { templateUrl: 'edit-user-item.html' })
            .when('/chronicle/:chronicleId/edit-user-item/:userResourceId/:type/:detailsId', { templateUrl: 'edit-user-item.html' })
            /* user-illustration */
            .when('/chronicle/:chronicleId/user-illustration/:userResourceId', { templateUrl: 'user-image-resource.html' })
            .when('/chronicle/:chronicleId/edit-user-illustration/:userResourceId', { templateUrl: 'edit-user-image-resource.html' })
            /* user-map */
            .when('/chronicle/:chronicleId/user-map/:userResourceId', { templateUrl: 'user-image-resource.html' })
            .when('/chronicle/:chronicleId/edit-user-map/:userResourceId', { templateUrl: 'edit-user-image-resource.html' })

            .when('/chronicle/:chronicleId/edit-user-monster/:userResourceId/:type/:detailsId', { templateUrl: 'edit-user-monster.html' })
            .when('/chronicle/:chronicleId/edit-user-npc/:userResourceId/:type/:detailsId', { templateUrl: 'edit-user-npc.html' })
            .when('/chronicle/:chronicleId/edit-user-text/:userResourceId/:type/:detailsId', { templateUrl: 'edit-user-text.html' })
            .when('/chronicle/:chronicleId/edit-user-monster/:userResourceId', { templateUrl: 'edit-user-monster.html' })
            .when('/chronicle/:chronicleId/edit-user-npc/:userResourceId', { templateUrl: 'edit-user-npc.html' })
            .when('/chronicle/:chronicleId/edit-user-text/:userResourceId', { templateUrl: 'edit-user-text.html' })
            .when('/chronicle/:chronicleId/print-encounter/:encounterId', { templateUrl: 'printable-encounter.html' })
            .when('/chronicle/:chronicleId/binder/:binderId', { templateUrl: 'binder.html' })

            .when('/chronicle/:chronicleId/monster/:monsterId', { templateUrl: 'monster.html'})
            .when('/chronicle/:chronicleId/npc/:npcId', { templateUrl: 'npc.html'})
            .when('/chronicle/:chronicleId/item/:itemId', { templateUrl: 'item.html'})
            .when('/chronicle/:chronicleId/spell/:spellId', { templateUrl: 'spell.html'})
            .when('/chronicle/:chronicleId/feat/:featId', { templateUrl: 'feat.html'})

            .when('/monster/:monsterId', { templateUrl: 'monster.html'})
            .when('/npc/:npcId', { templateUrl: 'npc.html'})
            .when('/item/:itemId', { templateUrl: 'item.html'})
            .when('/spell/:spellId', { templateUrl: 'spell.html'})
            .when('/feat/:featId', { templateUrl: 'feat.html'})
            .when('/chronicle/:chronicleId', { templateUrl: 'chronicle.html'})
            .when('/chronicle-full/:chronicleId', { templateUrl: 'chronicle-full.html'})
            .otherwise({
                redirectTo: '/'
            });
        $httpProvider.interceptors.push('httpInterceptorService');
        $httpProvider.defaults.useXDomain = true; // Enable cross domain calls
    }]);

DEMONSQUID.encounterBuilderApp.run(['$rootScope', '$http', '$window','spellService','featService',
    function ($rootScope, $http, $window) {
        $rootScope.globalTitle = "Chronicle Forge - Home";
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
