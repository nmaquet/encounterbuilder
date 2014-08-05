// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var fs = require('fs');
var cheerio = require('cheerio');
var expect = require('chai').expect;
var idify = require('../server/utils')().idify;

var html = fs.readFileSync(__dirname + '/../data/prd_fixed_html/armors_and_shields_descriptions_prd.html');

var $ = cheerio.load(html);

var elementWithID = function (index) {
    return $(this).attr("id") !== undefined;
};

var weapons = [];

var processParagraphWithID = function (index) {
    var name = $(this).text().trim();

    console.log("--- " + name + " ---");

    var firstParagraph = $(this).next();
    var price = /Price (.*)/.exec(firstParagraph.text())[1];

    var secondParagraph = firstParagraph.next();
    var armorOrShieldBonus = /(?:Armor|Shield) Bonus (.*)/.exec(secondParagraph.text())[1];

    var thirdParagraph= secondParagraph.next();
    var description = thirdParagraph.text();

    console.log(name + " / " + price + " / " + armorOrShieldBonus + " / " + description);

    var armor_or_shield = {
        "Name": name,
        "Description": description,
        "id": idify(name)
    };

    weapons.push(armor_or_shield);
};

$("p").filter(elementWithID).each(processParagraphWithID);
fs.writeFileSync(__dirname + "/../data/items/armors_and_shields_descriptions.json", JSON.stringify(weapons, null, 4));
