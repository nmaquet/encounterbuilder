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
                        this.go('/encounter/' + $routeParams.encounterId + typePrefix + id);
                    } else if ($route.current.templateUrl === 'edit-user-monster.html') {
                        this.go('/edit-user-monster/' + $routeParams.userMonsterId + typePrefix + id);
                    } else if ($route.current.templateUrl === 'edit-user-npc.html') {
                        this.go('/edit-user-npc/' + $routeParams.userNpcId + typePrefix + id);
                    } else if ($route.current.templateUrl === 'edit-user-text.html') {
                        this.go('/edit-user-text/' + $routeParams.userTextId + typePrefix + id);
                    }
                    else {
                        this.go(typePrefix + id);
                    }
                },
                closeDetails: function () {
                    if ($routeParams.encounterId) {
                        this.go('/encounter/' + $routeParams.encounterId);
                    }
                    else if ($routeParams.userMonsterId) {
                        this.go('/edit-user-monster/' + $routeParams.userMonsterId);
                    }
                    else {
                        this.go('/');
                    }
                },
                getResourceType: function () {
                    var match = /^\/(?:edit-)?(user-)?(npc|monster|feat|spell|item|illustration)\//.exec($location.path());
                    return match && ((match[1] || "") + match[2]);
                }
            };
        }]);