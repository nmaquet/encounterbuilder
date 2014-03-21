"use strict";

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

function authenticate(userCollection, username, password, callback) {
    userCollection.findOne({ username: username }, function (error, user) {
        if (error || !user || !password) {
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

module.exports = function () {
    return {
        authenticate: authenticate,
        check: authenticationCheck,
        hash: hash
    }
};