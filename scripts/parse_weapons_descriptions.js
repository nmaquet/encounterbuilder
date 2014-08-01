"use strict";

var fs = require('fs');
var cheerio = require('cheerio');
var expect = require('chai').expect;
var idify = require('../server/utils')().idify;

var html = fs.readFileSync(__dirname + '/../data/prd_fixed_html/weapons_descriptions_prd.html');

var $ = cheerio.load(html);

var elementWithID = function (index) {
    return $(this).attr("id") !== undefined;
};

var weapons = [];

var processParagraphWithID = function (index) {
    var name = $(this).text().trim();

    var firstParagraph = $(this).next();
//    expect(firstParagraph.hasClass("stat-block-1")).to.be.true;
    var price = /Price (.*)/.exec(firstParagraph.text())[1];

    var secondParagraph = firstParagraph.next();
//    expect(secondParagraph.hasClass("stat-block-1")).to.be.true;
    var type = /Type (.*)/.exec(secondParagraph.text())[1];

    var thirdParagraph= secondParagraph.next();
//    expect(thirdParagraph.hasClass("stat-block")).to.be.true;
    var description = thirdParagraph.text();

    console.log(name + " / " + price + " / " + type + " / " + description);

//    for (var i in name) {
//        var weapon = {
//            "CL": Number(cl),
//            "Group": "Wondrous Item",
//            "Slot":"weapon",
//            "Name": name[i],
//            "Price": parsePrice(price[i]),
//            "PriceUnit": "gp",
//            Aura: aura,
//            Weight: weight,
//            Cost: parsePrice(price[i]) / 2 || undefined,
//            CostUnit: "gp",
//            Requirements: requirements,
//            Description: description,
//            Source:"Ultimate Equipment",
//            "id": idify(name[i])
//        }
//        weapons.push(weapon);
//    }
};

function parsePrice(text) {
    if (String(text).trim().toLowerCase() === "varies") {
        return;
    }
    else {
        return Number(text.split(" ")[0].replace(",", ""));
    }
}

$("p").filter(elementWithID).each(processParagraphWithID);
//fs.writeFileSync(__dirname + "/../data/items/weapon_descriptions.json", JSON.stringify(weapons, null, 4));
