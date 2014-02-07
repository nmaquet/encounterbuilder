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