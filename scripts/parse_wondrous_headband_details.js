"use strict";

var fs = require('fs');
var cheerio = require('cheerio');
var expect = require('chai').expect;
var idify = require('../server/utils')().idify;

var html = fs.readFileSync(__dirname + '/../data/prd_fixed_html/wondrous_headband_descriptions_prd.html');

var $ = cheerio.load(html);

var elementWithID = function (index) {
    return this.attr("id") !== undefined;
};

var items = [];



var processParagraphWithID = function (index) {
    var name = [this.text().trim()];
    console.log("parsing "  +name );

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
        //return console.log("FIXME variant: " + name);
        var variants = secondParagraph.text().split(";");
        var originalName = name[0];
        name =[];
        price = [];
        for (var i in variants){
            var variant = variants[i].trim();
            console.log("variant:" +variant);
            name.push(originalName +" "+ variant.split(" ")[0].trim());
            price.push(variant.split(" ")[1].trim());
        }

        firstDescriptionParagraph = secondParagraph.next();
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

    var firstRequirementsParagraph;
    if (!firstCostParagraph.next().hasClass("stat-block-1")) {
        firstRequirementsParagraph = firstCostParagraph.next();
    }
    else{
        //return console.log("FIXME variant: " + name);
        firstRequirementsParagraph = firstCostParagraph.next().next();
    }
    expect(firstRequirementsParagraph.hasClass("stat-block")).to.be.true;

    var requirements = firstRequirementsParagraph.text();
    for (var i in name) {
        var item = {
            "CL": Number(cl),
            "Group": "Wondrous Item",
            "Slot":"headband",
            "Name": name[i],
            "Price": parsePrice(price[i]),
            "PriceUnit": "gp",
            Aura: aura,
            Weight: weight,
            Cost: parsePrice(price[i]) / 2 || undefined,
            CostUnit: "gp",
            Requirements: requirements,
            Description: description,
            Source:"Ultimate Equipment",
            "id": idify(name[i])
        }
        items.push(item);
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
fs.writeFileSync(__dirname + "/../data/items/headbands.json", JSON.stringify(items, null, 4));
