"use strict";

var ATTRIBUTES = {
    /* SRD attributes */
    "Name": String,
    "Aura": String,
    "CL": Number,
    "Slot": String,
    "Price": Number,
    "Weight": String,
    "Description": String,
    "Requirements": String,
    "Cost": Number,
    "Group": String,
    "Source": String,
    "AL": String,
    "Int": String,
    "Wis": String,
    "Cha": String,
    "Ego": String,
    "Communication": String,
    "Senses": String,
    "Powers": String,
    "MagicItems": String,
    "Destruction": String,
    "MinorArtifactFlag": String,
    "MajorArtifactFlag": String,
    "Abjuration": String,
    "Conjuration": String,
    "Divination": String,
    "Enchantment": String,
    "Evocation": String,
    "Necromancy": String,
    "Transmutation": String,
    "AuraStrength": String,
    "WeightValue": String,
    "PriceValue": String,
    "CostValue": String,
    "Languages": String,
    "BaseItem": String,
    "Mythic": String,
    "LegendaryWeapon": String,
    "Illusion": String,
    "Universal": String,
    /* computed attributes */
    "id": String,
    "PriceUnit": String,
    "CostUnit": String,
    "Derived": Boolean,
    /* derived magic item attributes */
    "HighChance": Number,
    "LowChance": Number,
    "MagicType": String,
    "Rarity": String,
    "SpellId": String,
    "SpellLevel": Number,
    "SpellName": String,
    "Mwk": Boolean,
    /*weapons attribute*/
    "Crit": String,
    "DamageType": String,
    "DmgM": String,
    "DmgS": String,
    "Proficiency": String,
    "Range": String,
    "Special": String,
    "WeaponType": String,
    /* armor attributes */
    "ArcaneSpellFailure": String,
    "ArmorBonus": String,
    "ArmorCheckPenalty": String,
    "ArmorType": String,
    "MaxDexBonus": String,
    "Speed20Ft": String,
    "Speed30Ft": String
};

module.exports = function (mongoose) {
    return {
        MAGIC_ITEMS_ATTRIBUTES: Object.keys(ATTRIBUTES),
        MagicItem: mongoose.model('MagicItem', ATTRIBUTES)
    }
};

