// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('nouislider', function () {
    return {
        restrict: "E",
        template: "<div></div>",
        replace: true,
        scope: {
            min: "=",
            max: "=",
            rangeMin: "@",
            rangeMax: "@"
        },
        link: function (scope, element) {
            element.noUiSlider({
                start: [scope.min, scope.max],
                connect: true,
                step: 1,
                range: {
                    'min': Number(scope.rangeMin),
                    'max': Number(scope.rangeMax)
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