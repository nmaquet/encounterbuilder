"use strict";

var fs = require('fs');
var cheerio = require('cheerio');
var expect = require('chai').expect;

var html = fs.readFileSync(__dirname + '/../data/contrib/ring_descriptions_prd.html');

var $ = cheerio.load(html);

var elementWithID = function (index) {
    return this.attr("id") !== undefined;
};

var processParagraphWithID = function (index) {
    var name = this.text();

    var firstParagraph = this.next();
    expect(firstParagraph.hasClass("stat-block-1")).to.be.true;
    var priceAuraCLWeight = firstParagraph.text().split(";");
    var price = /Price (.*)/.exec(priceAuraCLWeight[0])[1];
    var aura = /Aura (.*)/.exec(priceAuraCLWeight[1])[1];
    var cl = /CL (.*)/.exec(priceAuraCLWeight[2])[1];
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

    var cost = /Cost (.*)/.exec(firstCostParagraph.text())[1];

    var firstRequirementsParagraph;
    if (firstCostParagraph.next().hasClass("stat-block-1")) {
        return console.log("FIXME: ignoring variant " + name);
    } else {
        firstRequirementsParagraph = firstCostParagraph.next();
    }

    expect(firstRequirementsParagraph.hasClass("stat-block")).to.be.true;

    var requirements = firstRequirementsParagraph.text();

    console.log("Requirements : " + requirements);
    console.log();
};

$("p").filter(elementWithID).each(processParagraphWithID);
