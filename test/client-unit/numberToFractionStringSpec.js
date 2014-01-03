"use strict";

var expect = chai.expect;

var numberToFractionString;

describe("numberToFractionString", function () {

    beforeEach(module("encounterBuilderApp"));

    beforeEach(inject(function ($filter) {
        numberToFractionString = $filter('numberToFractionString');
    }));

    it("should convert positive numbers to the corresponding string", function () {
        expect(numberToFractionString(1)).to.equal("1");
        expect(numberToFractionString(20)).to.equal("20");
        expect(numberToFractionString(300)).to.equal("300");
    });

    it("should convert 0 to '0'", function () {
        expect(numberToFractionString(0)).to.equal("0");
    });

    it("should convert fractional numbers of the type 1/x to a fraction string", function () {
        expect(numberToFractionString(1/2)).to.equal("1/2");
        expect(numberToFractionString(1/30)).to.equal("1/30");
        expect(numberToFractionString(1/400)).to.equal("1/400");
    });

});