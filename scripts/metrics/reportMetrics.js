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
