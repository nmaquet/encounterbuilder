'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('slideMenu', ['$document', function ($document) {
    return {
        restrict: "A",
        scope: {
            slide: "=slideMenu"
        },
        replace: false,
        link: function (scope, element) {
            console.log("slideMenu directive");
            var body = $($document[0].body);
            scope.$watch("slide", function () {
                if (scope.slide) {
                    body.addClass("cbp-spmenu-push-toright");
                    element.addClass("cbp-spmenu-open");
                } else {
                    body.removeClass("cbp-spmenu-push-toright");
                    element.removeClass("cbp-spmenu-open");
                }
            });


        }
    };
}]);