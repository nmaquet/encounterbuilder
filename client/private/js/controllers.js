'use strict';

/* Controllers */

DEMONSQUID.encounterBuilderControllers = angular.module('encounterBuilderControllers', ['ui.bootstrap']);

DEMONSQUID.encounterBuilderControllers.controller('LoginController', ['$scope', '$rootScope', '$http', '$location',
    function ($scope, $rootScope, $http, $location) {
        $scope.loginFailed = false;
        $scope.submit = function () {
            var data = {
                username: $scope.username,
                password: $scope.password
            }
            $http.post("/login", data).success(function (response) {
                if (response.error) {
                    $scope.loginFailed = true;
                } else {
                    $location.path('/monsters');
                }
            });
        };
    }
]);

DEMONSQUID.encounterBuilderControllers.controller('LogoutController', ['$scope', '$rootScope', '$http', '$location',
    function ($scope, $rootScope, $http, $location) {
        $scope.logout = function () {
            $http.get("/logout").success(function () {
                delete $rootScope.username;
                $location.path('/login');
            });
        };
    }
]);

DEMONSQUID.encounterBuilderControllers.controller('MonsterListController', ['$scope', '$rootScope', '$timeout', 'monsterService',
    function ($scope, $rootScope, $timeout, monsterService) {

        $scope.nameSubstring = '';
        $scope.orderProp = 'cr';
        /* FIXME: rename this */
        $scope.type = 'any';

        $scope.$watchCollection("[orderProp, type, currentPage]", function () {
            $scope.refreshMonsters();
        });

        $scope.$watch('nameSubstring', function (search_string) {
            $timeout(function () {
                if (search_string === $scope.nameSubstring) {
                    $scope.refreshMonsters();
                }
            }, 300);
        });

        $scope.$watch('crRange', function (crRange) {
            $timeout(function () {
                if (crRange === $scope.crRange) {
                    $scope.refreshMonsters();
                }
            }, 300);
        });

        $scope.refreshMonsters = function () {
            var params = {
                nameSubstring: $scope.nameSubstring,
                order: $scope.orderProp,
                type: $scope.type,
                skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
                findLimit: $scope.itemsPerPage,
                minCR: $scope.minCR,
                maxCR: $scope.maxCR
            };
            monsterService.search(params, function (error, data) {
                if (error) {
                    console.log('Error in your face: ' + error);
                } else {
                    if (data.timestamp >= $scope.listTimestamp) {
                        $scope.monsters = data.monsters;
                        $scope.totalItems = data.count;
                        $scope.listTimestamp = data.timestamp;

                        if (!$scope.selectedMonsterId && $scope.monsters) {
                            $scope.selectedMonsterId = $scope.monsters[0].id;
                        }
                    }
                }
            });
        }

        $scope.selectMonster = function (id) {
            $scope.selectedMonsterId = id;
        }

        $scope.addMonster = function (monster) {
            if (!/^(\d+)$/.exec(monster.amountToAdd)) {
                monster.amountToAdd = 1;
            }
            var simpleMonster = {Name: monster.Name, CR: monster.CR, amount: Number(monster.amountToAdd)};
            if (!$rootScope.selectedEncounter.Monsters[monster.id]) {
                $rootScope.selectedEncounter.Monsters[monster.id] = simpleMonster;
            }
            else {
                $rootScope.selectedEncounter.Monsters[monster.id].amount += Number(monster.amountToAdd) || 1;
            }
            delete monster.amountToAdd;
        }

        $scope.incrementMonster = function (monster) {
            monster.amount++;
        }

        $scope.decrementMonster = function (monster) {
            if (monster.amount > 1) {
                monster.amount--;
            }
        }

        $scope.removeMonster = function (id) {
            delete $rootScope.selectedEncounter.Monsters[id];
        }

        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 50;
        $scope.maxSize = 5;
        $scope.listTimestamp = 0;
        $scope.minCR = 0;
        $scope.maxCR = 40;
        $scope.crRange = $scope.minCR + " - " + $scope.maxCR;


        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 40,
            values: [ 0, 40 ],
            slide: function (event, ui) {
                $scope.minCR = ui.values[0];
                $scope.maxCR = ui.values[1];
                $scope.crRange = $scope.minCR + " - " + $scope.maxCR;
                $scope.$apply();
            }
        });
    }
]);

DEMONSQUID.encounterBuilderControllers.controller('EncounterListController', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        function newEncounter() {
            return { Name : "Untitled", CR : "0", Monsters: {}};
        }
        $rootScope.encounters = $rootScope.encounters || [ newEncounter() ];
        $rootScope.selectedEncounter = $rootScope.encounters[0];
        $rootScope.createEncounter = function() {
            var encounter = newEncounter();
            $rootScope.encounters.push(encounter);
            $rootScope.selectedEncounter = encounter;
        }

        $scope.selectEncounter = function(encounter) {
            $rootScope.selectedEncounter = encounter;
        }
    }
]);

DEMONSQUID.encounterBuilderControllers.controller('MonsterDetailController', ['$scope', '$sce', 'monsterService',
    function ($scope, $sce, monsterService) {
        $scope.$watch('selectedMonsterId', function (selectedMonsterId) {
            $scope.monster = monsterService.get(selectedMonsterId, function (error, data) {
                if (error) {
                    console.log('Error in your face: ' + error);
                } else {
                    $scope.monster = data;
                    if ($scope.monster) {
                        $scope.monster.DescriptionSafe = $sce.trustAsHtml($scope.monster.Description);
                        $scope.monster.SLASafe = $sce.trustAsHtml($scope.monster.SpellLikeAbilities);
                        $scope.monster.SpecialAbilitiesSafe = $sce.trustAsHtml($scope.monster.SpecialAbilities);
                    }
                }
            });
        });
    }
]);

DEMONSQUID.encounterBuilderControllers.controller('FeedbackPopoverController', ['$http', '$timeout', '$location',
    function ($http, $timeout, $location) {
        startUserVoice();

        if (!$.cookie('feedbackPopupAppeared') && !$.cookie('neverShowFeedbackPopover')) {
            $http.get('/partials/feedback-popover.html').success(function (html) {
                var popoverOptions = {
                    html: true,
                    title: "Help us improve Encounter Builder",
                    content: html,
                    trigger: 'manual',
                    placement: 'bottom'
                };
                var threeDays = 3;
                $("#feedback").popover(popoverOptions);
                var delay = 2 * 60 * 1000;
                /* FIXME: hack to know if we run in karma or not */
                if ($location.port() == 9877) {
                    delay = 0;
                }
                $timeout(function () {
                    $('#feedback').popover('toggle')
                    $.cookie('feedbackPopupAppeared', true, {expires: threeDays});
                }, delay * 0);
            });
        }

        function startUserVoice() {
            var UserVoice = window.UserVoice || [];
            (function () {
                var uv = document.createElement('script');
                uv.type = 'text/javascript';
                uv.async = true;
                uv.src = '//widget.uservoice.com/ZWyHUaD1fQxrHq9orNnIvg.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(uv, s)
            })();
            UserVoice.push(['set', {
                accent_color: '#448dd6',
                trigger_color: 'white',
                trigger_background_color: '#e2753a'
            }]);
            UserVoice.push(['addTrigger', { mode: 'contact', trigger_position: 'bottom-right' }]);
            UserVoice.push(['autoprompt', {}]);
            window.UserVoice = UserVoice;
        }
    }
]);