'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('pending',
    function () {
        var template =
            '<div id="floatingCirclesG" ng-show="pending">' +
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
                pending: "=pending"
            },
            compile: function (element) {
                element.append(template);
                return function (scope, element) {
                    scope.$watch("pending", function () {
                        if (scope.pending) {
                            element.addClass("dimmed");
                        } else {
                            element.removeClass("dimmed");
                        }
                    });
                }
            },
        };
    });