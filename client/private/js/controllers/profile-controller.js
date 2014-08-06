// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('ProfileController', ['$scope', '$http', '$rootScope',
    function ($scope, $http, $rootScope) {

        var HOST_URL = {
            "192.168.0.5:3000": "http://192.168.0.5:3000/",
            "localhost:3000": "http://localhost:3000/",
            "localhost.encounterbuilder.com": "http://localhost.encounterbuilder.com/",
            "staging.chronicleforge.com": "https://encounterbuilder-staging.herokuapp.com/",
            "www.chronicleforge.com": "https://encounterbuilder-live.herokuapp.com/"
        };

        var messages = {
            EMAIL_ALREADY_EXISTS: "Email is already used",
            USERNAME_ALREADY_EXISTS: "Username is already used",
            WRONG_PASSWORD: "Incorrect password",
            PASSWORD_MISMATCH: "Passwords do not match",
            USER_DETAILS_CHANGED: "User details successfully changed",
            CHANGED_PASSWORD: "Password successfully changed",
            SERVER_ERROR_PASSWORD: "Password could not be changed",
            SERVER_ERROR_USERDETAILS: "User details could not be changed"
        };

        function hideAlerts() {
            $("#error-alert").addClass("hidden");
            $("#success-alert").addClass("hidden");
        }

        $('#profile-modal').on('show.bs.modal', function (e) {
            $scope.username = $rootScope.user.username;
            $scope.email = $rootScope.user.email;
            $scope.fullname = $rootScope.user.fullname;
            $scope.confirmedPassword = undefined;
            $scope.oldPassword = undefined;
            $scope.newPassword1 = undefined;
            $scope.newPassword2 = undefined;
            $scope.successMessage = undefined;
            $scope.errorMessage = undefined;
            $scope.$apply();
            hideAlerts();
        });

        function errorAlert(messageKey) {
            $("#error-alert").removeClass("hidden");
            console.log(messageKey);
            console.log(messages[messageKey]);
            $scope.errorMessage = messages[messageKey] || "An error occurred";
        }

        function successAlert(messageKey) {
            $("#success-alert").removeClass("hidden");
            $scope.successMessage = messages[messageKey] || "Done";
        }

        $scope.changePassword = function () {
            hideAlerts();
            if ($scope.newPassword1 !== $scope.newPassword2) {
                errorAlert("PASSWORD_MISMATCH");
            } else {
                var oldPassword = $scope.oldPassword;
                var newPassword1 = $scope.newPassword1;
                $scope.oldPassword = $scope.newPassword1 = $scope.newPassword2 = undefined;
                $http.post(HOST_URL[window.location.host] + 'api/change-password', { oldPassword: oldPassword, newPassword: newPassword1})
                    .success(function (response) {
                        if (response.error) {
                            errorAlert(response.error)
                        } else {
                            successAlert("CHANGED_PASSWORD");
                        }
                    })
                    .error(function (response) {
                        errorAlert("SERVER_ERROR_PASSWORD");
                    });
            }
        };
        $scope.changeUserData = function () {
            hideAlerts();
            var confirmedPassword = $scope.confirmedPassword;
            $scope.confirmedPassword = undefined;
            $http.post(HOST_URL[window.location.host] + 'api/change-user-data', { username: $scope.username, email: $scope.email, fullname: $scope.fullname, password: confirmedPassword })
                .success(function (response) {
                    if (response.error) {
                        errorAlert(response.error);
                    } else {
                        successAlert("USER_DETAILS_CHANGED");
                        $rootScope.user.username = $scope.username;
                        $rootScope.user.email = $scope.email;
                        $rootScope.user.fullname = $scope.fullname;
                    }
                })
                .error(function (response) {
                    errorAlert("SERVER_ERROR_USERDETAILS");
                });
        };
    }
]);