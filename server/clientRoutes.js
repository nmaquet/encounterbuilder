"use strict";

module.exports = function () {
    return {
        default: function (request, response) {
            response.render('../website/index.jade');
        },
        blog: function (request, response) {
            response.render('../website/blog.jade');
        },
        app: function (request, response) {
            response.render('../client/private/jade/app.jade');
        },
        login: function (request, response) {
            response.render('../client/private/jade/login.jade');
        },
        binder: function (request, response) {
            response.render('../client/private/jade/binder.jade');
        },
        home: function (request, response) {
            response.render('../client/private/jade/home.jade');
        },
        encounter: function (request, response) {
            response.render('../client/private/jade/encounter.jade');
        },
        encounterAndDetails: function (request, response) {
            response.render('../client/private/jade/encounter-and-details.jade');
        },
        monster: function (request, response) {
            response.render('../client/private/jade/monster.jade');
        },
        npc: function (request, response) {
            response.render('../client/private/jade/npc.jade');
        },
        item: function (request, response) {
            response.render('../client/private/jade/item.jade');
        },
        spell: function (request, response) {
            response.render('../client/private/jade/spell.jade');
        },
        feat: function (request, response) {
            response.render('../client/private/jade/feat.jade');
        },
        leftSidebar: function (request, response) {
            response.render('../client/private/jade/left-sidebar.jade');
        },
        rightSidebar: function (request, response) {
            response.render('../client/private/jade/right-sidebar.jade');
        },
        feedbackPopover: function (request, response) {
            response.render('../client/private/jade/feedback-popover.jade');
        },
        printableEncounter: function (request, response) {
            response.render('../client/private/jade/printable-encounter.jade');
        }
    }
};