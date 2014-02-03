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
        monsterDetails: function (request, response) {
            response.render('../client/private/jade/monster-detail.jade');
        },
        feedbackPopover: function (request, response) {
            response.render('../client/private/jade/feedback-popover.jade');
        },
        ogl: function (request, response) {
            response.sendfile('client/public/partials/OGLv1.0a.xhtml.html');
        }
    }
};