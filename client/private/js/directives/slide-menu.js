'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('slideMenu', ['$document', '$timeout', 'sidebarService', function ($document, $timeout, sidebarService) {
    return {
        restrict: "A",
        compile: function (element) {

            if (element.hasClass("sp-menu-left") && sidebarService.leftSidebarOpened.get()) {
                element.addClass("sp-menu-open");
            }

            if (element.hasClass("sp-menu-right") && sidebarService.rightSidebarOpened.get()) {
                element.addClass("sp-menu-open");
            }

            return function (scope, element) {
                var body = $($document[0].body);

                var sidebarOpened;

                if (element.hasClass("sp-menu-left")) {
                    sidebarOpened = sidebarService.leftSidebarOpened;
                } else if (element.hasClass("sp-menu-right")) {
                    sidebarOpened = sidebarService.rightSidebarOpened;
                }

                // Substract the Header height from the Slide-Push Menu
                var $spMenuContent = element.find(".sp-menu-content");
                var spMenuHeight = $(window).height() - $(".navbar-wrapper").height();

                body.addClass("sp-menu-push");

                scope.$watch(sidebarOpened.get, function (opened) {
                    if (opened) {
                        if (element.hasClass("sp-menu-left")) {
                            body.addClass("spm-open-left"); // FIXME this shouldnt be here
                            body.addClass("sp-menu-push-toright");
                        } else if (element.hasClass("sp-menu-right")) {
                            body.addClass("spm-open-right"); // FIXME this shouldnt be here
                            body.addClass("sp-menu-push-toleft");
                        }
                        element.addClass("sp-menu-open");
                    } else {
                        if (element.hasClass("sp-menu-left")) {
                            body.removeClass("spm-open-left"); // FIXME this shouldnt be here
                            body.removeClass("sp-menu-push-toright");
                        } else if (element.hasClass("sp-menu-right")) {
                            body.removeClass("spm-open-right"); // FIXME this shouldnt be here
                            body.removeClass("sp-menu-push-toleft");
                        }
                        element.removeClass("sp-menu-open");
                    }
                    // Force Maximum height on the vertical Slide-Push Menu,
                    // so that it's scrollable indenpendently of the rest of the body
                    $spMenuContent.height(spMenuHeight);
                    $(window).resize(function() {
                        spMenuHeight = $(window).height() - $(".navbar-wrapper").height();
                        $spMenuContent.height(spMenuHeight);
                    });
                });
            }
        }
    };
}]);