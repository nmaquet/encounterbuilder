// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('sticky', ['contentTreeService',
    function (contentTreeService) {
        return {
            restrict: "A",
            link: function (scope, element) {

                // Correct the padding-top of the 'div.sticky-scroll'
                var $stickyHeader = element.find(".sticky-header");
                $stickyHeader.each(function () {
                    var stickyHeaderHeight = $(this).height();
                    $(this).next(".sticky-scroll").css('margin-top', stickyHeaderHeight);
                });

                // Add fancy shadow on the '.sticky-header' when scrolling
                var $stickyScroll = element.find(".sticky-scroll");
                $stickyScroll.each(function () {
                    $(this).scroll(function () {
                        $(this).siblings('.sticky-header').addClass('is-sticky');
                        if ($(this).scrollTop() == 0) {
                            $(this).siblings('.sticky-header').removeClass('is-sticky');
                        }
                    });
                });

                // Substract the Tabs height from the Scrollable Content
                var stickyHeight = function () {
                    //var $scrollableContentMargin = $(this).outerHeight(true) - $(this).outerHeight();
                    var scrollableContentPosition = $(this).offset();
                    var scrollableContentHeight = $(window).height() - scrollableContentPosition.top;
                    $(this).height(scrollableContentHeight);
                    console.log(scrollableContentPosition.top);
                };
                if (contentTreeService.hasLoaded) {
                    $stickyScroll.each(stickyHeight);
                }
                else {
                    contentTreeService.onLoadSuccess(function () {
                        $stickyScroll.each(stickyHeight);
                    });
                }

                $(window).resize(function () {
                    $stickyScroll.each(stickyHeight);
                });
            }
        };
    }]);