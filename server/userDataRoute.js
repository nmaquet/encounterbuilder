"use strict";


module.exports = function () {
    return function (request, response) {
        if (request.session && request.session.user) {
            var userData = {
                user: {
                    username: request.session.user.username
                }
            };
            response.json(userData);
        }
        else {
            response.json({});
        }
    }
};