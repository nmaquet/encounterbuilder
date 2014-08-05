// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

module.exports = function (userService) {
    return function (request, response) {
        var username = request.user.username;
        userService.authenticate(username, request.body.oldPassword, function (error) {
            if (error) {
                return response.json({error: "wrong password"});
            }
            userService.updatePassword(username, request.body.newPassword, function (error) {
                if (error) {
                    return response.send(500);
                }
                response.send(200);
            });
        });
    }
};