"use strict";

$('.carousel').carousel({
    interval: 6000
});

$("#login-form").submit(function () {
    var url;
    var crossdomain = true;
    if (window.location.host === "localhost:3000" || window.location.host === "localhost.encounterbuilder.com") {
        url = "http://localhost:3000/login";
        crossdomain = false;
    } else if (window.location.host === "staging.encounterbuilder.com") {
        url = "https://encounterbuilder-staging.herokuapp.com/login";
    } else {
        url = "https://encounterbuilder-live.herokuapp.com/login";
    }
    var formData = $("#login-form").serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        crossDomain: crossdomain,
        data: JSON.stringify(formData),
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