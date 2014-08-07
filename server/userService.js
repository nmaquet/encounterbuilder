// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var SALT_LENGTH = 128;
var PBKDF2_ITERATIONS = 12000;

var async = require("async");
var crypto = require('crypto');
var uuid = require('node-uuid');
var ObjectID = require('mongodb').ObjectID;

var userCollection = null;
var contentTreeCollection = null;
var encounterCollection = null;
var favouritesCollection = null;
var userTextCollection = null;
var userMonsterCollection = null;
var userNpcCollection = null;
var sesService = null;

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
    userCollection.findOne({username: username}, function (error, result) {
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
    userCollection.findOne(query, function (error, result) {
        if (result && caseInsensitive(result.username).test(fields.username)) {
            return callback(new Error("USERNAME_ALREADY_EXISTS"));
        } else if (result) {
            return callback(new Error("EMAIL_ALREADY_EXISTS"));
        }
        hashPassword(fields.password, function (error, salt, hash) {
            if (error) {
                return callback(error);
            }
            var user = {
                username: "" + fields.username,
                email: "" + fields.email,
                hash: "" + hash,
                salt: "" + salt,
                emailValidated: false,
                validationUuid: uuid.v4()
            };
            delete fields.password;
            for (var property in fields) {
                if (!fields.hasOwnProperty(property) || user.property)
                    continue;
                user[property] = fields[property];
            }
            userCollection.insert(user, function (error, result) {
                if (error) {
                    return callback(error);
                }
                contentTreeCollection.insert({ username: user.username, contentTree: [] }, function (error) {
                    if (error) {
                        return callback(error);
                    }
                    favouritesCollection.insert({ username: user.username, favourites: [] }, function (error) {
                        if (error) {
                            return callback(error);
                        }
                        sesService.sendConfirmationEmail(user, function (error) {
                            if (error) {
                                return callback(new Error('SENDING_EMAIL_FAILED'));
                            }
                            callback(error, result[0]);
                        });
                    });
                });
            });
        });
    });
}

function get(username, callback) {
    userCollection.findOne({username: username}, function (error, result) {
        callback(error, result);
    });
}
function getById(id, callback) {
    userCollection.findOne({_id: ObjectID(id)}, function (error, result) {
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
    var query = { $and: [
        { username: { $ne: username } },
        { $or: disjunction }
    ] };
    if (fields.username) {
        disjunction.push({username: caseInsensitive(fields.username)});
    }
    if (fields.email) {
        disjunction.push({email: caseInsensitive(fields.email)});
    }
    userCollection.findOne(query, function (error, result) {
        if (result && caseInsensitive(result.username).test(fields.username)) {
            return callback(new Error("USERNAME_ALREADY_EXISTS"));
        } else if (result) {
            return callback(new Error("EMAIL_ALREADY_EXISTS"));
        }
        userCollection.findAndModify({username: username}, [], {$set: fields}, function (error, modifiedUser) {
            if (error) {
                return callback(error);
            }
            if (!modifiedUser) {
                return callback(new Error("USER_DOES_NOT_EXIST"));
            }
            if (!fields.username) {
                return callback(null);
            }
            contentTreeCollection.update({username: username}, {$set: {username: fields.username} }, function (error) {
                if (error) {
                    return callback(error);
                }
                favouritesCollection.update({username: username}, {$set: {username: fields.username} }, function (error) {
                    if (error) {
                        return callback(error);
                    }
                    encounterCollection.update({Username: username}, {$set: {Username: fields.username} }, {multi: true}, function (error) {
                        if (error) {
                            return callback(error);
                        }
                        userTextCollection.update({username: username}, {$set: {username: fields.username} }, {multi: true}, function (error) {
                            if (error) {
                                return callback(error);
                            }
                            userMonsterCollection.update({Username: username}, {$set: {Username: fields.username} }, {multi: true}, function (error) {
                                if (error) {
                                    return callback(error);
                                }
                                userNpcCollection.update({Username: username}, {$set: {Username: fields.username} }, {multi: true}, function (error) {
                                    return callback(error, modifiedUser);
                                })
                            })
                        })
                    });
                });
            });
        });
    });
}

function toArray(callback) {
    userCollection.find({}).toArray(callback);
}

function updatePassword(username, password, callback) {
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
        userCollection.update({username: username}, update, callback);
    });
}

function remove(username, callback) {
    async.series([
        userCollection.remove.bind(userCollection, {username: username}),
        favouritesCollection.remove.bind(favouritesCollection, {username: username}),
        contentTreeCollection.remove.bind(contentTreeCollection, {username: username}),
        encounterCollection.remove.bind(encounterCollection, {Username: username}),
        userTextCollection.remove.bind(userTextCollection, {Username: username}),
        userMonsterCollection.remove.bind(userMonsterCollection, {Username: username}),
        userNpcCollection.remove.bind(userNpcCollection, {Username: username})
    ], callback);
}

module.exports = function (database, sesService_) {

    userCollection = database.collection("users");
    contentTreeCollection = database.collection("contenttrees");
    favouritesCollection = database.collection("favourites");
    encounterCollection = database.collection("encounters");
    userMonsterCollection = database.collection("usermonsters");
    userTextCollection = database.collection("usertexts");
    userNpcCollection = database.collection("usernpcs");

    sesService = sesService_;

    return {
        exists: exists,
        register: register,
        get: get,
        getById: getById,
        update: update,
        authenticate: authenticate,
        toArray: toArray,
        updatePassword: updatePassword,
        remove: remove
    }
};