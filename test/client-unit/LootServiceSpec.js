"use strict";

var expect = chai.expect;

var service;

describe("lootService", function () {

    var HumanoidNone = {
        Type: "humanoid",
        TreasureBudget: "none"
    };

    var VerminNone = {
        Type: "vermin",
        TreasureBudget: "none"
    };

    var HumanoidStandard = {
        Type: "humanoid",
        TreasureBudget: "standard"
    };

    beforeEach(module("encounterBuilderApp"));

    beforeEach(inject(function (_lootService_) {
        service = _lootService_;
    }));

    it("should generate no loot for humanoids with budget 'none' ", function () {
        var loot = service.generateMonsterLoot(HumanoidNone);
        expect(loot).to.deep.equal({coins: 0, items: []});
    });

    it("should generate no loot for vermins with budget 'none' ", function () {
        var loot = service.generateMonsterLoot(VerminNone);
        expect(loot).to.deep.equal({coins: 0, items: []});
    });

    it("should generate some coins for humanoids with budget 'standard' ", function () {
        var loot = service.generateMonsterLoot(HumanoidStandard);
        expect(loot.coins).to.be.at.least(1);
    });


});