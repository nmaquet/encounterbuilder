"use strict";

var async = require("async");

var HOST_TO_ALLOWED_ORIGIN = {
    "localhost:3000": "http://localhost:3000",
    "localhost.encounterbuilder.com": "http://localhost.encounterbuilder.com",
    "encounterbuilder-staging.herokuapp.com": "http://staging.encounterbuilder.com",
    "encounterbuilder-live.herokuapp.com": "http://www.encounterbuilder.com"
};

module.exports = function (userService) {
    return function (request, response) {
        response.header('Access-Control-Allow-Origin', HOST_TO_ALLOWED_ORIGIN[request.headers.host]);
        response.header('Access-Control-Allow-Methods', 'POST');
        response.header('Access-Control-Allow-Headers', 'Content-Type');
        var fields = {
            username: request.body.username,
            email: request.body.email,
            fullname: request.body.fullname,
            password: request.body.password
        };
        userService.register(fields, function (error) {
            if (error) {
                return response.json({error:error.message});
            }
            return response.send(200);
        });
    }
};