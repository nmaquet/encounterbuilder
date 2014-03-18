"use strict";

var metricsCollection;

function insertEvent(username, event, metadata) {
    var metric = {
        username: username,
        event: event,
        timestamp: new Date()
    };
    if (metadata) {
        metric.metadata = metadata;
    }
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

function logGenerateEncounterLoot(request, response, next) {
    insertEvent(request.session.user.username, "GENERATE_ENCOUNTER_LOOT", {CR : request.body.encounter.CR});
    next();
}

function logSearchMonster(request, response, next) {
    insertEvent(request.session.user.username, "SEARCH_MONSTER", {query : request.query});
    next();
}

function logSearchItem(request, response, next) {
    insertEvent(request.session.user.username, "SEARCH_ITEM", {query : request.query});
    next();
}

function logSelectMonster(request, response, next) {
    insertEvent(request.session.user.username, "SELECT_MONSTER", {monsterId : request.params.id});
    next();
}

function logSelectItem(request, response, next) {
    insertEvent(request.session.user.username, "SELECT_ITEM", {itemId : request.params.id});
    next();
}


function logPrintEncounter(request, response, next) {
    insertEvent(request.session.user.username, "PRINT_ENCOUNTER");
    next();
}

module.exports = function (collection) {
    metricsCollection = collection;
    return {
        logUpsertEncounter: logUpsertEncounter,
        logRemoveEncounter: logRemoveEncounter,
        logGenerateEncounterLoot: logGenerateEncounterLoot,
        logSearchMonster : logSearchMonster,
        logSearchItem : logSearchItem,
        logSelectMonster : logSelectMonster,
        logSelectItem : logSelectItem,
        logPrintEncounter : logPrintEncounter
    }
};
