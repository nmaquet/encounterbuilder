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