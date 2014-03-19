"use strict";

var expect = chai.expect;

var SPELLS_KNOWN_NOOB = "Spells Barely Known (CL 0) 0 (at will)-detect magic";
var SPELLS_KNOWN_EGARTHIS = "Spells Known (CL 5th) 2nd (5/day)-bull's strength, false life, scorching ray 1st (7/day)-alarm, burning hands (DC 14), color spray (DC 14), mage armor, magic missile 0 (at will)-detect magic, detect poison, mage hand, message, read magic, touch of fatigue (DC 13)";

describe("spellList", function () {

    var $rootScope;
    var $compile;

    beforeEach(module("encounterBuilderApp"));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }))

    function createElement(spellString) {
        var element = angular.element("<spell-list spell-string=\"" + spellString + "\"></spell-list>");
        $compile(element)($rootScope)
        $rootScope.$digest();
        return element;
    }

    it("should produce HTML for nOOb spellcasters", function () {
        var element = createElement(SPELLS_KNOWN_NOOB);
        expect(element.find("strong").text()).to.equal("Spells Barely Known");
        expect(element.find("li").length).to.equal(1);
        expect(element.find("li").hasClass("spell-list-item")).to.equal(true);
        expect(element.find("li").text()).to.equal("0 (at will)&emdash;detect magic");
    });
});