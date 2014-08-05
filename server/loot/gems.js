// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var clone = require('./../utils')().clone;

var diceService;

var random_gem = {
    lesser_precious: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [25, 50, 75],
        valueTable: [
            {"Price": 1000.0, "PriceUnit": "gp", "Name": "Diamond, small", "id": "diamond-small"},
            {"Price": 1000.0, "PriceUnit": "gp", "Name": "Emerald", "id": "emerald"},
            {"Price": 1000.0, "PriceUnit": "gp", "Name": "Ruby, small", "id": "ruby-small"},
            {"Price": 1000.0, "PriceUnit": "gp", "Name": "Sapphire", "id": "sapphire"}
        ]
    },
    greater_semi_precious: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [25, 50, 75],
        valueTable: [
            {"Price": 500.0, "PriceUnit": "gp", "Name": "Aquamarine", "id": "aquamarine"},
            {"Price": 500.0, "PriceUnit": "gp", "Name": "Opal", "id": "opal"},
            {"Price": 500.0, "PriceUnit": "gp", "Name": "Pearl, black", "id": "pearl-black"},
            {"Price": 500.0, "PriceUnit": "gp", "Name": "Topaz", "id": "topaz"}
        ]
    },
    semi_precious: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [10, 20, 30, 40, 50, 60, 70, 80, 90],
        valueTable: [
            {"Price": 100.0, "PriceUnit": "gp", "Name": "Amber", "id": "amber"},
            {"Price": 100.0, "PriceUnit": "gp", "Name": "Amethyst", "id": "amethyst"},
            {"Price": 100.0, "PriceUnit": "gp", "Name": "Chrysoberyl", "id": "chrysoberyl"},
            {"Price": 100.0, "PriceUnit": "gp", "Name": "Coral", "id": "coral"},
            {"Price": 100.0, "PriceUnit": "gp", "Name": "Garnet", "id": "garnet"},
            {"Price": 100.0, "PriceUnit": "gp", "Name": "Jade", "id": "jade"},
            {"Price": 100.0, "PriceUnit": "gp", "Name": "Jet", "id": "jet"},
            {"Price": 100.0, "PriceUnit": "gp", "Name": "Pearl, saltwater", "id": "pearl-saltwater"},
            {"Price": 100.0, "PriceUnit": "gp", "Name": "Spinel, deep blue", "id": "spinel-deep-blue"},
            {"Price": 100.0, "PriceUnit": "gp", "Name": "Tourmaline", "id": "tourmaline"}
        ]
    },
    greater_precious: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [25, 50, 75],
        valueTable: [
            {"Price": 5000.0, "PriceUnit": "gp", "Name": "Diamond, large", "id": "diamond-large"},
            {"Price": 5000.0, "PriceUnit": "gp", "Name": "Emerald, brilliant green", "id": "emerald-brilliant-green"},
            {"Price": 5000.0, "PriceUnit": "gp", "Name": "Ruby, large", "id": "ruby-large"},
            {"Price": 5000.0, "PriceUnit": "gp", "Name": "Sapphire, star", "id": "sapphire-star"}
        ]
    },
    lesser_semi_precious: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [6, 12, 18, 24, 32, 38, 44, 50, 56, 74, 80, 86, 92],
        valueTable: [
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Bloodstone", "id": "bloodstone"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Carnelian", "id": "carnelian"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Chrysoprase", "id": "chrysoprase"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Citrine", "id": "citrine"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Ivory", "id": "ivory"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Jasper", "id": "jasper"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Moonstone", "id": "moonstone"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Onyx", "id": "onyx"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Peridot", "id": "peridot"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Quartz, milky, rose, or smoky", "id": "quartz-milky-rose-or-smoky"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Sard", "id": "sard"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Sardonyx", "id": "sardonyx"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Spinel, red or green", "id": "spinel-red-or-green"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Zircon", "id": "zircon"}
        ]
    },
    least_semi_precious: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [8, 14, 20, 26, 34, 40, 48, 56, 62, 70, 78, 84, 92],
        valueTable: [
            {"Price": 10.0, "PriceUnit": "gp", "Name": "Agate", "id": "agate"},
            {"Price": 10.0, "PriceUnit": "gp", "Name": "Alabaster", "id": "alabaster"},
            {"Price": 10.0, "PriceUnit": "gp", "Name": "Azurite", "id": "azurite"},
            {"Price": 10.0, "PriceUnit": "gp", "Name": "Hematite", "id": "hematite"},
            {"Price": 10.0, "PriceUnit": "gp", "Name": "Lapis lazuli", "id": "lapis-lazuli"},
            {"Price": 10.0, "PriceUnit": "gp", "Name": "Malachite", "id": "malachite"},
            {"Price": 10.0, "PriceUnit": "gp", "Name": "Obsidian", "id": "obsidian"},
            {"Price": 10.0, "PriceUnit": "gp", "Name": "Pearl, irregular freshwater", "id": "pearl-irregular-freshwater"},
            {"Price": 10.0, "PriceUnit": "gp", "Name": "Pyrite", "id": "pyrite"},
            {"Price": 10.0, "PriceUnit": "gp", "Name": "Rhodochrosite", "id": "rhodochrosite"},
            {"Price": 10.0, "PriceUnit": "gp", "Name": "Quartz, rock crystal", "id": "quartz-rock-crystal"},
            {"Price": 10.0, "PriceUnit": "gp", "Name": "Shell", "id": "shell"},
            {"Price": 10.0, "PriceUnit": "gp", "Name": "Tigereye", "id": "tigereye"},
            {"Price": 10.0, "PriceUnit": "gp", "Name": "Turquoise", "id": "turquoise"}
        ]
    }
};

function generateGem(grade) {
    var magnitude = {
        1 : "least_semi_precious",
        2 : "lesser_semi_precious",
        3 : "semi_precious",
        4 : "greater_semi_precious",
        5 : "lesser_precious",
        6 : "greater_precious"
    };
    return random_gem[magnitude[grade]].create();
}

module.exports = function (_diceService_) {
    diceService = _diceService_;
    return {
        random_gem: random_gem,
        generateGem: generateGem
    }
};