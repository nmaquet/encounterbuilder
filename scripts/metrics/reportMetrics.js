// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

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
                    console.log("");
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
            } ,
            function (callback) {
                db.collection('metrics').find({event: "SEARCH_NPC"}).count(function (error, count) {
                    console.log("Npc searches: " + count);
                    callback(error, null);
                });
            } ,
            function (callback) {
                db.collection('metrics').find({event: "SEARCH_SPELL"}).count(function (error, count) {
                    console.log("Spell searches: " + count);
                    callback(error, null);
                });
            }
            ,
            function (callback) {
                db.collection('metrics').find({event: "SEARCH_FEAT"}).count(function (error, count) {
                    console.log("Feat searches: " + count);
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
            },
            function (callback) {
                db.collection('metrics').find({event: "SELECT_SPELL"}).count(function (error, count) {
                    console.log("Spell selections: " + count);
                    callback(error, null);
                });
            },
            function (callback) {
                db.collection('metrics').find({event: "SELECT_FEAT"}).count(function (error, count) {
                    console.log("Feat selections: " + count);
                    callback(error, null);
                });
            },
            function (callback) {
                db.collection('metrics').find({event: "SELECT_NPC"}).count(function (error, count) {
                    console.log("Npc selections: " + count);
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
            },
            function (callback) {
                console.log("");
                console.log("** Selected Monsters **");
                var pipeline = [
                    {$match: {event: "SELECT_MONSTER"}},
                    {$group: {_id: "$metadata.monsterId", count: {$sum: 1}}},
                    {$sort: { count: -1} }
                ];
                db.collection('metrics').aggregate(pipeline, function (error, results) {
                    for (var i in results) {
                        console.log("Selected " + results[i]._id + " " + results[i].count + " times");
                    }
                    callback(error, null);
                });
            }
            ,
            function (callback) {
                console.log("");
                console.log("** Selected Items **");
                var pipeline = [
                    {$match: {event: "SELECT_ITEM"}},
                    {$group: {_id: "$metadata.itemId", count: {$sum: 1}}},
                    {$sort: { count: -1} }
                ];
                db.collection('metrics').aggregate(pipeline, function (error, results) {
                    for (var i in results) {
                        console.log("Selected " + results[i]._id + " " + results[i].count + " times");
                    }
                    callback(error, null);
                });
            } ,
            function (callback) {
                console.log("");
                console.log("** Selected NPCs **");
                var pipeline = [
                    {$match: {event: "SELECT_NPC"}},
                    {$group: {_id: "$metadata.npcId", count: {$sum: 1}}},
                    {$sort: { count: -1} }
                ];
                db.collection('metrics').aggregate(pipeline, function (error, results) {
                    for (var i in results) {
                        console.log("Selected " + results[i]._id + " " + results[i].count + " times");
                    }
                    callback(error, null);
                });
            } ,
            function (callback) {
                console.log("");
                console.log("** Selected Spells **");
                var pipeline = [
                    {$match: {event: "SELECT_SPELL"}},
                    {$group: {_id: "$metadata.spellId", count: {$sum: 1}}},
                    {$sort: { count: -1} }
                ];
                db.collection('metrics').aggregate(pipeline, function (error, results) {
                    for (var i in results) {
                        console.log("Selected " + results[i]._id + " " + results[i].count + " times");
                    }
                    callback(error, null);
                });
            },
            function (callback) {
                console.log("");
                console.log("** Selected Feats **");
                var pipeline = [
                    {$match: {event: "SELECT_FEAT"}},
                    {$group: {_id: "$metadata.featId", count: {$sum: 1}}},
                    {$sort: { count: -1} }
                ];
                db.collection('metrics').aggregate(pipeline, function (error, results) {
                    for (var i in results) {
                        console.log("Selected " + results[i]._id + " " + results[i].count + " times");
                    }
                    callback(error, null);
                });
            },
            function (callback) {
                console.log("");
                var pipeline = [
                    {$match: {event: "LOGIN"}},
                    {$group: {_id: "$username", count: {$sum: 1}}},
                    {$sort: { count: -1} }
                ];
                db.collection('metrics').aggregate(pipeline, function (error, results) {
                    for (var i in results) {
                        console.log("User: " + results[i]._id + " attempted to login " + results[i].count + " times");
                    }
                    callback(error, null);
                });
            },
            function (callback) {
                console.log("");
                var pipeline = [
                    {$match: {event: "LOGOUT"}},
                    {$group: {_id: "$username", count: {$sum: 1}}},
                    {$sort: { count: -1} }
                ];
                db.collection('metrics').aggregate(pipeline, function (error, results) {
                    for (var i in results) {
                        console.log("User: " + results[i]._id + " logged out " + results[i].count + " times");
                    }
                    callback(error, null);
                });
            }
            ,
            function (callback) {
                console.log("");
                var pipeline = [
                    {$match: {}},
                    {$group: {_id: "$username", count: {$sum: 1}}},
                    {$sort: { count: -1} }
                ];
                db.collection('metrics').aggregate(pipeline, function (error, results) {
                    for (var i in results) {
                        console.log("User: " + results[i]._id + " has made " + results[i].count + " actions");
                    }
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
                db.close();
            }
        }
    );
}
