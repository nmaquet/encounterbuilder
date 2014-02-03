"use strict";

module.exports = function () {
    return {
        default: function (request, response) {
            response.sendfile('client/public/index.html');
        },
        login: function (request, response) {
            response.sendfile('client/public/partials/login.html');
        },
        monsterList: function (request, response) {
            response.sendfile('client/public/partials/monster-list.html');
        },
        monsterDetails: function (request, response) {
            response.sendfile('client/public/partials/monster-detail.html');
        },
        feedbackPopover: function (request, response) {
            response.sendfile('client/public/partials/feedback-popover.html');
        },
        ogl: function (request, response) {
            response.sendfile('client/public/partials/OGLv1.0a.xhtml.html');
        }
    }
};