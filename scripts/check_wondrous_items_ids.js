
var random_wondrous_item = require('../server/loot/wondrousItems')().random_wondrous_item;
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
    slotless : require('../data/items/slotless.json')
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

console.log("\n There were " + ERROR_COUNT + " errors");