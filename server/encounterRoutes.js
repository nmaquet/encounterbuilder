"use strict";

module.exports = function (encounterCollection, ObjectID, lootService) {
    return {
        upsert: function (request, response) {
            var username = request.session.user.username;
            var encounter = request.body.encounter;
            encounter.Username = username;
            if (encounter._id) {
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
            }
            else {
                encounterCollection.insert(encounter, function (error, newEncounter) {
                    if (error) {
                        console.log(error);
                        response.json({error: "could not insert encounter"});
                    }
                    else {
                        response.json({_id: newEncounter[0]._id});
                    }
                });
            }
        },
        delete: function (request, response) {
            var username = request.session.user.username;
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
            var username = request.session.user.username;
            var encounter = request.body.encounter;
            var loot = lootService.generateEncounterLoot(encounter);
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