"use strict";

var expect = chai.expect;

var service;

describe("crService", function () {

    beforeEach(module("encounterBuilderApp"));

    beforeEach(inject(function (_crService_) {
        service = _crService_;
    }));

    it("should return 0 when totalXP is 0", function () {
        var encounter = {xp:0};
        expect(service.calculateCR(encounter)).to.equal(0);
    });

    it("should return 0.5 when totalXP is 200", function () {
        var encounter = {xp:200};
        expect(service.calculateCR(encounter)).to.equal(0.5);
    });

    it("should return 1 when totalXP is 400", function () {
        var encounter = {xp:400};
        expect(service.calculateCR(encounter)).to.equal(1);
    });

    it("should return 2 when totalXP is 500", function () {
        var encounter = {xp:500};
        expect(service.calculateCR(encounter)).to.equal(2);
    });

    it("should return 2 when totalXP is 600", function () {
        var encounter = {xp:600};
        expect(service.calculateCR(encounter)).to.equal(2);
    });

    it("should return 25 when totalXP is 1,638,400", function () {
        var encounter = {xp:1638400};
        expect(service.calculateCR(encounter)).to.equal(25);
    });

    it("should return 27 when totalXP is 2* 1,638,400", function () {
        var encounter = {xp: 2 * 1638400};
        expect(service.calculateCR(encounter)).to.equal(27);
    });
});