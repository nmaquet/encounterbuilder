"use strict";

module.exports = function (userService) {
    return {
        post: function (request, response) {
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
        },
        options: function (request, response) {
            var allowedOrigin;
            if (request.host === "staging.encounterbuilder.com") {
                allowedOrigin = "encounterbuilder-staging.herokuapp.com";
            } else {
                allowedOrigin = "encounterbuilder-live.herokuapp.com";
            }
            response.header('Access-Control-Allow-Origin', allowedOrigin);
            response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.header('Access-Control-Allow-Headers', 'Content-Type');
            response.send(200);
        }
    };
};