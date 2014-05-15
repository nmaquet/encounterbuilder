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
                    db.collection("encounters").find({Username: user.username}, {fields: {Name: 1, _id: 1}}).toArray(function (error, docs) {
                        console.log("encounters: ");
                        console.log(JSON.stringify(docs, null, 4));
                        var tree = [];
                        for (var j in docs) {
                            console.log("encounter: " + docs[j]);
                            tree.push({title: docs[j].Name, encounterId: docs[j]._id});
                        }
                        var contentTree = {username: user.username, contentTree: tree};
                        db.collection("contenttrees").insert(contentTree, function (error, newTree) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                console.log("new tree inserted");
                                console.log(JSON.stringify(newTree, null, 4));
                            }
                            next();
                        });
                    });
                });
            })(users[i]);
        }
        async.series(jobs, function () {
            db.close();
        });
    });

}
