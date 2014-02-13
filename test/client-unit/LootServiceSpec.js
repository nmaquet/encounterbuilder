"use strict";

var S = "slow";
var M = "medium";
var F = "fast";

var expect = chai.expect;

var service;
var diceService;

function createDiceServiceMock() {

    var nextDice = {3: [], 4: [], 6: [], 8: [], 10: [], 12: [], 20: [], 100: []};

    return {
        prepareDice: function (dice) {
            if (dice.value) {
                for (var i = 0; i < dice.n; ++i) {
                    nextDice[dice.die].push(dice.value);
                }
            } else {
                for (var i in dice.values) {
                    nextDice[dice.die].push(dice.values[i]);
                }
            }
        },
        verifyNoRemainingDice: function () {
            for (var i in Object.keys(nextDice)) {
                if (nextDice[Object.keys(nextDice)[i]].length > 0) {
                    throw Error(nextDice[Object.keys(nextDice)[i]].length + " remaining dice for D" + Object.keys(nextDice)[i]);
                }
            }
        },
        roll: function (die, n) {
            if (nextDice[die].length < n) {
                throw Error("not enough dice prepared for D" + die + " (prepared " + nextDice[die].length + " needed " + n + ")");
            }
            var sum = 0;
            for (var i = 0; i < n; ++i) {
                sum += nextDice[die][i];
            }
            nextDice[die] = nextDice[die].splice(n);
            return sum;
        }
    }
};

describe("lootService", function () {

    beforeEach(module("encounterBuilderApp"));

    beforeEach(module(function ($provide) {
        $provide.factory('diceService', createDiceServiceMock);
    }));

    beforeEach(inject(function (_lootService_, _diceService_) {
        service = _lootService_;
        diceService = _diceService_;
    }));

    afterEach(function () {
        diceService.verifyNoRemainingDice();
    });

    describe("service.generateMonsterLoot", function () {

        it("should generate no loot for humanoids with budget 'none' ", function () {
            var loot = service.generateMonsterLoot({Type: "humanoid", TreasureBudget: "none", CR: 20}, 'medium');
            expect(loot).to.deep.equal({coins: {pp: 0, gp: 0, sp: 0, cp: 0}, items: []});
        });

        it("should generate no loot for construct with budget 'none' ", function () {
            var loot = service.generateMonsterLoot({Type: "construct", TreasureBudget: "none", CR: 20}, 'medium');
            expect(loot).to.deep.equal({coins: {pp: 0, gp: 0, sp: 0, cp: 0}, items: []});
        });

        it("should generate appropriate coins for humanoid standard cr 1 fast", function () {
            diceService.prepareDice({die: 4, value: 1, n: 16});
            var loot = service.generateMonsterLoot({Type: "humanoid", TreasureBudget: "standard", CR: 1}, 'fast');
            expect(loot).to.deep.equal({coins: {pp: 4, gp: 80, sp: 400, cp: 0}, items: []});
        });

        it("should generate appropriate coins for humanoid double cr 7 slow", function () {
            diceService.prepareDice({die: 4, value: 4, n: 6});
            diceService.prepareDice({die: 6, value: 6, n: 14});
            diceService.prepareDice({die: 10, value: 10, n: 30});
            var loot = service.generateMonsterLoot({Type: "humanoid", TreasureBudget: "double", CR: 7}, 'slow');
            expect(loot).to.deep.equal({coins: {pp: 348, gp: 2760, sp: 0, cp: 0}, items: []});
        });

        it("should generate appropriate coins for humanoid triple cr 20 fast", function () {
            diceService.prepareDice({die: 6, value: 6, n: 12});
            diceService.prepareDice({die: 10, value: 10, n: 48});
            var loot = service.generateMonsterLoot({Type: "humanoid", TreasureBudget: "triple", CR: 20}, 'fast');
            expect(loot).to.deep.equal({coins: {pp: 48000, gp: 72000, sp: 0, cp: 0}, items: []});
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