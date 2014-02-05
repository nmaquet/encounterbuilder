"use strict";

var MAGIC_ITEMS_ATTRIBUTES = [
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
    "id"
];

function generateMagicItemModelObject() {
    var model = {};
    for (var i in MAGIC_ITEMS_ATTRIBUTES) {
        var attribute = MAGIC_ITEMS_ATTRIBUTES [i];
        model[attribute] = String;
    }
    return model;
}

module.exports = function (mongoose) {
    return {
        MAGIC_ITEMS_ATTRIBUTES : MAGIC_ITEMS_ATTRIBUTES,
        MagicItem :  mongoose.model('MagicItem', generateMagicItemModelObject())
    }
};

