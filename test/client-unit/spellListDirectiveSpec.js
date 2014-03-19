"use strict";

var expect = chai.expect;


describe("spellList", function () {

    var $rootScope;
    var $compile;
    var SPELL_KNOWN = "Spells Known (CL 5th) 2nd (5/day)-bull's strength, false life, scorching ray 1st (7/day)-alarm, burning hands (DC 14), color spray (DC 14), mage armor, magic missile 0 (at will)-detect magic, detect poison, mage hand, message, read magic, touch of fatigue (DC 13)";

    beforeEach(module("encounterBuilderApp"));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }))

    function prepareTest(spellsKnown) {
        var element = angular.element("<spell-list spell-string=\"" + spellsKnown + "\"></spell-list>");
        $compile(element)($rootScope)
        $rootScope.$digest();
        return element;
    }

    it("should convert positive numbers to the corresponding string", function () {
        var element = prepareTest(SPELL_KNOWN);
        expect(element.html()).to.equal("FOO");
    });


});