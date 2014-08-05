// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var SPELL_MODEL = {
    /* SRD Primary Attributes */
    "name": String,
    "school": String,
    "subschool": String,
    "descriptor": String,
    "spell_level": String,
    "casting_time": String,
    "components": String,
    "costly_components": String,
    "range": String,
    "area": String,
    "effect": String,
    "targets": String,
    "duration": String,
    "dismissible": String,
    "shapeable": String,
    "saving_throw": String,
    "spell_resistence": String,
    "description": String,
    "description_formated": String,
    "source": String,
    "verbal": Boolean,
    "somatic": Boolean,
    "material": Boolean,
    "focus": Boolean,
    "divine_focus": Boolean,
    "deity": String,
    "SLA_Level": Number,
    "domain": String,
    "short_description": String,
    "acid": Boolean,
    "air": Boolean,
    "chaotic": Boolean,
    "cold": Boolean,
    "curse": Boolean,
    "darkness": Boolean,
    "death": Boolean,
    "disease": Boolean,
    "earth": Boolean,
    "electricity": Boolean,
    "emotion": Boolean,
    "evil": Boolean,
    "fear": Boolean,
    "fire": Boolean,
    "force": Boolean,
    "good": Boolean,
    "language_dependent": Boolean,
    "lawful": Boolean,
    "light": Boolean,
    "mind_affecting": Boolean,
    "pain": Boolean,
    "poison": Boolean,
    "shadow": Boolean,
    "sonic": Boolean,
    "water": Boolean,
    "material_costs": Number,
    "bloodline": String,
    "patron": String,
    "mythic_text": String,
    "augmented": String,
    "mythic": Boolean,

    /* Extra Computed Attributes */
    "id": String,
    "classes": [
        {"class": String, "level": Number}
    ]
}


module.exports = function (mongoose) {
    return {
        SPELL_ATTRIBUTES: Object.keys(SPELL_MODEL),
        SPELL_MODEL:SPELL_MODEL,
        Spell: mongoose.model('Spell', SPELL_MODEL)
    }
};

