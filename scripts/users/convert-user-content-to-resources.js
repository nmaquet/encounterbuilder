// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var async = require('async');

if (process.env['USE_TEST_DB']) {
    var MONGODB_URL = process.env['MONGODB_TEST_URL'];
}
else {
    var MONGODB_URL = process.env['MONGODB_URL'];
}

MongoClient.connect(MONGODB_URL, function (error, db) {
    if (error) {
        console.log(error);
    } else {
        main(db);
    }
});


function main(db) {
    var jobs = [];
    db.collection("users").find({}, {fields: {username: 1, _id: 1}}).toArray(function (error, users) {
        if (error) {
            return console.log(error);
        }
        for (var i in users) {
            (function (user) {
                console.log("user: " + user.username);
                jobs.push(function (next) {
                    db.collection("usermonsters").update({Username: user.username}, {$set: {userId: user._id}}, {w: 1, multi: true}, function (error, numberUpdated) {
                        console.log(numberUpdated + " user monsters updated");
                        next();
                    });
                });
                jobs.push(function (next) {
                    db.collection("usernpcs").update({Username: user.username}, {$set: {userId: user._id}}, {w: 1, multi: true}, function (error, numberUpdated) {
                        console.log(numberUpdated + " user npcs updated");
                        next();
                    });
                });
                jobs.push(function (next) {
                    db.collection("usertexts").update({username: user.username}, {$set: {userId: user._id}, $rename: { 'title': 'name'}}, {w: 1, multi: true}, function (error, numberUpdated) {
                        console.log(numberUpdated + " user texts updated");
                        next();
                    });
                });
                jobs.push(function (next) {
                    db.collection("encounters").update({Username: user.username}, {$set: {userId: user._id}}, {w: 1, multi: true}, function (error, numberUpdated) {
                        console.log(numberUpdated + " encounters updated");
                        next();
                    });
                });
            })(users[i]);
        }
        async.series(jobs, function () {
            db.close();
        });
    });

}
