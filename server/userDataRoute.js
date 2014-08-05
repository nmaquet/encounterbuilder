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
            },
            function (callback) {
                contentTreesCollection.findOne({username: username}, {fields: {username: 1, contentTree: 1, _id: 0}}, function (error, contentTree) {
                    callback(error, contentTree);
                });
            }
        ], function (error, results) {
            if (error || !results[0] || !results[1]) {
                console.log(error);
                response.send(500);
            }
            else {
                var userData = {
                    user: {
                        username: results[0].username,
                        email: results[0].email,
                        fullname: results[0].fullname
                    },
                    contentTree: results[1].contentTree
                };
                response.json(userData);
            }
        });
    }
};