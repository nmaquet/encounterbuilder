"use strict";

module.exports = function (jwt, userService) {

    var HOST_TO_ALLOWED_ORIGIN = {
        "localhost:3000": "localhost:3000",
        "localhost.encounterbuilder.com": "localhost.encounterbuilder.com",
        "encounterbuilder-staging.herokuapp.com": "staging.encounterbuilder.com",
        "encounterbuilder-live.herokuapp.com": "www.encounterbuilder.com"
    };

    return {
        post: function (request, response) {
            if (!/^localhost/.test(request.headers.host) && request.protocol !== "https") {
                return response.send(403, "login must done over a secure connection")
            }
            response.header('Access-Control-Allow-Origin', HOST_TO_ALLOWED_ORIGIN[request.header.host]);
            response.header('Access-Control-Allow-Methods', 'POST');
            response.header('Access-Control-Allow-Headers', 'Content-Type');
            userService.authenticate(request.body.username, request.body.password, function (error, user) {
                if (user) {
                    var token = jwt.sign(user, process.env["SESSION_SECRET"], { expiresInMinutes: 60*5 });
                    response.json(token);
                } else {
                    response.send(401, "login failed");
                }
            });
        }
    };
};