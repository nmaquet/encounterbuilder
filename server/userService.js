"use strict";

var SALT_LENGTH = 128;
var PBKDF2_ITERATIONS = 12000;

var async = require("async");
var crypto = require('crypto');

var userCollection = null;

var escapeRegExp = require('./utils')().escapeRegExp;

function caseInsensitive(string) {
    return new RegExp("^" + escapeRegExp(string) + "$", "i");
}

function hashPassword(pwd, salt, fn) {
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

function authenticate(username, password, callback) {
    userCollection.findOne({username: caseInsensitive(username)}, function (error, user) {
        if (error || !user || !password) {
            return callback(new Error('WRONG_PASSWORD'), null);
        }
        hashPassword(password, user.salt, function (error, computedHash) {
            if (error || computedHash != user.hash) {
                if (error) {
                    console.log(error);
                }
                callback(new Error('WRONG_PASSWORD'), null);
            } else {
                callback(null, user);
            }
        });
    });
}

function exists(username, callback) {
    userCollection.findOne({username: username}, function(error, result) {
        callback(error, !!result);
    });
}

function register(fields, callback) {
    if (!fields.username) {
        return callback(new Error("MISSING_USERNAME"));
    }
    if (!fields.password) {
        return callback(new Error("MISSING_PASSWORD"));
    }
    if (!fields.email) {
        return callback(new Error("MISSING_EMAIL"));
    }
    var query = {
        $or: [
            {username: caseInsensitive(fields.username)},
            {email: caseInsensitive(fields.email)}
        ]
    };
    userCollection.findOne(query, function(error, result) {
        if (result && caseInsensitive(result.username).test(fields.username)) {
            return callback(new Error("USERNAME_ALREADY_EXISTS"));
        } else if (result) {
            return callback(new Error("EMAIL_ALREADY_EXISTS"));
        }
        hashPassword(fields.password, function(error, salt, hash) {
            if (error) {
                return callback(error);
            }
            var user = {
                username: "" + fields.username,
                email: "" + fields.email,
                hash: "" + hash,
                salt: "" + salt
            };
            delete fields.password;
            for (var property in fields) {
                if (!fields.hasOwnProperty(property) || user.property)
                    continue;
                user[property] = fields[property];
            }
            userCollection.insert(user, function (error, result) {
                callback(error, result[0]);
            });
        });
    });
}

function get(username, callback) {
    userCollection.findOne({username: username}, function(error, result) {
        callback(error, result);
    });
}

function update(username, fields, callback) {
    if (fields.password) {
        return callback(new Error("USE_UPDATEPASSWORD_TO_UPDATE_PASSWORD"));
    }
    if (fields.hash || fields.salt) {
        return callback(new Error("CANNOT_UPDATE_HASH_OR_SALT_FIELDS"));
    }
    var disjunction = [];
    var query = { $and : [ { username: { $ne: username } }, { $or: disjunction } ] };
    if (fields.username) {
        disjunction.push({username: caseInsensitive(fields.username)});
    }
    if (fields.email) {
        disjunction.push({email: caseInsensitive(fields.email)});
    }
    userCollection.findOne(query, function(error, result) {
        if (result && caseInsensitive(result.username).test(fields.username)) {
            return callback(new Error("USERNAME_ALREADY_EXISTS"));
        } else if (result) {
            return callback(new Error("EMAIL_ALREADY_EXISTS"));
        }
        userCollection.update({username: username}, {$set: fields}, function(error, result) {
            if (error) {
                return callback(error);
            }
            if (!result) {
                return callback(new Error("USER_DOES_NOT_EXIST"));
            }
            callback(null);
        });
    });
}

function toArray(callback) {
    userCollection.find({}).toArray(callback);
}

function updatePassword(username, password, callback) {
    userCollection.findOne({username: username}, function(error, result) {
        if (error || !result) {
            return callback(new Error("UPDATE_PASSWORD_FAILED"));
        }
        hashPassword(password, function (error, salt, hash) {
            if (error) {
                return callback(new Error("UPDATE_PASSWORD_FAILED"));
            }
            var update = {
                $set: {
                    hash: "" + hash,
                    salt: "" + salt
                }
            };
            userCollection.update(result, update, callback);
        });
    });
}

function remove(username, callback) {
    userCollection.remove({username: username}, callback);
}

module.exports = function (database) {
    userCollection = database.collection("users");
    return {
        exists: exists,
        register: register,
        get: get,
        update: update,
        authenticate: authenticate,
        toArray: toArray,
        updatePassword: updatePassword,
        remove: remove
    }
};