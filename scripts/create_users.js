"use strict";

var USERS = [
    { username: "nic", password: "nic" },
    { username: "chris", password: "chris" },
    { username: "david", password: "david" }
]

var mongoose = require('mongoose');

var db = mongoose.connect(process.env['MONGODB_URL']);

var User = require("../server/userModel")(mongoose).User;
var authentication =  require("../server/authentication")();

User.remove({}, function (error) {
    if (error) {
        throw error;
    }
    var done = 0;
    for (var user in USERS) {
        (function (userCopy) {
            authentication.hash(USERS[userCopy].password, function (error, salt, hash) {
                if (error) {
                    throw error;
                }
                User.create({ username: USERS[userCopy].username, salt: salt, hash: hash }, function (error) {
                    if (error) {
                        console.log(error);
                    }
                    console.log("created user " + USERS[userCopy].username);
                    done++;
                    if (done == USERS.length) {
                        console.log("done");
                        db.disconnect();
                    }
                });
            });
        }(user));
    }
});
