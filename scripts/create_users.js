"use strict";

var USERS = [
    { username: "nic", password: "nic" },
    { username: "chris", password: "chris" },
    { username: "david", password: "david" },
    { username: "test", password: "test" }
]

var mongoose = require('mongoose');

var db = mongoose.connect(process.env['MONGODB_URL']);

var User = require("../server/userModel")(mongoose).User;
var Encounter = require("../server/encounterModel")(mongoose).Encounter;
var authentication = require("../server/authentication")();

User.remove({}, function (error) {
    if (error) {
        throw error;
    }
    var userDone = 0;
    var encounterDone = 0;
    for (var user in USERS) {
        (function (userCopy) {

            var encounters = [
                {
                    Username: USERS[userCopy].username,
                    Name: 'Goblin Rage',
                    CR: 4,
                    Monsters: [
                        {
                            Name: 'Goblin',
                            CR: 1 / 3,
                            amount: 9
                        }
                    ]
                },
                {
                    Username: USERS[userCopy].username,
                    Name: 'What the Shade',
                    CR: 5,
                    Monsters: [
                        {
                            Name: 'Shadow',
                            CR: 3,
                            amount: 2
                        }
                    ]
                }
            ];

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
                    if (userDone == USERS.length && encounterDone == USERS.length) {
                        console.log("Done");
                        db.disconnect();
                    }
                });

                Encounter.create(encounters, function (error) {
                    if (error) {
                        console.log(error);
                    }
                    encounterDone++;
                    if (userDone == USERS.length && encounterDone == USERS.length) {
                        console.log("Done");
                        db.disconnect();
                    }
                });
            });
        }(user));
    }
});
