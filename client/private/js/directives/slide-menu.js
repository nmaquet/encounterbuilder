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
                    body.addClass("spmenu-push-toright");
                    element.addClass("spmenu-open");
                } else {
                    body.removeClass("spmenu-push-toright");
                    element.removeClass("spmenu-open");
                }
            });


        }
    };
}]);