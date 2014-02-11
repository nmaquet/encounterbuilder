'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('clickToEdit', [ '$compile',
    function ($compile) {
        var editorTemplate =
            '<span class="click-to-edit" ng-click="edit()" style="display:inline;">' +
                '   <span ng-hide="isEditing">' +
                '       {{display || value}} ' +
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
                display: "@display",
                numeric: "=numeric"
            },
            controller: [ '$scope', '$element', function ($scope, $element) {

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
                    $scope.editedValue = $scope.value;
                    $scope.isEditing = true;
                    setTimeout(function () {
                        input.select();
                    })
                };

                $scope.save = function () {
                    if ($scope.numeric && Number($scope.editedValue) >= 0) {
                        $scope.value = Number($scope.editedValue);
                    } else if (!$scope.numeric) {
                        $scope.value = $scope.editedValue;
                    }
                    $scope.isEditing = false;
                    $scope.$apply($scope.onSave);
                };
            }]
        };
    }])
