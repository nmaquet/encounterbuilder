"use strict";

var async = require("async");
var escapeRegExp = require('./utils')().escapeRegExp;

module.exports = function (userService) {
    return function (request, response) {
        var username = request.session.user.username;
        var fields = {
            username: request.body.username,
            email: request.body.email,
            fullname: request.body.fullname
        };
        userService.authenticate(username, request.body.password, function(error) {
            if (error) {
                return response.json({error: "WRONG_PASSWORD"});
            }
            userService.update(username, fields, function (error, newUser) {
                if (error) {
                    return response.json({error: error.message});
                }
                request.session.user = newUser;
                response.send(200);
            });
        });
    }
};