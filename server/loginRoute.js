"use strict";

module.exports = function (userService) {
    return {
        post: function (request, response) {
//            if (request.host !== "localhost" && request.protocol !== "https") {
//                return response.send(400, "login must done over a secure connection")
//            }
            response.header('Access-Control-Allow-Origin', 'http://staging.encounterbuilder.com');
            response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            response.header('Access-Control-Allow-Headers', 'Content-Type');
            response.header('Access-Control-Allow-Credentials', 'true');
            userService.authenticate(request.body.username, request.body.password, function (error, user) {
                if (user) {
                    var token = jwt.sign(user, process.env["SESSION_SECRET"], { expiresInMinutes: 60*5 });
                    response.json(token);
                } else {
                    response.send(401, "login failed");
                }
            });
        }
    };
};