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
var userFeatCollection = null;
var userSpellCollection = null;
var userMonsterCollection = null;
var userNpcCollection = null;
var userIllustrationCollection = null;
var userItemCollection = null;
var userMapCollection = null;
var chroniclesCollection = null;
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


function listChronicles(username, callback) {
    userCollection.findOne({username: username},
        function (error, user) {
            if (error) {
                return callback(new Error("UNKNOWN_USER"));
            }
            chroniclesCollection.find({userId: user._id}, {fields: {_id: 1, name: 1}}).toArray(callback);
        });
}
function importChronicle(username, chronicle, callback) {
    var user = null;
    var requestPending = 0;
    var userResourceCollections = {
        "user-feat": userFeatCollection,
        "user-illustration": userIllustrationCollection,
        "user-map": userMapCollection,
        "user-spell": userSpellCollection,
        "user-item": userItemCollection
    };

    function insertChronicle() {
        var newChronicle = {};
        newChronicle.name = chronicle.name;
        newChronicle.userId = user._id;
        newChronicle.contentTree = chronicle.contentTree;
        chroniclesCollection.insert(newChronicle, function (error) {
        callback(error);
        });


    }

    function insertMonster(x) {
        requestPending++;
        x.userMonster.Username = username;
        userMonsterCollection.insert(x.userMonster, function (error, newUserMonster) {
            if (error) {
                callback(error);
            }
            x.userMonsterId = newUserMonster[0]._id;
            delete x.userMonster;
            requestPending--;
            if (requestPending === 0) {
                insertChronicle();
            }
        });
    }

    function insertNpc(x) {
        requestPending++;
        x.userNpc.Username = username;
        userNpcCollection.insert(x.userNpc, function (error, newUserNpc) {
            if (error) {
                callback(error);
            }
            x.userNpcId = newUserNpc[0]._id;
            delete x.userNpc;
            requestPending--;
            if (requestPending === 0) {
                insertChronicle();
            }

        });
    }

    function insertText(x) {
        requestPending++;

        x.userText.username = username;
        userTextCollection.insert(x.userText, function (error, newUserText) {
            if (error) {
                callback(error);
            }
            x.userTextId = newUserText[0]._id;
            delete x.userText;
            requestPending--;
            if (requestPending === 0) {
                insertChronicle();
            }

        });
    }

    function insertEncounter(x) {
        requestPending++;

        x.encounter.Username = username;
        userTextCollection.insert(x.encounter, function (error, newEncounter) {
            if (error) {
                callback(error);
            }
            x.encounterId = newEncounter[0]._id;
            delete x.encounter;
            requestPending--;
            if (requestPending === 0) {
                insertChronicle();
            }
        });
    }

    function insertUserResource(x) {
        requestPending++;

        x.userResource.userId = user._id;

        userResourceCollections[x.resourceType].insert(x.userResource, function (error, newResource) {
            if (error) {
                callback(error);
            }
            x.userResourceId = newResource[0]._id;
            delete x.userResource;
            requestPending--;
            if (requestPending === 0) {
                insertChronicle();
            }
        });
    }

    userCollection.findOne({username: username},
        function (error, data) {
            if (error) {
                console.log(error);
                return callback(new Error("UNKNOWN_USER"));
            }
            user = data;
            var traverse = require('traverse');
            traverse(chronicle.contentTree).forEach(function (x) {
                if (!x) {
                    return;
                }
                if (!x.folder) {
                    if (x.resourceType === "user-monster") {
                        insertMonster(x);
                    }
                    else if (x.resourceType === "user-npc") {
                        insertNpc(x);
                    }
                    else if (x.resourceType === "user-text") {
                        insertText(x);
                    }
                    else if (x.resourceType === "encounter") {
                        insertEncounter(x);
                    }
                    else if (x.resourceType) {
                        insertUserResource(x);
                    }
                }
            });
        });
}

