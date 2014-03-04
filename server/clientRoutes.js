"use strict";

module.exports = function () {
    return {
        default: function (request, response) {
            response.render('../website/index.jade');
        },
        app: function (request, response) {
            response.render('../client/private/jade/app.jade');
        },
        login: function (request, response) {
            response.render('../client/private/jade/login.jade');
        },
        encounterBuilder: function (request, response) {
            response.render('../client/private/jade/encounter-builder.jade');
        },
        feedbackPopover: function (request, response) {
            response.render('../client/private/jade/feedback-popover.jade');
        },
        printableEncounter: function (request, response) {
            response.render('../client/private/jade/printable-encounter.jade');
        }
    }
};