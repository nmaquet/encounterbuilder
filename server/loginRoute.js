"use strict";

module.exports = function (jwt, userService) {

    var HOST_TO_ALLOWED_ORIGIN = {
        "localhost:3000": "http://localhost:3000",
        "localhost.encounterbuilder.com": "http://localhost.encounterbuilder.com",
        "encounterbuilder-staging.herokuapp.com": "http://staging.encounterbuilder.com",
        "encounterbuilder-live.herokuapp.com": "http://www.encounterbuilder.com"
    };

    return {
        post: function (request, response) {
            response.header('Access-Control-Allow-Origin', HOST_TO_ALLOWED_ORIGIN[request.headers.host]);
            response.header('Access-Control-Allow-Methods', 'POST');
            response.header('Access-Control-Allow-Headers', 'Content-Type');
            userService.authenticate(request.body.username, request.body.password, function (error, user) {
                if (user) {
                    var token = jwt.sign(user, process.env["SESSION_SECRET"], { expiresInMinutes: 60*5 });
                    response.json({token: token});
                } else {
                    response.send(401, "login failed");
                }
            });
        }
    };
};