function exportChronicle(chronicleId, username, callback) {
    var requestPending = 0;
    var chronicle = null;
    var userResourceCollections = {
        "user-feat": userFeatCollection,
        "user-illustration": userIllustrationCollection,
        "user-map": userMapCollection,
        "user-spell": userSpellCollection,
        "user-item": userItemCollection
    };

    function fetchAndAddMonster(x) {
        requestPending++;
        userMonsterCollection.findOne({_id: ObjectID(x.userMonsterId), Username: username}, function (error, monster) {
            if (error) {
                callback(error);
            }
            x.resourceType = "user-monster";
            delete x.userMonsterId;
            delete monster._id;
            delete monster.Username;
            x.userMonster = monster;
            requestPending--;
            if (requestPending === 0) {
                callback(null, chronicle);
            }
        });
    }

    function fetchAndAddNpc(x) {
        requestPending++;
        userNpcCollection.findOne({_id: ObjectID(x.userNpcId), Username: username}, function (error, npc) {
            if (error) {
                callback(error);
            }
            x.resourceType = "user-npc";
            delete x.userNpcId;
            delete npc._id;
            delete npc.Username;
            x.userNpc = npc;
            requestPending--;
            if (requestPending === 0) {
                callback(null, chronicle);
            }
        });
    }

    function fetchAndAddText(x) {
        requestPending++;
        userTextCollection.findOne({_id: ObjectID(x.userTextId), username: username}, function (error, text) {
            if (error) {
                callback(error);
            }
            x.resourceType = "user-text";
            delete x.userTextId;
            delete text._id;
            delete text.username;
            x.userText = text;
            console.log(x);
            requestPending--;
            if (requestPending === 0) {
                callback(null, chronicle);
            }
        });
    }

    function fetchAndAddEncounter(x) {
        console.log(x);
        console.log("-----");
        requestPending++;
        encounterCollection.findOne({_id: ObjectID(x.encounterId), Username: username}, function (error, encounter) {
            if (error) {
                callback(error);
            }
            console.log(encounter);
            x.resourceType = "encounter";
            delete x.encounterId;
            delete encounter._id;
            delete encounter.Username;
            x.encounter = encounter;
            console.log(x);
            requestPending--;
            if (requestPending === 0) {
                callback(null, chronicle);
            }
        });
    }

    function fetchAndAddUserResource(x) {
        requestPending++;


        userResourceCollections[x.resourceType].findOne({_id: ObjectID(x.userResourceId)}, function (error, userResource) {
            console.log("-----");
            if (error) {
                callback(error);
            }
            x.resourceType = x.resourceType;
            delete x.userResourceId;
            delete userResource._id;
            delete userResource.userId;
            x.userResource = userResource;
            console.log(x);
            requestPending--;
            if (requestPending === 0) {
                callback(null, chronicle);
            }
        });
    }

    chroniclesCollection.findOne({_id: ObjectID(chronicleId)}, function (error, data) {
        chronicle = data;
        delete chronicle.userId;
        delete chronicle._id;
        var traverse = require('traverse');
        traverse(chronicle.contentTree).forEach(function (x) {
            if (!x.folder) {
                if (x.userMonsterId) {
                    fetchAndAddMonster(x);
                }
                else if (x.userNpcId) {
                    fetchAndAddNpc(x);
                }
                else if (x.userTextId) {
                    fetchAndAddText(x);
                }
                else if (x.encounterId) {
                    fetchAndAddEncounter(x);
                }
                else if (x.userResourceId) {
                    fetchAndAddUserResource(x);
                }
            }
        });
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
    userFeatCollection = database.collection("userfeats");
    userSpellCollection = database.collection("userspells");
    userIllustrationCollection = database.collection("userillustrations");
    userMapCollection = database.collection("usermaps");
    userItemCollection = database.collection("useritems");
    chroniclesCollection = database.collection("chronicles");
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
        remove: remove,
        listChronicles: listChronicles,
        exportChronicle: exportChronicle,
        importChronicle: importChronicle
    }
};