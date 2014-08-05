// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

if (process.env.USE_TEST_DB === 1) {
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

function generateIndex(collection, fields, callback) {
    collection.ensureIndex(fields, function (error, info) {
        callback(error, info);
    });
}

function main(db) {
    async.parallel([
        function (callback) {
            generateIndex(db.collection('magicitems'), { Name: 1, CL: 1, Price: 1 }, callback);
        },
        function (callback) {
            generateIndex(db.collection('monsters'), { Name: 1, CR: 1}, callback);
        },
        function (callback) {
            generateIndex(db.collection('magicitems'), { Enchanted: 1}, callback);
        }
    ],
        function (error, results) {
            console.log("Error : " + error);
            console.log(results);
            db.close();
            console.log("done.");
        });
}