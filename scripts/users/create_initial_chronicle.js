// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var fs = require('fs');
var util = require('util');
var async = require('async');
var traverse = require('traverse');

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
                    db.collection("contenttrees").find({username: user.username}).toArray(function (error, docs) {
                        if (error) {
                            return console.log(error);
                        }
//                        console.log("contenttrees: ");
//                        console.log(JSON.stringify(docs, null, 4));
                        traverse(docs[0].contentTree).forEach(function (x) {
                            if (!x) {
                                return;
                            }
                            if (x.userMonsterId) {
                                x.userResourceId = x.userMonsterId;
                                x.resourceType = "user-monster";
                            } else if (x.userTextId) {
                                x.userResourceId = x.userTextId;
                                x.resourceType = "user-text";
                            } else if (x.userNpcId) {
                                x.userResourceId = x.userNpcId;
                                x.resourceType = "user-npc";
                            } else if (x.encounterId) {
                                x.userResourceId = x.encounterId;
                                x.resourceType = "encounter";
                            }
                        });
                        var synopsis = "This chronicle contains the content you already created using the previous version of Chronicle Forge";
                        var chronicle = {userId: user._id, contentTree: docs[0].contentTree.children, name: "new Chronicle", synopsis: synopsis, lastModified: new Date().toISOString()};

                        db.collection("chronicles").insert(chronicle, function (error, newChronicle) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                console.log("new chronicle inserted for user: " + user.username);
                                //console.log(JSON.stringify(newChronicle, null, 4));
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
