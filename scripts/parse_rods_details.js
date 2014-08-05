// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var fs = require('fs');
var cheerio = require('cheerio');
var expect = require('chai').expect;
var idify = require('../server/utils')().idify;

var html = fs.readFileSync(__dirname + '/../data/prd_fixed_html/rod_descriptions_prd.html');

var $ = cheerio.load(html);

var elementWithID = function (index) {
    return this.attr("id") !== undefined;
};

var rods = [];



var processParagraphWithID = function (index) {
    var name = [this.text()];
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
        var variants = secondParagraph.text().split(";");
        name =[];
        price = [];
        for (var i in variants){
            var variant = variants[i];
            name.push( variant.split("rod")[0].trim() + " rod");
            price.push(variant.split("rod")[1].trim());
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
        firstRequirementsParagraph = firstCostParagraph.next().next();
    }
    expect(firstRequirementsParagraph.hasClass("stat-block")).to.be.true;

    var requirements = firstRequirementsParagraph.text();
    for (var i in name) {
        var rod = {
            "CL": Number(cl),
            "Group": "Rod",
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
        rods.push(rod);
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
fs.writeFileSync(__dirname + "/../data/items/rods.json", JSON.stringify(rods, null, 4));
