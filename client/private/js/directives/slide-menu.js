'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('slideMenu', ['$document', function ($document) {
    return {
        restrict: "A",
        scope: {
            slide: "=slideMenu"
        },
        replace: false,
        link: function (scope, element) {
            //console.log("slideMenu directive");
            var body = $($document[0].body);
            // Substract the Header height from the Slide-Push Menu
            var $spMenuContent = element.find(".sp-menu-content");
            var spMenuHeight = $(window).height() - $(".navbar-wrapper").height();

            scope.$watch("slide", function () {
                if (scope.slide) {
                    body.addClass("spm-open");
                    element.addClass("sp-menu-open");
                } else {
                    body.removeClass("spm-open");
                    element.removeClass("sp-menu-open");
                }
                // Force Maximum height on the vertical Slide-Push Menu,
                // so that it's scrollable indenpendently of the rest of the body
                $spMenuContent.height(spMenuHeight);
                $(window).resize(function() {
                    $spMenuContent.height(spMenuHeight);
                });
            });


        }
    };
}]);