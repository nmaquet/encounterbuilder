"use strict";

module.exports = function () {
    return function (request, response) {
        if (request.session && request.session.user) {
            response.sendfile('client/public/index.html');
        } else {
            response.redirect('/login');
        }
    }
};