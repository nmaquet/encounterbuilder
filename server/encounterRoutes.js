// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

module.exports = function (encounterCollection, ObjectID, lootService) {
    return {
        findOne: function (request, response) {
            var username = request.user.username;
            var encounterId = request.params.id;
            encounterCollection.findOne({_id: ObjectID(encounterId), Username: username}, function (error, encounter) {
                if (error) {



                    response.json({error: error});
                }
                else {
                    response.json({encounter: encounter});
                }
            });
        },
        update: function (request, response) {
            var username = request.user.username;
            var encounter = request.body.encounter;
            encounter.Username = username;
            var selector = {_id: ObjectID(encounter._id), Username: username};
            delete encounter._id;
            encounterCollection.update(selector, encounter, {}, function (error, result) {
                if (error) {
                    console.log(error);
                    response.json({error: "could not update encounter"});
                }
                else {
                    response.json({_id: selector._id});
                }
            });
        },
        create: function (request, response) {
            var username = request.user.username;
            var i = 0;
            var encounter = { Name: "Untitled #" + i, CR: "0", Monsters: {}, coins: {pp: 0, gp: 0, sp: 0, cp: 0}};
            encounter.Username = username;
            encounterCollection.insert(encounter, function (error, newEncounter) {
                if (error) {
                    console.log(error);
                    response.json({error: "could not insert encounter"});
                }
                else {
                    response.json({encounter: newEncounter[0]});
                }
            });
        },
        delete: function (request, response) {
            var username = request.user.username;
            var encounter = request.body.encounter;
            if (encounter._id && username) {
                encounterCollection.remove({_id: ObjectID(encounter._id), Username: username}, function (error) {
                    if (error) {
                        response.json({error: "could not delete encounter"});
                    }
                    else {
                        response.json({});
                    }
                });
            }
            else {
                response.json({error: "no encounter id"});
            }
        },
        generateLoot: function (request, response) {
            var username = request.user.username;
            var encounter = request.body.encounter;
            var loot = lootService.generateEncounterLoot(encounter, "medium", request.body.options);
            encounter.coins = loot.coins;
            encounter.items = {};
            for (var i in loot.items) {
                encounter.items[loot.items[i].id] = loot.items[i];
            }
            encounter.Username = username;
            var selector = {_id: ObjectID(encounter._id), Username: username};
            delete encounter._id;
            encounterCollection.update(selector, encounter, {}, function (error, result) {
                if (error) {
                    console.log(error);
                    response.json({error: "could not update encounter"});
                }
                else {
                    response.json({coins: encounter.coins, items: encounter.items});
                }
            });
        }
    }
};