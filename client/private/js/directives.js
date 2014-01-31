'use strict';

/* Directives */

angular.module('encounterBuilderDirectives', []).directive('clickToEdit', function ($compile) {
    var editorTemplate =
            '<span class="click-to-edit" ng-click="edit()" style="display:inline;">' +
            '   <span ng-hide="isEditing">' +
            '       {{value}} ' +
            '   </span>' +
            '   <span ng-show="isEditing">' +
            '       <input ng-model="value" type="text">' +
            '   </span>' +
            '</span>';

    return {
        restrict: "A",
        replace: true,
        template: editorTemplate,
        scope: {
            value: "=clickToEdit"
        },
        controller: function ($scope, $element) {

            var input = $($element.find("input"));

            input.blur(function () {
                $scope.save();
            });

            input.keyup(function (e) {
                if (e.keyCode == 13 /* ENTER */) {
                    $scope.save();
                }
            });

            $scope.isEditing = false;

            $scope.edit = function () {
                $scope.isEditing = true;
                setTimeout(function () {
                    input.select();
                })
            };

            $scope.save = function () {
                $scope.isEditing = false;
                $scope.$apply();
            };
        }
    };
})
