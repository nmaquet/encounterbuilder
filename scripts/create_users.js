"use strict";

var mongoose = require('mongoose');
var User = require("../server/userModel")(mongoose).User;
var Encounter = require("../server/encounterModel")(mongoose).Encounter;
var authentication = require("../server/authentication")();

if (process.env.USE_TEST_DB) {
    var USERS = [
        { username: "test", password: "test" }
    ];
    var db = mongoose.connect(process.env['MONGODB_TEST_URL']);
} else {
    var USERS = [
        { username: "nic", password: "nic" },
        { username: "chris", password: "chris" },
        { username: "david", password: "david" },
        { username: "test", password: "test" }
    ]
    var db = mongoose.connect(process.env['MONGODB_URL']);
}

function main() {
    var userDone = 0;
    for (var user in USERS) {
        (function (userCopy) {
            authentication.hash(USERS[userCopy].password, function (error, salt, hash) {
                if (error) {
                    throw error;
                }
                var user = {
                    username: USERS[userCopy].username,
                    salt: salt,
                    hash: hash
                }
                User.create(user, function (error) {
                    if (error) {
                        console.log(error);
                    }
                    console.log("created user " + USERS[userCopy].username);
                    userDone++;
                    if (userDone == USERS.length) {
                        console.log("done");
                        db.disconnect();
                    }
                });
            });
        }(user));
    }
}

User.remove({}, function (error) {
    if (error) {
        throw error;
    }
    Encounter.remove({}, function (error) {
        main();
    });
});
