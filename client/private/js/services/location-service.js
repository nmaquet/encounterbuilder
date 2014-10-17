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
                        this.go("/chronicle/" + $routeParams.chronicleId + '/edit-user-monster/' + $routeParams.userResourceId + typePrefix + id);
                    } else if ($route.current.templateUrl === 'edit-user-npc.html') {
                        this.go("/chronicle/" + $routeParams.chronicleId + '/edit-user-npc/' + $routeParams.userResourceId + typePrefix + id);
                    } else if ($route.current.templateUrl === 'edit-user-text.html') {
                        this.go("/chronicle/" + $routeParams.chronicleId + '/edit-user-text/' + $routeParams.userResourceId + typePrefix + id);
                    } else if ($route.current.templateUrl === 'edit-user-feat.html') {
                        this.go("/chronicle/" + $routeParams.chronicleId + '/edit-user-feat/' + $routeParams.userResourceId + typePrefix + id);
                    } else if ($route.current.templateUrl === 'edit-user-spell.html') {
                        this.go("/chronicle/" + $routeParams.chronicleId + '/edit-user-spell/' + $routeParams.userResourceId + typePrefix + id);
                    } else if ($route.current.templateUrl === 'edit-user-item.html') {
                        this.go("/chronicle/" + $routeParams.chronicleId + '/edit-user-item/' + $routeParams.userResourceId + typePrefix + id);
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
                    if ($route.current.templateUrl === 'encounter.html') {
                        return "encounter";
                    } else if ($route.current.templateUrl === 'edit-user-monster.html' || $route.current.templateUrl === 'user-monster.html') {
                        return "user-monster";
                    } else if ($route.current.templateUrl === 'edit-user-npc.html' || $route.current.templateUrl === 'user-npc.html') {
                        return "user-npc";
                    } else if ($route.current.templateUrl === 'edit-user-text.html' || $route.current.templateUrl === 'user-text.html') {
                        return "user-text";
                    } else if ($route.current.templateUrl === 'edit-user-feat.html' || $route.current.templateUrl === 'user-feat.html') {
                        return "user-feat";
                    } else if ($route.current.templateUrl === 'edit-user-spell.html' || $route.current.templateUrl === 'user-spell.html') {
                        return "user-spell";
                    } else if ($route.current.templateUrl === 'edit-user-item.html' || $route.current.templateUrl === 'user-item.html') {
                        return "user-item";
                    } else if ($route.current.templateUrl === 'edit-user-image-resource.html' || $route.current.templateUrl === 'user-image-resource.html') {
                        return $location.path().indexOf("map") !== -1 ? "user-map" : "user-illustration";
                    }

//                    var match = /\/chronicle\/.*\/(?:edit-)?(user-)?(npc|monster|feat|spell|item|illustration|map|chronicle|text)\//.exec($location.path());
//                    return match && ((match[1] || "") + match[2]);
                }
            };
        }]);