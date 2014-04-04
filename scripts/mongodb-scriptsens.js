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
    var collections = ["feats", "spells", "magicitems", "monsters", "npcs"];
    var sources = [];
    for (var i in collections) {
        (function (collection) {
            jobs.push(function (next) {
                db.collection(collection).find({}, {fields: {source: 1, Source: 1}}).toArray(function (error, docs) {
                    for (var i in docs) {
                        console.log(docs[i].Source || docs[i].source);
                    }
                    next();
                });
            });
        })(collections[i]);
    }
    async.series(jobs, function () {
        db.close();
    });
}
