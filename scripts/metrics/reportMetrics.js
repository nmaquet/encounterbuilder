"use strict";

var MongoClient = require('mongodb').MongoClient;
var async = require('async');

MongoClient.connect(process.env['MONGODB_URL'], function (error, db) {
    if (error) {
        console.log(error);
    } else {
        main(db);
    }
});

function main(db) {
    async.series(
        [
            function (callback) {
                db.collection('metrics').find({event: "CREATE_ENCOUNTER"}).count(function (error, count) {
                    console.log("Encounters created: " + count);
                    callback(error, null);
                });
            }
            ,
            function (callback) {
                db.collection('metrics').find({event: "UPDATE_ENCOUNTER"}).count(function (error, count) {
                    console.log("Encounter updates: " + count);
                    callback(error, null);
                });
            }
            ,
            function (callback) {
                db.collection('metrics').find({event: "REMOVE_ENCOUNTER"}).count(function (error, count) {
                    console.log("Encounters removed: " + count);
                    callback(error, null);
                });
            }
            ,
            function (callback) {
                db.collection('metrics').find({event: "GENERATE_ENCOUNTER_LOOT"}).count(function (error, count) {
                    console.log("Encounter loots generated: " + count);
                    callback(error, null);
                });
            }
            ,
            function (callback) {
                db.collection('metrics').find({event: "SEARCH_MONSTER"}).count(function (error, count) {
                    console.log("Monster searches: " + count);
                    callback(error, null);
                });
            }
            ,
            function (callback) {
                db.collection('metrics').find({event: "SEARCH_ITEM"}).count(function (error, count) {
                    console.log("Item searches: " + count);
                    callback(error, null);
                });
            }
            ,
            function (callback) {
                db.collection('metrics').find({event: "SELECT_MONSTER"}).count(function (error, count) {
                    console.log("Monster selections: " + count);
                    callback(error, null);
                });
            }
            ,
            function (callback) {
                db.collection('metrics').find({event: "SELECT_ITEM"}).count(function (error, count) {
                    console.log("Item selections: " + count);
                    callback(error, null);
                });
            }
            ,
            function (callback) {
                db.collection('metrics').find({event: "PRINT_ENCOUNTER"}).count(function (error, count) {
                    console.log("Encounter prints: " + count);
                    callback(error, null);
                });
            }
            ,
            function (callback) {
                db.collection('metrics').find({event: "LOGIN"}).count(function (error, count) {
                    console.log("Login attempts: " + count);
                    callback(error, null);
                });
            }
            ,
            function (callback) {
                db.collection('metrics').find({event: "LOGOUT"}).count(function (error, count) {
                    console.log("Logouts: " + count);
                    callback(error, null);
                });
            }
            ,
            function (callback) {
                db.close();
                callback(null, null);
            }
        ],
        function (error) {
            if (error) {
                console.log(error);
            }
        }
    );
}
