// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('pending',
    function () {
        var template =
            '<div id="floatingCirclesG" class="hidden">' +
            '     <div class="f_circleG" id="frotateG_01"></div>' +
            '     <div class="f_circleG" id="frotateG_02"></div>' +
            '     <div class="f_circleG" id="frotateG_03"></div>' +
            '     <div class="f_circleG" id="frotateG_04"></div>' +
            '     <div class="f_circleG" id="frotateG_05"></div>' +
            '     <div class="f_circleG" id="frotateG_06"></div>' +
            '     <div class="f_circleG" id="frotateG_07"></div>' +
            '     <div class="f_circleG" id="frotateG_08"></div>' +
            '</div>';
        return {
            restrict: "A",
            scope: {
                isPending: "=pending"
            },
            compile: function (element) {
                element.append(template);
                return function (scope, element) {
                    scope.$watch("isPending", function () {
                        if (scope.isPending) {
                            element.find("#floatingCirclesG").removeClass("hidden");
                            element.addClass("is-dimmed");
                        } else {
                            element.find("#floatingCirclesG").addClass("hidden");
                            element.removeClass("is-dimmed");
                        }
                    });
                }
            }
        };
    });