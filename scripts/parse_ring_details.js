"use strict";

var fs = require('fs');
var cheerio = require('cheerio');
var expect = require('chai').expect;
var idify = require('../server/idify')().idify;

var html = fs.readFileSync(__dirname + '/../data/contrib/ring_descriptions_prd.html');

var $ = cheerio.load(html);

var elementWithID = function (index) {
    return this.attr("id") !== undefined;
};

var rings = [];

var processParagraphWithID = function (index) {

    var name = [this.text()];

    var firstParagraph = this.next();
    expect(firstParagraph.hasClass("stat-block-1")).to.be.true;
    var priceAuraCLWeight = firstParagraph.text().split(";");
    var price = [/Price (.*)/.exec(priceAuraCLWeight[0])[1]];
    var aura = /Aura (.*)/.exec(priceAuraCLWeight[1])[1];
    var cl = /CL (\d*)/.exec(priceAuraCLWeight[2])[1];
    var weight = /Weight (.*)/.exec(priceAuraCLWeight[3])[1];

    var secondParagraph = firstParagraph.next();
    var firstDescriptionParagraph;

    if (secondParagraph.hasClass('stat-block-1')) {
        firstDescriptionParagraph = secondParagraph.next();
        return console.log("FIXME: ignoring variant " + name);
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

    var cost = [/Cost (.*)/.exec(firstCostParagraph.text())[1]];

    var firstRequirementsParagraph;
    if (firstCostParagraph.next().hasClass("stat-block-1")) {
       return console.log("FIXME: ignoring variant " + name);
    } else {
        firstRequirementsParagraph = firstCostParagraph.next();
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
