"use strict";

module.exports = function (Encounter, db, ObjectID) {
    return {
        upsert: function (request, response) {
            var username = request.session.user.username;
            var encounter = request.body.encounter;
            encounter.Username = username;
            if (encounter._id) {
                /* FIXME: this is SNAFU ! */
                var toSave = {
                    Username: encounter.Username,
                    Name: encounter.Name,
                    CR: encounter.CR,
                    Monsters: encounter.Monsters
                };
                new Encounter(encounter).update(toSave, function (error) {
                    if (error) {
                        response.json({error: "could not save encounter"});
                    }
                    else {
                        response.json({_id: encounter._id});
                    }
                });
            }
            else {
                Encounter.create(encounter, function (error, newEncounter) {
                    if (error) {
                        response.json({error: "could not create encounter"});
                    }
                    else {
                        response.json({_id: newEncounter._id});
                    }
                });
            }
        },
        delete: function (request, response) {
            var username = request.session.user.username;
            var encounter = request.body.encounter;
            if (encounter._id && username) {
                db.collection("encounters").remove({_id: ObjectID(encounter._id), Username: username}, function (error) {
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
        }
    }
};