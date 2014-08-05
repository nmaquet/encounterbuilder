// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

module.exports = function (jwt, userService) {

    var HOST_TO_ALLOWED_ORIGIN = {
        "192.168.0.5:3000": "http://168.168.0.5:3000",
        "localhost:3000": "http://localhost:3000",
        "localhost.encounterbuilder.com": "http://localhost.encounterbuilder.com",
        "encounterbuilder-staging.herokuapp.com": "http://staging.chronicleforge.com",
        "encounterbuilder-live.herokuapp.com": "http://www.chronicleforge.com"
    };

    return {
        post: function (request, response) {
            response.header('Access-Control-Allow-Origin', HOST_TO_ALLOWED_ORIGIN[request.headers.host]);
            response.header('Access-Control-Allow-Methods', 'POST');
            response.header('Access-Control-Allow-Headers', 'Content-Type');
            userService.authenticate(request.body.username, request.body.password, function (error, user) {
                if (user && user.emailValidated) {
                    var token = jwt.sign(user, process.env["SESSION_SECRET"], { expiresInMinutes: 30 * 24 * 60 });
                    response.json({token: token});
                }
                else if (user) {
                    response.send(403, "account email has not been validated");
                }
                else {
                    response.send(401, "login failed");
                }
            });
        }
    };
};