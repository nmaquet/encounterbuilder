"use strict";

module.exports = function (userService) {
    return function (request, response) {
        var username = request.session.user.username;
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