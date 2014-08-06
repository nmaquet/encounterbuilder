// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

module.exports = function (jwt, userService) {
    return {
        post: function (request, response) {
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