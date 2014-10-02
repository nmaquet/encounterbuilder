// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderServices.factory('locationService',
    ['$routeParams', '$route', '$location', '$timeout', 'sidebarService', 'viewportService',
        function ($routeParams, $route, $location, $timeout, sidebarService, viewportService) {
            var viewport = viewportService.viewport;
            return {
                refresh: function (delay) {
                    delay = delay || 0;
                    $timeout(function () {
                        $route.reload();
                    }, delay);
                },
                go: function (url) {
                    $location.url(url);
                    $.cookie('lastUrl', url, {expires: 7});
                    if (viewport.xs) {
                        sidebarService.closeSidebars();
                    }
                },
                back: function (url) {
                    if (url) {
                        $location.url(url);
                    } else {
                        $window.history.back();
                    }
                    if (viewport.xs) {
                        sidebarService.closeSidebars();
                    }
                },
                goToDetails: function (type, id) {
                    var typePrefix = '/' + type + '/';
                    if ($route.current.templateUrl === 'encounter.html') {
                        this.go("/chronicle/" + $routeParams.chronicleId + '/encounter/' + $routeParams.encounterId + typePrefix + id);
                    } else if ($route.current.templateUrl === 'edit-user-monster.html') {
                        this.go("/chronicle/" + $routeParams.chronicleId + '/edit-user-monster/' + $routeParams.userMonsterId + typePrefix + id);
                    } else if ($route.current.templateUrl === 'edit-user-npc.html') {
                        this.go("/chronicle/" + $routeParams.chronicleId + '/edit-user-npc/' + $routeParams.userNpcId + typePrefix + id);
                    } else if ($route.current.templateUrl === 'edit-user-text.html') {
                        this.go("/chronicle/" + $routeParams.chronicleId + '/edit-user-text/' + $routeParams.userTextId + typePrefix + id);
                    }
                    else {
                        this.go(($routeParams.chronicleId ? "/chronicle/" + $routeParams.chronicleId : "") + typePrefix + id);
                    }
                },
                closeDetails: function () {
                    if ($routeParams.encounterId) {
                        this.go("/chronicle/" + $routeParams.chronicleId + '/encounter/' + $routeParams.encounterId);
                    }
                    else if ($routeParams.userMonsterId) {
                        this.go("/chronicle/" + $routeParams.chronicleId + '/edit-user-monster/' + $routeParams.userMonsterId);
                    }
                    else {
                        this.go('/');
                    }
                },
                getResourceType: function () {
                    var match = /\/chronicle\/.*\/(?:edit-)?(user-)?(npc|monster|feat|spell|item|illustration|map|chronicle|text)\//.exec($location.path());
                    return match && ((match[1] || "") + match[2]);
                }
            };
        }]);