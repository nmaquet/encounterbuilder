// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var fs = require('fs');

var idify = require(__dirname + "/../server/utils.js")().idify;

var fileMagicItemsPfsrd = __dirname + '/../data/items/magic-items.json';
var fileScrolls = __dirname + '/../data/items/scrolls.json';

var filenames = [

        __dirname + '/../data/items/potions_and_oils.json',
        __dirname + '/../data/items/wands.json',
        __dirname + '/../data/items/weapons.json',
        __dirname + '/../data/items/armors_and_shields.json',
        __dirname + '/../data/items/rings.json',
        __dirname + '/../data/items/rods.json',
        __dirname + '/../data/items/staves.json',
        __dirname + '/../data/items/belts.json',
        __dirname + '/../data/items/body.json',
        __dirname + '/../data/items/chests.json',
        __dirname + '/../data/items/eyes.json',
        __dirname + '/../data/items/feet.json',
        __dirname + '/../data/items/hands.json',
        __dirname + '/../data/items/head.json',
        __dirname + '/../data/items/headbands.json',
        __dirname + '/../data/items/necks.json',
        __dirname + '/../data/items/shoulders.json',
        __dirname + '/../data/items/slotless.json',
        __dirname + '/../data/items/wrists.json',
        __dirname + '/../data/items/gems.json',
        __dirname + '/../data/items/art-objects.json'
];

var allItems = {};

var magic_item_ids = [];

function generateId(name, ids) {
    var prefix = idify(name);

    if (ids.indexOf(prefix) === -1) {
        ids.push(prefix);
        return prefix;
    }

    var suffix = 0;
    while (ids.indexOf(prefix + "-" + suffix) !== -1) {
        ++suffix;
    }

    var id = prefix + "-" + suffix;
    ids.push(id);
    return id;
}
var magicItemsPfsrd = JSON.parse(fs.readFileSync(fileMagicItemsPfsrd, 'utf8'));
console.log("magicItemsPfsrd");

for (var i in magicItemsPfsrd) {
    var item = magicItemsPfsrd[i];
    var id = generateId(item.Name, magic_item_ids);
    item.id = id;
    allItems[id] = item;
}

var scrolls = JSON.parse(fs.readFileSync(fileScrolls, 'utf8'));
console.log("scrolls");
for (var i in scrolls) {
    var scroll = scrolls[i];
    if (allItems[scroll.id]) {
        scroll.id = scroll.id + "-" + scroll.MagicType;
    }
    allItems[scroll.id] = scroll;
}


for (var i in filenames) {
    var items = fs.readFileSync(filenames[i], 'utf8');
    items = JSON.parse(items);
    for (var j in items) {
        if (allItems[items[j].id]) {
            console.log("Duplicate Item detected :" + items[j].id);
        }
        allItems[items[j].id] = items[j];
    }
}

var dataArray = Object.keys(allItems).map(function (k) {
    return allItems[k];
});

fs.writeFileSync(__dirname + "/../data/items/merged-items.json", JSON.stringify(dataArray, null, 4));
