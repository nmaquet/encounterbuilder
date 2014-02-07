"use strict";

module.exports = function (userCollection, authenticate) {
    return function (request, response) {
        authenticate(userCollection, request.body.username, request.body.password, function (error, user) {
            if (user) {
                request.session.regenerate(function () {
                    request.session.user = user;
                    response.json({});
                });
            } else {
                response.json({error:'Login Failed'});
            }
        });
    }

};