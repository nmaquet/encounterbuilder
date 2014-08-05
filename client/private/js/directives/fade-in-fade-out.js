// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('fadeInFadeOut',
    function () {
        return {
            restrict: "A",
            scope: {
                fadeInFadeOut: "="
            },
            link: function (scope, element) {
                scope.$watch("fadeInFadeOut", function () {
                    if (scope.fadeInFadeOut) {
                        $(element).fadeOut(200, function () {
                            if (scope.fadeInFadeOut) {
                                scope.fadeInFadeOut();
                            }
                            $(element).fadeIn(200, function() {
                                delete scope.fadeInFadeOut;
                            });
                        });
                    }
                });
            }
        };
    });