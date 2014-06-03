'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('clickToEdit',
    function () {
        var editorTemplate =
            '<span class="click-to-edit" ng-click="edit();">' +
            '   <span ng-hide="isEditing" ng-class="displayClass">' +
            '       {{display || value}} ' +
            '       <i ng-class="iconClass"></i>' +
            '   </span>' +
            '   <span ng-show="isEditing" ng-class="editClass">' +
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
                numeric: "=numeric",
                editClass: "@editClass",
                displayClass: "@displayClass",
                iconClass: "@iconClass"
            },
            compile: function (element, attrs) {
                attrs.displayClass = attrs.displayClass || 't-underline-dotted';
                attrs.editClass = attrs.editClass || 't-underline-dotted';
                attrs.iconClass = attrs.iconClass || 'icon icon-edit fa fa-edit';
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
                    } else if (!$scope.numeric && $scope.editedValue.length>0 ) {
                        $scope.value = $scope.editedValue;
                    }
                    $scope.isEditing = false;
                    $scope.$apply($scope.onSave);
                };
            }]
        };
    });
