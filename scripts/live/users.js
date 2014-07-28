"use strict";

var program = require('commander');
var read = require('read');
var fs = require('fs');
var async = require('async');
var crypto = require('crypto');
var MongoClient = require('mongodb').MongoClient;

function randomPassword() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var passwordLength = 8;
    var password = '';
    for (var i = 0; i < passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
}

function printUser(user) {
    user.hash = '<hidden>';
    user.salt = '<hidden>';
    console.log(JSON.stringify(user, null, 4));
}

function getURL(callback) {
    if (program["live"]){
        console.log("* using LIVE db *");
        read({ prompt: 'Password: ', silent: true }, function (error, password) {
            if (error) {
                return console.log("aborted");
            }
            var ciphertext = process.env["MONGODB_LIVE_URL"];
            try {
                var decipher = crypto.createDecipher("aes-128-cbc", password);
                var cleartext = "";
                cleartext += decipher.update(ciphertext, 'base64');
                cleartext += decipher.final('utf8');
            } catch(TypeError) {
                return console.log("wrong password !");
            }
            callback(cleartext);
        });
    } else if (program["test"]) {
        console.log("* using TEST db *");
        callback(process.env["MONGODB_TEST_URL"]);
    } else {
        console.log("* using STAGING db *");
        callback(process.env["MONGODB_URL"]);
    }
}

function connect(callback) {
    getURL(function(url) {
        MongoClient.connect(url, function (error, db) {
            var userService = require("../../server/userService")(db);
            callback(userService, db);
        });
    });
}

function command(command, description, callback) {
    program
        .command(command)
        .description(description)
        .action(function (arg1, arg2, arg3) {
            connect(function (userService, db) {
                callback(userService, db, arg1, arg2, arg3);
            });
        });
}

program
    .version('0.0.1')
    .option('-l --live', "use Live DB")
    .option('-t --test', "use Test DB")
    .usage('<command> [options]')


command("list", "list all users", function (userService, db) {
    userService.toArray(function (error, userArray) {
        if (error) {
            console.log("error listing users : " + error.message);
        } else {
            for (var i in userArray) {
                var user = userArray[i];
                console.log(user.username + " \t " + user.email);
            }
        }
        db.close();
    });
});


command("show <username>", "show a user's info", function (userService, db, username) {
    userService.get(username, function (error, user) {
        if (error) {
            console.log("error showing user : " + error.message);
        } else {
            printUser(user);
        }
        db.close();
    });
});


command("auth <username>", "test the authentication of a user", function (userService, db, username) {
    read({ prompt: 'Password: ', silent: true }, function (error, password) {
        userService.authenticate(username, password, function (error, user) {
            if (error) {
                console.log("error authenticating user : " + error.message);
            } else {
                console.log("authentication successful");
            }
            db.close();
        });
    });
});

command("register", "register a new user", function (userService, db) {
    async.series([
        read.bind(null, { prompt: 'Username: ' }),
        read.bind(null, { prompt: 'Password (leave blank to generate): ' }),
        read.bind(null, { prompt: 'Email: ' })
    ], function (error, results) {
        if (error) {
            console.log("aborted");
            return db.close();
        }
        var user = {};
        if (results[0][0]) {
            user.username = results[0][0];
        }
        if (results[1][0]) {
            user.password = results[1][0];
        } else {
            user.password = randomPassword();
            console.log("Generated password : " + user.password);
        }
        if (results[2][0]) {
            user.email = results[2][0];
        }
        userService.register(user, function (error, user) {
            if (error) {
                console.log("error registering user : " + error.message);
                return db.close();
            }
            printUser(user);
            db.close();
        });
    });
});

command("update <username>", "update a user's info", function (userService, db, username) {
    async.series([
        read.bind(null, { prompt: 'New username (leave blank if unchanged): ' }),
        read.bind(null, { prompt: 'New email (leave blank if unchanged): ' })
    ], function (error, results) {
        if (error) {
            console.log("aborted");
            return db.close();
        }
        var fields = {};
        if (results[0][0]) {
            fields.username = results[0][0];
        }
        if (results[1][0]) {
            fields.email = results[1][0];
        }
        if (!fields.username && !fields.email) {
            console.log("all fields blank... aborting");
            return db.close();
        }
        userService.update(username, fields, function (error, user) {
            if (error) {
                console.log("error updating user : " + error.message);
                return db.close();
            }
            console.log("update successful");
            db.close();
        });
    });
});

command("passwd <username>", "change a user's password", function (userService, db, username) {
    read({ prompt: 'New password (leave blank to generate): ', silent: true}, function (error, password) {
        if (error) {
            console.log("aborted");
            return db.close();
        }
        if (!password) {
            password = randomPassword();
            console.log("Generated password : " + password);
        }
        userService.updatePassword(username, password, function (error) {
            if (error) {
                console.log("error updating user password : " + error.message);
                return db.close();
            }
            console.log("update successful");
            db.close();
        });
    });
});

command("remove <username>", "remove a user", function (userService, db, username) {
    userService.remove(username, function (error) {
        if (error) {
            console.log("error removing user: " + error.message);
            return db.close();
        }
        console.log("remove successful");
        db.close();
    });
});

command("validate <username>", "validate a user's email address", function (userService, db, username) {
    userService.update(username, {emailValidated: true}, function (error, user) {
        if (error) {
            console.log("error updating user : " + error.message);
            return db.close();
        }
        console.log("validate successful");
        db.close();
    });
});

program.parse(process.argv);

var COMMANDS = ["list", "show", "update", "passwd", "auth", "register", "remove", "validate"];

if (program.args.length === 0 || COMMANDS.indexOf(program.rawArgs[2]) < 0) {
    program.help();
}