"use strict";

var USERS = [
    { username: "nic", password: "nic" },
    { username: "chris", password: "chris" },
    { username: "david", password: "david" }
]

var mongoose = require('mongoose');

mongoose.connect(process.env['MONGODB_URL']);

var crypto = require('crypto');
var SALT_LENGTH = 128;
var PBKDF2_ITERATIONS = 12000;

function hash(pwd, salt, fn) {
    if (3 == arguments.length) {
        crypto.pbkdf2(pwd, salt, PBKDF2_ITERATIONS, SALT_LENGTH, fn);
    } else {
        fn = salt;
        crypto.randomBytes(SALT_LENGTH, function (err, salt) {
            if (err) return fn(err);
            salt = salt.toString('base64');
            crypto.pbkdf2(pwd, salt, PBKDF2_ITERATIONS, SALT_LENGTH, function (err, hash) {
                if (err) return fn(err);
                fn(null, salt, hash);
            });
        });
    }
}

var UserSchema = new mongoose.Schema({
    username: String,
    salt: String,
    hash: String
});

var User = mongoose.model('users', UserSchema);

function authenticate(username, password, callback) {
    User.findOne({ username: username }, function (error, user) {
        if (error || !user) {
            if (error) {
                console.log(error);
            }
            callback(new Error('authentication failure'), null);
        } else {
            hash(password, user.salt, function (error, hash) {
                if (error || hash != user.hash) {
                    if (error) {
                        console.log(error);
                    }
                    callback(new Error('authentication failure'), null);
                } else {
                    callback(null, user);
                }
            });
        }
    });
}

function authenticationCheck(request, response, next) {
    if (request.session && request.session.user) {
        next();
    } else {
        response.send(401, 'access denied');
    }
}

User.remove({}, function (error) {
    if (error) {
        throw error;
    }
    for (var user in USERS) {
        (function (userCopy) {
            hash(USERS[userCopy].password, function (error, salt, hash) {
                if (error) {
                    throw error;
                }
                User.create({ username: USERS[userCopy].username, salt: salt, hash: hash }, function (error) {
                    if (error) {
                        console.log(error);
                    }
                    console.log("created user " + USERS[userCopy].username);
                });
            });
        }(user));
    }
    console.log("done");
});
