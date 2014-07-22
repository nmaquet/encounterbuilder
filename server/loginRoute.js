"use strict";

module.exports = function (userService) {
    return function (request, response) {
        if (request.host !== "localhost" && request.protocol !== "https") {
            return response.send(400, "login must done over a secure connection")
        }
        userService.authenticate(request.body.username, request.body.password, function (error, user) {
            if (user) {
                request.session.regenerate(function () {
                    request.session.user = user;
                    response.send(200);
                });
            } else {
                response.send(401, "login failed");
            }
        });
    }
};