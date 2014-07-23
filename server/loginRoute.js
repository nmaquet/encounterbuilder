"use strict";

module.exports = function (userService) {
    return {
        post: function (request, response) {
//            if (request.host !== "localhost" && request.protocol !== "https") {
//                return response.send(400, "login must done over a secure connection")
//            }
            response.header('Access-Control-Allow-Origin', 'http://staging.encounterbuilder.com');
            response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.header('Access-Control-Allow-Headers', 'Content-Type');
            response.header('Access-Control-Allow-Credentials', 'true');
            userService.authenticate(request.body.username, request.body.password, function (error, user) {
                if (user) {
                    request.session.regenerate(function () {
                        request.session.cookie.domain = process.env["COOKIE_DOMAIN"];
                        request.session.cookie.path = "";
                        request.session.user = user;
                        response.send(200);
                    });
                } else {
                    response.send(401, "login failed");
                }
            });
        },
        options: function (request, response) {
//            var allowedOrigin;
//            if (request.host === "encounterbuilder-staging.herokuapp.com") {
//                allowedOrigin = "http://staging.encounterbuilder.com";
//            } else {
//                allowedOrigin = "http://www.encounterbuilder.com";
//            }
            response.header('Access-Control-Allow-Origin', 'http://staging.encounterbuilder.com');
            response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.header('Access-Control-Allow-Headers', 'Content-Type');
            response.header('Access-Control-Allow-Credentials', 'true');
            response.send(200);
        }
    };
};