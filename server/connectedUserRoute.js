"use strict";


module.exports = function () {
    return function (request, response) {
        if (request.session && request.session.user) {
            response.json({username: request.session.user.username});
        }
        else {
            response.json({});
        }
    }
};