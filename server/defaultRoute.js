"use strict";

module.exports = function () {
    return function (request, response) {
        if (request.session.user) {
            response.sendfile('client/public/index.html');
        } else {
            console.log("default Route: redirecting to /login")
            response.redirect('/login');
        }
    }
}