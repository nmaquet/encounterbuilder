"use strict";

var metricsCollection;

function insertEvent(username, event) {
    var metric = {
        username: username,
        event: event,
        timestamp: new Date()
    };
    metricsCollection.insert(metric, function (error) {
        if (error) {
            console.log(error);
        }
    });
}

function logUpsertEncounter(request, response, next) {
    if (request.body.encounter._id === undefined) {
        insertEvent(request.session.user.username, "CREATE_ENCOUNTER");
    }
    else {
        insertEvent(request.session.user.username, "UPDATE_ENCOUNTER");
    }
    next();
}

function logRemoveEncounter(request, response, next) {
    insertEvent(request.session.user.username, "REMOVE_ENCOUNTER");
    next();
}

module.exports = function (collection) {
    metricsCollection = collection;
    return {
        logUpsertEncounter: logUpsertEncounter,
        logRemoveEncounter: logRemoveEncounter
    }
};
