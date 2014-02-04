"use strict";

module.exports = function (Encounter) {
    return function (request, response) {
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
    }
};