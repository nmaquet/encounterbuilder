"use strict";

module.exports = function () {
    return {
        default: function (request, response) {
            response.render('../client/private/jade/index.jade');
        },
        login: function (request, response) {
            response.render('../client/private/jade/login.jade');
        },
        monsterList: function (request, response) {
            response.render('../client/private/jade/monster-list.jade');
        },
        feedbackPopover: function (request, response) {
            response.render('../client/private/jade/feedback-popover.jade');
        }
    }
};