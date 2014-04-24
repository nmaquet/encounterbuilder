"use strict";

DEMONSQUID.encounterBuilderControllers.controller('BinderController', ['$scope', 'selectedBinderService',
    function ($scope, selectedBinderService) {
        selectedBinderService.register(function() {
            $scope.binder = selectedBinderService.selectedBinder();
        });
    }
]);