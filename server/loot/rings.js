"use strict";

var clone = require('./../clone')().clone;

var diceService;

var random_ring = {
    greater_medium: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [4, 16, 26, 30, 35, 46, 54, 60, 68, 80, 88],
        valueTable: [
            {"Price": 18000.0, "PriceUnit": "gp", "Name": "Ring of inner fortitude, minor", "id": "ring-of-inner-fortitude-minor"},
            {"Price": 18000.0, "PriceUnit": "gp", "Name": "Ring of protection +3", "id": "ring-of-protection-3"},
            {"Price": 18000.0, "PriceUnit": "gp", "Name": "Ring of spell storing, minor", "id": "ring-of-spell-storing-minor"},
            {"Price": 19500.0, "PriceUnit": "gp", "Name": "Ring of energy shroud", "id": "ring-of-energy-shroud"},
            {"Price": 20000.0, "PriceUnit": "gp", "Name": "Ring of arcane mastery", "id": "ring-of-arcane-mastery"},
            {"Price": 20000.0, "PriceUnit": "gp", "Name": "Ring of invisibility", "id": "ring-of-invisibility"},
            {"Price": 20000.0, "PriceUnit": "gp", "Name": "Ring of wizardry I", "id": "ring-of-wizardry-i"},
            {"Price": 24000.0, "PriceUnit": "gp", "Name": "Ring of revelation, superior", "id": "ring-of-revelation-superior"},
            {"Price": 24000.0, "PriceUnit": "gp", "Name": "Ring of spell knowledge IV", "id": "ring-of-spell-knowledge-iv"},
            {"Price": 25000.0, "PriceUnit": "gp", "Name": "Ring of evasion", "id": "ring-of-evasion"},
            {"Price": 25000.0, "PriceUnit": "gp", "Name": "Ring of x-ray vision", "id": "ring-of-x-ray-vision"},
            {"Price": 27000.0, "PriceUnit": "gp", "Name": "Ring of blinking", "id": "ring-of-blinking"}
        ]
    },
    lesser_minor: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [7, 16, 25, 40, 47, 57, 66, 75, 84, 93],
        valueTable: [
            {"Price": 250.0, "PriceUnit": "gp", "Name": "Dungeon ring, prisoner's", "id": "dungeon-ring-prisoner-s"},
            {"Price": 1000.0, "PriceUnit": "gp", "Name": "Ring of arcane signets", "id": "ring-of-arcane-signets"},
            {"Price": 1500.0, "PriceUnit": "gp", "Name": "Ring of spell knowledge I", "id": "ring-of-spell-knowledge-i"},
            {"Price": 2000.0, "PriceUnit": "gp", "Name": "Ring of protection +1", "id": "ring-of-protection-1"},
            {"Price": 2000.0, "PriceUnit": "gp", "Name": "Ring of the grasping grave", "id": "ring-of-the-grasping-grave"},
            {"Price": 2200.0, "PriceUnit": "gp", "Name": "Ring of feather falling", "id": "ring-of-feather-falling"},
            {"Price": 2500.0, "PriceUnit": "gp", "Name": "Ring of climbing", "id": "ring-of-climbing"},
            {"Price": 2500.0, "PriceUnit": "gp", "Name": "Ring of jumping", "id": "ring-of-jumping"},
            {"Price": 2500.0, "PriceUnit": "gp", "Name": "Ring of sustenance", "id": "ring-of-sustenance"},
            {"Price": 2500.0, "PriceUnit": "gp", "Name": "Ring of swimming", "id": "ring-of-swimming"},
            {"Price": 3000.0, "PriceUnit": "gp", "Name": "Ring of ferocious action", "id": "ring-of-ferocious-action"}
        ]
    },
    greater_minor: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [15, 25, 35, 52, 69, 86],
        valueTable: [
            {"Price": 4000.0, "PriceUnit": "gp", "Name": "Ring of counterspells", "id": "ring-of-counterspells"},
            {"Price": 5000.0, "PriceUnit": "gp", "Name": "Ring of maniacal devices", "id": "ring-of-maniacal-devices"},
            {"Price": 5000.0, "PriceUnit": "gp", "Name": "Ring of rat fangs", "id": "ring-of-rat-fangs"},
            {"Price": 6000.0, "PriceUnit": "gp", "Name": "Ring of sacred mistletoe", "id": "ring-of-sacred-mistletoe"},
            {"Price": 6000.0, "PriceUnit": "gp", "Name": "Ring of spell knowledge II", "id": "ring-of-spell-knowledge-ii"},
            {"Price": 6000.0, "PriceUnit": "gp", "Name": "Ring of swarming stabs", "id": "ring-of-swarming-stabs"},
            {"Price": 6840.0, "PriceUnit": "gp", "Name": "Ring of grit mastery", "id": "ring-of-grit-mastery"}
        ]
    },
    lesser_major: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [9, 16, 33, 39, 55, 70, 75, 92],
        valueTable: [
            {"Price": 28000.0, "PriceUnit": "gp", "Name": "Ring of energy resistance, major", "id": "ring-of-energy-resistance-major"},
            {"Price": 28500.0, "PriceUnit": "gp", "Name": "Ring of the ecclesiarch", "id": "ring-of-the-ecclesiarch"},
            {"Price": 32000.0, "PriceUnit": "gp", "Name": "Ring of protection +4", "id": "ring-of-protection-4"},
            {"Price": 33600.0, "PriceUnit": "gp", "Name": "Ring of return", "id": "ring-of-return"},
            {"Price": 40000.0, "PriceUnit": "gp", "Name": "Ring of freedom of movement", "id": "ring-of-freedom-of-movement"},
            {"Price": 40000.0, "PriceUnit": "gp", "Name": "Ring of wizardry II", "id": "ring-of-wizardry-ii"},
            {"Price": 42000.0, "PriceUnit": "gp", "Name": "Ring of inner fortitude, major", "id": "ring-of-inner-fortitude-major"},
            {"Price": 44000.0, "PriceUnit": "gp", "Name": "Ring of energy resistance, greater", "id": "ring-of-energy-resistance-greater"},
            {"Price": 45000.0, "PriceUnit": "gp", "Name": "Ring of delayed doom", "id": "ring-of-delayed-doom"}
        ]
    },
    lesser_medium: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [2, 6, 11, 13, 17, 22, 24, 27, 29, 31, 35, 37, 40, 43, 46, 48, 50, 52, 55, 58, 61, 64, 67, 70, 76, 79, 82, 85, 89, 95],
        valueTable: [
            {"Price": 8000.0, "PriceUnit": "gp", "Name": "Ring of forcefangs", "id": "ring-of-forcefangs"},
            {"Price": 8000.0, "PriceUnit": "gp", "Name": "Ring of mind shielding", "id": "ring-of-mind-shielding"},
            {"Price": 8000.0, "PriceUnit": "gp", "Name": "Ring of protection +2", "id": "ring-of-protection-2"},
            {"Price": 8000.0, "PriceUnit": "gp", "Name": "Ring of strength sapping", "id": "ring-of-strength-sapping"},
            {"Price": 8500.0, "PriceUnit": "gp", "Name": "Ring of force shield", "id": "ring-of-force-shield"},
            {"Price": 8600.0, "PriceUnit": "gp", "Name": "Ring of the ram", "id": "ring-of-the-ram"},
            {"Price": 8700.0, "PriceUnit": "gp", "Name": "Scholar's ring", "id": "scholar-s-ring"},
            {"Price": 10000.0, "PriceUnit": "gp", "Name": "Ring of climbing, improved", "id": "ring-of-climbing-improved"},
            {"Price": 10000.0, "PriceUnit": "gp", "Name": "Ring of curing", "id": "ring-of-curing"},
            {"Price": 10000.0, "PriceUnit": "gp", "Name": "Ring of foe focus", "id": "ring-of-foe-focus"},
            {"Price": 10000.0, "PriceUnit": "gp", "Name": "Ring of jumping, improved", "id": "ring-of-jumping-improved"},
            {"Price": 10000.0, "PriceUnit": "gp", "Name": "Ring of ki mastery", "id": "ring-of-ki-mastery"},
            {"Price": 10000.0, "PriceUnit": "gp", "Name": "Ring of revelation, lesser", "id": "ring-of-revelation-lesser"},
            {"Price": 10000.0, "PriceUnit": "gp", "Name": "Ring of swimming, improved", "id": "ring-of-swimming-improved"},
            {"Price": 10800.0, "PriceUnit": "gp", "Name": "Ring of animal friendship", "id": "ring-of-animal-friendship"},
            {"Price": 10800.0, "PriceUnit": "gp", "Name": "Ring of transposition", "id": "ring-of-transposition"},
            {"Price": 11000.0, "PriceUnit": "gp", "Name": "Ring of tactical precision", "id": "ring-of-tactical-precision"},
            {"Price": 11000.0, "PriceUnit": "gp", "Name": "Ring of the sophisticate", "id": "ring-of-the-sophisticate"},
            {"Price": 12000.0, "PriceUnit": "gp", "Name": "Decoy ring", "id": "decoy-ring"},
            {"Price": 12000.0, "PriceUnit": "gp", "Name": "Ring of craft magic", "id": "ring-of-craft-magic"},
            {"Price": 12000.0, "PriceUnit": "gp", "Name": "Ring of ectoplasmic invigoration", "id": "ring-of-ectoplasmic-invigoration"},
            {"Price": 12000.0, "PriceUnit": "gp", "Name": "Ring of energy resistance, minor", "id": "ring-of-energy-resistance-minor"},
            {"Price": 12000.0, "PriceUnit": "gp", "Name": "Ring of the troglodyte", "id": "ring-of-the-troglodyte"},
            {"Price": 12000.0, "PriceUnit": "gp", "Name": "Steelhand circle", "id": "steelhand-circle"},
            {"Price": 12700.0, "PriceUnit": "gp", "Name": "Ring of chameleon power", "id": "ring-of-chameleon-power"},
            {"Price": 13500.0, "PriceUnit": "gp", "Name": "Ring of spell knowledge III", "id": "ring-of-spell-knowledge-iii"},
            {"Price": 14000.0, "PriceUnit": "gp", "Name": "Ring of the sea strider", "id": "ring-of-the-sea-strider"},
            {"Price": 15000.0, "PriceUnit": "gp", "Name": "Ring of retribution", "id": "ring-of-retribution"},
            {"Price": 15000.0, "PriceUnit": "gp", "Name": "Ring of water walking", "id": "ring-of-water-walking"},
            {"Price": 16000.0, "PriceUnit": "gp", "Name": "Dungeon ring, jailer's", "id": "dungeon-ring-jailer-s"},
            {"Price": 16000.0, "PriceUnit": "gp", "Name": "Ring of revelation, greater", "id": "ring-of-revelation-greater"}
        ]
    },
    greater_major: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [6, 18, 27, 37, 43, 48, 57, 63, 71, 76, 82, 86, 90, 93, 97],
        valueTable: [
            {"Price": 50000.0, "PriceUnit": "gp", "Name": "Ring of friend shield", "id": "ring-of-friend-shield"},
            {"Price": 50000.0, "PriceUnit": "gp", "Name": "Ring of protection +5", "id": "ring-of-protection-5"},
            {"Price": 50000.0, "PriceUnit": "gp", "Name": "Ring of shooting stars", "id": "ring-of-shooting-stars"},
            {"Price": 50000.0, "PriceUnit": "gp", "Name": "Ring of spell storing", "id": "ring-of-spell-storing"},
            {"Price": 56000.0, "PriceUnit": "gp", "Name": "Ring of continuation", "id": "ring-of-continuation"},
            {"Price": 66000.0, "PriceUnit": "gp", "Name": "Ring of inner fortitude, greater", "id": "ring-of-inner-fortitude-greater"},
            {"Price": 70000.0, "PriceUnit": "gp", "Name": "Ring of wizardry III", "id": "ring-of-wizardry-iii"},
            {"Price": 70000.0, "PriceUnit": "gp", "Name": "Spiritualist Rings", "id": "spiritualist-rings"},
            {"Price": 75000.0, "PriceUnit": "gp", "Name": "Ring of telekinesis", "id": "ring-of-telekinesis"},
            {"Price": 90000.0, "PriceUnit": "gp", "Name": "Ring of regeneration", "id": "ring-of-regeneration"},
            {"Price": 100000.0, "PriceUnit": "gp", "Name": "Ring of spell turning", "id": "ring-of-spell-turning"},
            {"Price": 100000.0, "PriceUnit": "gp", "Name": "Ring of wizardry IV", "id": "ring-of-wizardry-iv"},
            {"Price": 120000.0, "PriceUnit": "gp", "Name": "Ring of three wishes", "id": "ring-of-three-wishes"},
            {"Price": 125000.0, "PriceUnit": "gp", "Name": "Ring of djinni calling", "id": "ring-of-djinni-calling"},
            {"Price": 200000.0, "PriceUnit": "gp", "Name": "Ring of elemental command", "id": "ring-of-elemental-command"},
            {"Price": 200000.0, "PriceUnit": "gp", "Name": "Ring of spell storing, major", "id": "ring-of-spell-storing-major"}
        ]
    }
};

module.exports = function (_diceService_) {
    diceService = _diceService_;
    return {
        random_ring : random_ring
    }
};