"use strict";

module.exports = function (User, authenticate) {
    return {
        get: function (request, response) {
            response.sendfile('client/public/login.html');
        },
        post: function (request, response) {
            authenticate(User, request.body.username, request.body.password, function (error, user) {
                if (user) {
                    request.session.regenerate(function () {
                        request.session.user = user;
                        response.json({username: user.username});
                    });
                } else {
                    response.json({error: 'login failed'});
                }
            });
        }
    }
};