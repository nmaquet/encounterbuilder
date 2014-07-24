"use strict";

(function () {

    $('.carousel').carousel({
        interval: 6000
    });

    var HOST_TO_LOGIN_URL = {
        "localhost:3000": "http://localhost:3000/login",
        "localhost.encounterbuilder.com": "http://localhost.encounterbuilder.com/login",
        "staging.encounterbuilder.com": "https://encounterbuilder-staging.herokuapp.com/login",
        "www.encounterbuilder.com": "https://encounterbuilder-live.herokuapp.com/login"
    };

    $("#login-form").submit(function () {
        $.ajax({
            type: "POST",
            url: HOST_TO_LOGIN_URL[window.location.host],
            crossDomain: true,
            data: $("#login-form").serialize(),
            success: function (data) {
                window.sessionStorage.setItem("token", data.token);
                $("#login-failed-alert").addClass("hidden");
                window.location.href = "/app";
            },
            error: function (data) {
                window.sessionStorage.setItem("token", undefined);
                $("#login-failed-alert").removeClass("hidden");
            }
        });
        return false; // avoid to execute the actual submit of the form.
    });

    $("#register-form").submit(function () {
        $.ajax({
            type: "POST",
            url: '/register',
            data: $("#register-form").serialize(),
            success: function (data) {
                if (data.error) {
                    if (data.error === 'USERNAME_ALREADY_EXISTS'){
                        $("#register-failed-user").removeClass("hidden");
                    }
                    else if (data.error === 'EMAIL_ALREADY_EXISTS'){
                        $("#register-failed-email").removeClass("hidden");
                    }
                    else{
                        $("#register-failed-alert").removeClass("hidden");
                    }

                }
                else {
                    $("#register-failed-alert").addClass("hidden");
                    $("#register-failed-user").addClass("hidden");
                    $("#register-failed-email").addClass("hidden");
                    $('#register').modal('hide');
                    $('#register-success').modal('show');
                }
            },
            error: function (data) {
                $("#register-failed-alert").removeClass("hidden");
            }
        });
        return false; // avoid to execute the actual submit of the form.
    });

    $('#login').on('shown.bs.modal', function () {
        $("#login-failed-alert").addClass("hidden");
        $('#username').focus();
    });

    $('#register').on('shown.bs.modal', function () {
        $("#register-failed-alert").addClass("hidden");
        $("#register-failed-user").addClass("hidden");
        $("#register-failed-email").addClass("hidden");
    });

    $(function () {
        $('a.register-btn').click(function () {
            $('#login .close').click();
            $('#register').modal('show');
        });
    });

    $(window).load(function () {
        var token = window.sessionStorage.getItem("token");
        if (token) {
            $.ajax({
                type: "post",
                url: '/api/user-data',
                headers: {
                    "Authorization": "Bearer " + token
                },
                error: function () {
                    window.sessionStorage.removeItem("token");
                }
            });
            $('#login-link').addClass('hide');
            $('#register-link').addClass('hide');
            $('#logged-in').removeClass('hide');
        }
        var queryStrings = getQueryStrings();
        if (queryStrings['promptLogin'] === 'true') {
            $('#login').modal('show');
        }
        if ($('#monthlyRadio').prop('checked')) {
            monthlyRadioClicked();
        } else {
            yearlyRadioClicked();
        }
    });

    function getQueryStrings() {
        var vars = {}, hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    function monthlyRadioClicked() {
        $('.yearlyPrice').addClass('hide');
        $('.monthlyPrice').removeClass('hide');
    }

    function yearlyRadioClicked() {
        $('.monthlyPrice').addClass('hide');
        $('.yearlyPrice').removeClass('hide');
    }

})();