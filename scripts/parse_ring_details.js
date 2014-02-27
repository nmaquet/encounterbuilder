"use strict";

var fs = require('fs');
var cheerio = require('cheerio');
var expect = require('chai').expect;
var idify = require('../server/idify')().idify;

var html = fs.readFileSync(__dirname + '/../data/prd_fixed_html/ring_descriptions_prd.html');

var $ = cheerio.load(html);

var elementWithID = function (index) {
    return this.attr("id") !== undefined;
};

var rings = [];

var variantNames = {
    "Dungeon Ring": ["Jailer's dungeon ring", "Prisoner's dungeon ring"],
    "Ring of Energy Resistance": ["Ring of energy resistance, minor", "Ring of energy resistance, major", "Ring of energy resistance, greater"],
    "Ring of Inner Fortitude": ["Ring of inner fortitude, minor", "Ring of inner fortitude, major", "Ring of inner fortitude, greater"],
    "Ring of Protection": ["Ring of Protection +1", "Ring of Protection +2", "Ring of Protection +3", "Ring of Protection +4", "Ring of Protection +5"],
    "Ring of Revelation": ["Ring of revelation, lesser", "Ring of revelation, greater", "Ring of revelation, superior"],
    "Ring of Spell Knowledge": ["Ring of spell knowledge I", "Ring of spell knowledge II", "Ring of spell knowledge III", "Ring of spell knowledge IV"],
    "Ring of Wizardry": ["Ring of Wizardry I", "Ring of Wizardry II", "Ring of Wizardry III", "Ring of Wizardry IV"]

}
var variantPrices = {
    "Dungeon Ring": ["16,000 gp", "250 gp"],
    "Ring of Energy Resistance": ["12,000 gp", "28,000 gp", "44,000 gp"],
    "Ring of Inner Fortitude": ["18,000 gp", "42,000 gp", "66,000 gp"],
    "Ring of Protection": ["2,000 gp", "8,000 gp", "18,000 gp", "32,000 gp", "50,000 gp"],
    "Ring of Revelation": ["10,000 gp", "16,000 gp", "24,000 gp"],
    "Ring of Spell Knowledge": ["1500 gp", "6,000 gp", "13,500 gp", "24,000 gp"],
    "Ring of Wizardry": ["20000 gp", "40000 gp", "70000 gp", "100000 gp"]
};

var variantCosts = {
    "Dungeon Ring": ["8,000 gp", "125 gp"],
    "Ring of Energy Resistance": ["6,000 gp", "14,000 gp", "22,000 gp"],
    "Ring of Inner Fortitude": ["9,000 gp", "21,000 gp", "33,000 gp"],
    "Ring of Protection": ["1,000 gp", "4,000 gp", "9,000 gp", "16,000 gp", "25,000 gp"],
    "Ring of Revelation": ["5,000 gp", "8,000 gp", "12,000 gp"],
    "Ring of Spell Knowledge": ["750 gp", "3,000 gp", "6250 gp", "12,000 gp"],
    "Ring of Wizardry": ["10000 gp", "20000 gp", "35000 gp", "50000 gp"]
};

var processParagraphWithID = function (index) {

    var name = [this.text()];

    var firstParagraph = this.next();
    expect(firstParagraph.hasClass("stat-block-1")).to.be.true;
    var priceAuraCLWeight = firstParagraph.text().split(";");
    var price = [/Price (.*)/.exec(priceAuraCLWeight[0])[1]];
    var aura = /Aura (.*)/.exec(priceAuraCLWeight[1])[1];
    var cl = /CL (\d*)/.exec(priceAuraCLWeight[2])[1];
    var weight = /Weight (.*)/.exec(priceAuraCLWeight[3])[1];
    var cost;
    var secondParagraph = firstParagraph.next();
    var firstDescriptionParagraph;

    if (secondParagraph.hasClass('stat-block-1')) {
        firstDescriptionParagraph = secondParagraph.next();
        var primaryName = name;
        name = variantNames[primaryName];
        price = variantPrices[primaryName];
        cost = variantCosts[primaryName];
    } else {
        firstDescriptionParagraph = secondParagraph;
        expect(firstDescriptionParagraph.hasClass("stat-block")).to.be.true;
    }

    var description = "";

    var p = firstDescriptionParagraph;
    while (!p.hasClass("stat-block-breaker")) {
        description += p.html();
        p = p.next();
    }

    var firstCostParagraph = p.next();
    expect(firstCostParagraph.hasClass("stat-block-1")).to.be.true;

    cost = cost || [/Cost (.*)/.exec(firstCostParagraph.text())[1]];

    var firstRequirementsParagraph;
    if (!firstCostParagraph.next().hasClass("stat-block-1")) {
        firstRequirementsParagraph = firstCostParagraph.next();
    }
    else{
        firstRequirementsParagraph = firstCostParagraph.next().next();
    }
    expect(firstRequirementsParagraph.hasClass("stat-block")).to.be.true;

    var requirements = firstRequirementsParagraph.text();
    for (var i in name) {
        var ring = {
            "CL": Number(cl),
            "Group": "Ring",
            "Name": name[i],
            "Price": parsePrice(price[i]),
            "PriceUnit": "gp",
            Aura: aura,
            Weight: weight,
            Cost: parsePrice(cost[i]),
            CostUnit: "gp",
            Requirements: requirements,
            Description: description,
            Source:"Ultimate Equipment",
            "id": idify(name[i])
        }
        rings.push(ring);
    }
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
fs.writeFileSync(__dirname + "/../data/items/rings.json", JSON.stringify(rings, null, 4));
