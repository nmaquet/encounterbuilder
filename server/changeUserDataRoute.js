"use strict";

var async = require("async");
var escapeRegExp = require('./utils')().escapeRegExp;

module.exports = function (userCollection, encounterCollection, authentication) {
    return function (request, response) {
        var username = request.session.user.username;
        var newUser = {
            username: request.body.username,
            email: request.body.email,
            fullname: request.body.fullname
        };
        async.series([
            function (callback) {
                if (request.body.username.toLowerCase() === request.session.user.username.toLowerCase()) {
                    callback(null);
                }
                else {
                    userCollection.count({username: new RegExp("^" + escapeRegExp(request.body.username) + "$", "i")}, function (error, count) {
                        if (error) {
                            callback(error);
                        }
                        else if (count > 0) {
                            callback({clientError: "USERNAME_ALREADY_EXISTS"});
                        }
                        else {
                            callback(null);
                        }
                    });
                }
            },
            function (callback) {
                if (request.body.email.toLowerCase() === request.session.user.email.toLowerCase()) {
                    callback(null);
                }
                else {
                    userCollection.count({email: new RegExp("^" + escapeRegExp(request.body.email) + "$", "i")}, function (error, count) {
                        if (error) {
                            callback(error);
                        }
                        else if (count > 0) {
                            callback({clientError: "EMAIL_ALREADY_EXISTS"});
                        }
                        else {
                            callback(null);
                        }
                    });
                }
            },
            function (callback) {
                authentication.authenticate(userCollection, username, request.body.password, function (error, user) {
                    if (user) {
                        callback(error);
                    } else {
                        callback({clientError: "WRONG_PASSWORD"});
                    }
                });
            },
            function (callback) {
                userCollection.update(
                    {username: username},
                    {$set: newUser},
                    function (error) {
                        callback(error);
                    });
            },
            function (callback) {
                encounterCollection.update(
                    {Username: username},
                    {$set: {
                        Username: request.body.username
                    }},
                    {multi: true},
                    function (error) {
                        if (error) {
                            console.log(error);
                            callback("UPDATE_ENCOUNTERS_FAILED");
                        }
                        else {
                            callback(null);
                        }
                    });
            }
        ],
            function (error, results) {
                if (error && error.clientError) {
                    response.json({error: error.clientError});
                } else if (error === "UPDATE_ENCOUNTERS_FAILED") {
                    userCollection.update({username: newUser.username}, {$set: request.session.user},
                        function (error) {
                            if (error) {
                                console.log(error);
                            }
                        });
                    response.send(500);
                }
                else if (error) {
                    console.log(error);
                    response.send(500);
                } else {
                    request.session.user = newUser;
                    response.send(200);
                }
            }
        );
    }
}