// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var async = require("async");

module.exports = function (contentTreesCollection, userService) {
    return function (request, response) {
        var username = request.user.username;
        async.parallel([
            function (callback) {
                userService.get(username, function (error, user) {
                    callback(error, user);
                });
            }
        ], function (error, results) {
            if (error || !results[0]) {
                console.log(error);
                response.send(500);
            }
            else {
                var userData = {
                    user: {
                        username: results[0].username,
                        email: results[0].email,
                        fullname: results[0].fullname
                    }
                };
                response.json(userData);
            }
        });
    }
};