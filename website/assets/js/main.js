"use strict";

$('.carousel').carousel({
    interval: 6000
});

$("#login-form").submit(function () {
    $.ajax({
        type: "POST",
        url: '/login',
        data: $("#login-form").serialize(),
        success: function (data) {
            window.location.href = "/app";
        },
        error: function (data) {
            $("#login-failed-alert").removeClass("hidden");
        }
    });
    return false; // avoid to execute the actual submit of the form.
});

$('#login').on('shown.bs.modal', function () {
    $('#username').focus();
});

$(window).load(function () {
    $.ajax({
        type: "get",
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