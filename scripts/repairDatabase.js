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
    db.command({repairDatabase:1}, function(error, result) {
        console.log(error);
        console.log(result);
        db.close();
    });
}
