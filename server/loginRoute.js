"use strict";

module.exports = function (db, authenticate) {
    return function (request, response) {
        authenticate(db, request.body.username, request.body.password, function (error, user) {
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