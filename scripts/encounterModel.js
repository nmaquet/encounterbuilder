// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

function generateEncounterSchema(mongoose) {
    return new mongoose.Schema({
        Username: String,
        Name: String,
        CR: Number,
        Monsters: {}
    });
}

module.exports = function (mongoose) {
    return {
        Encounter: mongoose.model('Encounter', generateEncounterSchema(mongoose))
    };
};