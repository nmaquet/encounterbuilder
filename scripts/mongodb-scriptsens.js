"use strict";

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var fs = require('fs');
var util = require('util');

if (process.env.USE_TEST_DB) {
    var MONGODB_URL = process.env['MONGODB_TEST_URL'];
}
else {
    var MONGODB_URL = process.env['MONGODB_URL'];
}

MongoClient.connect(MONGODB_URL, function (error, db) {
    console.log('connecting to ' + MONGODB_URL);
    if (error) {
        console.log(error);
    } else {
        main(db);
    }
});

function main(db) {
    db.collection('magicitems').find({Derived: true}, {fields: {Group:1, id: 1, _id: 0}}).toArray(function (error, docs) {
        console.log(error);
        console.log(JSON.stringify(docs.map(function (x) {
            return x.Group;
        }), null, 4));
        console.log(docs.length);
        console.log('done');

        db.close();
    });
}
