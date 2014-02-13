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

    describe("service.calculateNPCBudget", function () {

        it("should work for basic NPCs", function () {
            var encounter = { Monsters: {
                a: { TreasureBudget: "npc gear", Level: 6},
                b: {TreasureBudget: "npc gear", Level: 3}}
            };
            expect(service.calculateNPCBudget(encounter, "medium")).to.equal(3450 + 780);
        });

        it("should work for heroic NPCs", function () {
            var encounter = { Monsters: {
                a: { TreasureBudget: "npc gear", Level: 6, Heroic: true},
                b: {TreasureBudget: "npc gear", Level: 3, Heroic: true}}
            };
            expect(service.calculateNPCBudget(encounter, "medium")).to.equal(4650 + 1650);
        });

        it("should work for fast speed", function () {
            var encounter = { Monsters: {
                a: { TreasureBudget: "npc gear", Level: 6},
                b: {TreasureBudget: "npc gear", Level: 3}}
            };
            expect(service.calculateNPCBudget(encounter, "fast")).to.equal(4650 + 1650);
        });

        it("should work for slow speed", function () {
            var encounter = { Monsters: {
                a: { TreasureBudget: "npc gear", Level: 6},
                b: {TreasureBudget: "npc gear", Level: 3}}
            };
            expect(service.calculateNPCBudget(encounter, "slow")).to.equal(3450 + 780);
        });

    });
});