"use strict";

var fs = require("fs");
var fakeMongoose = {model: function () {
}};
var MAGIC_ITEMS_ATTRIBUTES = require('./magicItemModel')(fakeMongoose).MAGIC_ITEMS_ATTRIBUTES;

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
        }
    }
}

function trim(value) {
    if (typeof value == "string") {
        if (value.trim() != value) {
            console.log("trimming '" + value + "'");
        }
        return value.trim();
    } else {
        return value;
    }
}

var eb_items = [];

for (var i in srd_items) {
    var eb_item = {};
    for (var j in MAGIC_ITEMS_ATTRIBUTES) {
        var attribute = MAGIC_ITEMS_ATTRIBUTES[j];
        if (attribute == "PriceUnit" || attribute == "CostUnit") {
            continue;
        }
        var srd_value = srd_items[i][attribute];
        if (attribute === "CL") {
            eb_item[attribute] = Number(srd_value) || 0;
        } else if (attribute === "Price" || attribute === "Cost") {
            var match = /(\d+)(.*)/.exec(srd_value.replace(",", ""));
            if (srd_value.trim() === "") {
                /* do nothing */
            } else if (match) {
                eb_item[attribute] = Number(match[1]) || 0;
                eb_item[attribute + "Unit"] = match[2].trim();
            } else if (attribute === "Price" && srd_value.trim() === "artifact") {
                eb_item["PriceUnit"] = "artifact"
            } else if (attribute === "Price" && srd_value.trim() === "varies") {
                eb_item["PriceUnit"] = "varies"
            } else if (attribute === "Cost" && srd_value.trim() === "varies." || srd_value.trim() === "varies") {
                eb_item["CostUnit"] = "varies"
            }  else {
                console.log("ERROR could not understand value '" + srd_value + "' (attribute was " + attribute + ")");
                process.exit(-1);
            }
        } else {
            eb_item[attribute] = trim(srd_value);
        }
    }
    eb_items.push(eb_item);
    // compareWithKyleItems(eb_item, srd_items[i].id);
}

fs.writeFileSync('../data/items/magic-items.json', JSON.stringify(eb_items));

console.log('done');

