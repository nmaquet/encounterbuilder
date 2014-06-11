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

function logUpdateEncounter(request, response, next) {
    insertEvent(request.session.user.username, "CREATE_ENCOUNTER");
    next();
}

function logCreateEncounter(request, response, next) {
    insertEvent(request.session.user.username, "UPDATE_ENCOUNTER");
    next();
}

function logRemoveEncounter(request, response, next) {
    insertEvent(request.session.user.username, "REMOVE_ENCOUNTER");
    next();
}

function logGenerateEncounterLoot(request, response, next) {
    insertEvent(request.session.user.username, "GENERATE_ENCOUNTER_LOOT", {CR: request.body.encounter.CR});
    next();
}

function logSearchMonster(request, response, next) {
    insertEvent(request.session.user.username, "SEARCH_MONSTER", {query: request.query});
    next();
}

function logSearchItem(request, response, next) {
    insertEvent(request.session.user.username, "SEARCH_ITEM", {query: request.query});
    next();
}

function logSearchSpell(request, response, next) {
    insertEvent(request.session.user.username, "SEARCH_SPELL", {query: request.query});
    next();
}

function logSearchFeat(request, response, next) {
    insertEvent(request.session.user.username, "SEARCH_FEAT", {query: request.query});
    next();
}

function logSelectMonster(request, response, next) {
    insertEvent(request.session.user.username, "SELECT_MONSTER", {monsterId: request.params.id});
    next();
}

function logSearchNPC(request, response, next) {
    insertEvent(request.session.user.username, "SEARCH_NPC", {query: request.query});
    next();
}


function logSelectNPC(request, response, next) {
    insertEvent(request.session.user.username, "SELECT_NPC", {npcId: request.params.id});
    next();
}


function logSelectItem(request, response, next) {
    insertEvent(request.session.user.username, "SELECT_ITEM", {itemId: request.params.id});
    next();
}

function logSelectSpell(request, response, next) {
    insertEvent(request.session.user.username, "SELECT_SPELL", {spellId: request.params.id});
    next();
}

function logSelectFeat(request, response, next) {
    insertEvent(request.session.user.username, "SELECT_FEAT", {featId: request.params.id});
    next();
}
function logSelectEncounter(request, response, next) {
    insertEvent(request.session.user.username, "SELECT_ENCOUNTER", {encounterId: request.params.id});
    next();
}

function logPrintEncounter(request, response, next) {
    insertEvent(request.session.user.username, "PRINT_ENCOUNTER");
    next();
}

function logLogin(request, response, next) {
    insertEvent(request.body.username, "LOGIN");
    next();
}
function logLogout(request, response, next) {
    insertEvent(request.session.user.username, "LOGOUT");
    next();
}

module.exports = function (collection) {
    metricsCollection = collection;
    return {
        logUpdateEncounter: logUpdateEncounter,
        logCreateEncounter: logCreateEncounter,
        logRemoveEncounter: logRemoveEncounter,
        logGenerateEncounterLoot: logGenerateEncounterLoot,
        logSearchMonster: logSearchMonster,
        logSearchItem: logSearchItem,
        logSelectMonster: logSelectMonster,
        logSelectItem: logSelectItem,
        logSearchNpc: logSearchNPC,
        logSelectNpc: logSelectNPC,
        logSearchSpell: logSearchSpell,
        logSearchFeat: logSearchFeat,
        logSelectSpell: logSelectSpell,
        logSelectFeat: logSelectFeat,
        logSelectEncounter: logSelectEncounter,
        logPrintEncounter: logPrintEncounter,
        logLogin: logLogin,
        logLogout: logLogout
    }
};
