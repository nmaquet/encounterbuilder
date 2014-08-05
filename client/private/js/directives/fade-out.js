// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('fadeOut',
    function () {
        return {
            restrict: "A",
            scope: {
                fadeOut: "="
            },
            link: function (scope, element) {
                scope.$watch("fadeOut", function () {
                    if (scope.fadeOut) {
                        $(element).fadeOut(200, function () {
                            if (scope.fadeOut) {
                                scope.fadeOut();
                                delete scope.fadeOut;
                            }
                        });
                    }
                });
            }
        };
    });