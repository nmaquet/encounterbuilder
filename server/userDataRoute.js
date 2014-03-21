"use strict";

var async = require("async");

module.exports = function (encounterCollection, userCollection) {
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
                    encounterCollection.find({Username: username}).toArray(function (error, Encounters) {
                        callback(error, Encounters);
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
                        Encounters: results[1]
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