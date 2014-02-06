"use strict";

var ATTRIBUTES = [
    /* SRD attributes */
    "Name",
    "Aura",
    "CL",
    "Slot",
    "Price",
    "Weight",
    "Description",
    "Requirements",
    "Cost",
    "Group",
    "Source",
    "AL",
    "Int",
    "Wis",
    "Cha",
    "Ego",
    "Communication",
    "Senses",
    "Powers",
    "MagicItems",
    "Destruction",
    "MinorArtifactFlag",
    "MajorArtifactFlag",
    "Abjuration",
    "Conjuration",
    "Divination",
    "Enchantment",
    "Evocation",
    "Necromancy",
    "Transmutation",
    "AuraStrength",
    "WeightValue",
    "PriceValue",
    "CostValue",
    "Languages",
    "BaseItem",
    "Mythic",
    "LegendaryWeapon",
    "Illusion",
    "Universal",
    /* computed attributes */,
    "id",
    "PriceUnit",
    "CostUnit"
];

var NUMERIC_ATTRIBUTES = [
    "CL",
    "Price",
    "Cost"
]

function generateMagicItemModelObject() {
    var model = {};
    for (var i in ATTRIBUTES) {
        var attribute = ATTRIBUTES [i];
        model[attribute] = String;
    }
    for (var i in NUMERIC_ATTRIBUTES) {
        var attribute = NUMERIC_ATTRIBUTES [i];
        model[attribute] = Number;
    }
    return model;
}

module.exports = function (mongoose) {
    return {
        MAGIC_ITEMS_ATTRIBUTES : ATTRIBUTES,
        MAGIC_ITEMS_NUMERIC_ATTRIBUTES : NUMERIC_ATTRIBUTES,
        MagicItem :  mongoose.model('MagicItem', generateMagicItemModelObject())
    }
};

