"use strict";

var fs = require("fs");

var MAGIC_ITEMS_ATTRIBUTES = [
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
    "Universal"
];

var srd_items = require("../data/contrib/magic_items_full.json");
var kyle_items = require("../data/contrib/magic_items_kyle.json");


var KYLE_ITEM_BY_ID = {};

(function () {
    var array = kyle_items.ArrayOfMagicItem.MagicItem;
    for (var i in array) {
        KYLE_ITEM_BY_ID[array[i].id] = array[i];
    }
})();

function getKyleItemByID(id) {
    return KYLE_ITEM_BY_ID[id];
}

function compareWithKyleItems(eb_item, id) {
    var kyle_item = getKyleItemByID(id);
    if (kyle_item) {
        for (var j in MAGIC_ITEMS_ATTRIBUTES) {
            var attribute = MAGIC_ITEMS_ATTRIBUTES[j];
            if (kyle_item[attribute]) {
                if (kyle_item[attribute] != eb_item[attribute]) {
                    console.log(eb_item.Name + " Attribute: " + attribute + " " + kyle_item[attribute] + " != " + eb_item[attribute]);
                    console.log('--------------------------------------');
                }
            }
            eb_item[MAGIC_ITEMS_ATTRIBUTES[j]] = srd_items[i][MAGIC_ITEMS_ATTRIBUTES[j]];
        }
    }
}


var eb_items = [];

for (var i in srd_items) {
    var eb_item = {};
    for (var j in MAGIC_ITEMS_ATTRIBUTES) {
        eb_item[MAGIC_ITEMS_ATTRIBUTES[j]] = srd_items[i][MAGIC_ITEMS_ATTRIBUTES[j]];
    }
    eb_items.push(eb_item);
    compareWithKyleItems(eb_item, srd_items[i].id);
}


fs.writeFileSync('../data/items/magic-items.json', JSON.stringify(eb_items));

console.log('done');

