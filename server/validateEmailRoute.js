"use strict";

var async = require("async");


module.exports = function (userService) {
    return function (request, response) {
        if (!request.query.uuid || !request.query.id) {
            return response.send(400);
        }
        userService.getById(request.query.id, function (error, user) {
            if (error) {
                return response.send(500);
            }
            if (user && user.validationUuid === request.query.uuid) {
                userService.update(user.username, {emailValidated: true}, function (error, data) {
                    if (error) {
                        return response.send(500);
                    }
                   return response.redirect(303, "?emailValidated=true");
                });
            }
            else {
                return response.send(400);
            }
        });
    }
};