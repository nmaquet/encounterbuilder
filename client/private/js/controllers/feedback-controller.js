"use strict";

DEMONSQUID.encounterBuilderControllers.controller('FeedbackController', ['$http', '$timeout',
    function ($http, $timeout) {
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
                $timeout(function () {
                    $('#feedback').popover('toggle');
                    $.cookie('feedbackPopupAppeared', true, {expires: threeDays});
                }, delay);
            });
        }
    }
]);