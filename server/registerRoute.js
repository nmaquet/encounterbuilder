// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var async = require("async");

module.exports = function (userService, sesService) {
    return function (request, response) {
        var fields = {
            username: request.body.username,
            email: request.body.email,
            fullname: request.body.fullname,
            password: request.body.password
        };
        userService.register(fields, function (error, newUser) {
            if (error) {
                return response.json({error: error.message});
            }
            sesService.sendConfirmationEmail(newUser, request.headers.host, function (error) {
                if (error) {
                    return response.json({error: error.message});
                }
                return response.send(200);
            });

        });
    }
};