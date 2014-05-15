"use strict";

var async = require("async");

module.exports = function (contentTreesCollection, userCollection) {
    return function (request, response) {
        if (request.session && request.session.user) {
            var username = request.session.user.username;
            async.parallel([
                function (callback) {
                    var options = {fields: {username: 1, email: 1, fullname: 1, _id: 0}};
                    userCollection.findOne({username: username}, options, function (error, user) {
                        callback(error, user);
                    });
                },
                function (callback) {
                    contentTreesCollection.find({username: username}, {fields: {username: 1, contentTree: 1, _id: 0}}).toArray(function (error, contentTree) {
                        callback(error, contentTree[0].contentTree);
                    });
                }
            ], function (error, results) {
                if (error) {
                    console.log(error);
                    response.send(500);
                }
                else {
                    var userData = {
                        user: results[0],
                        contentTree: results[1]
                    };
                    response.json(userData);
                }
            });
        }
        else {
            response.send(401, 'access denied');
        }
    }
};