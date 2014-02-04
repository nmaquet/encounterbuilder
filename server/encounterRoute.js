"use strict";

module.exports = function (Encounter) {
    return function (request, response) {
        var username = request.session.user.username;
        var encounter = request.body.encounter;
        encounter.Username = username;
        Encounter.update({_id: encounter._id}, encounter, {upsert: true}, function (err, numberAffected, rawResponse) {
            console.log("err : " + err);
            console.log("numberAffected : " + numberAffected);
            console.log("rawResponse : " + rawResponse);
            console.log("id ? : "+encounter._id);
            response.json(rawResponse);
        });
    }
};