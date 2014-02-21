"use strict";

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

var DONE = 0;
function closedbWhenDone(db) {
    DONE++;
    if (DONE === 2) {
        db.close();
    }
}

function createMagicItemsIndex(db) {
    var magicItemsIndexedFields = {
        Name: 1,
        CL: 1,
        Price:1
    };
    db.collection('magicitems').ensureIndex(magicItemsIndexedFields, function (error, info) {
        if (error) {
            console.log("Error :");
            console.log(error);
        } else {
            console.log("Info :");
            console.log(info);
        }
        closedbWhenDone(db);
    });
}

function createMonsersIndex(db) {
    var monstersIndexedFields = {
        Name: 1,
        CR: 1
    };
    db.collection('monsters').ensureIndex(monstersIndexedFields, function (error, info) {
        if (error) {
            console.log("Error :");
            console.log(error);
        } else {
            console.log("Info :");
            console.log(info);
        }
        closedbWhenDone(db);
    });
}

function main(db) {
    createMagicItemsIndex(db);
    createMonsersIndex(db);
}