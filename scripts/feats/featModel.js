// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var FEAT_MODEL = {
    /* SRD Primary Attributes */
    "name":String,
    "type":String,
    "description":String,
    "prerequisites":String,
    "prerequisite_feats":String,
    "benefit":String,
    "normal":String,
    "special":String,
    "source":String,
    "teamwork":Boolean,
    "critical":Boolean,
    "grit":Boolean,
    "style":Boolean,
    "performance":Boolean,
    "racial":Boolean,
    "companion_familiar":Boolean,
    "race_name":String,
    "note":String,
    "goal":String,
    "completion_benefit":String,
    "multiples":Boolean,
    "suggested_traits":String,
    /* Extra Computed Attributes */
    "id": String
}


module.exports = function (mongoose) {
    return {
        FEAT_ATTRIBUTES: Object.keys(FEAT_MODEL),
        FEAT_MODEL:FEAT_MODEL,
        Feat: mongoose.model('Feat', FEAT_MODEL)
    }
};

