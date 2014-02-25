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
        },
        chooseOne: function (choices) {
            return choices[0];
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

    describe("service.generateEncounterNonNPCLoot", function () {

        it("should work for budget 0 & type A", function () {
            var loot = service.generateEncounterNonNPCLoot(0, 'A');
            expect(loot).to.deep.equal({coins: {pp: 0, gp: 0, sp: 0, cp: 0}, items: []});
        });

        it("should work for budget 400 & type A", function () {
            diceService.prepareDice({die: 4, value: 1, n: 16});
            var loot = service.generateEncounterNonNPCLoot(400, 'A');
            expect(loot).to.deep.equal({coins: {pp: 4, gp: 80, sp: 400, cp: 0}, items: []});
        });

        it("should work for budget 3500 & type A", function () {
            diceService.prepareDice({die: 4, value: 4, n: 6});
            diceService.prepareDice({die: 6, value: 6, n: 14});
            diceService.prepareDice({die: 10, value: 10, n: 30});
            var loot = service.generateEncounterNonNPCLoot(3500, 'A');
            expect(loot).to.deep.equal({coins: {pp: 348, gp: 2760, sp: 0, cp: 0}, items: []});
        });

        it("should work for budget 300,000 & type A", function () {
            diceService.prepareDice({die: 6, value: 6, n: 12});
            diceService.prepareDice({die: 10, value: 10, n: 48});
            var loot = service.generateEncounterNonNPCLoot(300000, 'A');
            expect(loot).to.deep.equal({coins: {pp: 48000, gp: 72000, sp: 0, cp: 0}, items: []});
        });

    });

    describe("service.generateNPCLoot", function () {

        it("should work for npc gear level 8", function () {
            diceService.prepareDice({die: 10, value: 10, n: 16});
            diceService.prepareDice({die: 8, value: 8, n: 4});
            diceService.prepareDice({die: 4, value: 4, n: 2});
            var loot = service.generateNPCLoot({ TreasureBudget: "npc gear", Level: 8, amount: 1}, 'medium');
            expect(loot).to.deep.equal({coins: {pp: 700, gp: 4000, sp: 0, cp: 0}, items: []});
        });

        it("should work for two npc gear level 8", function () {
            diceService.prepareDice({die: 10, value: 10, n: 32});
            diceService.prepareDice({die: 8, value: 8, n: 8});
            diceService.prepareDice({die: 4, value: 4, n: 4});
            var loot = service.generateNPCLoot({ TreasureBudget: "npc gear", Level: 8, amount: 2}, 'medium');
            expect(loot).to.deep.equal({coins: {pp: 1400, gp: 8000, sp: 0, cp: 0}, items: []});
        });
    });

    describe("service.generateEncounterNPCLoot", function () {

        it("should work for npc gear level 8", function () {
            diceService.prepareDice({die: 10, value: 10, n: 16});
            diceService.prepareDice({die: 8, value: 8, n: 4});
            diceService.prepareDice({die: 4, value: 4, n: 2});

            var encounter = { CR: 7, Monsters: {
                a: { TreasureBudget: "npc gear", Level: 8}
            }};

            var loot = service.generateEncounterNPCLoot(encounter, 'medium');
            expect(loot).to.deep.equal({coins: {pp: 700, gp: 4000, sp: 0, cp: 0}, items: []});
        });

        it("should work for two different monsters with npc gear level 8", function () {
            diceService.prepareDice({die: 10, value: 10, n: 32});
            diceService.prepareDice({die: 8, value: 8, n: 8});
            diceService.prepareDice({die: 4, value: 4, n: 4});

            var encounter = { CR: 7, Monsters: {
                a: { TreasureBudget: "npc gear", Level: 8},
                b: { TreasureBudget: "npc gear", Level: 8}
            }};

            var loot = service.generateEncounterNPCLoot(encounter, 'medium');
            expect(loot).to.deep.equal({coins: {pp: 1400, gp: 8000, sp: 0, cp: 0}, items: []});
        });
    });

    describe("service.generatePotion", function () {

        it("should generate a potion of 'cure light wounds'", function () {
            /* potion level one */
            diceService.prepareDice({die: 100, value: 60, n: 1});
            /* common */
            diceService.prepareDice({die: 100, value: 60, n: 1});
            /* cure light wounds */
            diceService.prepareDice({die: 100, value: 10, n: 1});
            var item = service.generatePotion("lesser_minor");
            expect(item).to.deep.equal({"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Cure light wounds", "id": "potion-of-cure-light-wounds"});
        });

        it("should generate a potion of 'guidance'", function () {
            /* potion level zero */
            diceService.prepareDice({die: 100, value: 35, n: 1});
            /* guidance */
            diceService.prepareDice({die: 100, value: 17, n: 1});
            var item = service.generatePotion("lesser_minor");
            expect(item).to.deep.equal({"Price": 25.0, "PriceUnit": "gp", "Name": "Potion of Guidance", "id": "potion-of-guidance"});
        });

        it("should generate a potion of 'flame arrow'", function () {
            /* potion level 3 */
            diceService.prepareDice({die: 100, value: 12, n: 1});
            /* uncommon */
            diceService.prepareDice({die: 100, value: 80, n: 1});
            /* flame arrow */
            diceService.prepareDice({die: 100, value: 55, n: 1});
            var item = service.generatePotion("greater_major");
            expect(item).to.deep.equal({"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Flame arrow", "id": "potion-of-flame-arrow"});
        });

    });

    describe("service.generateScroll", function () {

        it("should generate a scroll of 'flaming sphere'", function () {
            /* scroll level two */
            diceService.prepareDice({die: 100, value: 45, n: 1});
            /* common arcane */
            diceService.prepareDice({die: 100, value: 45, n: 1});
            /* flaming sphere */
            diceService.prepareDice({die: 100, value: 38, n: 1});
            var item = service.generateScroll("greater_minor");
            expect(item).to.deep.equal({"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Flaming sphere", "id": "scroll-of-flaming-sphere"});
        });

        it("should generate a scroll of 'gate'", function () {
            /* scroll level nine */
            diceService.prepareDice({die: 100, value: 71, n: 1});
            /* common divine */
            diceService.prepareDice({die: 100, value: 61, n: 1});
            /* gate */
            diceService.prepareDice({die: 100, value: 23, n: 1});
            var item = service.generateScroll("greater_major");
            expect(item).to.deep.equal({"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Gate", "id": "scroll-of-gate"});
        });

    });

    describe("service.generateTypeDLoot", function () {

        it("should generate loot", function () {

            /* 180 sp */
            diceService.prepareDice({die: 6, value: 6, n: 3});
            /* 16 gp */
            diceService.prepareDice({die: 4, value: 4, n: 4});

            /* scroll level one */
            diceService.prepareDice({die: 100, value: 45, n: 1});
            /* common arcane */
            diceService.prepareDice({die: 100, value: 45, n: 1});
            /* hypnotism */
            diceService.prepareDice({die: 100, value: 38, n: 1});

            var items = service.generateTypeDLoot(50);
            expect(items).to.deep.equal({coins: {pp: 0, gp: 16, sp: 180, cp: 0}, items: [
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Hypnotism", "id": "scroll-of-hypnotism", amount: 1}
            ]});
        });

        it("should generate one wand with loot value 1500", function () {

            /* wand level one */
            diceService.prepareDice({die: 100, value: 45, n: 1});
            /* common */
            diceService.prepareDice({die: 100, value: 45, n: 1});
            /* alarm */
            diceService.prepareDice({die: 100, value: 1, n: 1});

            var items = service.generateTypeDLoot(1500);
            expect(items).to.deep.equal({coins: {pp: 0, gp: 0, sp: 0, cp: 0}, items: [
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Alarm", "id": "wand-of-alarm", amount: 1}
            ]});
        });
    });

    describe("service.generateMwkArmor", function () {

        it("should generate a mwk light armor", function () {

            diceService.prepareDice({die: 100, value: 45, n: 1});

            var armor = service.generateMwkArmor("lightArmorOrShield");
            expect(armor).to.deep.equal({"Price": 159.0, "PriceUnit": "gp", "Name": "Mwk Light steel shield", "id": "mwk-light-steel-shield"});
        });

        it("should generate a mwk medium armor", function () {

            diceService.prepareDice({die: 100, value: 45, n: 1});

            var armor = service.generateMwkArmor("mediumArmor");
            expect(armor).to.deep.equal({"Price": 300.0, "PriceUnit": "gp", "Name": "Mwk Chainmail", "id": "mwk-chainmail"});
        });

        it("should generate a mwk heavy armor", function () {

            diceService.prepareDice({die: 100, value: 45, n: 1});

            var armor = service.generateMwkArmor("heavyArmor");
            expect(armor).to.deep.equal({"Price": 400.0, "PriceUnit": "gp", "Name": "Mwk Banded mail", "id": "mwk-banded-mail"});
        });
    });

    describe("service.generateMwkWeapon", function () {

        it("should generate a mwk weapon", function () {
            diceService.prepareDice({die: 100, value: 45, n: 1});
            var weapon = service.generateMwkWeapon();
            expect(weapon).to.deep.equal({"Price": 306.0, "PriceUnit": "gp", "Name": "Mwk Handaxe", "id": "mwk-handaxe"});
        });
    });

    describe("service.generateMagicWeapon", function () {

        it("should generate a magic weapon without abilities", function () {
            diceService.prepareDice({die: 100, value: 45, n: 1});
            var weapon = service.generateMagicWeapon(1);
            expect(weapon).to.deep.equal({"Price": 2306.0, "PriceUnit": "gp", "Name": "Handaxe +1", "id": "handaxe-1"});
        });

        it("should generate a magic weapon with one +1 ability", function () {
            /* handaxe */
            diceService.prepareDice({die: 100, value: 45, n: 1});
            /* flaming */
            diceService.prepareDice({die: 100, value: 30, n: 1});
            var weapon = service.generateMagicWeapon(1, 1);
            expect(weapon).to.deep.equal({"Price": 8306.0, "PriceUnit": "gp", "Name": "Flaming handaxe +1", "id": "flaming-handaxe-1"});
        });

        it("should generate a magic weapon with one +2 ability", function () {
            /* handaxe */
            diceService.prepareDice({die: 100, value: 45, n: 1});
            /* disruption */
            diceService.prepareDice({die: 100, value: 30, n: 1});
            var weapon = service.generateMagicWeapon(1, 2);
            expect(weapon).to.deep.equal({"Price": 18306.0, "PriceUnit": "gp", "Name": "Disruption handaxe +1", "id": "disruption-handaxe-1"});
        });

        it("should generate a magic weapon with one +3 ability", function () {
            /* handaxe */
            diceService.prepareDice({die: 100, value: 45, n: 1});
            /* repositioning */
            diceService.prepareDice({die: 100, value: 30, n: 1});
            var weapon = service.generateMagicWeapon(1, 3);
            expect(weapon).to.deep.equal({"Price": 32306.0, "PriceUnit": "gp", "Name": "Repositioning handaxe +1", "id": "repositioning-handaxe-1"});
        });

        it("should generate a magic weapon with one +4 ability", function () {
            /* handaxe */
            diceService.prepareDice({die: 100, value: 45, n: 1});
            /* brilliant energy */
            diceService.prepareDice({die: 100, value: 30, n: 1});
            var weapon = service.generateMagicWeapon(1, 4);
            expect(weapon).to.deep.equal({"Price": 50306.0, "PriceUnit": "gp", "Name": "Brilliant energy handaxe +1", "id": "brilliant-energy-handaxe-1"});
        });

        it("should generate a magic weapon with one +4 ability even if asking for +5 but unlucky roll", function () {
            /* handaxe */
            diceService.prepareDice({die: 100, value: 45, n: 1});
            /* brilliant energy */
            diceService.prepareDice({die: 100, value: 30, n: 1});
            var weapon = service.generateMagicWeapon(1, 5);
            expect(weapon).to.deep.equal({"Price": 50306.0, "PriceUnit": "gp", "Name": "Brilliant energy handaxe +1", "id": "brilliant-energy-handaxe-1"});
        });

        it("should generate a magic weapon with one +5 ability", function () {
            /* handaxe */
            diceService.prepareDice({die: 100, value: 45, n: 1});
            /* brilliant energy */
            diceService.prepareDice({die: 100, value: 85, n: 1});
            var weapon = service.generateMagicWeapon(1, 5);
            expect(weapon).to.deep.equal({"Price": 72306.0, "PriceUnit": "gp", "Name": "Vorpal handaxe +1", "id": "vorpal-handaxe-1"});
        });

        it("should generate a magic weapon with one +5 ability even if asking for +4 but lucky roll", function () {
            /* handaxe */
            diceService.prepareDice({die: 100, value: 45, n: 1});
            /* Vorpal */
            diceService.prepareDice({die: 100, value: 85, n: 1});
            var weapon = service.generateMagicWeapon(1, 4);
            expect(weapon).to.deep.equal({"Price": 72306.0, "PriceUnit": "gp", "Name": "Vorpal handaxe +1", "id": "vorpal-handaxe-1"});
        });

        it("should generate a magic weapon with one +5 ability and one +1 ability ", function () {
            /* handaxe */
            diceService.prepareDice({die: 100, value: 45, n: 1});
            /* Vorpal */
            diceService.prepareDice({die: 100, value: 85, n: 1});
            /* flaming */
            diceService.prepareDice({die: 100, value: 30, n: 1});
            var weapon = service.generateMagicWeapon(1, 5, 1);
            expect(weapon).to.deep.equal({"Price": 98306.0, "PriceUnit": "gp", "Name": "Vorpal flaming handaxe +1", "id": "vorpal-flaming-handaxe-1"});
        });

        it("should generate a magic weapon with one +2 ability and one +3 ability ", function () {
            /* handaxe */
            diceService.prepareDice({die: 100, value: 45, n: 1});
            /* Unholy */
            diceService.prepareDice({die: 100, value: 85, n: 1});
            /* Speed */
            diceService.prepareDice({die: 100, value: 42, n: 1});
            var weapon = service.generateMagicWeapon(1, 2, 3);
            expect(weapon).to.deep.equal({"Price": 72306.0, "PriceUnit": "gp", "Name": "Unholy speed handaxe +1", "id": "unholy-speed-handaxe-1"});
        });
    });

});