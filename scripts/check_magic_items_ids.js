"use strict";

var random_wondrous_item = require('../server/loot/wondrousItems')().random_wondrous_item;
var random_ring = require('../server/loot/rings')().random_ring;
var random_staff = require('../server/loot/staves')().random_staff;
var random_rod = require('../server/loot/rods')().random_rods;

var levenshtein = require("fast-levenshtein");

function getDistance(object1, object2) {
    var string1 = "" + object1;
    var string2 = "" + object2;
    return levenshtein.get(string1, string2);
}

var items = {
    belt : require('../data/items/belts.json'),
    body : require('../data/items/body.json'),
    chest : require('../data/items/chests.json'),
    eyes : require('../data/items/eyes.json'),
    feet : require('../data/items/feet.json'),
    hands : require('../data/items/hands.json'),
    head : require('../data/items/head.json'),
    headband : require('../data/items/headbands.json'),
    neck : require('../data/items/necks.json'),
    shoulders : require('../data/items/shoulders.json'),
    wrists : require('../data/items/wrists.json'),
    slotless : require('../data/items/slotless.json'),
    /* fake slots */
    rings : require('../data/items/rings.json'),
    staves : require('../data/items/staves.json'),
    rods : require('../data/items/rods.json')
}

var ERROR_COUNT = 0;

for (var slot in random_wondrous_item) {
    if (!random_wondrous_item.hasOwnProperty(slot)) {
        continue
    }
    for (var magnitude in random_wondrous_item[slot]) {
        if (!random_wondrous_item[slot].hasOwnProperty(magnitude)) {
            continue
        }
        for (var i in random_wondrous_item[slot][magnitude].valueTable) {
            var tableItem = random_wondrous_item[slot][magnitude].valueTable[i];
            if (tableItem === "ROLL_ON_LESSER_MINOR_TABLE") {
                continue;
            }
            var minDistance = Number.MAX_VALUE;
            var closest = null;
            var found = false;
            for (var j in items[slot]) {
                var descriptionItem = items[slot][j];
                if (tableItem.id === descriptionItem.id) {
                    found = true;
                    break;
                }
                var distance = getDistance(tableItem.id, descriptionItem.id);
                if (distance < minDistance) {
                    minDistance = distance;
                    closest = descriptionItem;
                }
            }
            if (!found) {
                console.log(slot + " " + magnitude + " " + "unknown id " + tableItem.id + " (closest was " + (closest ? closest.id  : null) + ")");
                ERROR_COUNT++;
            }
        }
    }
}

var fake_slots = ["rings", "rods", "staves"];
var fake_slot_table = {"rings" : random_ring, "rods" : random_rod, "staves" : random_staff};

for (i in fake_slots) {
    slot = fake_slots[i];
    for (magnitude in fake_slot_table[slot]) {
        if (!fake_slot_table[slot].hasOwnProperty(magnitude)) {
            continue
        }
        for (j in fake_slot_table[slot][magnitude].valueTable) {
            tableItem = fake_slot_table[slot][magnitude].valueTable[j];
            minDistance = Number.MAX_VALUE;
            closest = null;
            found = false;
            for (var k in items[slot]) {
                descriptionItem = items[slot][k];
                if (tableItem.id === descriptionItem.id) {
                    found = true;
                    break;
                }
                distance = getDistance(tableItem.id, descriptionItem.id);
                if (distance < minDistance) {
                    minDistance = distance;
                    closest = descriptionItem;
                }
            }
            if (!found) {
                console.log(slot + " " + magnitude + " " + "unknown id " + tableItem.id + " (closest was " + (closest ? closest.id  : null) + ")");
                ERROR_COUNT++;
            }
        }
    }
}

console.log("\n There were " + ERROR_COUNT + " errors");