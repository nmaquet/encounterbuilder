'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('nouislider', function () {
    return {
        restrict: "E",
        template: "<div></div>",
        replace: true,
        scope: {
            min: "=",
            max: "="
        },
        link: function (scope, element) {
            element.noUiSlider({
                start: [scope.min, scope.max],
                connect: true,
                step: 1,
                range: {
                    'min': scope.min,
                    'max': scope.max
                }
            });
            element.on('slide', function () {
                scope.min = element.val()[0];
                scope.max = element.val()[1];
                scope.$apply();
            });
        }
    };
});