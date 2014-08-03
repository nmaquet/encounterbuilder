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
    var price = /Price (.*)/.exec(firstParagraph.text())[1];

    var secondParagraph = firstParagraph.next();
    var type = /Type (.*)/.exec(secondParagraph.text())[1];

    var thirdParagraph= secondParagraph.next();
    var description = thirdParagraph.text();

    console.log(name + " / " + price + " / " + type + " / " + description);

    var weapon = {
        "Name": name,
        "Description": description,
        "id": idify(name)
    };

    weapons.push(weapon);
};

$("p").filter(elementWithID).each(processParagraphWithID);
fs.writeFileSync(__dirname + "/../data/items/weapon_descriptions.json", JSON.stringify(weapons, null, 4));
