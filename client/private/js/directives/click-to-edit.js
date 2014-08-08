// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('clickToEdit',
    function () {
        var editorTemplate =
            '<span class="click-to-edit" >' +
            '   <span id="click-to-edit-viewer" ng-class="displayClass" ng-click="edit();">' +
            '       {{display || value}} ' +
            '       <i ng-class="iconClass"></i>' +
            '   </span>' +
            '   <span id="click-to-edit-editor" ng-class="editClass">' +
            '       <input ng-model="editedValue" type="text" size="{{size}}">' +
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
                size: "@size",
                editClass: "@editClass",
                displayClass: "@displayClass",
                iconClass: "@iconClass"
            },
            compile: function (element, attrs) {
                attrs.displayClass = attrs.displayClass || 't-underline-dotted click-to-edit-dark-theme';
                attrs.editClass = attrs.editClass || 't-underline-dotted click-to-edit-dark-theme';
                attrs.iconClass = attrs.iconClass || 'icon icon-edit fa fa-edit';
            },
            controller: [ '$scope', '$element', '$timeout', function ($scope, $element, $timeout) {

                var input = $($element.find("input"));
                var viewer = $($element.find("#click-to-edit-viewer"));
                var editor = $($element.find("#click-to-edit-editor"));

                $scope.size = $scope.size || "20";

                $scope.isEditing = false;
                editor.addClass("hidden");

                input.blur(function () {
                    if ($scope.isEditing) {
                        $scope.save();
                    }
                });

                input.keyup(function (e) {
                    if (e.keyCode == 13 /* ENTER */) {
                        $scope.save();
                    }
                });

                $scope.edit = function () {
                    $scope.editedValue = $scope.value;
                    $scope.isEditing = true;
                    editor.removeClass("hidden");
                    viewer.addClass("hidden");
                    input.focus();
                    $timeout(function() {
                        input.get(0).setSelectionRange(0, input.val().length);
                    });
                };

                $scope.save = function () {
                    $scope.$apply(function () {
                        if ($scope.numeric && Number($scope.editedValue) >= 0) {
                            $scope.value = Number($scope.editedValue);
                        } else if (!$scope.numeric && $scope.editedValue.length > 0) {
                            $scope.value = $scope.editedValue;
                        }
                        $scope.isEditing = false;
                        editor.addClass("hidden");
                        viewer.removeClass("hidden");
                    });
                    $scope.$apply($scope.onSave);
                };
            }]
        };
    });
