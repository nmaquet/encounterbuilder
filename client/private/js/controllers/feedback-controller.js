"use strict";

DEMONSQUID.encounterBuilderControllers.controller('FeedbackController', ['$http', '$timeout', '$location',
    function ($http, $timeout, $location) {
        startUserVoice();


        if (!$.cookie('feedbackPopupAppeared') && !$.cookie('neverShowFeedbackPopover')) {
            $http.get('/feedback-popover.html').success(function (html) {
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
                // FIXME: hack to know if we run in karma or not
                if ($location.port() == 9877) {
                    delay = 0;
                }
                $timeout(function () {
                    $('#feedback').popover('toggle')
                    $.cookie('feedbackPopupAppeared', true, {expires: threeDays});
                }, delay);
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