'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('clickToEdit', [ '$compile',
    function ($compile) {
        var editorTemplate =
            '<span class="click-to-edit" ng-click="edit()" style="display:inline;">' +
                '   <span ng-hide="isEditing">' +
                '       {{value}} ' +
                '   </span>' +
                '   <span ng-show="isEditing">' +
                '       <input ng-model="editedValue" type="text">' +
                '   </span>' +
                '</span>';

        return {
            restrict: "A",
            replace: true,
            template: editorTemplate,
            scope: {
                value: "=clickToEdit",
                onSave: "&onSave",
                numeric: "=numeric"
            },
            controller: [ '$scope', '$element', '$filter', function ($scope, $element, $filter) {

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
                    if ($scope.numeric) {
                        $scope.editedValue = String($scope.value).replace(/,/g, "");
                    } else {
                        $scope.editedValue = $scope.value;
                    }
                    $scope.isEditing = true;
                    setTimeout(function () {
                        input.select();
                    })
                };

                $scope.save = function () {
                    if ($scope.numeric) {
                        $scope.value = $filter("number")(Number($scope.editedValue) || $scope.value);
                    } else {
                        $scope.value = $scope.editedValue;
                    }
                    $scope.isEditing = false;
                    $scope.$apply($scope.onSave);
                };
            }]
        };
    }])
