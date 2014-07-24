"use strict";

var async = require("async");

module.exports = function (userService) {
    return function (request, response) {
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