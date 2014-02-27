"use strict";

var clone = require('./../clone')().clone;

var diceService;

var random_rods = {
    lesser_major: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [4, 6, 13, 27, 36, 44, 50, 56, 63, 70, 79, 83, 94],
        valueTable: [
            {"Price": 20000.0, "PriceUnit": "gp", "Name": "Suzerain scepter", "id": "suzerain-scepter"},
            {"Price": 22305.0, "PriceUnit": "gp", "Name": "Fiery nimbus rod", "id": "fiery-nimbus-rod"},
            {"Price": 23500.0, "PriceUnit": "gp", "Name": "Rod of enemy detection", "id": "rod-of-enemy-detection"},
            {"Price": 24500.0, "PriceUnit": "gp", "Name": "Metamagic (+1 spell level), greater", "id": "metamagic-1-spell-level-greater"},
            {"Price": 25000.0, "PriceUnit": "gp", "Name": "Rod of splendor", "id": "rod-of-splendor"},
            {"Price": 25000.0, "PriceUnit": "gp", "Name": "Rod of withering", "id": "rod-of-withering"},
            {"Price": 26500.0, "PriceUnit": "gp", "Name": "Earthbind rod", "id": "earthbind-rod"},
            {"Price": 29000.0, "PriceUnit": "gp", "Name": "Rod of the aboleth", "id": "rod-of-the-aboleth"},
            {"Price": 30000.0, "PriceUnit": "gp", "Name": "Liberator's rod", "id": "liberator-s-rod"},
            {"Price": 32500.0, "PriceUnit": "gp", "Name": "Metamagic (+2 spell level), normal", "id": "metamagic-2-spell-level-normal"},
            {"Price": 33000.0, "PriceUnit": "gp", "Name": "Rod of thunder and lightning", "id": "rod-of-thunder-and-lightning"},
            {"Price": 35000.0, "PriceUnit": "gp", "Name": "Metamagic, quicken, minor", "id": "metamagic-quicken-minor"},
            {"Price": 37000.0, "PriceUnit": "gp", "Name": "Rod of negation", "id": "rod-of-negation"},
            {"Price": 38305.0, "PriceUnit": "gp", "Name": "Rod of steadfast resolve", "id": "rod-of-steadfast-resolve"}
        ]
    },
    greater_medium: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [3, 6, 10, 18, 19, 29, 33, 55, 59, 63, 72, 76, 80, 86, 90],
        valueTable: [
            {"Price": 12000.0, "PriceUnit": "gp", "Name": "Conduit rod", "id": "conduit-rod"},
            {"Price": 12000.0, "PriceUnit": "gp", "Name": "Grounding rod", "id": "grounding-rod"},
            {"Price": 12000.0, "PriceUnit": "gp", "Name": "Rod of the wayang", "id": "rod-of-the-wayang"},
            {"Price": 12000.0, "PriceUnit": "gp", "Name": "Rod of wonder", "id": "rod-of-wonder"},
            {"Price": 12250.0, "PriceUnit": "gp", "Name": "Metamagic, merciful, greater", "id": "metamagic-merciful-greater"},
            {"Price": 13000.0, "PriceUnit": "gp", "Name": "Rod of the python", "id": "rod-of-the-python"},
            {"Price": 13500.0, "PriceUnit": "gp", "Name": "Trap-stealer's rod", "id": "trap-stealer-s-rod"},
            {"Price": 14000.0, "PriceUnit": "gp", "Name": "Metamagic (+3 spell level), minor", "id": "metamagic-3-spell-level-minor"},
            {"Price": 15000.0, "PriceUnit": "gp", "Name": "Rod of balance", "id": "rod-of-balance"},
            {"Price": 15000.0, "PriceUnit": "gp", "Name": "Rod of escape", "id": "rod-of-escape"},
            {"Price": 15000.0, "PriceUnit": "gp", "Name": "Rod of flame extinguishing", "id": "rod-of-flame-extinguishing"},
            {"Price": 16000.0, "PriceUnit": "gp", "Name": "Rod of ruin", "id": "rod-of-ruin"},
            {"Price": 16650.0, "PriceUnit": "gp", "Name": "Sapling rod", "id": "sapling-rod"},
            {"Price": 18000.0, "PriceUnit": "gp", "Name": "Rod of beguiling", "id": "rod-of-beguiling"},
            {"Price": 18000.0, "PriceUnit": "gp", "Name": "Rod of nettles", "id": "rod-of-nettles"},
            {"Price": 19000.0, "PriceUnit": "gp", "Name": "Rod of the viper", "id": "rod-of-the-viper"}
        ]
    },
    lesser_medium: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [1, 34, 49, 59, 60, 61, 71, 81, 86],
        valueTable: [
            {"Price": 1500.0, "PriceUnit": "gp", "Name": "Metamagic, merciful, minor", "id": "metamagic-merciful-minor"},
            {"Price": 3000.0, "PriceUnit": "gp", "Name": "Metamagic (+1 spell level), minor", "id": "metamagic-1-spell-level-minor"},
            {"Price": 5000.0, "PriceUnit": "gp", "Name": "Immovable rod", "id": "immovable-rod"},
            {"Price": 5400.0, "PriceUnit": "gp", "Name": "Rod of thunderous force", "id": "rod-of-thunderous-force"},
            {"Price": 5500.0, "PriceUnit": "gp", "Name": "Metamagic, merciful, normal", "id": "metamagic-merciful-normal"},
            {"Price": 8500.0, "PriceUnit": "gp", "Name": "Rod of ice", "id": "rod-of-ice"},
            {"Price": 9000.0, "PriceUnit": "gp", "Name": "Metamagic (+2 spell level), minor", "id": "metamagic-2-spell-level-minor"},
            {"Price": 10500.0, "PriceUnit": "gp", "Name": "Rod of metal and mineral detection", "id": "rod-of-metal-and-mineral-detection"},
            {"Price": 11000.0, "PriceUnit": "gp", "Name": "Metamagic (+1 spell level), normal", "id": "metamagic-1-spell-level-normal"},
            {"Price": 11000.0, "PriceUnit": "gp", "Name": "Rod of cancellation", "id": "rod-of-cancellation"}
        ]
    },
    greater_major: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [8, 11, 26, 28, 30, 32, 34, 37, 57, 58, 68, 70, 75, 95],
        valueTable: [
            {"Price": 50000.0, "PriceUnit": "gp", "Name": "Rod of absorption", "id": "rod-of-absorption"},
            {"Price": 50000.0, "PriceUnit": "gp", "Name": "Rod of flailing", "id": "rod-of-flailing"},
            {"Price": 54000.0, "PriceUnit": "gp", "Name": "Metamagic (+3 spell level), normal", "id": "metamagic-3-spell-level-normal"},
            {"Price": 60000.0, "PriceUnit": "gp", "Name": "Rod of rulership", "id": "rod-of-rulership"},
            {"Price": 61000.0, "PriceUnit": "gp", "Name": "Rod of security", "id": "rod-of-security"},
            {"Price": 64305.0, "PriceUnit": "gp", "Name": "Rod of shadows", "id": "rod-of-shadows"},
            {"Price": 67000.0, "PriceUnit": "gp", "Name": "Rod of mind mastery", "id": "rod-of-mind-mastery"},
            {"Price": 70000.0, "PriceUnit": "gp", "Name": "Rod of lordly might", "id": "rod-of-lordly-might"},
            {"Price": 73000.0, "PriceUnit": "gp", "Name": "Metamagic (+2 spell level), greater", "id": "metamagic-2-spell-level-greater"},
            {"Price": 74000.0, "PriceUnit": "gp", "Name": "Scepter of heaven", "id": "scepter-of-heaven"},
            {"Price": 75500.0, "PriceUnit": "gp", "Name": "Metamagic, quicken, normal", "id": "metamagic-quicken-normal"},
            {"Price": 80000.0, "PriceUnit": "gp", "Name": "Rod of dwarven might", "id": "rod-of-dwarven-might"},
            {"Price": 85000.0, "PriceUnit": "gp", "Name": "Rod of alertness", "id": "rod-of-alertness"},
            {"Price": 121500.0, "PriceUnit": "gp", "Name": "Metamagic (+3 spell level), greater", "id": "metamagic-3-spell-level-greater"},
            {"Price": 170000.0, "PriceUnit": "gp", "Name": "Metamagic, quicken, greater", "id": "metamagic-quicken-greater"}
        ]
    }
};

function generateRod(magnitude) {
    return random_rods[magnitude].create();
}


module.exports = function (_diceService_) {
    diceService = _diceService_;
    return {
        random_rods: random_rods,
        generateRod: generateRod
    }
};