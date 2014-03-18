"use strict";

var metricsCollection;

function logUpsertEncounter(request, response, next) {
    var username = request.session.user.username;
    var encounter = request.body.encounter;
    if (encounter._id === undefined) {
        var metric = {
            username: username,
            event: "CREATE_ENCOUNTER",
            timestamp: new Date()
        };
    }
    else {
        var metric = {
            username: username,
            event: "UPDATE_ENCOUNTER",
            timestamp: new Date()
        };
    }
    metricsCollection.insert(metric, function (error) {
        if (error) {
            console.log(error);
        }
    });
    next();
}

function logRemoveEncounter(request, response, next) {
    var username = request.session.user.username;
    var metric = {
        username: username,
        event: "REMOVE_ENCOUNTER",
        timestamp: new Date()
    };
    metricsCollection.insert(metric, function (error) {
        if (error) {
            console.log(error);
        }
    });
    next();
}

module.exports = function (collection) {
    metricsCollection = collection;
    return {
        logUpsertEncounter: logUpsertEncounter,
        logRemoveEncounter: logRemoveEncounter
    }
};
