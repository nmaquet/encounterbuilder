'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('slideMenu', ['$document', function ($document) {
    return {
        restrict: "A",
        scope: {
            slide: "=slideMenu"
        },
        link: function (scope, element) {
            var body = $($document[0].body);

            // Substract the Header height from the Slide-Push Menu
            var $spMenuContent = element.find(".sp-menu-content");
            var spMenuHeight = $(window).height() - $(".navbar-wrapper").height();

            scope.$watch("slide", function () {
                if (scope.slide) {
                    if (element.hasClass("sp-menu-left")) {
                        body.addClass("spm-open-left");
                    } else if (element.hasClass("sp-menu-right")) {
                        body.addClass("spm-open-right");
                    }
                    element.addClass("sp-menu-open");
                } else {
                    if (element.hasClass("sp-menu-left")) {
                        body.removeClass("spm-open-left");
                    } else if (element.hasClass("sp-menu-right")) {
                        body.removeClass("spm-open-right");
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
    };
}]);