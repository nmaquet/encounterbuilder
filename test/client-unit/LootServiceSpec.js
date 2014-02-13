"use strict";

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

    describe("service.mostGenerousBudgetMultiplierAmongNonNPC", function () {

        it("should work", function () {
            var encounter = {Monsters: { a: { TreasureBudget: "standard"}, b: {TreasureBudget: "triple"}}};
            expect(service.mostGenerousBudgetMultiplierAmongNonNPC(encounter)).to.equal(3);
        });

        it("should work", function () {
            var encounter = {Monsters: { a: { TreasureBudget: "none"}, b: {TreasureBudget: "none"}}};
            expect(service.mostGenerousBudgetMultiplierAmongNonNPC(encounter)).to.equal(0);
        });

        it("should work", function () {
            var encounter = {Monsters: { a: { TreasureBudget: "none"}, b: {TreasureBudget: "incidental"}}};
            expect(service.mostGenerousBudgetMultiplierAmongNonNPC(encounter)).to.equal(0.5);
        });

    });

    describe("service.calculateNPCLevel", function () {

        it("should return CR-1 if no level", function () {
            expect(service.calculateNPCLevel({CR: 5})).to.equal(4);
        });

        it("should return level if good level", function () {
            expect(service.calculateNPCLevel({Level: 6})).to.equal(6);
        });

        it("should return 1 if level too small", function () {
            expect(service.calculateNPCLevel({Level: 1 / 8})).to.equal(1);
        });

        it("should return 1 if level negative", function () {
            expect(service.calculateNPCLevel({Level: -10})).to.equal(1);
        });

        it("should return 1 if no level and CR is too small", function () {
            expect(service.calculateNPCLevel({CR: 1 / 8})).to.equal(1);
        });

    });

    describe("service.calculateEncounterNPCBudget", function () {

        it("should work for basic NPCs", function () {
            var encounter = { Monsters: {
                a: { TreasureBudget: "npc gear", Level: 6},
                b: {TreasureBudget: "npc gear", Level: 3}}
            };
            expect(service.calculateEncounterNPCBudget(encounter, "medium")).to.equal(3450 + 780);
        });

        it("should work for heroic NPCs", function () {
            var encounter = { Monsters: {
                a: { TreasureBudget: "npc gear", Level: 6, Heroic: true},
                b: {TreasureBudget: "npc gear", Level: 3, Heroic: true}}
            };
            expect(service.calculateEncounterNPCBudget(encounter, "medium")).to.equal(4650 + 1650);
        });

        it("should work for fast speed", function () {
            var encounter = { Monsters: {
                a: { TreasureBudget: "npc gear", Level: 6},
                b: {TreasureBudget: "npc gear", Level: 3}}
            };
            expect(service.calculateEncounterNPCBudget(encounter, "fast")).to.equal(4650 + 1650);
        });

        it("should work for slow speed", function () {
            var encounter = { Monsters: {
                a: { TreasureBudget: "npc gear", Level: 6},
                b: {TreasureBudget: "npc gear", Level: 3}}
            };
            expect(service.calculateEncounterNPCBudget(encounter, "slow")).to.equal(3450 + 780);
        });

    });

    describe("service.calculateNonNPCLootValue", function () {

        it("should work when there are only NPC's", function () {
            var encounter = { CR: 7, Monsters: {
                a: { TreasureBudget: "npc gear", Level: 6},
                b: { TreasureBudget: "npc gear", Level: 3}
            }};
            expect(service.calculateNonNPCLootValue(encounter, "medium")).to.equal(0);
        });

        it("should work when there are only monsters", function () {
            var encounter = { CR: 7, Monsters: {
                a: { TreasureBudget: "incidental" },
                b: { TreasureBudget: "standard" }
            }};
            expect(service.calculateNonNPCLootValue(encounter, "medium")).to.equal(2600);
        });

        it("should work when there are both NPC's and monsters", function () {
            var encounter = { CR: 7, Monsters: {
                a: { TreasureBudget: "npc gear", Level: 6},
                b: { TreasureBudget: "triple" }
            }};
            expect(service.calculateNonNPCLootValue(encounter, "medium")).to.equal(7800 - 3450);
        });

        it("should work when the NPC budget exceeds the non NPC budget", function () {
            var encounter = { CR: 7, Monsters: {
                a: { TreasureBudget: "npc gear", Level: 6, amount: 10},
                b: { TreasureBudget: "triple" }
            }};
            expect(service.calculateNonNPCLootValue(encounter, "medium")).to.equal(0);
        });

    });

    describe("service.generateLoot", function () {

        it("should work for budget 0 & type A", function () {
            var loot = service.generateLoot(0, 'A');
            expect(loot).to.deep.equal({coins: {pp: 0, gp: 0, sp: 0, cp: 0}, items: []});
        });

        it("should work for budget 400 & type A", function () {
            diceService.prepareDice({die: 4, value: 1, n: 16});
            var loot = service.generateLoot(400, 'A');
            expect(loot).to.deep.equal({coins: {pp: 4, gp: 80, sp: 400, cp: 0}, items: []});
        });

        it("should work for budget 3500 & type A", function () {
            diceService.prepareDice({die: 4, value: 4, n: 6});
            diceService.prepareDice({die: 6, value: 6, n: 14});
            diceService.prepareDice({die: 10, value: 10, n: 30});
            var loot = service.generateLoot(3500, 'A');
            expect(loot).to.deep.equal({coins: {pp: 348, gp: 2760, sp: 0, cp: 0}, items: []});
        });

        it("should work for budget 300,000 & type A", function () {
            diceService.prepareDice({die: 6, value: 6, n: 12});
            diceService.prepareDice({die: 10, value: 10, n: 48});
            var loot = service.generateLoot(300000, 'A');
            expect(loot).to.deep.equal({coins: {pp: 48000, gp: 72000, sp: 0, cp: 0}, items: []});
        });

    });
});