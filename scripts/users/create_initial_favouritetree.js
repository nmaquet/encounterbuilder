// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var fs = require('fs');
var util = require('util');
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
    var sources = [];
    db.collection("users").find({}, {fields: {username: 1}}).toArray(function (error, users) {
        console.log(error);
        for (var i in users) {
            (function (user) {
                console.log("user: " + user.username);
                jobs.push(function (next) {
                    var favourites = {username: user.username, favourites: []};
                    db.collection("favourites").insert(favourites, function (error, favourites) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log("new tree inserted");
                            console.log(JSON.stringify(favourites, null, 4));
                        }
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
