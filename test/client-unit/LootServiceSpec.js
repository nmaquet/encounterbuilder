"use strict";

var S = "slow";
var M = "medium";
var F = "fast";

var expect = chai.expect;

var service;

function createDiceServiceMock() {

    var nextDice = {3: [], 4: [], 6: [], 8: [], 10: [], 12: [], 20: [], 100: []};

    function roll(d, n) {
        var sum = 0;
        for (var i = 0; i < n; ++i) {
            sum += nextDice[d][i];
        }
        nextDice[d] = nextDice[d].splice(n);
        return sum;
    }

    return {
        prepareDice: function (die, value) {
            value = typeof value == "number" ? [value] : value;
            for (var i in value) {
                nextDice[die].push(value[i]);
            }
        },
        rollD3: function (n) {
            return roll(3, n);
        },
        rollD4: function (n) {
            return roll(4, n);
        },
        rollD6: function (n) {
            return roll(6, n);
        },
        rollD8: function (n) {
            return roll(8, n);
        },
        rollD10: function (n) {
            return roll(10, n);
        },
        rollD12: function (n) {
            return roll(12, n);
        },
        rollD20: function (n) {
            return roll(20, n);
        },
        rollD100: function (n) {
            return roll(100, n);
        }
    }
};

describe("lootService", function () {

    beforeEach(module("encounterBuilderApp"));

    beforeEach(module(function($provide) {
        $provide.factory('diceService', createDiceServiceMock);
    }));

    beforeEach(inject(function (_lootService_) {
        service = _lootService_;
    }));

    describe("service.generateMonsterLoot", function () {

        it("should generate no loot for humanoids with budget 'none' ", function () {
            var loot = service.generateMonsterLoot({Type: "humanoid", TreasureBudget: "none"});
            expect(loot).to.deep.equal({coins: 0, items: []});
        });

        it("should generate no loot for vermins with budget 'none' ", function () {
            var loot = service.generateMonsterLoot({Type: "vermin", TreasureBudget: "none"});
            expect(loot).to.deep.equal({coins: 0, items: []});
        });

        it("should generate some coins for humanoids with budget 'standard' ", function () {
            var loot = service.generateMonsterLoot({Type: "humanoid", TreasureBudget: "standard"});
            expect(loot.coins).to.be.at.least(1);
        });

        it("should not generate coins for types that do not have loot type 'A'", function () {
            var loot = service.generateMonsterLoot({Type: "humanoid", TreasureBudget: "standard"});
            expect(loot.coins).to.be.at.least(1);
            var loot = service.generateMonsterLoot({Type: "construct", TreasureBudget: "standard"});
            expect(loot.coins).to.equal(0);
        });
    });

    describe("service.calculateMonsterLootValue", function () {

        it("should compute value according budget 'standard' and cr", function () {
            var value = service.calculateMonsterLootValue({'TreasureBudget': "standard", 'CR': 1}, M);
            expect(value).to.equal(260);
        });

        it("should compute value for CR < 1", function () {
            var value = service.calculateMonsterLootValue({'TreasureBudget': "standard", 'CR': 1 / 8}, M);
            expect(value).to.equal(260 / 8);
        });

        it("should compute value for CR < 1 (slow)", function () {
            var value = service.calculateMonsterLootValue({'TreasureBudget': "standard", 'CR': 1 / 8}, S);
            expect(value).to.equal(170 / 8);
        });

        it("should compute value as if cr was 20 when it's higher", function () {
            var value = service.calculateMonsterLootValue({'TreasureBudget': "standard", 'CR': 21}, M);
            expect(value).to.equal(67000);
        });

        it("should compute double value when budget is double", function () {
            var value = service.calculateMonsterLootValue({'TreasureBudget': "double", 'CR': 1}, M);
            expect(value).to.equal(2 * 260);
        });

        it("should compute double value when budget is double (fast)", function () {
            var value = service.calculateMonsterLootValue({'TreasureBudget': "double", 'CR': 1}, F);
            expect(value).to.equal(2 * 400);
        });

        it("should compute triple value when budget is triple", function () {
            var value = service.calculateMonsterLootValue({'TreasureBudget': "triple", 'CR': 1}, M);
            expect(value).to.equal(3 * 260);
        });

        it("should compute half value when budget is incidental", function () {
            var value = service.calculateMonsterLootValue({'TreasureBudget': "incidental", 'CR': 1}, M);
            expect(value).to.equal(0.5 * 260);
        });

        it("should compute 0 value when budget is none", function () {
            var value = service.calculateMonsterLootValue({'TreasureBudget': "none", 'CR': 1}, M);
            expect(value).to.equal(0);
        });

        it("should compute loot value using npc gear basic table (level 2)", function () {
            var value = service.calculateMonsterLootValue({TreasureBudget: "npc gear", Level: 2, Heroic: false}, M);
            expect(value).to.equal(390);
        });

        it("should compute loot value using npc gear basic table (level 5)", function () {
            var value = service.calculateMonsterLootValue({TreasureBudget: "npc gear", Level: 5, Heroic: false}, M);
            expect(value).to.equal(2400);
        });

        it("should compute loot value using npc gear heroic table (level 2)", function () {
            var value = service.calculateMonsterLootValue({TreasureBudget: "npc gear", Level: 2, Heroic: true}, M);
            expect(value).to.equal(780);
        });

        it("should compute loot value using npc gear heroic table (level 5)", function () {
            var value = service.calculateMonsterLootValue({TreasureBudget: "npc gear", Level: 5, Heroic: true}, M);
            expect(value).to.equal(3450);
        });

        it("should compute loot value using npc gear heroic table (level 5) (slow)", function () {
            var value = service.calculateMonsterLootValue({TreasureBudget: "npc gear", Level: 5, Heroic: true}, S);
            expect(value).to.equal(3450);
        });

        it("should compute loot value using npc gear heroic table (level 5) (fast)", function () {
            var value = service.calculateMonsterLootValue({TreasureBudget: "npc gear", Level: 5, Heroic: true}, F);
            expect(value).to.equal(4650);
        });
    });
});