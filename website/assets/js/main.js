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
                console.log("TOKEN : " + data);
                // TODO: store the JWT into session storage
                $("#login-failed-alert").addClass("hidden");
                window.location.href = "/app";
            },
            error: function (data) {
                $("#login-failed-alert").removeClass("hidden");
            }
        });
        return false; // avoid to execute the actual submit of the form.
    });

    $('#login').on('shown.bs.modal', function () {
        $("#login-failed-alert").addClass("hidden");
        $('#username').focus();
    });

    $(window).load(function () {
        $.ajax({
            type: "post",
            url: '/api/user-data',
            success: function (userData) {
                if (userData.user !== undefined) {
                    $('#login-link').addClass('hide');
                    $('#register-link').addClass('hide');
                    $('#logged-in').removeClass('hide');
                }
            }
        });
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