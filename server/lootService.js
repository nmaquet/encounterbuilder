"use strict";

var clone = require('./clone')();
var idify = require('./idify')();

var diceService, knapsackService;

var monsterTypeToLootTypeTable = {
    aberration: {A: true, B: true, D: true, E: true},
    animal: {A: true, B: true, D: true, E: true},
    construct: {E: true, F: true},
    dragon: {A: true, B: true, C: true, H: true, I: true},
    fey: {B: true, C: true, D: true, G: true},
    humanoid: {A: true, B: true, D: true, E: true, F: true, G: true},
    'magical beast': {A: true, B: true, D: true, E: true},
    'monstrous humanoid': {A: true, B: true, C: true, D: true, E: true, H: true},
    ooze: {A: true, B: true, D: true},
    outsider: {A: true, B: true, C: true, D: true, E: true, F: true, G: true, H: true, I: true},
    plant: {A: true, B: true, D: true, E: true},
    undead: {A: true, B: true, D: true, E: true},
    vermin: {A: true, B: true, D: true}
};

var crToLootValue = {
    '1': {'slow': 170, 'medium': 260, 'fast': 400},
    '2': {'slow': 350, 'medium': 550, 'fast': 800},
    '3': {'slow': 550, 'medium': 800, 'fast': 1200},
    '4': {'slow': 750, 'medium': 1150, 'fast': 1700},
    '5': {'slow': 1000, 'medium': 1550, 'fast': 2300},
    '6': {'slow': 1350, 'medium': 2000, 'fast': 3000},
    '7': {'slow': 1750, 'medium': 2600, 'fast': 3900},
    '8': {'slow': 2200, 'medium': 3350, 'fast': 5000},
    '9': {'slow': 2850, 'medium': 4250, 'fast': 6400},
    '10': {'slow': 3650, 'medium': 5450, 'fast': 8200},
    '11': {'slow': 4650, 'medium': 7000, 'fast': 10500},
    '12': {'slow': 6000, 'medium': 9000, 'fast': 13500},
    '13': {'slow': 7750, 'medium': 11600, 'fast': 17500},
    '14': {'slow': 10000, 'medium': 15000, 'fast': 22000},
    '15': {'slow': 13000, 'medium': 19500, 'fast': 29000},
    '16': {'slow': 16500, 'medium': 25000, 'fast': 38000},
    '17': {'slow': 22000, 'medium': 32000, 'fast': 48000},
    '18': {'slow': 28000, 'medium': 41000, 'fast': 62000},
    '19': {'slow': 35000, 'medium': 53000, 'fast': 79000},
    '20': {'slow': 44000, 'medium': 67000, 'fast': 100000}
};

var npcLevelToLootValue = {
    '1': {'basic': 260, 'heroic': 390},
    '2': {'basic': 390, 'heroic': 780},
    '3': {'basic': 780, 'heroic': 1650},
    '4': {'basic': 1650, 'heroic': 2400},
    '5': {'basic': 2400, 'heroic': 3450},
    '6': {'basic': 3450, 'heroic': 4650},
    '7': {'basic': 4650, 'heroic': 6000},
    '8': {'basic': 6000, 'heroic': 7800},
    '9': {'basic': 7800, 'heroic': 10050},
    '10': {'basic': 10050, 'heroic': 12750},
    '11': {'basic': 12750, 'heroic': 16350},
    '12': {'basic': 16350, 'heroic': 21000},
    '13': {'basic': 21000, 'heroic': 27000},
    '14': {'basic': 27000, 'heroic': 34800},
    '15': {'basic': 34800, 'heroic': 45000},
    '16': {'basic': 45000, 'heroic': 58500},
    '17': {'basic': 58500, 'heroic': 75000},
    '18': {'basic': 75000, 'heroic': 96000},
    '19': {'basic': 96000, 'heroic': 123000},
    '20': {'basic': 123000, 'heroic': 159000}
};

var typeALoot = {
    1: [
        {n: 5, die: 10, amount: 1, unit: 'cp'},
        {n: 3, die: 4, amount: 1, unit: 'sp'}
    ],
    5: [
        {n: 2, die: 6, amount: 10, unit: 'cp'},
        {n: 4, die: 8, amount: 1, unit: 'sp'},
        {n: 1, die: 4, amount: 1, unit: 'gp'}
    ],
    10: [
        {n: 5, die: 10, amount: 10, unit: 'cp'},
        {n: 5, die: 10, amount: 1, unit: 'sp'},
        {n: 1, die: 8, amount: 1, unit: 'gp'}
    ],
    25: [
        {n: 2, die: 4, amount: 100, unit: 'cp'},
        {n: 3, die: 6, amount: 10, unit: 'sp'},
        {n: 4, die: 4, amount: 1, unit: 'gp'}
    ],
    50: [
        {n: 4, die: 4, amount: 100, unit: 'cp'},
        {n: 4, die: 6, amount: 10, unit: 'sp'},
        {n: 8, die: 6, amount: 1, unit: 'gp'}
    ],
    100: [
        {n: 6, die: 8, amount: 10, unit: 'sp'},
        {n: 3, die: 4, amount: 10, unit: 'gp'}
    ],
    200: [
        {n: 2, die: 4, amount: 100, unit: 'sp'},
        {n: 4, die: 4, amount: 10, unit: 'gp'},
        {n: 2, die: 4, amount: 1, unit: 'pp'}
    ],
    500: [
        {n: 6, die: 6, amount: 10, unit: 'gp'},
        {n: 8, die: 6, amount: 1, unit: 'pp'}
    ],
    1000: [
        {n: 2, die: 4, amount: 100, unit: 'gp'},
        {n: 10, die: 10, amount: 1, unit: 'pp'}
    ],
    5000: [
        {n: 4, die: 8, amount: 100, unit: 'gp'},
        {n: 6, die: 10, amount: 10, unit: 'pp'}
    ],
    10000: [
        {n: 2, die: 4, amount: 1000, unit: 'gp'},
        {n: 12, die: 8, amount: 10, unit: 'pp'}
    ],
    50000: [
        {n: 2, die: 6, amount: 1000, unit: 'gp'},
        {n: 8, die: 10, amount: 100, unit: 'pp'}
    ]
};

var typeDLoot = {
    50: [
        [
            {n: 3, die: 6, amount: 10, unit: 'sp', type: 'coins'},
            {n: 4, die: 4, amount: 1, unit: 'gp', type: 'coins'},
            {amount: 1, type: 'scroll', magnitude: 'lesser_minor'}
        ],
        [
            {n: 2, die: 4, amount: 10, unit: 'sp', type: 'coins'},
            {n: 2, die: 4, amount: 1, unit: 'gp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'lesser_minor'}
        ]
    ],
    100: [
        [
            {n: 4, die: 6, amount: 10, unit: 'sp', type: 'coins'},
            {n: 3, die: 10, amount: 1, unit: 'gp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'lesser_minor'},
            {amount: 1, type: 'scroll', magnitude: 'lesser_minor'}
        ]
    ],
    150: [
        [
            {n: 2, die: 4, amount: 10, unit: 'sp', type: 'coins'},
            {n: 6, die: 6, amount: 1, unit: 'gp', type: 'coins'},
            {amount: 1, type: 'scroll', magnitude: 'greater_minor'}
        ]
    ],
    200: [
        [
            {n: 2, die: 4, amount: 10, unit: 'sp', type: 'coins'},
            {n: 4, die: 6, amount: 1, unit: 'gp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'greater_minor'},
            {amount: 1, type: 'scroll', magnitude: 'lesser_minor'}
        ]
    ],
    250: [
        [
            {n: 3, die: 6, amount: 10, unit: 'sp', type: 'coins'},
            {n: 3, die: 6, amount: 1, unit: 'gp', type: 'coins'},
            {n: 1, die: 4, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 2, type: 'potion', magnitude: 'lesser_minor'},
            {amount: 1, type: 'scroll', magnitude: 'greater_minor'}
        ]
    ],
    300: [
        [
            {n: 2, die: 4, amount: 10, unit: 'sp', type: 'coins'},
            {n: 6, die: 6, amount: 1, unit: 'gp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'greater_minor'},
            {amount: 1, type: 'scroll', magnitude: 'greater_minor'}
        ]
    ],
    400: [
        [
            {amount: 1, type: 'potion', magnitude: 'greater_minor'},
            {amount: 2, type: 'scroll', magnitude: 'greater_minor'}
        ]
    ],
    500: [
        [
            {n: 2, die: 4, amount: 10, unit: 'gp', type: 'coins'},
            {n: 1, die: 4, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'lesser_medium'},
            {amount: 1, type: 'scroll', magnitude: 'greater_minor'}
        ],
        [
            {n: 2, die: 4, amount: 10, unit: 'gp', type: 'coins'},
            {n: 1, die: 4, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 2, type: 'potion', magnitude: 'greater_minor'},
            {amount: 1, type: 'scroll', magnitude: 'greater_minor'}
        ]
    ],
    750: [
        [
            {n: 7, die: 6, amount: 1, unit: 'gp', type: 'coins'},
            {amount: 1, type: 'scroll', magnitude: 'greater_minor'},
            {amount: 1, type: 'wand', magnitude: 'lesser_minor'}
        ]
    ],
    1000: [
        [
            {n: 4, die: 4, amount: 10, unit: 'gp', type: 'coins'},
            {n: 3, die: 6, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'lesser_medium'},
            {amount: 1, type: 'scroll', magnitude: 'lesser_medium'}
        ],
        [
            {n: 2, die: 4, amount: 10, unit: 'gp', type: 'coins'},
            {n: 2, die: 4, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'lesser_medium'},
            {amount: 1, type: 'wand', magnitude: 'lesser_medium'}
        ]
    ],
    1500: [
        [
            {amount: 1, type: 'wand', magnitude: 'greater_minor'}
        ],
        [
            {n: 4, die: 4, amount: 10, unit: 'gp', type: 'coins'},
            {n: 3, die: 6, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'greater_medium'},
            {amount: 1, type: 'scroll', magnitude: 'greater_medium'}
        ]
    ],
    2000: [
        [
            {amount: 1, type: 'potion', magnitude: 'greater_medium'},
            {amount: 1, type: 'wand', magnitude: 'greater_minor'}
        ],
        [
            {n: 2, die: 4, amount: 10, unit: 'gp', type: 'coins'},
            {n: 2, die: 4, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'lesser_medium'},
            {amount: 2, type: 'scroll', magnitude: 'greater_medium'}
        ]
    ],
    3000: [
        [
            {n: 3, die: 6, amount: 10, unit: 'gp', type: 'coins'},
            {n: 4, die: 4, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'greater_medium'},
            {amount: 1, type: 'scroll', magnitude: 'greater_medium'},
            {amount: 1, type: 'wand', magnitude: 'greater_minor'}
        ]
    ],
    4000: [
        [
            {n: 3, die: 6, amount: 10, unit: 'gp', type: 'coins'},
            {n: 4, die: 4, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'scroll', magnitude: 'greater_medium'},
            {amount: 2, type: 'wand', magnitude: 'greater_minor'}
        ]
    ],
    5000: [
        [
            {n: 2, die: 4, amount: 10, unit: 'gp', type: 'coins'},
            {n: 2, die: 4, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 3, type: 'potion', magnitude: 'lesser_major'},
            {amount: 2, type: 'scroll', magnitude: 'greater_medium'},
            {amount: 1, type: 'wand', magnitude: 'greater_minor'}
        ]
    ],
    7500: [
        [
            {n: 2, die: 6, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'scroll', magnitude: 'lesser_major'},
            {amount: 1, type: 'wand', magnitude: 'lesser_medium'}
        ],
        [
            {n: 5, die: 6, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 2, type: 'potion', magnitude: 'greater_major'},
            {amount: 2, type: 'scroll', magnitude: 'greater_major'}
        ]
    ],
    10000: [
        [
            {amount: 1, type: 'wand', magnitude: 'greater_medium'}
        ],
        [
            {n: 4, die: 6, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'greater_major'},
            {amount: 1, type: 'scroll', magnitude: 'greater_major'},
            {amount: 1, type: 'wand', magnitude: 'lesser_medium'}
        ]
    ],
    15000: [
        [
            {amount: 1, type: 'wand', magnitude: 'lesser_major'}
        ],
        [
            {n: 9, die: 10, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 3, type: 'potion', magnitude: 'greater_major'},
            {amount: 2, type: 'scroll', magnitude: 'lesser_major'},
            {amount: 1, type: 'wand', magnitude: 'greater_medium'}
        ]
    ],
    20000: [
        [
            {n: 4, die: 4, amount: 10, unit: 'gp', type: 'coins'},
            {n: 2, die: 4, amount: 10, unit: 'pp', type: 'coins'},
            {amount: 2, type: 'potion', magnitude: 'greater_major'},
            {amount: 1, type: 'scroll', magnitude: 'greater_major'},
            {amount: 1, type: 'wand', magnitude: 'lesser_major'}
        ],
        [
            {n: 6, die: 6, amount: 10, unit: 'gp', type: 'coins'},
            {amount: 3, type: 'potion', magnitude: 'lesser_major'},
            {amount: 1, type: 'wand', magnitude: 'greater_major'}
        ]
    ],
    25000: [
        [
            {amount: 5, type: 'scroll', magnitude: 'greater_major'},
            {amount: 1, type: 'wand', magnitude: 'greater_medium'}
        ]
    ],
    30000: [
        [
            {n: 6, die: 6, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 4, type: 'potion', magnitude: 'greater_major'},
            {amount: 3, type: 'scroll', magnitude: 'greater_major'},
            {amount: 1, type: 'wand', magnitude: 'greater_major'}
        ]
    ],
    50000: [
        [
            {n: 8, die: 4, amount: 10, unit: 'pp', type: 'coins'},
            {amount: 4, type: 'scroll', magnitude: 'greater_major'},
            {amount: 2, type: 'wand', magnitude: 'greater_major'}
        ]
    ]
};

var typeELoot = {
    200: [
        [
            {mwk: true, type: "armorOrShield", armorType: "lightArmorOrShield"}
        ]
    ],
    300: [
        [
            {mwk: true, type: "armorOrShield", armorType: "mediumArmor"}
        ]
    ],
    350: [
        [
            {mwk: true, type: "weapon"}
        ]
    ],
    1000: [
        [
            {mwk: true, type: "armorOrShield", armorType: "heavyArmor"}
        ]
    ],
    1500: [
        [
            { magnitude: "lesser_minor", type: "armorOrShield"}
        ]
    ],
    2500: [
        [
            { magnitude: "lesser_minor", type: "weapon"}
        ]
    ],
    3000: [
        [
            { magnitude: "greater_minor", type: "armorOrShield"}
        ],
        [
            {mwk: true, type: "armorOrShield", armorType: "mediumArmor"},
            {mwk: true, type: "armorOrShield", armorType: "lightArmorOrShield"},//FIXME this is supposed to be mwk Shield
            { magnitude: "lesser_minor", type: "weapon"}
        ]

    ],
    4000: [
        [
            { magnitude: "lesser_minor", type: "armorOrShield"},
            { magnitude: "lesser_minor", type: "weapon"}
        ]
    ],
    5500: [
        [
            { magnitude: "greater_minor", type: "armorOrShield"},
            { magnitude: "lesser_minor", type: "weapon"}
        ]
    ],
    6000: [
        [
            { magnitude: "greater_minor", type: "weapon"}
        ]
    ],
    7500: [
        [
            { magnitude: "lesser_minor", type: "armorOrShield"},
            { magnitude: "greater_minor", type: "weapon"}
        ]
    ],
    8000: [
        [
            { magnitude: "greater_minor", type: "armorOrShield"},
            { magnitude: "lesser_minor", type: "weapon"},
            { magnitude: "lesser_minor", type: "weapon"}

        ]
    ],
    9000: [
        [
            { magnitude: "greater_minor", type: "armorOrShield"},
            { magnitude: "greater_minor", type: "weapon"}
        ]
    ],
    10000: [
        [
            { magnitude: "lesser_medium", type: "armorOrShield"},
            { magnitude: "lesser_minor", type: "weapon"}
        ]
    ],
    13000: [
        [
            { magnitude: "lesser_medium", type: "weapon"}
        ],
        [
            { magnitude: "lesser_medium", type: "armorOrShield"},
            { magnitude: "greater_minor", type: "weapon"}
        ]
    ],
    15000: [
        [
            { magnitude: "greater_medium", type: "armorOrShield"},
            { magnitude: "lesser_minor", type: "weapon"}
        ]
    ],
    20000: [
        [
            { magnitude: "lesser_medium", type: "armorOrShield"},
            { magnitude: "lesser_medium", type: "weapon"}
        ]
    ],
    25000: [
        [
            { magnitude: "greater_minor", type: "armorOrShield"},
            { magnitude: "greater_medium", type: "weapon"}
        ]
    ],
    30000: [
        [
            { magnitude: "lesser_major", type: "armorOrShield"},
            { magnitude: "lesser_minor", type: "weapon"},
            { magnitude: "greater_minor", type: "weapon"}
        ],
        [
            { magnitude: "lesser_medium", type: "armorOrShield"},
            { magnitude: "greater_medium", type: "weapon"}
        ]
    ],
    35000: [
        [
            { magnitude: "lesser_major", type: "armorOrShield"},
            { magnitude: "lesser_medium", type: "weapon"}
        ],
        [
            { magnitude: "lesser_minor", type: "armorOrShield"},
            { magnitude: "lesser_major", type: "weapon"}
        ]
    ],
    40000: [
        { magnitude: "greater_major", type: "armorOrShield"},
        { magnitude: "greater_minor", type: "weapon"}
    ],
    50000: [
        [
            { magnitude: "greater_major", type: "armorOrShield"},
            { magnitude: "lesser_medium", type: "weapon"}
        ]
    ],
    75000: [
        [
            { magnitude: "greater_minor", type: "armorOrShield"},
            { magnitude: "greater_major", type: "weapon"}
        ]
    ],
    100000: [
        [
            { magnitude: "greater_major", type: "armorOrShield"},
            { magnitude: "greater_major", type: "weapon"}
        ]
    ]
};

var randomWand = {
    common: {
        "0": function () {
            return rangeIn100([7, 14, 20, 28, 34, 42, 49, 55, 60, 66, 73, 81, 88, 95], [
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Acid splash", "id": "wand-of-acid-splash"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Create water", "id": "wand-of-create-water"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Daze", "id": "wand-of-daze"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Detect magic", "id": "wand-of-detect-magic"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Ghost sound", "id": "wand-of-ghost-sound"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Light", "id": "wand-of-light"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Mage hand", "id": "wand-of-mage-hand"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Mending", "id": "wand-of-mending"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Message", "id": "wand-of-message"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Prestidigitation", "id": "wand-of-prestidigitation"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Purify food and drink", "id": "wand-of-purify-food-and-drink"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Ray of frost", "id": "wand-of-ray-of-frost"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Read magic", "id": "wand-of-read-magic"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Stabilize", "id": "wand-of-stabilize"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Touch of fatigue", "id": "wand-of-touch-of-fatigue"}
            ]);
        },
        "1": function () {
            return rangeIn100([2, 3, 5, 11, 14, 17, 19, 21, 23, 24, 31, 33, 37, 38, 41, 43, 45, 46, 48, 50, 52, 58, 60, 67, 68, 70, 71, 73, 74, 75, 76, 77, 79, 81, 84, 86, 87, 89, 90, 94, 95, 96, 99], [
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Alarm", "id": "wand-of-alarm"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Animate rope", "id": "wand-of-animate-rope"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Bane", "id": "wand-of-bane"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Bless", "id": "wand-of-bless"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Burning hands", "id": "wand-of-burning-hands"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Cause fear", "id": "wand-of-cause-fear"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Charm person", "id": "wand-of-charm-person"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Color spray", "id": "wand-of-color-spray"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Command", "id": "wand-of-command"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Comprehend languages", "id": "wand-of-comprehend-languages"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Cure light wounds", "id": "wand-of-cure-light-wounds"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Disguise self", "id": "wand-of-disguise-self"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Divine favor", "id": "wand-of-divine-favor"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Endure elements", "id": "wand-of-endure-elements"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Enlarge person", "id": "wand-of-enlarge-person"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Entangle", "id": "wand-of-entangle"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Expeditious retreat", "id": "wand-of-expeditious-retreat"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Feather fall", "id": "wand-of-feather-fall"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Grease", "id": "wand-of-grease"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Identify", "id": "wand-of-identify"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Inflict light wounds", "id": "wand-of-inflict-light-wounds"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Mage armor", "id": "wand-of-mage-armor"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Magic fang", "id": "wand-of-magic-fang"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Magic missile", "id": "wand-of-magic-missile"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Magic stone", "id": "wand-of-magic-stone"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Magic weapon", "id": "wand-of-magic-weapon"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Obscuring mist", "id": "wand-of-obscuring-mist"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Produce flame", "id": "wand-of-produce-flame"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Protection from chaos", "id": "wand-of-protection-from-chaos"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Protection from evil", "id": "wand-of-protection-from-evil"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Protection from good", "id": "wand-of-protection-from-good"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Protection from law", "id": "wand-of-protection-from-law"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Ray of enfeeblement", "id": "wand-of-ray-of-enfeeblement"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Remove fear", "id": "wand-of-remove-fear"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Shield", "id": "wand-of-shield"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Shield of faith", "id": "wand-of-shield-of-faith"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Shillelagh", "id": "wand-of-shillelagh"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Shocking grasp", "id": "wand-of-shocking-grasp"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Silent image", "id": "wand-of-silent-image"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Sleep", "id": "wand-of-sleep"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Summon monster I", "id": "wand-of-summon-monster-i"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Summon nature's ally I", "id": "wand-of-summon-nature-s-ally-i"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of True strike", "id": "wand-of-true-strike"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Unseen servant", "id": "wand-of-unseen-servant"}
            ]);
        },
        "2": function () {
            return rangeIn100([2, 3, 5, 7, 10, 11, 14, 16, 22, 25, 26, 27, 29, 30, 31, 32, 33, 35, 37, 38, 40, 43, 46, 51, 52, 54, 55, 57, 59, 60, 61, 64, 66, 71, 73, 74, 76, 78, 81, 83, 86, 88, 90, 92, 96, 97, 99], [
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Acid arrow", "id": "wand-of-acid-arrow"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Aid", "id": "wand-of-aid"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Alter self", "id": "wand-of-alter-self"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Barkskin", "id": "wand-of-barkskin"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Bear's endurance", "id": "wand-of-bear-s-endurance"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Blur", "id": "wand-of-blur"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Bull's strength", "id": "wand-of-bull-s-strength"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Cat's grace", "id": "wand-of-cat-s-grace"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Cure moderate wounds", "id": "wand-of-cure-moderate-wounds"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Darkness", "id": "wand-of-darkness"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Darkvision", "id": "wand-of-darkvision"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Delay poison", "id": "wand-of-delay-poison"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Eagle's splendor", "id": "wand-of-eagle-s-splendor"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of False life", "id": "wand-of-false-life"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Find traps", "id": "wand-of-find-traps"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Flame blade", "id": "wand-of-flame-blade"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Flaming sphere", "id": "wand-of-flaming-sphere"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Fog cloud", "id": "wand-of-fog-cloud"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Fox's cunning", "id": "wand-of-fox-s-cunning"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Glitterdust", "id": "wand-of-glitterdust"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Heat metal", "id": "wand-of-heat-metal"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Hold person", "id": "wand-of-hold-person"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Inflict moderate wounds", "id": "wand-of-inflict-moderate-wounds"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Invisibility", "id": "wand-of-invisibility"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Knock", "id": "wand-of-knock"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Levitate", "id": "wand-of-levitate"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Minor image", "id": "wand-of-minor-image"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Mirror image", "id": "wand-of-mirror-image"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Owl's wisdom", "id": "wand-of-owl-s-wisdom"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Pyrotechnics", "id": "wand-of-pyrotechnics"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Remove paralysis", "id": "wand-of-remove-paralysis"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Resist energy", "id": "wand-of-resist-energy"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Restoration, lesser", "id": "wand-of-restoration-lesser"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Scorching ray", "id": "wand-of-scorching-ray"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of See invisibility", "id": "wand-of-see-invisibility"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Shatter", "id": "wand-of-shatter"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Shield other", "id": "wand-of-shield-other"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Silence", "id": "wand-of-silence"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Sound burst", "id": "wand-of-sound-burst"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Spider climb", "id": "wand-of-spider-climb"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Spiritual weapon", "id": "wand-of-spiritual-weapon"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Summon monster II", "id": "wand-of-summon-monster-ii"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Summon nature's ally II", "id": "wand-of-summon-nature-s-ally-ii"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Summon swarm", "id": "wand-of-summon-swarm"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Web", "id": "wand-of-web"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Whispering wind", "id": "wand-of-whispering-wind"},
                {"Price": 5750.0, "PriceUnit": "gp", "Name": "Wand of Augury", "id": "wand-of-augury"},
                {"Price": 5750.0, "PriceUnit": "gp", "Name": "Wand of Fire trap", "id": "wand-of-fire-trap"}
            ]);
        },
        "3": function () {
            return rangeIn100([2, 4, 7, 8, 14, 16, 18, 20, 25, 28, 34, 35, 37, 38, 40, 42, 45, 47, 48, 50, 55, 56, 57, 58, 59, 60, 62, 64, 66, 70, 74, 75, 77, 79, 82, 83, 85, 87, 89, 90, 92, 93, 94, 97, 99], [
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Beast shape I", "id": "wand-of-beast-shape-i"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Blink", "id": "wand-of-blink"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Call lightning", "id": "wand-of-call-lightning"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Create food and water", "id": "wand-of-create-food-and-water"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Cure serious wounds", "id": "wand-of-cure-serious-wounds"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Daylight", "id": "wand-of-daylight"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Deep slumber", "id": "wand-of-deep-slumber"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Deeper darkness", "id": "wand-of-deeper-darkness"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Dispel magic", "id": "wand-of-dispel-magic"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Displacement", "id": "wand-of-displacement"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Fireball", "id": "wand-of-fireball"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Flame arrow", "id": "wand-of-flame-arrow"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Fly", "id": "wand-of-fly"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Gaseous form", "id": "wand-of-gaseous-form"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Haste", "id": "wand-of-haste"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Heroism", "id": "wand-of-heroism"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Inflict serious wounds", "id": "wand-of-inflict-serious-wounds"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Invisibility purge", "id": "wand-of-invisibility-purge"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Invisibility sphere", "id": "wand-of-invisibility-sphere"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Keen edge", "id": "wand-of-keen-edge"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Lightning bolt", "id": "wand-of-lightning-bolt"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Magic circle against chaos", "id": "wand-of-magic-circle-against-chaos"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Magic circle against evil", "id": "wand-of-magic-circle-against-evil"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Magic circle against good", "id": "wand-of-magic-circle-against-good"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Magic circle against law", "id": "wand-of-magic-circle-against-law"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Magic fang, greater", "id": "wand-of-magic-fang-greater"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Magic vestment", "id": "wand-of-magic-vestment"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Magic weapon, greater", "id": "wand-of-magic-weapon-greater"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Major image", "id": "wand-of-major-image"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Prayer", "id": "wand-of-prayer"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Protection from energy", "id": "wand-of-protection-from-energy"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Remove blindness/deafness", "id": "wand-of-remove-blindness-deafness"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Remove curse", "id": "wand-of-remove-curse"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Remove disease", "id": "wand-of-remove-disease"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Searing light", "id": "wand-of-searing-light"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Sleet storm", "id": "wand-of-sleet-storm"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Slow", "id": "wand-of-slow"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Speak with dead", "id": "wand-of-speak-with-dead"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Stinking cloud", "id": "wand-of-stinking-cloud"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Stone shape", "id": "wand-of-stone-shape"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Suggestion", "id": "wand-of-suggestion"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Summon monster III", "id": "wand-of-summon-monster-iii"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Summon nature's ally III", "id": "wand-of-summon-nature-s-ally-iii"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Vampiric touch", "id": "wand-of-vampiric-touch"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Water breathing", "id": "wand-of-water-breathing"},
                {"Price": 23750.0, "PriceUnit": "gp", "Name": "Wand of Animate dead", "id": "wand-of-animate-dead"}
            ]);
        },
        "4": function () {
            return rangeIn100([2, 4, 7, 8, 11, 14, 16, 22, 24, 28, 29, 30, 33, 35, 37, 39, 42, 44, 48, 51, 53, 54, 56, 58, 61, 65, 66, 69, 70, 72, 73, 74, 76, 79, 80, 81, 82, 87, 91, 93, 95, 96, 98, 99], [
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Air walk", "id": "wand-of-air-walk"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Beast shape II", "id": "wand-of-beast-shape-ii"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Black tentacles", "id": "wand-of-black-tentacles"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Chaos hammer", "id": "wand-of-chaos-hammer"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Charm monster", "id": "wand-of-charm-monster"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Confusion", "id": "wand-of-confusion"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Crushing despair", "id": "wand-of-crushing-despair"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Cure critical wounds", "id": "wand-of-cure-critical-wounds"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Death ward", "id": "wand-of-death-ward"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Dimension door", "id": "wand-of-dimension-door"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Dimensional anchor", "id": "wand-of-dimensional-anchor"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Dismissal", "id": "wand-of-dismissal"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Divine power", "id": "wand-of-divine-power"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Elemental body I", "id": "wand-of-elemental-body-i"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Enervation", "id": "wand-of-enervation"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Enlarge person, mass", "id": "wand-of-enlarge-person-mass"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Fear", "id": "wand-of-fear"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Fire shield", "id": "wand-of-fire-shield"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Flame strike", "id": "wand-of-flame-strike"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Freedom of movement", "id": "wand-of-freedom-of-movement"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Globe of invulnerability, lesser", "id": "wand-of-globe-of-invulnerability-lesser"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Holy smite", "id": "wand-of-holy-smite"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Ice storm", "id": "wand-of-ice-storm"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Imbue with spell ability", "id": "wand-of-imbue-with-spell-ability"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Inflict critical wounds", "id": "wand-of-inflict-critical-wounds"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Invisibility, greater", "id": "wand-of-invisibility-greater"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Order's wrath", "id": "wand-of-order-s-wrath"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Phantasmal killer", "id": "wand-of-phantasmal-killer"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Resilient sphere", "id": "wand-of-resilient-sphere"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Scrying", "id": "wand-of-scrying"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Sending", "id": "wand-of-sending"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Shout", "id": "wand-of-shout"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Solid fog", "id": "wand-of-solid-fog"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Spell immunity", "id": "wand-of-spell-immunity"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Summon monster IV", "id": "wand-of-summon-monster-iv"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Summon nature's ally IV", "id": "wand-of-summon-nature-s-ally-iv"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Unholy blight", "id": "wand-of-unholy-blight"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Wall of fire", "id": "wand-of-wall-of-fire"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Wall of ice", "id": "wand-of-wall-of-ice"},
                {"Price": 22250.0, "PriceUnit": "gp", "Name": "Wand of Divination", "id": "wand-of-divination"},
                {"Price": 26000.0, "PriceUnit": "gp", "Name": "Wand of Restoration", "id": "wand-of-restoration"},
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Wand of Break enchantment", "id": "wand-of-break-enchantment"},
                {"Price": 33500.0, "PriceUnit": "gp", "Name": "Wand of Stoneskin", "id": "wand-of-stoneskin"},
                {"Price": 46000.0, "PriceUnit": "gp", "Name": "Wand of Planar ally, lesser", "id": "wand-of-planar-ally-lesser"},
                {"Price": 71000.0, "PriceUnit": "gp", "Name": "Wand of Restoration (Can dispel permanent negative levels)", "id": "wand-of-restoration-can-dispel-permanent-negative-levels"}
            ]);
        }
    },
    uncommon: {
        "0": function () {
            return rangeIn100([6, 15, 22, 31, 40, 48, 56, 65, 73, 79, 86, 94], [
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Arcane mark", "id": "wand-of-arcane-mark"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Bleed", "id": "wand-of-bleed"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Dancing lights", "id": "wand-of-dancing-lights"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Detect poison", "id": "wand-of-detect-poison"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Disrupt undead", "id": "wand-of-disrupt-undead"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Flare", "id": "wand-of-flare"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Guidance", "id": "wand-of-guidance"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Know direction", "id": "wand-of-know-direction"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Lullaby", "id": "wand-of-lullaby"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Open/close", "id": "wand-of-open-close"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Resistance", "id": "wand-of-resistance"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Spark", "id": "wand-of-spark"},
                {"Price": 375.0, "PriceUnit": "gp", "Name": "Wand of Virtue", "id": "wand-of-virtue"}
            ]);
        },
        "1": function () {
            return rangeIn100([2, 5, 7, 8, 10, 12, 14, 17, 19, 21, 22, 23, 24, 25, 26, 28, 29, 31, 35, 37, 38, 39, 41, 44, 47, 49, 51, 52, 54, 56, 58, 60, 63, 65, 66, 68, 69, 71, 72, 75, 78, 80, 83, 85, 87, 88, 89, 92, 96, 97, 98, 99], [
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Ant haul", "id": "wand-of-ant-haul"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Aspect of the falcon", "id": "wand-of-aspect-of-the-falcon"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Bless weapon", "id": "wand-of-bless-weapon"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Calm animals", "id": "wand-of-calm-animals"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Charm animal", "id": "wand-of-charm-animal"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Chill touch", "id": "wand-of-chill-touch"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Compel hostility", "id": "wand-of-compel-hostility"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Confusion, lesser", "id": "wand-of-confusion-lesser"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Corrosive touch", "id": "wand-of-corrosive-touch"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Deathwatch", "id": "wand-of-deathwatch"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Detect animals or plants", "id": "wand-of-detect-animals-or-plants"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Detect chaos", "id": "wand-of-detect-chaos"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Detect evil", "id": "wand-of-detect-evil"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Detect good", "id": "wand-of-detect-good"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Detect law", "id": "wand-of-detect-law"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Detect secret doors", "id": "wand-of-detect-secret-doors"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Detect snares and pits", "id": "wand-of-detect-snares-and-pits"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Detect undead", "id": "wand-of-detect-undead"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Doom", "id": "wand-of-doom"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Entropic shield", "id": "wand-of-entropic-shield"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Erase", "id": "wand-of-erase"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Faerie fire", "id": "wand-of-faerie-fire"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Feather step", "id": "wand-of-feather-step"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Floating disk", "id": "wand-of-floating-disk"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Goodberry", "id": "wand-of-goodberry"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Hide from animals", "id": "wand-of-hide-from-animals"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Hide from undead", "id": "wand-of-hide-from-undead"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Hideous laughter", "id": "wand-of-hideous-laughter"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Hold portal", "id": "wand-of-hold-portal"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Hypnotism", "id": "wand-of-hypnotism"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Icicle dagger", "id": "wand-of-icicle-dagger"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Ill omen", "id": "wand-of-ill-omen"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Jump", "id": "wand-of-jump"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Longstrider", "id": "wand-of-longstrider"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Magic aura", "id": "wand-of-magic-aura"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Mount", "id": "wand-of-mount"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Obscure object", "id": "wand-of-obscure-object"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Pass without trace", "id": "wand-of-pass-without-trace"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Ray of sickening", "id": "wand-of-ray-of-sickening"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Reduce person", "id": "wand-of-reduce-person"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Sanctuary", "id": "wand-of-sanctuary"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Shock shield", "id": "wand-of-shock-shield"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Speak with animals", "id": "wand-of-speak-with-animals"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Stone fist", "id": "wand-of-stone-fist"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Stone shield", "id": "wand-of-stone-shield"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Summon minor monster", "id": "wand-of-summon-minor-monster"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Undetectable alignment", "id": "wand-of-undetectable-alignment"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Urban grace", "id": "wand-of-urban-grace"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Vanish", "id": "wand-of-vanish"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Wand of Ventriloquism", "id": "wand-of-ventriloquism"},
                {"Price": 1250.0, "PriceUnit": "gp", "Name": "Wand of Magic mouth", "id": "wand-of-magic-mouth"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Wand of Bless water", "id": "wand-of-bless-water"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Wand of Curse water", "id": "wand-of-curse-water"}
            ]);
        },
        "2": function () {
            return rangeIn100([2, 5, 6, 7, 10, 13, 15, 18, 21, 24, 25, 27, 29, 32, 33, 35, 39, 42, 46, 48, 50, 51, 53, 55, 56, 57, 59, 60, 61, 63, 65, 66, 67, 69, 72, 74, 76, 78, 80, 82, 84, 86, 88, 91, 93, 95, 96, 97, 98, 99], [
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Align weapon", "id": "wand-of-align-weapon"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Animal aspect", "id": "wand-of-animal-aspect"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Animal messenger", "id": "wand-of-animal-messenger"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Animal trance", "id": "wand-of-animal-trance"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Aspect of the bear", "id": "wand-of-aspect-of-the-bear"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Bestow weapon proficiency", "id": "wand-of-bestow-weapon-proficiency"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Blindness/deafness", "id": "wand-of-blindness-deafness"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Burning gaze", "id": "wand-of-burning-gaze"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Calm emotions", "id": "wand-of-calm-emotions"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Chill metal", "id": "wand-of-chill-metal"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Command undead", "id": "wand-of-command-undead"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Daze monster", "id": "wand-of-daze-monster"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Death knell", "id": "wand-of-death-knell"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Defensive shock", "id": "wand-of-defensive-shock"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Delay pain", "id": "wand-of-delay-pain"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Detect thoughts", "id": "wand-of-detect-thoughts"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Disguise other", "id": "wand-of-disguise-other"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Effortless armor", "id": "wand-of-effortless-armor"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Elemental touch", "id": "wand-of-elemental-touch"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Enthrall", "id": "wand-of-enthrall"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Gentle repose", "id": "wand-of-gentle-repose"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Ghoul touch", "id": "wand-of-ghoul-touch"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Glide", "id": "wand-of-glide"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Groundswell", "id": "wand-of-groundswell"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Gust of wind", "id": "wand-of-gust-of-wind"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Hold animal", "id": "wand-of-hold-animal"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Hypnotic pattern", "id": "wand-of-hypnotic-pattern"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Locate object", "id": "wand-of-locate-object"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Make whole", "id": "wand-of-make-whole"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Misdirection", "id": "wand-of-misdirection"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Oppressive boredom", "id": "wand-of-oppressive-boredom"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Protection from arrows", "id": "wand-of-protection-from-arrows"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Reduce animal", "id": "wand-of-reduce-animal"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Rope trick", "id": "wand-of-rope-trick"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Scare", "id": "wand-of-scare"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Share language", "id": "wand-of-share-language"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Soften earth and stone", "id": "wand-of-soften-earth-and-stone"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Spectral hand", "id": "wand-of-spectral-hand"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Status", "id": "wand-of-status"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Tongues", "id": "wand-of-tongues"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Touch of idiocy", "id": "wand-of-touch-of-idiocy"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Tree shape", "id": "wand-of-tree-shape"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Warp wood", "id": "wand-of-warp-wood"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Weapon of awe", "id": "wand-of-weapon-of-awe"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Wood shape", "id": "wand-of-wood-shape"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Wand of Zone of truth", "id": "wand-of-zone-of-truth"},
                {"Price": 5750.0, "PriceUnit": "gp", "Name": "Wand of Arcane lock", "id": "wand-of-arcane-lock"},
                {"Price": 5750.0, "PriceUnit": "gp", "Name": "Wand of Consecrate", "id": "wand-of-consecrate"},
                {"Price": 5750.0, "PriceUnit": "gp", "Name": "Wand of Desecrate", "id": "wand-of-desecrate"},
                {"Price": 7000.0, "PriceUnit": "gp", "Name": "Wand of Continual flame", "id": "wand-of-continual-flame"},
                {"Price": 7000.0, "PriceUnit": "gp", "Name": "Wand of Phantom trap", "id": "wand-of-phantom-trap"}
            ]);
        },
        "3": function () {
            return rangeIn100([4, 6, 8, 11, 14, 17, 20, 22, 23, 25, 29, 30, 34, 35, 37, 40, 43, 45, 46, 49, 52, 54, 55, 57, 60, 61, 65, 67, 69, 70, 71, 73, 74, 76, 77, 81, 84, 86, 87, 89, 91, 95, 97, 98, 99], [
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Animal aspect, greater", "id": "wand-of-animal-aspect-greater"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Aqueous orb", "id": "wand-of-aqueous-orb"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Arcane sight", "id": "wand-of-arcane-sight"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Archon's aura", "id": "wand-of-archon-s-aura"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Ash storm", "id": "wand-of-ash-storm"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Bestow curse", "id": "wand-of-bestow-curse"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Clairaudience/clairvoyance", "id": "wand-of-clairaudience-clairvoyance"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Contagion", "id": "wand-of-contagion"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Diminish plants", "id": "wand-of-diminish-plants"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Dominate animal", "id": "wand-of-dominate-animal"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Elemental aura", "id": "wand-of-elemental-aura"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Explosive runes", "id": "wand-of-explosive-runes"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Force punch", "id": "wand-of-force-punch"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Halt undead", "id": "wand-of-halt-undead"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Helping hand", "id": "wand-of-helping-hand"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Hostile levitation", "id": "wand-of-hostile-levitation"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Howling agony", "id": "wand-of-howling-agony"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Hydraulic torrent", "id": "wand-of-hydraulic-torrent"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Mad monkeys", "id": "wand-of-mad-monkeys"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Meld into stone", "id": "wand-of-meld-into-stone"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Neutralize poison", "id": "wand-of-neutralize-poison"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Pain strike", "id": "wand-of-pain-strike"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Phantom steed", "id": "wand-of-phantom-steed"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Plant growth", "id": "wand-of-plant-growth"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Poison", "id": "wand-of-poison"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Quench", "id": "wand-of-quench"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Rage", "id": "wand-of-rage"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Ray of exhaustion", "id": "wand-of-ray-of-exhaustion"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Resinous skin", "id": "wand-of-resinous-skin"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Secret page", "id": "wand-of-secret-page"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Shrink item", "id": "wand-of-shrink-item"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Snare", "id": "wand-of-snare"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Speak with plants", "id": "wand-of-speak-with-plants"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Spike growth", "id": "wand-of-spike-growth"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Tiny hut", "id": "wand-of-tiny-hut"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Water walk", "id": "wand-of-water-walk"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Wind wall", "id": "wand-of-wind-wall"},
                {"Price": 11250.0, "PriceUnit": "gp", "Name": "Wand of Wrathful mantle", "id": "wand-of-wrathful-mantle"},
                {"Price": 13750.0, "PriceUnit": "gp", "Name": "Wand of Illusory script", "id": "wand-of-illusory-script"},
                {"Price": 13750.0, "PriceUnit": "gp", "Name": "Wand of Nondetection", "id": "wand-of-nondetection"},
                {"Price": 15750.0, "PriceUnit": "gp", "Name": "Wand of Glibness", "id": "wand-of-glibness"},
                {"Price": 15750.0, "PriceUnit": "gp", "Name": "Wand of Good hope", "id": "wand-of-good-hope"},
                {"Price": 15750.0, "PriceUnit": "gp", "Name": "Wand of Heal mount", "id": "wand-of-heal-mount"},
                {"Price": 15750.0, "PriceUnit": "gp", "Name": "Wand of Sculpt sound", "id": "wand-of-sculpt-sound"},
                {"Price": 21250.0, "PriceUnit": "gp", "Name": "Wand of Glyph of warding", "id": "wand-of-glyph-of-warding"},
                {"Price": 36250.0, "PriceUnit": "gp", "Name": "Wand of Sepia snake sigil", "id": "wand-of-sepia-snake-sigil"}
            ]);
        },
        "4": function () {
            return rangeIn100([1, 4, 7, 11, 12, 13, 15, 18, 19, 20, 24, 28, 30, 34, 36, 37, 38, 40, 42, 43, 46, 48, 50, 53, 54, 56, 59, 60, 63, 67, 70, 74, 76, 79, 80, 82, 83, 84, 87, 91, 94, 95, 97, 98, 99], [
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Antiplant shell", "id": "wand-of-antiplant-shell"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Arcane eye", "id": "wand-of-arcane-eye"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Aspect of the stag", "id": "wand-of-aspect-of-the-stag"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Ball lightning", "id": "wand-of-ball-lightning"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Blight", "id": "wand-of-blight"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Command plants", "id": "wand-of-command-plants"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Control water", "id": "wand-of-control-water"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Darkvision, greater", "id": "wand-of-darkvision-greater"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Detect scrying", "id": "wand-of-detect-scrying"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Discern lies", "id": "wand-of-discern-lies"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Dragon's breath", "id": "wand-of-dragon-s-breath"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of False life, greater", "id": "wand-of-false-life-greater"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Geas, lesser", "id": "wand-of-geas-lesser"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Ghost wolf", "id": "wand-of-ghost-wolf"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Giant vermin", "id": "wand-of-giant-vermin"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Hallucinatory terrain", "id": "wand-of-hallucinatory-terrain"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Illusory wall", "id": "wand-of-illusory-wall"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Locate creature", "id": "wand-of-locate-creature"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Minor creation", "id": "wand-of-minor-creation"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Mnemonic enhancer", "id": "wand-of-mnemonic-enhancer"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Obsidian flow", "id": "wand-of-obsidian-flow"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Rainbow pattern", "id": "wand-of-rainbow-pattern"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Reduce person, mass", "id": "wand-of-reduce-person-mass"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Reincarnate", "id": "wand-of-reincarnate"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Repel vermin", "id": "wand-of-repel-vermin"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Ride the waves", "id": "wand-of-ride-the-waves"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Rusting grasp", "id": "wand-of-rusting-grasp"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Secure shelter", "id": "wand-of-secure-shelter"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Shadow conjuration", "id": "wand-of-shadow-conjuration"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Shadow step", "id": "wand-of-shadow-step"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Shocking image", "id": "wand-of-shocking-image"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Spike stones", "id": "wand-of-spike-stones"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Volcanic storm", "id": "wand-of-volcanic-storm"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Wand of Wandering star motes", "id": "wand-of-wandering-star-motes"},
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Wand of Animal growth", "id": "wand-of-animal-growth"},
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Wand of Commune with nature", "id": "wand-of-commune-with-nature"},
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Wand of Dispel chaos", "id": "wand-of-dispel-chaos"},
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Wand of Dispel evil", "id": "wand-of-dispel-evil"},
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Wand of Dominate person", "id": "wand-of-dominate-person"},
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Wand of Hold monster", "id": "wand-of-hold-monster"},
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Wand of Holy sword", "id": "wand-of-holy-sword"},
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Wand of Mark of justice", "id": "wand-of-mark-of-justice"},
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Wand of Modify memory", "id": "wand-of-modify-memory"},
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Wand of Tree stride", "id": "wand-of-tree-stride"},
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Wand of Zone of silence", "id": "wand-of-zone-of-silence"},
                {"Price": 33500.0, "PriceUnit": "gp", "Name": "Wand of Legend lore", "id": "wand-of-legend-lore"}
            ]);
        }
    }
};

var randomScrollLevel = {
    lesser_minor: function () {
        return rangeIn100([15, 95], [0, 1, 2]);
    },
    greater_minor: function () {
        return rangeIn100([5, 35, 90], [0, 1, 2, 3]);
    },
    lesser_medium: function () {
        return rangeIn100([10, 55], [2, 3, 4]);
    },
    greater_medium: function () {
        return rangeIn100([20, 60], [3, 4, 5]);
    },
    lesser_major: function () {
        return rangeIn100([30, 65, 90], [4, 5, 6, 7]);
    },
    greater_major: function () {
        return rangeIn100([5, 35, 70], [6, 7, 8, 9]);
    }
};

var randomPotionLevel = {
    lesser_minor: function () {
        return rangeIn100([40], [0, 1]);
    },
    greater_minor: function () {
        return rangeIn100([10, 60], [0, 1, 2]);
    },
    lesser_medium: function () {
        return rangeIn100([25, 85], [1, 2, 3]);
    },
    greater_medium: function () {
        return rangeIn100([10, 50], [1, 2, 3]);
    },
    lesser_major: function () {
        return rangeIn100([35], [2, 3]);
    },
    greater_major: function () {
        return rangeIn100([10], [2, 3]);
    }
};

var randomWandLevel = {
    lesser_minor: function () {
        return rangeIn100([40], [0, 1]);
    },
    greater_minor: function () {
        return rangeIn100([80], [1, 2]);
    },
    lesser_medium: function () {
        return rangeIn100([75], [2, 3]);
    },
    greater_medium: function () {
        return rangeIn100([20, 80], [2, 3, 4]);
    },
    lesser_major: function () {
        return rangeIn100([60], [3, 4]);
    },
    greater_major: function () {
        return rangeIn100([30], [3, 4]);
    }
};

var randomScroll = {
    common: {
        arcane: {
            "0": function () {
                return rangeIn100([9, 17, 27, 35, 45, 55, 63, 72, 81, 91], [
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Acid splash", "id": "scroll-of-acid-splash"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Daze", "id": "scroll-of-daze"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Detect magic", "id": "scroll-of-detect-magic"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Flare", "id": "scroll-of-flare"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Light", "id": "scroll-of-light"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Mage hand", "id": "scroll-of-mage-hand"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Mending", "id": "scroll-of-mending"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Prestidigitation", "id": "scroll-of-prestidigitation"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Ray of frost", "id": "scroll-of-ray-of-frost"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Read magic", "id": "scroll-of-read-magic"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Touch of fatigue", "id": "scroll-of-touch-of-fatigue"}
                ]);
            },
            "1": function () {
                return rangeIn100([5, 9, 14, 17, 21, 24, 28, 32, 36, 39, 42, 48, 54, 58, 62, 64, 67, 69, 71, 75, 80, 84, 88, 93, 96], [
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Burning hands", "id": "scroll-of-burning-hands"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Cause fear", "id": "scroll-of-cause-fear"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Charm person", "id": "scroll-of-charm-person"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Chill touch", "id": "scroll-of-chill-touch"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Disguise self", "id": "scroll-of-disguise-self"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Endure elements", "id": "scroll-of-endure-elements"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Enlarge person", "id": "scroll-of-enlarge-person"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Expeditious retreat", "id": "scroll-of-expeditious-retreat"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Grease", "id": "scroll-of-grease"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Hypnotism", "id": "scroll-of-hypnotism"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Identify", "id": "scroll-of-identify"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Mage armor", "id": "scroll-of-mage-armor"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Magic missile", "id": "scroll-of-magic-missile"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Magic weapon", "id": "scroll-of-magic-weapon"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Obscuring mist", "id": "scroll-of-obscuring-mist"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Protection from chaos", "id": "scroll-of-protection-from-chaos"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Protection from evil", "id": "scroll-of-protection-from-evil"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Protection from good", "id": "scroll-of-protection-from-good"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Protection from law", "id": "scroll-of-protection-from-law"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Ray of enfeeblement", "id": "scroll-of-ray-of-enfeeblement"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Shield", "id": "scroll-of-shield"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Shocking grasp", "id": "scroll-of-shocking-grasp"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Silent image", "id": "scroll-of-silent-image"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Sleep", "id": "scroll-of-sleep"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster I", "id": "scroll-of-summon-monster-i"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of True strike", "id": "scroll-of-true-strike"}
                ]);
            },
            "2": function () {
                return rangeIn100([4, 7, 12, 15, 20, 24, 27, 30, 34, 37, 40, 44, 47, 52, 54, 58, 61, 65, 69, 73, 75, 80, 83, 85, 88, 91, 93, 98], [
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Acid arrow", "id": "scroll-of-acid-arrow"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Alter self", "id": "scroll-of-alter-self"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Bear's endurance", "id": "scroll-of-bear-s-endurance"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Blur", "id": "scroll-of-blur"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Bull's strength", "id": "scroll-of-bull-s-strength"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Cat's grace", "id": "scroll-of-cat-s-grace"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Darkness", "id": "scroll-of-darkness"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Darkvision", "id": "scroll-of-darkvision"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Eagle's splendor", "id": "scroll-of-eagle-s-splendor"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of False life", "id": "scroll-of-false-life"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Flaming sphere", "id": "scroll-of-flaming-sphere"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Fox's cunning", "id": "scroll-of-fox-s-cunning"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Glitterdust", "id": "scroll-of-glitterdust"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Invisibility", "id": "scroll-of-invisibility"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Knock", "id": "scroll-of-knock"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Levitate", "id": "scroll-of-levitate"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Minor image", "id": "scroll-of-minor-image"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Mirror image", "id": "scroll-of-mirror-image"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Owl's wisdom", "id": "scroll-of-owl-s-wisdom"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Resist energy", "id": "scroll-of-resist-energy"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Rope trick", "id": "scroll-of-rope-trick"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Scorching ray", "id": "scroll-of-scorching-ray"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of See invisibility", "id": "scroll-of-see-invisibility"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Shatter", "id": "scroll-of-shatter"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Spider climb", "id": "scroll-of-spider-climb"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster II", "id": "scroll-of-summon-monster-ii"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Summon swarm", "id": "scroll-of-summon-swarm"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Web", "id": "scroll-of-web"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Whispering wind", "id": "scroll-of-whispering-wind"}
                ]);
            },
            "3": function () {
                return rangeIn100([3, 7, 12, 16, 21, 24, 29, 32, 37, 40, 43, 46, 51, 54, 57, 60, 63, 66, 70, 74, 78, 81, 84, 87, 90, 94, 97], [
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Beast shape I", "id": "scroll-of-beast-shape-i"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Blink", "id": "scroll-of-blink"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Dispel magic", "id": "scroll-of-dispel-magic"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Displacement", "id": "scroll-of-displacement"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Fireball", "id": "scroll-of-fireball"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Flame arrow", "id": "scroll-of-flame-arrow"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Fly", "id": "scroll-of-fly"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Gaseous form", "id": "scroll-of-gaseous-form"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Haste", "id": "scroll-of-haste"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Heroism", "id": "scroll-of-heroism"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Hold person", "id": "scroll-of-hold-person"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Invisibility sphere", "id": "scroll-of-invisibility-sphere"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Lightning bolt", "id": "scroll-of-lightning-bolt"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Magic circle against chaos", "id": "scroll-of-magic-circle-against-chaos"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Magic circle against evil", "id": "scroll-of-magic-circle-against-evil"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Magic circle against good", "id": "scroll-of-magic-circle-against-good"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Magic circle against law", "id": "scroll-of-magic-circle-against-law"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Major image", "id": "scroll-of-major-image"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Phantom steed", "id": "scroll-of-phantom-steed"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Protection from energy", "id": "scroll-of-protection-from-energy"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Slow", "id": "scroll-of-slow"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Stinking cloud", "id": "scroll-of-stinking-cloud"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Suggestion", "id": "scroll-of-suggestion"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster III", "id": "scroll-of-summon-monster-iii"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Tiny hut", "id": "scroll-of-tiny-hut"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Tongues", "id": "scroll-of-tongues"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Vampiric touch", "id": "scroll-of-vampiric-touch"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Water breathing", "id": "scroll-of-water-breathing"}
                ]);
            },
            "4": function () {
                return rangeIn100([3, 5, 9, 14, 18, 21, 26, 29, 32, 36, 38, 43, 47, 50, 54, 59, 64, 67, 71, 74, 76, 78, 80, 83, 88, 92, 97], [
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Beast shape II", "id": "scroll-of-beast-shape-ii"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Bestow curse", "id": "scroll-of-bestow-curse"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Black tentacles", "id": "scroll-of-black-tentacles"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Charm monster", "id": "scroll-of-charm-monster"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Confusion", "id": "scroll-of-confusion"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Crushing despair", "id": "scroll-of-crushing-despair"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Dimension door", "id": "scroll-of-dimension-door"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Dimensional anchor", "id": "scroll-of-dimensional-anchor"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Elemental body I", "id": "scroll-of-elemental-body-i"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Enervation", "id": "scroll-of-enervation"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Enlarge person, mass", "id": "scroll-of-enlarge-person-mass"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Fear", "id": "scroll-of-fear"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Fire shield", "id": "scroll-of-fire-shield"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Globe of invulnerability, lesser", "id": "scroll-of-globe-of-invulnerability-lesser"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Ice storm", "id": "scroll-of-ice-storm"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Invisibility, greater", "id": "scroll-of-invisibility-greater"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Phantasmal killer", "id": "scroll-of-phantasmal-killer"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Resilient sphere", "id": "scroll-of-resilient-sphere"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Scrying", "id": "scroll-of-scrying"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Shadow conjuration", "id": "scroll-of-shadow-conjuration"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Shout", "id": "scroll-of-shout"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Solid fog", "id": "scroll-of-solid-fog"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Stone shape", "id": "scroll-of-stone-shape"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster IV", "id": "scroll-of-summon-monster-iv"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Wall of fire", "id": "scroll-of-wall-of-fire"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Wall of ice", "id": "scroll-of-wall-of-ice"},
                    {"Price": 950.0, "PriceUnit": "gp", "Name": "Scroll of Stoneskin", "id": "scroll-of-stoneskin"},
                    {"Price": 1050.0, "PriceUnit": "gp", "Name": "Scroll of Animate dead", "id": "scroll-of-animate-dead"}
                ]);
            },
            "5": function () {
                return rangeIn100([3, 7, 10, 15, 21, 23, 26, 31, 35, 40, 43, 46, 51, 54, 56, 58, 62, 65, 69, 73, 76, 82, 88, 92, 95, 97], [
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Baleful polymorph", "id": "scroll-of-baleful-polymorph"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Beast shape III", "id": "scroll-of-beast-shape-iii"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Break enchantment", "id": "scroll-of-break-enchantment"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Cloudkill", "id": "scroll-of-cloudkill"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Cone of cold", "id": "scroll-of-cone-of-cold"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Contact other plane", "id": "scroll-of-contact-other-plane"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Dismissal", "id": "scroll-of-dismissal"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Dominate person", "id": "scroll-of-dominate-person"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Feeblemind", "id": "scroll-of-feeblemind"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Hold monster", "id": "scroll-of-hold-monster"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Magic jar", "id": "scroll-of-magic-jar"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Mind fog", "id": "scroll-of-mind-fog"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Overland flight", "id": "scroll-of-overland-flight"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Passwall", "id": "scroll-of-passwall"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Permanency", "id": "scroll-of-permanency"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Planar binding, lesser", "id": "scroll-of-planar-binding-lesser"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Polymorph", "id": "scroll-of-polymorph"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Sending", "id": "scroll-of-sending"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Shadow evocation", "id": "scroll-of-shadow-evocation"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster V", "id": "scroll-of-summon-monster-v"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Telekinesis", "id": "scroll-of-telekinesis"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Teleport", "id": "scroll-of-teleport"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Wall of force", "id": "scroll-of-wall-of-force"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Wall of stone", "id": "scroll-of-wall-of-stone"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Waves of fatigue", "id": "scroll-of-waves-of-fatigue"},
                    {"Price": 2125.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of pain", "id": "scroll-of-symbol-of-pain"},
                    {"Price": 2125.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of sleep", "id": "scroll-of-symbol-of-sleep"}
                ]);
            },
            "6": function () {
                return rangeIn100([3, 7, 10, 13, 16, 19, 25, 31, 37, 40, 42, 47, 50, 53, 56, 59, 62, 65, 67, 70, 72, 76, 79, 82, 84, 87, 89, 92, 96, 98], [
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Acid fog", "id": "scroll-of-acid-fog"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Antimagic field", "id": "scroll-of-antimagic-field"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Bear's endurance, mass", "id": "scroll-of-bear-s-endurance-mass"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Beast shape IV", "id": "scroll-of-beast-shape-iv"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Bull's strength, mass", "id": "scroll-of-bull-s-strength-mass"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Cat's grace, mass", "id": "scroll-of-cat-s-grace-mass"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Chain lightning", "id": "scroll-of-chain-lightning"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Disintegrate", "id": "scroll-of-disintegrate"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Dispel magic, greater", "id": "scroll-of-dispel-magic-greater"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Eagle's splendor, mass", "id": "scroll-of-eagle-s-splendor-mass"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Eyebite", "id": "scroll-of-eyebite"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Flesh to stone", "id": "scroll-of-flesh-to-stone"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Form of the dragon I", "id": "scroll-of-form-of-the-dragon-i"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Fox's cunning, mass", "id": "scroll-of-fox-s-cunning-mass"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Globe of invulnerability", "id": "scroll-of-globe-of-invulnerability"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Heroism, greater", "id": "scroll-of-heroism-greater"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Mislead", "id": "scroll-of-mislead"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Owl's wisdom, mass", "id": "scroll-of-owl-s-wisdom-mass"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Planar binding", "id": "scroll-of-planar-binding"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Shadow walk", "id": "scroll-of-shadow-walk"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Stone to flesh", "id": "scroll-of-stone-to-flesh"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Suggestion, mass", "id": "scroll-of-suggestion-mass"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster VI", "id": "scroll-of-summon-monster-vi"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Transformation", "id": "scroll-of-transformation"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Veil", "id": "scroll-of-veil"},
                    {"Price": 1700.0, "PriceUnit": "gp", "Name": "Scroll of Wall of iron", "id": "scroll-of-wall-of-iron"},
                    {"Price": 1750.0, "PriceUnit": "gp", "Name": "Scroll of Create undead", "id": "scroll-of-create-undead"},
                    {"Price": 1900.0, "PriceUnit": "gp", "Name": "Scroll of Legend lore", "id": "scroll-of-legend-lore"},
                    {"Price": 1900.0, "PriceUnit": "gp", "Name": "Scroll of True seeing", "id": "scroll-of-true-seeing"},
                    {"Price": 2150.0, "PriceUnit": "gp", "Name": "Scroll of Circle of death", "id": "scroll-of-circle-of-death"},
                    {"Price": 2650.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of fear", "id": "scroll-of-symbol-of-fear"}
                ]);
            },
            "7": function () {
                return rangeIn100([4, 7, 13, 17, 22, 27, 30, 35, 39, 42, 48, 53, 57, 62, 66, 70, 73, 78, 81, 87, 90, 93, 97], [
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Arcane sight, greater", "id": "scroll-of-arcane-sight-greater"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Banishment", "id": "scroll-of-banishment"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Delayed blast fireball", "id": "scroll-of-delayed-blast-fireball"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Ethereal jaunt", "id": "scroll-of-ethereal-jaunt"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Finger of death", "id": "scroll-of-finger-of-death"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Form of the dragon II", "id": "scroll-of-form-of-the-dragon-ii"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Hold person, mass", "id": "scroll-of-hold-person-mass"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Invisibility, mass", "id": "scroll-of-invisibility-mass"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Mage's sword", "id": "scroll-of-mage-s-sword"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Phase door", "id": "scroll-of-phase-door"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Plane shift", "id": "scroll-of-plane-shift"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Polymorph, greater", "id": "scroll-of-polymorph-greater"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Power word blind", "id": "scroll-of-power-word-blind"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Prismatic spray", "id": "scroll-of-prismatic-spray"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Reverse gravity", "id": "scroll-of-reverse-gravity"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Scrying, greater", "id": "scroll-of-scrying-greater"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Shadow conjuration, greater", "id": "scroll-of-shadow-conjuration-greater"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Spell turning", "id": "scroll-of-spell-turning"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster VII", "id": "scroll-of-summon-monster-vii"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Teleport, greater", "id": "scroll-of-teleport-greater"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Waves of exhaustion", "id": "scroll-of-waves-of-exhaustion"},
                    {"Price": 2280.0, "PriceUnit": "gp", "Name": "Scroll of Project image", "id": "scroll-of-project-image"},
                    {"Price": 2775.0, "PriceUnit": "gp", "Name": "Scroll of Forcecage", "id": "scroll-of-forcecage"},
                    {"Price": 3775.0, "PriceUnit": "gp", "Name": "Scroll of Limited wish", "id": "scroll-of-limited-wish"}
                ]);
            },
            "8": function () {
                return rangeIn100([5, 9, 13, 18, 23, 28, 33, 40, 45, 49, 55, 59, 66, 72, 76, 80, 85, 90, 94, 97], [
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Charm monster, mass", "id": "scroll-of-charm-monster-mass"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Demand", "id": "scroll-of-demand"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Dimensional lock", "id": "scroll-of-dimensional-lock"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Form of the dragon III", "id": "scroll-of-form-of-the-dragon-iii"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Horrid wilting", "id": "scroll-of-horrid-wilting"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Incendiary cloud", "id": "scroll-of-incendiary-cloud"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Irresistible dance", "id": "scroll-of-irresistible-dance"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Maze", "id": "scroll-of-maze"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Mind blank", "id": "scroll-of-mind-blank"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Planar binding, greater", "id": "scroll-of-planar-binding-greater"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Polar ray", "id": "scroll-of-polar-ray"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Polymorph any object", "id": "scroll-of-polymorph-any-object"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Power word stun", "id": "scroll-of-power-word-stun"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Prismatic wall", "id": "scroll-of-prismatic-wall"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Scintillating pattern", "id": "scroll-of-scintillating-pattern"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster VIII", "id": "scroll-of-summon-monster-viii"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Telekinetic sphere", "id": "scroll-of-telekinetic-sphere"},
                    {"Price": 3500.0, "PriceUnit": "gp", "Name": "Scroll of Protection from spells", "id": "scroll-of-protection-from-spells"},
                    {"Price": 8000.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of death", "id": "scroll-of-symbol-of-death"},
                    {"Price": 8000.0, "PriceUnit": "gp", "Name": "Scroll of Temporal stasis", "id": "scroll-of-temporal-stasis"},
                    {"Price": 23000.0, "PriceUnit": "gp", "Name": "Scroll of Trap the soul", "id": "scroll-of-trap-the-soul"}
                ]);
            },
            "9": function () {
                return rangeIn100([6, 11, 16, 23, 28, 33, 39, 47, 55, 61, 66, 71, 79, 85, 90, 96], [
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Dominate monster", "id": "scroll-of-dominate-monster"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Energy drain", "id": "scroll-of-energy-drain"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Freedom", "id": "scroll-of-freedom"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Gate", "id": "scroll-of-gate"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Hold monster, mass", "id": "scroll-of-hold-monster-mass"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Imprisonment", "id": "scroll-of-imprisonment"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Mage's disjunction", "id": "scroll-of-mage-s-disjunction"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Meteor swarm", "id": "scroll-of-meteor-swarm"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Power word kill", "id": "scroll-of-power-word-kill"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Prismatic sphere", "id": "scroll-of-prismatic-sphere"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Shapechange", "id": "scroll-of-shapechange"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster IX", "id": "scroll-of-summon-monster-ix"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Time stop", "id": "scroll-of-time-stop"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Weird", "id": "scroll-of-weird"},
                    {"Price": 4825.0, "PriceUnit": "gp", "Name": "Scroll of Astral projection", "id": "scroll-of-astral-projection"},
                    {"Price": 4825.0, "PriceUnit": "gp", "Name": "Scroll of Teleportation circle", "id": "scroll-of-teleportation-circle"},
                    {"Price": 28825.0, "PriceUnit": "gp", "Name": "Scroll of Wish", "id": "scroll-of-wish"}
                ]);
            }
        },
        divine: {
            "0": function () {
                return rangeIn100([11, 21, 34, 44, 55, 65, 75, 88], [
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Bleed", "id": "scroll-of-bleed-gp"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Create water", "id": "scroll-of-create-water-gp"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Detect magic", "id": "scroll-of-detect-magic-gp"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Know direction", "id": "scroll-of-know-direction-gp"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Light", "id": "scroll-of-light-gp"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Mending", "id": "scroll-of-mending-gp"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Purify food and drink", "id": "scroll-of-purify-food-and-drink-gp"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Read magic", "id": "scroll-of-read-magic-gp"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Stabilize,", "id": "scroll-of-stabilize-gp"}
                ]);
            },
            "1": function () {
                return rangeIn100([4, 10, 15, 19, 22, 28, 30, 32, 34, 36, 39, 45, 48, 52, 57, 61, 65, 68, 71, 74, 77, 80, 84, 88, 94, 97], [
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Bane", "id": "scroll-of-bane"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Bless", "id": "scroll-of-bless"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Cause fear", "id": "scroll-of-cause-fear"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Command", "id": "scroll-of-command"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Comprehend languages", "id": "scroll-of-comprehend-languages"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Cure light wounds", "id": "scroll-of-cure-light-wounds"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Detect chaos", "id": "scroll-of-detect-chaos"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Detect evil", "id": "scroll-of-detect-evil"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Detect good", "id": "scroll-of-detect-good"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Detect law", "id": "scroll-of-detect-law"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Detect undead", "id": "scroll-of-detect-undead"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Divine favor", "id": "scroll-of-divine-favor"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Doom", "id": "scroll-of-doom"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Entangle", "id": "scroll-of-entangle"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Inflict light wounds", "id": "scroll-of-inflict-light-wounds"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Magic fang", "id": "scroll-of-magic-fang"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Obscuring mist", "id": "scroll-of-obscuring-mist"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Produce flame", "id": "scroll-of-produce-flame"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Protection from chaos", "id": "scroll-of-protection-from-chaos"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Protection from evil", "id": "scroll-of-protection-from-evil"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Protection from good", "id": "scroll-of-protection-from-good"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Protection from law", "id": "scroll-of-protection-from-law"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Remove fear", "id": "scroll-of-remove-fear"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Sanctuary", "id": "scroll-of-sanctuary"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Shield of faith", "id": "scroll-of-shield-of-faith"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster I", "id": "scroll-of-summon-monster-i"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Summon nature's ally I", "id": "scroll-of-summon-nature-s-ally-i"}
                ]);
            },
            "2": function () {
                return rangeIn100([4, 6, 8, 13, 16, 19, 22, 24, 30, 33, 36, 39, 41, 44, 46, 50, 52, 56, 60, 63, 65, 68, 73, 77, 81, 85, 89, 91, 93, 95, 97], [
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Aid", "id": "scroll-of-aid"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Align weapon", "id": "scroll-of-align-weapon"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Animal messenger", "id": "scroll-of-animal-messenger"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Barkskin", "id": "scroll-of-barkskin"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Bear's endurance", "id": "scroll-of-bear-s-endurance"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Bull's strength", "id": "scroll-of-bull-s-strength"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Cat's grace", "id": "scroll-of-cat-s-grace"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Chill metal", "id": "scroll-of-chill-metal"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Cure moderate wounds", "id": "scroll-of-cure-moderate-wounds"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Darkness", "id": "scroll-of-darkness"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Delay poison", "id": "scroll-of-delay-poison"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Eagle's splendor", "id": "scroll-of-eagle-s-splendor"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Find traps", "id": "scroll-of-find-traps"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Flame blade", "id": "scroll-of-flame-blade"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Fog cloud", "id": "scroll-of-fog-cloud"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Heat metal", "id": "scroll-of-heat-metal"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Hold animal", "id": "scroll-of-hold-animal"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Hold person", "id": "scroll-of-hold-person"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Inflict moderate wounds", "id": "scroll-of-inflict-moderate-wounds"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Owl's wisdom", "id": "scroll-of-owl-s-wisdom"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Remove paralysis", "id": "scroll-of-remove-paralysis"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Resist energy", "id": "scroll-of-resist-energy"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Restoration, lesser", "id": "scroll-of-restoration-lesser"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Shield other", "id": "scroll-of-shield-other"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Silence", "id": "scroll-of-silence"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Sound burst", "id": "scroll-of-sound-burst"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Spiritual weapon", "id": "scroll-of-spiritual-weapon"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster II", "id": "scroll-of-summon-monster-ii"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Summon nature's ally II", "id": "scroll-of-summon-nature-s-ally-ii"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Summon swarm", "id": "scroll-of-summon-swarm"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Zone of truth", "id": "scroll-of-zone-of-truth"},
                    {"Price": 175.0, "PriceUnit": "gp", "Name": "Scroll of Augury", "id": "scroll-of-augury"}
                ]);
            },
            "3": function () {
                return rangeIn100([3, 8, 15, 19, 23, 28, 33, 37, 40, 42, 44, 46, 48, 52, 57, 59, 65, 68, 70, 73, 76, 79, 81, 85, 87, 89, 91, 95, 97], [
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Bestow curse", "id": "scroll-of-bestow-curse"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Call lightning", "id": "scroll-of-call-lightning"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Cure serious wounds", "id": "scroll-of-cure-serious-wounds"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Daylight", "id": "scroll-of-daylight"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Deeper darkness", "id": "scroll-of-deeper-darkness"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Dispel magic", "id": "scroll-of-dispel-magic"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Inflict serious wounds", "id": "scroll-of-inflict-serious-wounds"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Invisibility purge", "id": "scroll-of-invisibility-purge"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Locate object", "id": "scroll-of-locate-object"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Magic circle against chaos", "id": "scroll-of-magic-circle-against-chaos"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Magic circle against evil", "id": "scroll-of-magic-circle-against-evil"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Magic circle against good", "id": "scroll-of-magic-circle-against-good"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Magic circle against law", "id": "scroll-of-magic-circle-against-law"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Magic fang, greater", "id": "scroll-of-magic-fang-greater"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Magic vestment", "id": "scroll-of-magic-vestment"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Poison", "id": "scroll-of-poison"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Prayer", "id": "scroll-of-prayer"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Protection from energy", "id": "scroll-of-protection-from-energy"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Remove blindness/deafness", "id": "scroll-of-remove-blindness-deafness"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Remove curse", "id": "scroll-of-remove-curse"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Remove disease", "id": "scroll-of-remove-disease"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Searing light", "id": "scroll-of-searing-light"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Sleet storm", "id": "scroll-of-sleet-storm"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Speak with dead", "id": "scroll-of-speak-with-dead"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Stone shape", "id": "scroll-of-stone-shape"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster III", "id": "scroll-of-summon-monster-iii"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Summon nature's ally III", "id": "scroll-of-summon-nature-s-ally-iii"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Water breathing", "id": "scroll-of-water-breathing"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Water walk", "id": "scroll-of-water-walk"},
                    {"Price": 625.0, "PriceUnit": "gp", "Name": "Scroll of Animate dead", "id": "scroll-of-animate-dead"}
                ]);
            },
            "4": function () {
                return rangeIn100([4, 7, 15, 19, 22, 25, 28, 33, 39, 43, 46, 51, 56, 61, 64, 68, 73, 77, 80, 83, 86, 89, 93, 96], [
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Air walk", "id": "scroll-of-air-walk"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Chaos hammer", "id": "scroll-of-chaos-hammer"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Cure critical wounds", "id": "scroll-of-cure-critical-wounds"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Death ward", "id": "scroll-of-death-ward"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Dimensional anchor", "id": "scroll-of-dimensional-anchor"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Discern lies", "id": "scroll-of-discern-lies"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Dismissal", "id": "scroll-of-dismissal"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Divine power", "id": "scroll-of-divine-power"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Flame strike", "id": "scroll-of-flame-strike"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Freedom of movement", "id": "scroll-of-freedom-of-movement"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Holy smite", "id": "scroll-of-holy-smite"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Inflict critical wounds", "id": "scroll-of-inflict-critical-wounds"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Magic weapon, greater", "id": "scroll-of-magic-weapon-greater"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Neutralize poison", "id": "scroll-of-neutralize-poison"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Order's wrath", "id": "scroll-of-order-s-wrath"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Poison", "id": "scroll-of-poison"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Spell immunity", "id": "scroll-of-spell-immunity"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Spike stones", "id": "scroll-of-spike-stones"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster IV", "id": "scroll-of-summon-monster-iv"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Summon nature's ally IV", "id": "scroll-of-summon-nature-s-ally-iv"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Tongues", "id": "scroll-of-tongues"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Unholy blight", "id": "scroll-of-unholy-blight"},
                    {"Price": 725.0, "PriceUnit": "gp", "Name": "Scroll of Divination", "id": "scroll-of-divination"},
                    {"Price": 1200.0, "PriceUnit": "gp", "Name": "Scroll of Planar ally, lesser", "id": "scroll-of-planar-ally-lesser"},
                    {"Price": 1700.0, "PriceUnit": "gp", "Name": "Scroll of Restoration", "id": "scroll-of-restoration"}
                ]);
            },
            "5": function () {
                return rangeIn100([2, 4, 7, 11, 16, 21, 25, 30, 34, 37, 42, 47, 53, 57, 62, 67, 70, 73, 75, 77, 80, 82, 87, 91, 94], [
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Animal growth", "id": "scroll-of-animal-growth"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Atonement", "id": "scroll-of-atonement"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Baleful polymorph", "id": "scroll-of-baleful-polymorph"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Break enchantment", "id": "scroll-of-break-enchantment"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Breath of life", "id": "scroll-of-breath-of-life"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Call lightning storm", "id": "scroll-of-call-lightning-storm"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Command, greater", "id": "scroll-of-command-greater"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Cure light wounds, mass", "id": "scroll-of-cure-light-wounds-mass"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Death ward", "id": "scroll-of-death-ward"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Disrupting weapon", "id": "scroll-of-disrupting-weapon"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Inflict light wounds, mass", "id": "scroll-of-inflict-light-wounds-mass"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Plane shift", "id": "scroll-of-plane-shift"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Righteous might", "id": "scroll-of-righteous-might"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Scrying", "id": "scroll-of-scrying"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Slay living", "id": "scroll-of-slay-living"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Spell resistance", "id": "scroll-of-spell-resistance"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster V", "id": "scroll-of-summon-monster-v"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Summon nature's ally V", "id": "scroll-of-summon-nature-s-ally-v"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Tree stride", "id": "scroll-of-tree-stride"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Wall of fire", "id": "scroll-of-wall-of-fire"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Wall of stone", "id": "scroll-of-wall-of-stone"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Wall of thorns", "id": "scroll-of-wall-of-thorns"},
                    {"Price": 1375.0, "PriceUnit": "gp", "Name": "Scroll of True seeing", "id": "scroll-of-true-seeing"},
                    {"Price": 1625.0, "PriceUnit": "gp", "Name": "Scroll of Commune", "id": "scroll-of-commune"},
                    {"Price": 3125.0, "PriceUnit": "gp", "Name": "Scroll of Awaken", "id": "scroll-of-awaken"},
                    {"Price": 6125.0, "PriceUnit": "gp", "Name": "Scroll of Raise dead", "id": "scroll-of-raise-dead"}
                ]);
            },
            "6": function () {
                return rangeIn100([5, 11, 16, 21, 27, 32, 37, 43, 47, 55, 63, 69, 74, 78, 83, 87, 91, 96], [
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Bear's endurance, mass", "id": "scroll-of-bear-s-endurance-mass"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Blade barrier", "id": "scroll-of-blade-barrier"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Bull's strength, mass", "id": "scroll-of-bull-s-strength-mass"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Cat's grace, mass", "id": "scroll-of-cat-s-grace-mass"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Cure moderate wounds, mass", "id": "scroll-of-cure-moderate-wounds-mass"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Dispel magic, greater", "id": "scroll-of-dispel-magic-greater"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Eagle's splendor, mass", "id": "scroll-of-eagle-s-splendor-mass"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Find the path", "id": "scroll-of-find-the-path"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Fire seeds", "id": "scroll-of-fire-seeds"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Harm", "id": "scroll-of-harm"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Heal", "id": "scroll-of-heal"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Heroes' feast", "id": "scroll-of-heroes-feast"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Inflict moderate wounds, mass", "id": "scroll-of-inflict-moderate-wounds-mass"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Liveoak", "id": "scroll-of-liveoak"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Owl's wisdom, mass", "id": "scroll-of-owl-s-wisdom-mass"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster VI", "id": "scroll-of-summon-monster-vi"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Summon nature's ally VI", "id": "scroll-of-summon-nature-s-ally-vi"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Word of recall", "id": "scroll-of-word-of-recall"},
                    {"Price": 2900.0, "PriceUnit": "gp", "Name": "Scroll of Planar ally", "id": "scroll-of-planar-ally"}
                ]);
            },
            "7": function () {
                return rangeIn100([4, 10, 17, 24, 28, 33, 40, 44, 50, 55, 60, 65, 69, 73, 78, 82, 89, 94], [
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Blasphemy", "id": "scroll-of-blasphemy"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Control weather", "id": "scroll-of-control-weather"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Creeping doom", "id": "scroll-of-creeping-doom"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Cure serious wounds, mass", "id": "scroll-of-cure-serious-wounds-mass"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Dictum", "id": "scroll-of-dictum"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Ethereal jaunt", "id": "scroll-of-ethereal-jaunt"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Fire storm", "id": "scroll-of-fire-storm"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Holy word", "id": "scroll-of-holy-word"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Inflict serious wounds, mass", "id": "scroll-of-inflict-serious-wounds-mass"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Regenerate", "id": "scroll-of-regenerate"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Repulsion", "id": "scroll-of-repulsion"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Scrying, greater", "id": "scroll-of-scrying-greater"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster VII", "id": "scroll-of-summon-monster-vii"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Summon nature's ally VII", "id": "scroll-of-summon-nature-s-ally-vii"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Sunbeam", "id": "scroll-of-sunbeam"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Word of chaos", "id": "scroll-of-word-of-chaos"},
                    {"Price": 2775.0, "PriceUnit": "gp", "Name": "Scroll of Destruction", "id": "scroll-of-destruction"},
                    {"Price": 7275.0, "PriceUnit": "gp", "Name": "Scroll of Restoration, greater", "id": "scroll-of-restoration-greater"},
                    {"Price": 12275.0, "PriceUnit": "gp", "Name": "Scroll of Resurrection", "id": "scroll-of-resurrection"}
                ]);
            },
            "8": function () {
                return rangeIn100([8, 14, 23, 31, 38, 44, 51, 59, 65, 73, 78, 83, 89, 95], [
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Antimagic field", "id": "scroll-of-antimagic-field"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Cloak of chaos", "id": "scroll-of-cloak-of-chaos"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Cure critical wounds, mass", "id": "scroll-of-cure-critical-wounds-mass"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Earthquake", "id": "scroll-of-earthquake"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Finger of death", "id": "scroll-of-finger-of-death"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Holy aura", "id": "scroll-of-holy-aura"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Inflict critical wounds, mass", "id": "scroll-of-inflict-critical-wounds-mass"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Reverse gravity", "id": "scroll-of-reverse-gravity"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Shield of law", "id": "scroll-of-shield-of-law"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Spell immunity, greater", "id": "scroll-of-spell-immunity-greater"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster VIII", "id": "scroll-of-summon-monster-viii"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Summon nature's ally VIII", "id": "scroll-of-summon-nature-s-ally-viii"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Sunburst", "id": "scroll-of-sunburst"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Unholy aura", "id": "scroll-of-unholy-aura"},
                    {"Price": 5500.0, "PriceUnit": "gp", "Name": "Scroll of Planar ally, greater", "id": "scroll-of-planar-ally-greater"}
                ]);
            },
            "9": function () {
                return rangeIn100([7, 15, 22, 30, 40, 48, 58, 65, 73, 81, 87, 93], [
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Elemental swarm", "id": "scroll-of-elemental-swarm"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Energy drain", "id": "scroll-of-energy-drain"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Etherealness", "id": "scroll-of-etherealness"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Gate", "id": "scroll-of-gate"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Heal, mass", "id": "scroll-of-heal-mass"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Implosion", "id": "scroll-of-implosion"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Miracle", "id": "scroll-of-miracle"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Shambler", "id": "scroll-of-shambler"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Shapechange", "id": "scroll-of-shapechange"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Storm of vengeance", "id": "scroll-of-storm-of-vengeance"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Summon monster IX", "id": "scroll-of-summon-monster-ix"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Summon nature's ally IX", "id": "scroll-of-summon-nature-s-ally-ix"},
                    {"Price": 28825.0, "PriceUnit": "gp", "Name": "Scroll of True resurrection", "id": "scroll-of-true-resurrection"}
                ]);
            }
        }
    },
    uncommon: {
        arcane: {
            "0": function () {
                return rangeIn100([7, 17, 25, 35, 42, 51, 61, 68, 75, 83, 92], [
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Arcane mark", "id": "scroll-of-arcane-mark"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Bleed", "id": "scroll-of-bleed"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Dancing lights", "id": "scroll-of-dancing-lights"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Detect poison", "id": "scroll-of-detect-poison"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Disrupt undead", "id": "scroll-of-disrupt-undead"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Ghost sound", "id": "scroll-of-ghost-sound"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Message", "id": "scroll-of-message"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Open/close", "id": "scroll-of-open-close"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Resistance", "id": "scroll-of-resistance"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Sift", "id": "scroll-of-sift"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Spark", "id": "scroll-of-spark"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Unwitting ally", "id": "scroll-of-unwitting-ally"}
                ]);
            },
            "1": function () {
                return rangeIn100([2, 6, 8, 12, 15, 18, 23, 26, 30, 33, 36, 38, 40, 43, 46, 48, 51, 54, 58, 60, 63, 66, 69, 71, 74, 77, 80, 84, 88, 91, 96, 98], [
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Air bubble", "id": "scroll-of-air-bubble"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Alarm", "id": "scroll-of-alarm"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Animate rope", "id": "scroll-of-animate-rope"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Ant haul", "id": "scroll-of-ant-haul"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Blend", "id": "scroll-of-blend"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Break", "id": "scroll-of-break"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Color spray", "id": "scroll-of-color-spray"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Comprehend languages", "id": "scroll-of-comprehend-languages"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Corrosive touch", "id": "scroll-of-corrosive-touch"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Detect secret doors", "id": "scroll-of-detect-secret-doors"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Detect undead", "id": "scroll-of-detect-undead"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Erase", "id": "scroll-of-erase"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Flare burst", "id": "scroll-of-flare-burst"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Floating disk", "id": "scroll-of-floating-disk"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Hold portal", "id": "scroll-of-hold-portal"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Hydraulic push", "id": "scroll-of-hydraulic-push"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Icicle dagger", "id": "scroll-of-icicle-dagger"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Illusion of calm", "id": "scroll-of-illusion-of-calm"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Jump", "id": "scroll-of-jump"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Magic aura", "id": "scroll-of-magic-aura"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Mirror strike", "id": "scroll-of-mirror-strike"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Mount", "id": "scroll-of-mount"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Ray of sickening", "id": "scroll-of-ray-of-sickening"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Reduce person", "id": "scroll-of-reduce-person"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Shadow weapon", "id": "scroll-of-shadow-weapon"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Shock shield", "id": "scroll-of-shock-shield"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Stone fist", "id": "scroll-of-stone-fist"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Touch of the sea", "id": "scroll-of-touch-of-the-sea"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Unseen servant", "id": "scroll-of-unseen-servant"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Urban grace", "id": "scroll-of-urban-grace"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Vanish", "id": "scroll-of-vanish"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Ventriloquism", "id": "scroll-of-ventriloquism"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Voice alteration", "id": "scroll-of-voice-alteration"}
                ]);
            },
            "2": function () {
                return rangeIn100([3, 6, 9, 12, 14, 16, 20, 23, 27, 31, 34, 38, 40, 41, 44, 47, 51, 54, 57, 60, 62, 63, 65, 67, 70, 73, 77, 80, 83, 85, 88, 90, 93, 94, 96, 97, 99], [
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Bestow weapon proficiency", "id": "scroll-of-bestow-weapon-proficiency"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Blindness/deafness", "id": "scroll-of-blindness-deafness"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Burning gaze", "id": "scroll-of-burning-gaze"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Certain grip", "id": "scroll-of-certain-grip"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Command undead", "id": "scroll-of-command-undead"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Create pit", "id": "scroll-of-create-pit"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Daze monster", "id": "scroll-of-daze-monster"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Detect thoughts", "id": "scroll-of-detect-thoughts"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Disguise other", "id": "scroll-of-disguise-other"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Elemental touch", "id": "scroll-of-elemental-touch"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Fire breath", "id": "scroll-of-fire-breath"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Fog cloud", "id": "scroll-of-fog-cloud"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Ghoul touch", "id": "scroll-of-ghoul-touch"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Glide", "id": "scroll-of-glide"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Gust of wind", "id": "scroll-of-gust-of-wind"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Haunting mists", "id": "scroll-of-haunting-mists"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Hideous laughter", "id": "scroll-of-hideous-laughter"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Hypnotic pattern", "id": "scroll-of-hypnotic-pattern"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Locate object", "id": "scroll-of-locate-object"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Make whole", "id": "scroll-of-make-whole"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Misdirection", "id": "scroll-of-misdirection"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Obscure object", "id": "scroll-of-obscure-object"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Pernicious poison", "id": "scroll-of-pernicious-poison"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Protection from arrows", "id": "scroll-of-protection-from-arrows"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Pyrotechnics", "id": "scroll-of-pyrotechnics"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Returning weapon", "id": "scroll-of-returning-weapon"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Scare", "id": "scroll-of-scare"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Shadow anchor", "id": "scroll-of-shadow-anchor"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Share memory", "id": "scroll-of-share-memory"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Slipstream", "id": "scroll-of-slipstream"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Spectral hand", "id": "scroll-of-spectral-hand"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Spontaneous immolation", "id": "scroll-of-spontaneous-immolation"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Touch of idiocy", "id": "scroll-of-touch-of-idiocy"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Unshakable chill", "id": "scroll-of-unshakable-chill"},
                    {"Price": 160.0, "PriceUnit": "gp", "Name": "Scroll of Magic mouth", "id": "scroll-of-magic-mouth"},
                    {"Price": 175.0, "PriceUnit": "gp", "Name": "Scroll of Arcane lock", "id": "scroll-of-arcane-lock"},
                    {"Price": 200.0, "PriceUnit": "gp", "Name": "Scroll of Continual flame", "id": "scroll-of-continual-flame"},
                    {"Price": 200.0, "PriceUnit": "gp", "Name": "Scroll of Phantom trap", "id": "scroll-of-phantom-trap"}
                ]);
            },
            "3": function () {
                return rangeIn100([3, 6, 8, 12, 15, 17, 20, 24, 27, 30, 35, 38, 43, 45, 47, 49, 51, 56, 61, 65, 68, 70, 73, 75, 78, 80, 83, 86, 90, 92, 95, 96, 99], [
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Animate dead, lesser", "id": "scroll-of-animate-dead-lesser"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Aqueous orb", "id": "scroll-of-aqueous-orb"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Arcane sight", "id": "scroll-of-arcane-sight"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Beast shape", "id": "scroll-of-beast-shape"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Clairaudience/clairvoyance", "id": "scroll-of-clairaudience-clairvoyance"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Cloak of winds", "id": "scroll-of-cloak-of-winds"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Daylight", "id": "scroll-of-daylight"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Deep slumber", "id": "scroll-of-deep-slumber"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Distracting cacophony", "id": "scroll-of-distracting-cacophony"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Draconic reservoir", "id": "scroll-of-draconic-reservoir"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Elemental aura", "id": "scroll-of-elemental-aura"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Explosive runes", "id": "scroll-of-explosive-runes"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Force punch", "id": "scroll-of-force-punch"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Gentle repose", "id": "scroll-of-gentle-repose"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Halt undead", "id": "scroll-of-halt-undead"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Healing thief", "id": "scroll-of-healing-thief"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Hydraulic torrent", "id": "scroll-of-hydraulic-torrent"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Keen edge", "id": "scroll-of-keen-edge"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Magic weapon, greater", "id": "scroll-of-magic-weapon-greater"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Monstrous physique I", "id": "scroll-of-monstrous-physique-i"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Rage", "id": "scroll-of-rage"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Ray of exhaustion", "id": "scroll-of-ray-of-exhaustion"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Resinous skin", "id": "scroll-of-resinous-skin"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Resist energy, communal", "id": "scroll-of-resist-energy-communal"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Secret page", "id": "scroll-of-secret-page"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Shrink item", "id": "scroll-of-shrink-item"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Sleet storm", "id": "scroll-of-sleet-storm"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Spiked pit", "id": "scroll-of-spiked-pit"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Undead anatomy I", "id": "scroll-of-undead-anatomy-i"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Versatile weapon", "id": "scroll-of-versatile-weapon"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Wind wall", "id": "scroll-of-wind-wall"},
                    {"Price": 425.0, "PriceUnit": "gp", "Name": "Scroll of Illusory script", "id": "scroll-of-illusory-script"},
                    {"Price": 425.0, "PriceUnit": "gp", "Name": "Scroll of Nondetection", "id": "scroll-of-nondetection"},
                    {"Price": 875.0, "PriceUnit": "gp", "Name": "Scroll of Sepia snake sigil", "id": "scroll-of-sepia-snake-sigil"}
                ]);
            },
            "4": function () {
                return rangeIn100([2, 6, 10, 13, 17, 19, 23, 28, 32, 35, 39, 41, 43, 46, 50, 54, 57, 59, 62, 64, 68, 71, 74, 79, 83, 85, 89, 94, 97, 99], [
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Acid pit", "id": "scroll-of-acid-pit"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Arcane eye", "id": "scroll-of-arcane-eye"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Ball lightning", "id": "scroll-of-ball-lightning"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Contagion", "id": "scroll-of-contagion"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Darkvision, greater", "id": "scroll-of-darkvision-greater"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Detect scrying", "id": "scroll-of-detect-scrying"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Dragon's breath", "id": "scroll-of-dragon-s-breath"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of False life, greater", "id": "scroll-of-false-life-greater"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Firefall", "id": "scroll-of-firefall"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Geas, lesser", "id": "scroll-of-geas-lesser"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Ghost wolf", "id": "scroll-of-ghost-wolf"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Hallucinatory terrain", "id": "scroll-of-hallucinatory-terrain"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Illusory wall", "id": "scroll-of-illusory-wall"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Locate creature", "id": "scroll-of-locate-creature"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Minor creation", "id": "scroll-of-minor-creation"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Monstrous physique II", "id": "scroll-of-monstrous-physique-ii"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Obsidian flow", "id": "scroll-of-obsidian-flow"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Phantom chariot", "id": "scroll-of-phantom-chariot"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Rainbow pattern", "id": "scroll-of-rainbow-pattern"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Reduce person, mass", "id": "scroll-of-reduce-person-mass"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Remove curse", "id": "scroll-of-remove-curse"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Secure shelter", "id": "scroll-of-secure-shelter"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Shadow projection", "id": "scroll-of-shadow-projection"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Shocking image", "id": "scroll-of-shocking-image"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Telekinetic charge", "id": "scroll-of-telekinetic-charge"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of True form", "id": "scroll-of-true-form"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Vermin shape I", "id": "scroll-of-vermin-shape-i"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Volcanic storm", "id": "scroll-of-volcanic-storm"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Wandering star motes", "id": "scroll-of-wandering-star-motes"},
                    {"Price": 725.0, "PriceUnit": "gp", "Name": "Scroll of Fire trap", "id": "scroll-of-fire-trap"},
                    {"Price": 750.0, "PriceUnit": "gp", "Name": "Scroll of Mnemonic enhancer", "id": "scroll-of-mnemonic-enhancer"}
                ]);
            },
            "5": function () {
                return rangeIn100([2, 4, 6, 9, 13, 15, 19, 22, 25, 29, 33, 36, 38, 40, 43, 46, 50, 54, 56, 60, 64, 68, 70, 73, 76, 79, 82, 84, 86, 90, 94, 98], [
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Absorb toxicity", "id": "scroll-of-absorb-toxicity"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Animal growth", "id": "scroll-of-animal-growth"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Blight", "id": "scroll-of-blight"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Dream", "id": "scroll-of-dream"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Elemental body II", "id": "scroll-of-elemental-body-ii"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Fabricate", "id": "scroll-of-fabricate"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Fire snake", "id": "scroll-of-fire-snake"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Hostile juxtaposition", "id": "scroll-of-hostile-juxtaposition"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Hungry pit", "id": "scroll-of-hungry-pit"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Icy prison", "id": "scroll-of-icy-prison"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Interposing hand", "id": "scroll-of-interposing-hand"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Life bubble", "id": "scroll-of-life-bubble"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Mage's faithful hound", "id": "scroll-of-mage-s-faithful-hound"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Mage's private sanctum", "id": "scroll-of-mage-s-private-sanctum"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Major creation", "id": "scroll-of-major-creation"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Mirage arcana", "id": "scroll-of-mirage-arcana"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Monstrous physique III", "id": "scroll-of-monstrous-physique-iii"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Nightmare", "id": "scroll-of-nightmare"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Persistent image", "id": "scroll-of-persistent-image"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Planar adaptation", "id": "scroll-of-planar-adaptation"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Plant shape I", "id": "scroll-of-plant-shape-i"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Prying eyes", "id": "scroll-of-prying-eyes"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Secret chest", "id": "scroll-of-secret-chest"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Seeming", "id": "scroll-of-seeming"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Sonic thrust", "id": "scroll-of-sonic-thrust"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Suffocation", "id": "scroll-of-suffocation"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Telepathic bond", "id": "scroll-of-telepathic-bond"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Transmute mud to rock", "id": "scroll-of-transmute-mud-to-rock"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Transmute rock to mud", "id": "scroll-of-transmute-rock-to-mud"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Undead anatomy II", "id": "scroll-of-undead-anatomy-ii"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Vermin form II", "id": "scroll-of-vermin-form-ii"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Wind blades", "id": "scroll-of-wind-blades"},
                    {"Price": 1375.0, "PriceUnit": "gp", "Name": "Scroll of False vision", "id": "scroll-of-false-vision"}
                ]);
            },
            "6": function () {
                return rangeIn100([4, 8, 12, 15, 20, 26, 30, 35, 39, 45, 48, 53, 57, 59, 61, 66, 68, 71, 76, 80, 84, 87, 92, 95, 98], [
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Analyze dweomer", "id": "scroll-of-analyze-dweomer"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Battlemind link", "id": "scroll-of-battlemind-link"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Cloak of dreams", "id": "scroll-of-cloak-of-dreams"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Contagion, greater", "id": "scroll-of-contagion-greater"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Contagious flame", "id": "scroll-of-contagious-flame"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Contingency", "id": "scroll-of-contingency"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Control water", "id": "scroll-of-control-water"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Elemental body III", "id": "scroll-of-elemental-body-iii"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Fluid form", "id": "scroll-of-fluid-form"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Forceful hand", "id": "scroll-of-forceful-hand"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Freezing sphere", "id": "scroll-of-freezing-sphere"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Geas/quest", "id": "scroll-of-geas-quest"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Getaway", "id": "scroll-of-getaway"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Guards and wards", "id": "scroll-of-guards-and-wards"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Mage's lucubration", "id": "scroll-of-mage-s-lucubration"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Monstrous physique IV", "id": "scroll-of-monstrous-physique-iv"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Move earth", "id": "scroll-of-move-earth"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Permanent image", "id": "scroll-of-permanent-image"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Plant shape II", "id": "scroll-of-plant-shape-ii"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Repulsion", "id": "scroll-of-repulsion"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Sirocco", "id": "scroll-of-sirocco"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Tar pool", "id": "scroll-of-tar-pool"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Undead anatomy III", "id": "scroll-of-undead-anatomy-iii"},
                    {"Price": 1675.0, "PriceUnit": "gp", "Name": "Scroll of Programmed image", "id": "scroll-of-programmed-image"},
                    {"Price": 2150.0, "PriceUnit": "gp", "Name": "Scroll of Undeath to death", "id": "scroll-of-undeath-to-death"},
                    {"Price": 6650.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of persuasion", "id": "scroll-of-symbol-of-persuasion"}
                ]);
            },
            "7": function () {
                return rangeIn100([3, 7, 10, 14, 19, 23, 29, 34, 40, 44, 49, 53, 56, 61, 65, 70, 74, 78, 81, 84, 88, 91, 93, 96, 98], [
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Control undead", "id": "scroll-of-control-undead"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Control weather", "id": "scroll-of-control-weather"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Create demiplane, lesser", "id": "scroll-of-create-demiplane-lesser"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Deflection", "id": "scroll-of-deflection"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Elemental body IV", "id": "scroll-of-elemental-body-iv"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Firebrand", "id": "scroll-of-firebrand"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Fly, mass", "id": "scroll-of-fly-mass"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Giant form I", "id": "scroll-of-giant-form-i"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Grasping hand", "id": "scroll-of-grasping-hand"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Hostile juxtaposition, greater", "id": "scroll-of-hostile-juxtaposition-greater"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Ice body", "id": "scroll-of-ice-body"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Insanity", "id": "scroll-of-insanity"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Mage's magnificent mansion", "id": "scroll-of-mage-s-magnificent-mansion"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Phantasmal revenge", "id": "scroll-of-phantasmal-revenge"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Plague storm", "id": "scroll-of-plague-storm"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Plant shape III", "id": "scroll-of-plant-shape-iii"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Resonating word", "id": "scroll-of-resonating-word"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Sequester", "id": "scroll-of-sequester"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Statue", "id": "scroll-of-statue"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Teleport object", "id": "scroll-of-teleport-object"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Walk through space", "id": "scroll-of-walk-through-space"},
                    {"Price": 2525.0, "PriceUnit": "gp", "Name": "Scroll of Vision", "id": "scroll-of-vision"},
                    {"Price": 3275.0, "PriceUnit": "gp", "Name": "Scroll of Instant summons", "id": "scroll-of-instant-summons"},
                    {"Price": 7275.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of stunning", "id": "scroll-of-symbol-of-stunning"},
                    {"Price": 7275.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of weakness", "id": "scroll-of-symbol-of-weakness"},
                    {"Price": 8775.0, "PriceUnit": "gp", "Name": "Scroll of Simulacrum", "id": "scroll-of-simulacrum"}
                ]);
            },
            "8": function () {
                return rangeIn100([4, 10, 12, 15, 19, 24, 29, 34, 38, 43, 47, 52, 56, 62, 66, 72, 76, 81, 87, 91, 95, 98], [
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Antipathy", "id": "scroll-of-antipathy"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Clenched fist", "id": "scroll-of-clenched-fist"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Clone", "id": "scroll-of-clone"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Create demiplane", "id": "scroll-of-create-demiplane"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Discern location", "id": "scroll-of-discern-location"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Euphoric tranquility", "id": "scroll-of-euphoric-tranquility"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Frightful aspect", "id": "scroll-of-frightful-aspect"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Giant form II", "id": "scroll-of-giant-form-ii"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Iron body", "id": "scroll-of-iron-body"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Moment of prescience", "id": "scroll-of-moment-of-prescience"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Orb of the void", "id": "scroll-of-orb-of-the-void"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Pyrying eyes, greater", "id": "scroll-of-pyrying-eyes-greater"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Screen", "id": "scroll-of-screen"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Shadow evocation, greater", "id": "scroll-of-shadow-evocation-greater"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Shout, greater", "id": "scroll-of-shout-greater"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Stormbolts", "id": "scroll-of-stormbolts"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Sunburst", "id": "scroll-of-sunburst"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Undead anatomy IV", "id": "scroll-of-undead-anatomy-iv"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Wall of lava", "id": "scroll-of-wall-of-lava"},
                    {"Price": 3150.0, "PriceUnit": "gp", "Name": "Scroll of Create greater undead", "id": "scroll-of-create-greater-undead"},
                    {"Price": 4500.0, "PriceUnit": "gp", "Name": "Scroll of Sympathy", "id": "scroll-of-sympathy"},
                    {"Price": 8000.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of insanity", "id": "scroll-of-symbol-of-insanity"},
                    {"Price": 13000.0, "PriceUnit": "gp", "Name": "Scroll of Binding (chaining)", "id": "scroll-of-binding-chaining"}
                ]);
            },
            "9": function () {
                return rangeIn100([6, 15, 23, 31, 38, 44, 50, 57, 65, 72, 79, 88, 95], [
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Create demiplane, greater", "id": "scroll-of-create-demiplane-greater"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Crushing hand", "id": "scroll-of-crushing-hand"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Etherealness", "id": "scroll-of-etherealness"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Fiery body", "id": "scroll-of-fiery-body"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Foresight", "id": "scroll-of-foresight"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Heroic invocation", "id": "scroll-of-heroic-invocation"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Icy prison, mass", "id": "scroll-of-icy-prison-mass"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Ride the lightning", "id": "scroll-of-ride-the-lightning"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Shades", "id": "scroll-of-shades"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Soul bind", "id": "scroll-of-soul-bind"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Tsunami", "id": "scroll-of-tsunami"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Wail of the banshee", "id": "scroll-of-wail-of-the-banshee"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Winds of vengeance", "id": "scroll-of-winds-of-vengeance"},
                    {"Price": 4325.0, "PriceUnit": "gp", "Name": "Scroll of Refuge", "id": "scroll-of-refuge"}
                ]);
            }
        },
        divine: {
            "0": function () {
                return rangeIn100([15, 33, 50, 68, 85], [
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Detect poison", "id": "scroll-of-detect-poison"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Flare", "id": "scroll-of-flare"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Guidance", "id": "scroll-of-guidance"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Resistance", "id": "scroll-of-resistance"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Spark", "id": "scroll-of-spark"},
                    {"Price": 12.5, "PriceUnit": "gp", "Name": "Scroll of Virtue", "id": "scroll-of-virtue"}
                ]);
            },
            "1": function () {
                return rangeIn100([4, 7, 9, 12, 15, 17, 18, 20, 23, 27, 30, 33, 36, 39, 42, 46, 47, 49, 52, 55, 59, 62, 65, 68, 72, 74, 75, 78, 81, 85, 88, 91, 95, 98], [
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Ant haul", "id": "scroll-of-ant-haul"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Aspect of the falcon", "id": "scroll-of-aspect-of-the-falcon"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Calm animals", "id": "scroll-of-calm-animals"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Charm animal", "id": "scroll-of-charm-animal"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Compel hostility", "id": "scroll-of-compel-hostility"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Deathwatch", "id": "scroll-of-deathwatch"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Detect animals or plants", "id": "scroll-of-detect-animals-or-plants"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Detect snares and pits", "id": "scroll-of-detect-snares-and-pits"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Diagnose disease", "id": "scroll-of-diagnose-disease"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Endure elements", "id": "scroll-of-endure-elements"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Entropic shield", "id": "scroll-of-entropic-shield"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Faerie fire", "id": "scroll-of-faerie-fire"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Feather step", "id": "scroll-of-feather-step"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Forbid action", "id": "scroll-of-forbid-action"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Frostbite", "id": "scroll-of-frostbite"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Goodberry", "id": "scroll-of-goodberry"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Hide from animals", "id": "scroll-of-hide-from-animals"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Hide from undead", "id": "scroll-of-hide-from-undead"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Hydraulic push", "id": "scroll-of-hydraulic-push"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Jump", "id": "scroll-of-jump"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Keen senses", "id": "scroll-of-keen-senses"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Liberating command", "id": "scroll-of-liberating-command"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Longstrider", "id": "scroll-of-longstrider"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Magic stone", "id": "scroll-of-magic-stone"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Pass without trace", "id": "scroll-of-pass-without-trace"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Remove sickness", "id": "scroll-of-remove-sickness"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Sanctify corpse", "id": "scroll-of-sanctify-corpse"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Shillelagh", "id": "scroll-of-shillelagh"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Speak with animals", "id": "scroll-of-speak-with-animals"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Stone fist", "id": "scroll-of-stone-fist"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Stone shield", "id": "scroll-of-stone-shield"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Sun metal", "id": "scroll-of-sun-metal"},
                    {"Price": 25.0, "PriceUnit": "gp", "Name": "Scroll of Touch of the sea", "id": "scroll-of-touch-of-the-sea"},
                    {"Price": 50.0, "PriceUnit": "gp", "Name": "Scroll of Bless water", "id": "scroll-of-bless-water"},
                    {"Price": 50.0, "PriceUnit": "gp", "Name": "Scroll of Curse water", "id": "scroll-of-curse-water"}
                ]);
            },
            "2": function () {
                return rangeIn100([4, 6, 10, 13, 17, 20, 24, 27, 30, 34, 37, 41, 43, 46, 48, 51, 53, 55, 58, 60, 62, 65, 68, 70, 73, 76, 79, 82, 84, 85, 88, 91, 93, 95, 97, 99], [
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Animal aspect", "id": "scroll-of-animal-aspect"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Animal trance", "id": "scroll-of-animal-trance"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Animate dead, lesser", "id": "scroll-of-animate-dead-lesser"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Arrow of law", "id": "scroll-of-arrow-of-law"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Aspect of the bear", "id": "scroll-of-aspect-of-the-bear"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Blessing of courage and life", "id": "scroll-of-blessing-of-courage-and-life"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Calm emotions", "id": "scroll-of-calm-emotions"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Death knell", "id": "scroll-of-death-knell"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Dread bolt", "id": "scroll-of-dread-bolt"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Effortless armor", "id": "scroll-of-effortless-armor"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Enthrall", "id": "scroll-of-enthrall"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Flaming sphere", "id": "scroll-of-flaming-sphere"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Gentle repose", "id": "scroll-of-gentle-repose"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Grace", "id": "scroll-of-grace"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Groundswell", "id": "scroll-of-groundswell"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Gust of wind", "id": "scroll-of-gust-of-wind"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Instant armor", "id": "scroll-of-instant-armor"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Instrument of agony", "id": "scroll-of-instrument-of-agony"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Make whole", "id": "scroll-of-make-whole"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Reduce animal", "id": "scroll-of-reduce-animal"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Scent trail", "id": "scroll-of-scent-trail"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Shard of chaos", "id": "scroll-of-shard-of-chaos"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Share language", "id": "scroll-of-share-language"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Shatter", "id": "scroll-of-shatter"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Soften earth and stone", "id": "scroll-of-soften-earth-and-stone"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Spear of purity", "id": "scroll-of-spear-of-purity"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Spider climb", "id": "scroll-of-spider-climb"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Status", "id": "scroll-of-status"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Tree shape", "id": "scroll-of-tree-shape"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Undetectable alignment", "id": "scroll-of-undetectable-alignment"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Warp wood", "id": "scroll-of-warp-wood"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Weapon of awe", "id": "scroll-of-weapon-of-awe"},
                    {"Price": 150.0, "PriceUnit": "gp", "Name": "Scroll of Wood shape", "id": "scroll-of-wood-shape"},
                    {"Price": 175.0, "PriceUnit": "gp", "Name": "Scroll of Consecrate", "id": "scroll-of-consecrate"},
                    {"Price": 175.0, "PriceUnit": "gp", "Name": "Scroll of Desecrate", "id": "scroll-of-desecrate"},
                    {"Price": 175.0, "PriceUnit": "gp", "Name": "Scroll of Fire trap", "id": "scroll-of-fire-trap"},
                    {"Price": 450.0, "PriceUnit": "gp", "Name": "Scroll of Masterwork transformation", "id": "scroll-of-masterwork-transformation"}
                ]);
            },
            "3": function () {
                return rangeIn100([4, 8, 12, 16, 19, 22, 26, 30, 34, 36, 40, 45, 48, 51, 56, 58, 61, 64, 67, 72, 75, 80, 83, 87, 90, 93, 96, 98], [
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Aqueous orb", "id": "scroll-of-aqueous-orb"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Archon's aura", "id": "scroll-of-archon-s-aura"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Bestow insight", "id": "scroll-of-bestow-insight"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Blindness/deafness", "id": "scroll-of-blindness-deafness"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Burst of nettles", "id": "scroll-of-burst-of-nettles"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Chain of perdition", "id": "scroll-of-chain-of-perdition"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Contagion", "id": "scroll-of-contagion"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Create food and water", "id": "scroll-of-create-food-and-water"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Daybreak arrow", "id": "scroll-of-daybreak-arrow"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Diminish plants", "id": "scroll-of-diminish-plants"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Discovery torch", "id": "scroll-of-discovery-torch"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Dominate animal", "id": "scroll-of-dominate-animal"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Guiding star", "id": "scroll-of-guiding-star"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Helping hand", "id": "scroll-of-helping-hand"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Meld into stone", "id": "scroll-of-meld-into-stone"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Obscure object", "id": "scroll-of-obscure-object"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Plant growth", "id": "scroll-of-plant-growth"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Quench", "id": "scroll-of-quench"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Shifting sands", "id": "scroll-of-shifting-sands"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Snare", "id": "scroll-of-snare"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Speak with plants", "id": "scroll-of-speak-with-plants"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Spike growth", "id": "scroll-of-spike-growth"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Vision of hell", "id": "scroll-of-vision-of-hell"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Wind wall", "id": "scroll-of-wind-wall"},
                    {"Price": 375.0, "PriceUnit": "gp", "Name": "Scroll of Wrathful mantle", "id": "scroll-of-wrathful-mantle"},
                    {"Price": 425.0, "PriceUnit": "gp", "Name": "Scroll of Continual flame", "id": "scroll-of-continual-flame"},
                    {"Price": 475.0, "PriceUnit": "gp", "Name": "Scroll of Nap stack", "id": "scroll-of-nap-stack"},
                    {"Price": 575.0, "PriceUnit": "gp", "Name": "Scroll of Glyph of warding", "id": "scroll-of-glyph-of-warding"},
                    {"Price": 875.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of healing", "id": "scroll-of-symbol-of-healing"}
                ]);
            },
            "4": function () {
                return rangeIn100([4, 6, 11, 15, 21, 25, 28, 31, 35, 39, 43, 49, 55, 59, 63, 67, 72, 75, 78, 83, 87, 90, 93, 98], [
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Absorb toxicity", "id": "scroll-of-absorb-toxicity"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Antiplant shell", "id": "scroll-of-antiplant-shell"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Aspect of the stag", "id": "scroll-of-aspect-of-the-stag"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Aura of doom", "id": "scroll-of-aura-of-doom"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Ball lightning", "id": "scroll-of-ball-lightning"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Blessing of fervor", "id": "scroll-of-blessing-of-fervor"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Blight", "id": "scroll-of-blight"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Command plants", "id": "scroll-of-command-plants"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Control water", "id": "scroll-of-control-water"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Debilitating portent", "id": "scroll-of-debilitating-portent"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Giant vermin", "id": "scroll-of-giant-vermin"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Ice storm", "id": "scroll-of-ice-storm"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Imbue with spell ability", "id": "scroll-of-imbue-with-spell-ability"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Plague carrier", "id": "scroll-of-plague-carrier"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Planar adaptation", "id": "scroll-of-planar-adaptation"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Protection from energy, communal", "id": "scroll-of-protection-from-energy-communal"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Reincarnate", "id": "scroll-of-reincarnate"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Repel vermin", "id": "scroll-of-repel-vermin"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Rusting grasp", "id": "scroll-of-rusting-grasp"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Scrying", "id": "scroll-of-scrying"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Sending", "id": "scroll-of-sending"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Spiritual ally", "id": "scroll-of-spiritual-ally"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Thorn body", "id": "scroll-of-thorn-body"},
                    {"Price": 700.0, "PriceUnit": "gp", "Name": "Scroll of Volcanic storm", "id": "scroll-of-volcanic-storm"},
                    {"Price": 1700.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of slowing", "id": "scroll-of-symbol-of-slowing"}
                ]);
            },
            "5": function () {
                return rangeIn100([3, 8, 11, 15, 21, 24, 28, 31, 34, 37, 40, 43, 46, 52, 55, 58, 63, 66, 72, 76, 79, 82, 86, 90, 92, 94, 96, 98, 99], [
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Air walk, communal", "id": "scroll-of-air-walk-communal"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Aspect of the wolf", "id": "scroll-of-aspect-of-the-wolf"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Blessing of the salamander", "id": "scroll-of-blessing-of-the-salamander"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Cleanse", "id": "scroll-of-cleanse"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Commune with nature", "id": "scroll-of-commune-with-nature"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Contagion, greater", "id": "scroll-of-contagion-greater"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Control winds", "id": "scroll-of-control-winds"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Dispel chaos", "id": "scroll-of-dispel-chaos"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Dispel evil", "id": "scroll-of-dispel-evil"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Dispel good", "id": "scroll-of-dispel-good"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Dispel law", "id": "scroll-of-dispel-law"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Fickle winds", "id": "scroll-of-fickle-winds"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Forbid action, greater", "id": "scroll-of-forbid-action-greater"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Insect plague", "id": "scroll-of-insect-plague"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Life bubble", "id": "scroll-of-life-bubble"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Mark of justice", "id": "scroll-of-mark-of-justice"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Pillar of life", "id": "scroll-of-pillar-of-life"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Serenity", "id": "scroll-of-serenity"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Snake staff", "id": "scroll-of-snake-staff"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Spell immunity, communal", "id": "scroll-of-spell-immunity-communal"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Transmute mud to rock", "id": "scroll-of-transmute-mud-to-rock"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Transmute rock to mud", "id": "scroll-of-transmute-rock-to-mud"},
                    {"Price": 1125.0, "PriceUnit": "gp", "Name": "Scroll of Wind blades", "id": "scroll-of-wind-blades"},
                    {"Price": 1375.0, "PriceUnit": "gp", "Name": "Scroll of Stoneskin", "id": "scroll-of-stoneskin"},
                    {"Price": 2125.0, "PriceUnit": "gp", "Name": "Scroll of Hallow", "id": "scroll-of-hallow"},
                    {"Price": 2125.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of pain", "id": "scroll-of-symbol-of-pain"},
                    {"Price": 2125.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of sleep", "id": "scroll-of-symbol-of-sleep"},
                    {"Price": 2125.0, "PriceUnit": "gp", "Name": "Scroll of Unhallow", "id": "scroll-of-unhallow"},
                    {"Price": 6125.0, "PriceUnit": "gp", "Name": "Scroll of Hallow (4th-level spell included)", "id": "scroll-of-hallow-th-level-spell-included"},
                    {"Price": 6125.0, "PriceUnit": "gp", "Name": "Scroll of Unhallow (4th-level spell included)", "id": "scroll-of-unhallow-th-level-spell-included"}
                ]);
            },
            "6": function () {
                return rangeIn100([5, 9, 15, 19, 23, 29, 33, 37, 42, 46, 51, 54, 59, 63, 67, 70, 74, 77, 83, 86, 90, 92, 95, 98], [
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Animate objects", "id": "scroll-of-animate-objects"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Antilife shell", "id": "scroll-of-antilife-shell"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Banishment", "id": "scroll-of-banishment"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Cold ice strike", "id": "scroll-of-cold-ice-strike"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Dust form", "id": "scroll-of-dust-form"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Geas/quest", "id": "scroll-of-geas-quest"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Ironwood", "id": "scroll-of-ironwood"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Joyful rapture", "id": "scroll-of-joyful-rapture"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Move earth", "id": "scroll-of-move-earth"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Plague storm", "id": "scroll-of-plague-storm"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Planar adaptation, mass", "id": "scroll-of-planar-adaptation-mass"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Repel wood", "id": "scroll-of-repel-wood"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Sirocco", "id": "scroll-of-sirocco"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Spellstaff", "id": "scroll-of-spellstaff"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Stone tell", "id": "scroll-of-stone-tell"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Swarm skin", "id": "scroll-of-swarm-skin"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Tar pool", "id": "scroll-of-tar-pool"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Transport via plants", "id": "scroll-of-transport-via-plants"},
                    {"Price": 1650.0, "PriceUnit": "gp", "Name": "Scroll of Wind walk", "id": "scroll-of-wind-walk"},
                    {"Price": 1750.0, "PriceUnit": "gp", "Name": "Scroll of Create undead", "id": "scroll-of-create-undead"},
                    {"Price": 2050.0, "PriceUnit": "gp", "Name": "Scroll of Glyph of warding, greater", "id": "scroll-of-glyph-of-warding-greater"},
                    {"Price": 2150.0, "PriceUnit": "gp", "Name": "Scroll of Undeath to death", "id": "scroll-of-undeath-to-death"},
                    {"Price": 2650.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of fear", "id": "scroll-of-symbol-of-fear"},
                    {"Price": 4650.0, "PriceUnit": "gp", "Name": "Scroll of Forbiddance", "id": "scroll-of-forbiddance"},
                    {"Price": 6650.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of persuasion", "id": "scroll-of-symbol-of-persuasion"}
                ]);
            },
            "7": function () {
                return rangeIn100([8, 17, 24, 30, 38, 45, 53, 60, 67, 76, 83, 89, 95], [
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Animate plants", "id": "scroll-of-animate-plants"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Changestaff", "id": "scroll-of-changestaff"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Circle of clarity", "id": "scroll-of-circle-of-clarity"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Create demiplane, lesser", "id": "scroll-of-create-demiplane-lesser"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Jolting portent", "id": "scroll-of-jolting-portent"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Rampart", "id": "scroll-of-rampart"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Scouring winds", "id": "scroll-of-scouring-winds"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Siege of trees", "id": "scroll-of-siege-of-trees"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Transmute metal to wood", "id": "scroll-of-transmute-metal-to-wood"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Vortex", "id": "scroll-of-vortex"},
                    {"Price": 2275.0, "PriceUnit": "gp", "Name": "Scroll of Waves of ecstasy", "id": "scroll-of-waves-of-ecstasy"},
                    {"Price": 3775.0, "PriceUnit": "gp", "Name": "Scroll of Refuge", "id": "scroll-of-refuge"},
                    {"Price": 7275.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of stunning", "id": "scroll-of-symbol-of-stunning"},
                    {"Price": 7275.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of weakness", "id": "scroll-of-symbol-of-weakness"}
                ]);
            },
            "8": function () {
                return rangeIn100([7, 13, 18, 24, 31, 37, 42, 49, 56, 61, 68, 75, 83, 88, 95], [
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Animal shapes", "id": "scroll-of-animal-shapes"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Blood mist", "id": "scroll-of-blood-mist"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Control plants", "id": "scroll-of-control-plants"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Create demiplane", "id": "scroll-of-create-demiplane"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Dimensional lock", "id": "scroll-of-dimensional-lock"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Discern location", "id": "scroll-of-discern-location"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Euphoric tranquility", "id": "scroll-of-euphoric-tranquility"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Frightful aspect", "id": "scroll-of-frightful-aspect"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Orb of the void", "id": "scroll-of-orb-of-the-void"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Repel metal or stone", "id": "scroll-of-repel-metal-or-stone"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Seamantle", "id": "scroll-of-seamantle"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Storm bolts", "id": "scroll-of-storm-bolts"},
                    {"Price": 3000.0, "PriceUnit": "gp", "Name": "Scroll of Whirlwind", "id": "scroll-of-whirlwind"},
                    {"Price": 3150.0, "PriceUnit": "gp", "Name": "Scroll of Create greater undead", "id": "scroll-of-create-greater-undead"},
                    {"Price": 8000.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of death", "id": "scroll-of-symbol-of-death"},
                    {"Price": 8000.0, "PriceUnit": "gp", "Name": "Scroll of Symbol of insanity", "id": "scroll-of-symbol-of-insanity"}
                ]);
            },
            "9": function () {
                return rangeIn100([8, 15, 22, 31, 39, 47, 56, 64, 71, 80, 87, 94], [
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Antipathy", "id": "scroll-of-antipathy"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Clashing rocks", "id": "scroll-of-clashing-rocks"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Create demiplane, greater", "id": "scroll-of-create-demiplane-greater"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Foresight", "id": "scroll-of-foresight"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Overwhelming presence", "id": "scroll-of-overwhelming-presence"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Polar midnight", "id": "scroll-of-polar-midnight"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Soul bind", "id": "scroll-of-soul-bind"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Spell immunity, greater", "id": "scroll-of-spell-immunity-greater"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Summon froghemoth", "id": "scroll-of-summon-froghemoth"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of Winds of vengeance", "id": "scroll-of-winds-of-vengeance"},
                    {"Price": 3825.0, "PriceUnit": "gp", "Name": "Scroll of World wave", "id": "scroll-of-world-wave"},
                    {"Price": 4825.0, "PriceUnit": "gp", "Name": "Scroll of Astral projection", "id": "scroll-of-astral-projection"},
                    {"Price": 5325.0, "PriceUnit": "gp", "Name": "Scroll of Sympathy", "id": "scroll-of-sympathy"}
                ]);
            }
        }
    }
};

var randomPotion = {
    common: {
        "0": function () {
            return rangeIn100([14, 28, 44, 58, 72, 86], [
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Potion of Arcane mark", "id": "potion-of-arcane-mark"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Potion of Guidance", "id": "potion-of-guidance"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Potion of Light", "id": "potion-of-light"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Potion of Purify food and drink", "id": "potion-of-purify-food-and-drink"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Potion of Resistance", "id": "potion-of-resistance"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Potion of Stabilize", "id": "potion-of-stabilize"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Potion of Virtue", "id": "potion-of-virtue"}
            ]);
        },
        "1": function () {
            return rangeIn100([4, 14, 19, 27, 33, 41, 47, 55, 60, 64, 68, 72, 76, 81, 87, 92], [
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Bless weapon", "id": "potion-of-bless-weapon"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Cure light wounds", "id": "potion-of-cure-light-wounds"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Endure elements", "id": "potion-of-endure-elements"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Enlarge person", "id": "potion-of-enlarge-person"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Jump", "id": "potion-of-jump"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Mage armor", "id": "potion-of-mage-armor"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Magic fang", "id": "potion-of-magic-fang"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Magic weapon", "id": "potion-of-magic-weapon"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Pass without trace", "id": "potion-of-pass-without-trace"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Protection from chaos", "id": "potion-of-protection-from-chaos"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Protection from evil", "id": "potion-of-protection-from-evil"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Protection from good", "id": "potion-of-protection-from-good"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Protection from law", "id": "potion-of-protection-from-law"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Reduce person", "id": "potion-of-reduce-person"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Remove fear", "id": "potion-of-remove-fear"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Sanctuary", "id": "potion-of-sanctuary"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Shield of faith", "id": "potion-of-shield-of-faith"}
            ]);
        },
        "2": function () {
            return rangeIn100([4, 7, 11, 16, 20, 25, 30, 37, 41, 44, 49, 54, 61, 66, 71, 73, 76, 80, 84, 88, 92, 94, 98], [
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Aid", "id": "potion-of-aid"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Align weapon", "id": "potion-of-align-weapon"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Barkskin", "id": "potion-of-barkskin"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Bear's endurance", "id": "potion-of-bear-s-endurance"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Blur", "id": "potion-of-blur"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Bull's strength", "id": "potion-of-bull-s-strength"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Cat's grace", "id": "potion-of-cat-s-grace"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Cure moderate wounds", "id": "potion-of-cure-moderate-wounds"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Darkvision", "id": "potion-of-darkvision"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Delay poison", "id": "potion-of-delay-poison"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Eagle's splendor", "id": "potion-of-eagle-s-splendor"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Fox's cunning", "id": "potion-of-fox-s-cunning"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Invisibility", "id": "potion-of-invisibility"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Levitate", "id": "potion-of-levitate"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Owl's wisdom", "id": "potion-of-owl-s-wisdom"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Protection from arrows", "id": "potion-of-protection-from-arrows"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Remove paralysis", "id": "potion-of-remove-paralysis"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Resist energy, acid", "id": "potion-of-resist-energy-acid"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Resist energy, cold", "id": "potion-of-resist-energy-cold"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Resist energy, electricity", "id": "potion-of-resist-energy-electricity"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Resist energy, fire", "id": "potion-of-resist-energy-fire"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Resist energy, sonic", "id": "potion-of-resist-energy-sonic"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Spider climb", "id": "potion-of-spider-climb"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Undetectable alignment", "id": "potion-of-undetectable-alignment"}
            ]);
        },
        "3": function () {
            return rangeIn100([6, 10, 14, 20, 25, 29, 35, 40, 44, 48, 52, 57, 60, 63, 66, 69, 71, 74, 77, 81, 86, 91, 96], [
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Cure serious wounds", "id": "potion-of-cure-serious-wounds"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Dispel magic", "id": "potion-of-dispel-magic"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Displacement", "id": "potion-of-displacement"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Fly", "id": "potion-of-fly"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Gaseous form", "id": "potion-of-gaseous-form"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Good hope", "id": "potion-of-good-hope"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Haste", "id": "potion-of-haste"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Heroism", "id": "potion-of-heroism"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Keen edge", "id": "potion-of-keen-edge"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Magic fang, greater", "id": "potion-of-magic-fang-greater"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Magic vestment", "id": "potion-of-magic-vestment"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Neutralize poison", "id": "potion-of-neutralize-poison"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Protection from energy, acid", "id": "potion-of-protection-from-energy-acid"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Protection from energy, cold", "id": "potion-of-protection-from-energy-cold"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Protection from energy, electricity", "id": "potion-of-protection-from-energy-electricity"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Protection from energy, fire", "id": "potion-of-protection-from-energy-fire"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Protection from energy, sonic", "id": "potion-of-protection-from-energy-sonic"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Rage", "id": "potion-of-rage"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Remove blindness/deafness", "id": "potion-of-remove-blindness-deafness"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Remove curse", "id": "potion-of-remove-curse"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Remove disease", "id": "potion-of-remove-disease"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Tongues", "id": "potion-of-tongues"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Water breathing", "id": "potion-of-water-breathing"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Water walk", "id": "potion-of-water-walk"}
            ]);
        }
    },
    uncommon: {
        "1": function () {
            return rangeIn100([4, 11, 16, 20, 26, 30, 34, 41, 49, 53, 58, 64, 68, 75, 80, 84, 92], [
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Animate rope", "id": "potion-of-animate-rope"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Ant haul", "id": "potion-of-ant-haul"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Cloak of the shade", "id": "potion-of-cloak-of-the-shade"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Erase", "id": "potion-of-erase"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Feather step", "id": "potion-of-feather-step"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Goodberry", "id": "potion-of-goodberry"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Grease", "id": "potion-of-grease"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Hide from animals", "id": "potion-of-hide-from-animals"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Hide from undead", "id": "potion-of-hide-from-undead"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Hold portal", "id": "potion-of-hold-portal"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Invigorate", "id": "potion-of-invigorate"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Keen senses", "id": "potion-of-keen-senses"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Magic stone", "id": "potion-of-magic-stone"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Remove sickness", "id": "potion-of-remove-sickness"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Sanctify corpse", "id": "potion-of-sanctify-corpse"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Shillelagh", "id": "potion-of-shillelagh"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Touch of the sea", "id": "potion-of-touch-of-the-sea"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Vanish", "id": "potion-of-vanish"}
            ]);
        },
        "2": function () {
            return rangeIn100([6, 14, 19, 24, 30, 35, 40, 48, 56, 61, 67, 72, 76, 82, 90, 95], [
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Ablative barrier", "id": "potion-of-ablative-barrier"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Acute senses", "id": "potion-of-acute-senses"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Arcane lock", "id": "potion-of-arcane-lock"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Bullet shield", "id": "potion-of-bullet-shield"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Certain grip", "id": "potion-of-certain-grip"},
                {"Price": 350.0, "PriceUnit": "gp", "Name": "Potion of Continual flame", "id": "potion-of-continual-flame"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Corruption resistance", "id": "potion-of-corruption-resistance"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Disguise other", "id": "potion-of-disguise-other"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Gentle repose", "id": "potion-of-gentle-repose"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Make whole", "id": "potion-of-make-whole"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Obscure object", "id": "potion-of-obscure-object"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Reduce animal", "id": "potion-of-reduce-animal"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Rope trick", "id": "potion-of-rope-trick"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Slipstream", "id": "potion-of-slipstream"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Status", "id": "potion-of-status"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Warp wood", "id": "potion-of-warp-wood"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Wood shape", "id": "potion-of-wood-shape"}
            ]);
        },
        "3": function () {
            return rangeIn100([12, 22, 34, 49, 58, 67, 77, 87], [
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Burrow", "id": "potion-of-burrow"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Countless eyes", "id": "potion-of-countless-eyes"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Daylight", "id": "potion-of-daylight"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Draconic reservoir", "id": "potion-of-draconic-reservoir"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Flame arrow", "id": "potion-of-flame-arrow"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Shrink item", "id": "potion-of-shrink-item"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Stone shape", "id": "potion-of-stone-shape"},
                {"Price": 775.0, "PriceUnit": "gp", "Name": "Potion of Fire trap", "id": "potion-of-fire-trap"},
                {"Price": 800.0, "PriceUnit": "gp", "Name": "Potion of Nondetection", "id": "potion-of-nondetection"}
            ]);
        }
    }
};

var randomOil = {
    common: {
        "0": function () {
            return rangeIn100([14, 28, 44, 58, 72, 86], [
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Oil of Arcane mark", "id": "oil-of-arcane-mark"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Oil of Guidance", "id": "oil-of-guidance"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Oil of Light", "id": "oil-of-light"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Oil of Purify food and drink", "id": "oil-of-purify-food-and-drink"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Oil of Resistance", "id": "oil-of-resistance"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Oil of Stabilize", "id": "oil-of-stabilize"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Oil of Virtue", "id": "oil-of-virtue"}
            ]);
        },
        "1": function () {
            return rangeIn100([4, 14, 19, 27, 33, 41, 47, 55, 60, 64, 68, 72, 76, 81, 87, 92], [
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Bless weapon", "id": "oil-of-bless-weapon"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Cure light wounds", "id": "oil-of-cure-light-wounds"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Endure elements", "id": "oil-of-endure-elements"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Enlarge person", "id": "oil-of-enlarge-person"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Jump", "id": "oil-of-jump"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Mage armor", "id": "oil-of-mage-armor"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Magic fang", "id": "oil-of-magic-fang"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Magic weapon", "id": "oil-of-magic-weapon"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Pass without trace", "id": "oil-of-pass-without-trace"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Protection from chaos", "id": "oil-of-protection-from-chaos"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Protection from evil", "id": "oil-of-protection-from-evil"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Protection from good", "id": "oil-of-protection-from-good"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Protection from law", "id": "oil-of-protection-from-law"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Reduce person", "id": "oil-of-reduce-person"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Remove fear", "id": "oil-of-remove-fear"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Sanctuary", "id": "oil-of-sanctuary"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Shield of faith", "id": "oil-of-shield-of-faith"}
            ]);
        },
        "2": function () {
            return rangeIn100([4, 7, 11, 16, 20, 25, 30, 37, 41, 44, 49, 54, 61, 66, 71, 73, 76, 80, 84, 88, 92, 94, 98], [
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Aid", "id": "oil-of-aid"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Align weapon", "id": "oil-of-align-weapon"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Barkskin", "id": "oil-of-barkskin"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Bear's endurance", "id": "oil-of-bear-s-endurance"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Blur", "id": "oil-of-blur"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Bull's strength", "id": "oil-of-bull-s-strength"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Cat's grace", "id": "oil-of-cat-s-grace"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Cure moderate wounds", "id": "oil-of-cure-moderate-wounds"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Darkvision", "id": "oil-of-darkvision"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Delay poison", "id": "oil-of-delay-poison"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Eagle's splendor", "id": "oil-of-eagle-s-splendor"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Fox's cunning", "id": "oil-of-fox-s-cunning"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Invisibility", "id": "oil-of-invisibility"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Levitate", "id": "oil-of-levitate"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Owl's wisdom", "id": "oil-of-owl-s-wisdom"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Protection from arrows", "id": "oil-of-protection-from-arrows"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Remove paralysis", "id": "oil-of-remove-paralysis"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Resist energy, acid", "id": "oil-of-resist-energy-acid"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Resist energy, cold", "id": "oil-of-resist-energy-cold"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Resist energy, electricity", "id": "oil-of-resist-energy-electricity"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Resist energy, fire", "id": "oil-of-resist-energy-fire"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Resist energy, sonic", "id": "oil-of-resist-energy-sonic"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Spider climb", "id": "oil-of-spider-climb"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Undetectable alignment", "id": "oil-of-undetectable-alignment"}
            ]);
        },
        "3": function () {
            return rangeIn100([6, 10, 14, 20, 25, 29, 35, 40, 44, 48, 52, 57, 60, 63, 66, 69, 71, 74, 77, 81, 86, 91, 96], [
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Cure serious wounds", "id": "oil-of-cure-serious-wounds"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Dispel magic", "id": "oil-of-dispel-magic"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Displacement", "id": "oil-of-displacement"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Fly", "id": "oil-of-fly"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Gaseous form", "id": "oil-of-gaseous-form"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Good hope", "id": "oil-of-good-hope"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Haste", "id": "oil-of-haste"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Heroism", "id": "oil-of-heroism"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Keen edge", "id": "oil-of-keen-edge"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Magic fang, greater", "id": "oil-of-magic-fang-greater"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Magic vestment", "id": "oil-of-magic-vestment"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Neutralize poison", "id": "oil-of-neutralize-poison"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Protection from energy, acid", "id": "oil-of-protection-from-energy-acid"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Protection from energy, cold", "id": "oil-of-protection-from-energy-cold"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Protection from energy, electricity", "id": "oil-of-protection-from-energy-electricity"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Protection from energy, fire", "id": "oil-of-protection-from-energy-fire"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Protection from energy, sonic", "id": "oil-of-protection-from-energy-sonic"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Rage", "id": "oil-of-rage"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Remove blindness/deafness", "id": "oil-of-remove-blindness-deafness"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Remove curse", "id": "oil-of-remove-curse"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Remove disease", "id": "oil-of-remove-disease"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Tongues", "id": "oil-of-tongues"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Water breathing", "id": "oil-of-water-breathing"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Water walk", "id": "oil-of-water-walk"}
            ]);
        }
    },
    uncommon: {
        "1": function () {
            return rangeIn100([4, 11, 16, 20, 26, 30, 34, 41, 49, 53, 58, 64, 68, 75, 80, 84, 92], [
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Animate rope", "id": "oil-of-animate-rope"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Ant haul", "id": "oil-of-ant-haul"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Cloak of the shade", "id": "oil-of-cloak-of-the-shade"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Erase", "id": "oil-of-erase"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Feather step", "id": "oil-of-feather-step"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Goodberry", "id": "oil-of-goodberry"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Grease", "id": "oil-of-grease"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Hide from animals", "id": "oil-of-hide-from-animals"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Hide from undead", "id": "oil-of-hide-from-undead"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Hold portal", "id": "oil-of-hold-portal"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Invigorate", "id": "oil-of-invigorate"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Keen senses", "id": "oil-of-keen-senses"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Magic stone", "id": "oil-of-magic-stone"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Remove sickness", "id": "oil-of-remove-sickness"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Sanctify corpse", "id": "oil-of-sanctify-corpse"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Shillelagh", "id": "oil-of-shillelagh"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Touch of the sea", "id": "oil-of-touch-of-the-sea"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Oil of Vanish", "id": "oil-of-vanish"}
            ]);
        },
        "2": function () {
            return rangeIn100([6, 14, 19, 24, 30, 35, 40, 48, 56, 61, 67, 72, 76, 82, 90, 95], [
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Ablative barrier", "id": "oil-of-ablative-barrier"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Acute senses", "id": "oil-of-acute-senses"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Arcane lock", "id": "oil-of-arcane-lock"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Bullet shield", "id": "oil-of-bullet-shield"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Certain grip", "id": "oil-of-certain-grip"},
                {"Price": 350.0, "PriceUnit": "gp", "Name": "Oil of Continual flame", "id": "oil-of-continual-flame"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Corruption resistance", "id": "oil-of-corruption-resistance"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Disguise other", "id": "oil-of-disguise-other"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Gentle repose", "id": "oil-of-gentle-repose"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Make whole", "id": "oil-of-make-whole"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Obscure object", "id": "oil-of-obscure-object"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Reduce animal", "id": "oil-of-reduce-animal"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Rope trick", "id": "oil-of-rope-trick"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Slipstream", "id": "oil-of-slipstream"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Status", "id": "oil-of-status"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Warp wood", "id": "oil-of-warp-wood"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Oil of Wood shape", "id": "oil-of-wood-shape"}
            ]);
        },
        "3": function () {
            return rangeIn100([12, 22, 34, 49, 58, 67, 77, 87], [
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Burrow", "id": "oil-of-burrow"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Countless eyes", "id": "oil-of-countless-eyes"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Daylight", "id": "oil-of-daylight"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Draconic reservoir", "id": "oil-of-draconic-reservoir"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Flame arrow", "id": "oil-of-flame-arrow"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Shrink item", "id": "oil-of-shrink-item"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Oil of Stone shape", "id": "oil-of-stone-shape"},
                {"Price": 775.0, "PriceUnit": "gp", "Name": "Oil of Fire trap", "id": "oil-of-fire-trap"},
                {"Price": 800.0, "PriceUnit": "gp", "Name": "Oil of Nondetection", "id": "oil-of-nondetection"}
            ]);
        }
    }
};

function rangeIn100(upperBounds, values) {
    if (values.length !== upperBounds.length + 1) {
        throw Error("upperBounds and values mismatch '" + upperBounds + "' '" + values + "'" + "(" + upperBounds.length + " vs " + values.length + ")");
    }
    var dieResult = diceService.roll(100, 1);
    for (var i in upperBounds) {
        if (dieResult <= upperBounds[i]) {
            return values[i];
        }
    }
    return values[upperBounds.length];
}

var budgetMultipliers = {
    'none': 0,
    'incidental': 0.5,
    'standard': 1,
    'double': 2,
    'triple': 3
};

function accumulateLoot(loot1, loot2) {
    loot1.coins.pp += loot2.coins.pp;
    loot1.coins.gp += loot2.coins.gp;
    loot1.coins.sp += loot2.coins.sp;
    loot1.coins.cp += loot2.coins.cp;
    for (var i in loot2.items) {
        loot1.items.push(loot2.items[i]);
    }
}

function mostGenerousBudgetMultiplierAmongNonNPC(encounter) {
    var multiplier = 0;
    for (var property in encounter.Monsters) {
        if (encounter.Monsters.hasOwnProperty(property)) {
            var monster = encounter.Monsters[property];
            if (monster.TreasureBudget !== "npc gear") {
                if (budgetMultipliers[monster.TreasureBudget] > multiplier) {
                    multiplier = budgetMultipliers[monster.TreasureBudget];
                }
            }
        }
    }
    return multiplier;
}

function calculateNPCLevel(monsterBrief) {
    return  Math.max(1, Math.min(20, monsterBrief.Level || Math.max(1, monsterBrief.CR - 1)));
}

function calculateNPCBudget(monster, speed) {
    var level = calculateNPCLevel(monster);
    if (speed === 'fast') {
        level += 1;
    }
    return npcLevelToLootValue[level][monster.Heroic ? 'heroic' : 'basic'];
};

function calculateEncounterNPCBudget(encounter, speed) {
    var budget = 0;
    for (var property in encounter.Monsters) {
        if (encounter.Monsters.hasOwnProperty(property)) {
            var monster = encounter.Monsters[property];
            if (monster.TreasureBudget === "npc gear") {
                budget += calculateNPCBudget(monster, speed) * (monster.amount || 1);
            }
        }
    }
    return budget;
};

function calculateNonNPCLootValue(encounter, speed) {
    var multiplier = mostGenerousBudgetMultiplierAmongNonNPC(encounter);
    var cr = Math.max(1, Math.min(20, encounter.CR));
    var baseBudget = crToLootValue[cr][speed] * multiplier;
    var npcBudget = calculateEncounterNPCBudget(encounter, speed);
    return Math.max(0, baseBudget - npcBudget);
};

function generateEncounterNonNPCLoot(budget, lootType) {
    var generateLoot = {A: generateTypeALoot, D: generateTypeDLoot, E: generateTypeELoot};
    return generateLoot[lootType](budget);
};


function generateNPCLoot(monsterBrief, speed) {
    var budget = calculateNPCBudget(monsterBrief, speed);
    var loot = {coins: { pp: 0, gp: 0, sp: 0, cp: 0 }, items: []};
    for (var i = 0; i < (monsterBrief.amount || 1); i++) {
        //FIXME check creature type for allowed loot type
        accumulateLoot(loot, generateEncounterNonNPCLoot(budget, diceService.chooseOne(['A', 'D', 'E'])));
    }
    return loot;
};

function generateEncounterNPCLoot(encounter, speed) {
    var loot = {coins: { pp: 0, gp: 0, sp: 0, cp: 0 }, items: []};
    for (var property in encounter.Monsters) {
        if (encounter.Monsters.hasOwnProperty(property)) {
            var monster = encounter.Monsters[property];
            if (monster.TreasureBudget === "npc gear") {
                accumulateLoot(loot, generateNPCLoot(monster, speed));
            }
        }
    }
    return loot
};

function generateEncounterLoot(encounter, speed) {
    var nonNPCBudget = calculateNonNPCLootValue(encounter, speed);
    //FIXME check creature type for allowed loot type
    var loot = generateEncounterNonNPCLoot(nonNPCBudget, diceService.chooseOne(['A', 'D', 'E']));
    var npcLoot = generateEncounterNPCLoot(encounter, speed);
    accumulateLoot(loot, npcLoot);
    return loot;
};

function generateTypeALoot(budget) {
    var coins = { pp: 0, gp: 0, sp: 0, cp: 0 };
    var gpValues = knapsackService.knapsack(Object.keys(typeALoot), budget);
    for (var i in gpValues) {
        var gpValue = gpValues[i];
        var coinRolls = typeALoot[gpValue];
        for (var j in coinRolls) {
            var coinRoll = coinRolls[j];
            coins[coinRoll.unit] += diceService.roll(coinRoll.die, coinRoll.n) * coinRoll.amount;
        }
    }
    return {
        coins: coins,
        items: []
    }
}

function addItem(item, items) {
    for (var i in items) {
        if (items[i].id === item.id) {
            items[i].amount += 1;
            return;
        }
    }
    item.amount = 1;
    items.push(item);
};

function generateScroll(magnitude) {
    var scrollLevel = randomScrollLevel[magnitude]();
    var rarityAndMagicType = rangeIn100([45, 60, 90], [
        ["common", "arcane"],
        ["uncommon", "arcane"],
        ["common", "divine"],
        ["uncommon", "divine"]
    ]);
    var rarity = rarityAndMagicType[0];
    var magicType = rarityAndMagicType[1];
    return randomScroll[rarity][magicType][scrollLevel]();
}

function generatePotion(magnitude) {
    var potionLevel = randomPotionLevel[magnitude]();
    if (potionLevel === 0) {
        var rarity = "common";
    } else {
        var rarity = rangeIn100([75], ["common", "uncommon"]);
    }
    return randomPotion[rarity][potionLevel]();
}

function generateWand(magnitude) {
    var wandLevel = randomWandLevel[magnitude]();
    var rarity = rangeIn100([75], ["common", "uncommon"]);
    return randomWand[rarity][wandLevel]();
}

var randomMundaneArmorOrShield = {
    create: function (type) {
        return clone.clone(rangeIn100(this[type].chanceTable, this[type].valueTable));
    },
    createMwk: function (type) {
        var armor = this.create(type);
        armor.Name = "Mwk " + armor.Name;
        armor.id = "mwk-" + armor.id;
        armor.Price += 150;
        return armor;
    },
    lightArmorOrShield: {
        chanceTable: [11, 18, 27, 36, 45, 54, 63, 72, 81, 90],
        valueTable: [
            {"Price": 3.0, "PriceUnit": "gp", "Name": "Light wooden shield", "id": "light-wooden-shield"},
            {"Price": 5.0, "PriceUnit": "gp", "Name": "Buckler", "id": "buckler"},
            {"Price": 5.0, "PriceUnit": "gp", "Name": "Padded armor", "id": "padded-armor"},
            {"Price": 7.0, "PriceUnit": "gp", "Name": "Heavy wooden shield", "id": "heavy-wooden-shield"},
            {"Price": 9.0, "PriceUnit": "gp", "Name": "Light steel shield", "id": "light-steel-shield"},
            {"Price": 10.0, "PriceUnit": "gp", "Name": "Leather", "id": "leather"},
            {"Price": 15.0, "PriceUnit": "gp", "Name": "hide", "id": "hide"},
            {"Price": 20.0, "PriceUnit": "gp", "Name": "Heavy steel shield", "id": "heavy-steel-shield"},
            {"Price": 25.0, "PriceUnit": "gp", "Name": "Studded leather", "id": "studded-leather"},
            {"Price": 30.0, "PriceUnit": "gp", "Name": "Tower shield", "id": "tower-shield"},
            {"Price": 100.0, "PriceUnit": "gp", "Name": "Chain shirt", "id": "chain-shirt"}
        ]
    },
    mediumArmor: {
        chanceTable: [33, 66],
        valueTable: [
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Scale mail", "id": "scale-mail"},
            {"Price": 150.0, "PriceUnit": "gp", "Name": "Chainmail", "id": "chainmail"},
            {"Price": 200.0, "PriceUnit": "gp", "Name": "Breastplate", "id": "breastplate"}

        ]
    },
    heavyArmor: {
        chanceTable: [33, 60, 85],
        valueTable: [
            {"Price": 200.0, "PriceUnit": "gp", "Name": "Splint mail", "id": "splint-mail"},
            {"Price": 250.0, "PriceUnit": "gp", "Name": "Banded mail", "id": "banded-mail"},
            {"Price": 600.0, "PriceUnit": "gp", "Name": "Half-plate", "id": "half-plate"},
            {"Price": 1500.0, "PriceUnit": "gp", "Name": "Full plate", "id": "full-plate"}
        ]
    }
};

var weaponAbilityFilters = {
    onlyNonLethal: function (weapon) {
        return (weapon.Name !== 'Whip' && weapon.Name !== 'Bola');
    },
    onlyPorS: function (weapon) {
        return (!weapon._pOrS);
    },
    onlyHasRange: function (weapon) {
        return (weapon._melee && weapon.Name !== "Dagger" && weapon.Name !== "Light hammer" && weapon.Name !== "Spear");
    },
    onlyNonLight: function (weapon) {
        return (!weapon._melee || !weapon._light);
    },
    onlyCompositeBows: function (weapon) {
        return (weapon.Name.toLowerCase().indexOf("bow") === -1 || weapon.Name.toLowerCase().indexOf("composite") === -1);
    },
    onlyBowsAndCrossbows: function (weapon) {
        return (weapon.Name.indexOf("bow") === -1);
    },
    onlyFirearms: function (weapon) {
        return true;
        /* there are no firearms in this random weapon table */
    },
    onlyBows: function (weapon) {
        return (weapon.Name.indexOf("bow") === -1 || weapon.Name.indexOf("crossbow") !== -1);
    }
}

var randomWeapon = {
    clean: function (weapon) {
        delete weapon._light;
        delete weapon._pOrS;
        delete weapon._melee;
    },
    createMwk: function () {
        var weapon = clone.clone(rangeIn100(this.chanceTable, this.valueTable));
        weapon.Name = "Mwk " + weapon.Name;
        weapon.id = "mwk-" + weapon.id;
        weapon.Price += 300;
        this.clean(weapon);
        return weapon;
    },
    generate: function (magnitude) {
        /* FIXME: cannot yet handle specific weapons */
        do {
            var weaponPower = randomWeapon.powerTable.random(magnitude);
        } while (weaponPower.specific);
        return this.generateByBonus(weaponPower.weaponBonus, weaponPower.specialAbility1, weaponPower.specialAbility2);
    },
    generateByBonus: function (weaponBonus, abilityLevel1, abilityLevel2) {
        if (abilityLevel1 === undefined) {
            var weapon = create();
            weapon.Name = weapon.Name + " +" + weaponBonus;
            weapon.Price += 300 + randomWeapon.priceModifiers[weaponBonus];
            weapon.id = weapon.id + "-" + weaponBonus;
            randomWeapon.clean(weapon);
            return weapon;
        } else {
            var weapon = create();
            if (weapon._melee) {
                abilityLevel1 = Math.min(4, abilityLevel1);
                var abilityTable1 = randomWeapon.meleeSpecialAbilities[abilityLevel1];
                if (abilityLevel2) {
                    abilityLevel2 = Math.min(4, abilityLevel2);
                    var abilityTable2 = randomWeapon.meleeSpecialAbilities[abilityLevel2];
                }
            }
            else {
                abilityLevel1 = Math.min(3, abilityLevel1);
                var abilityTable1 = randomWeapon.rangedSpecialAbilities[abilityLevel1];
                if (abilityLevel2) {
                    abilityLevel2 = Math.min(3, abilityLevel2);
                    var abilityTable2 = randomWeapon.rangedSpecialAbilities[abilityLevel2];
                }
            }
            addRandomAbility(weapon);
            randomWeapon.clean(weapon);
            return weapon;
        }

        function create() {
            return clone.clone(rangeIn100(randomWeapon.chanceTable, randomWeapon.valueTable));
        }

        function applyAbilities(weapon, ability1, ability2) {
            if (ability2) {
                weapon.Name = ability1.name + " " + ability2.name.toLowerCase() + " " + weapon.Name.toLowerCase() + " +" + weaponBonus;
                var totalFlatPrice = (ability1.flatprice || 0) + (ability2.flatprice || 0);
                var ability1Bonus = (ability1.flatprice === undefined ? (ability1.enhancementBonus || abilityLevel1) : 0 );
                var ability2Bonus = (ability2.flatprice === undefined ? (ability2.enhancementBonus || abilityLevel2) : 0 );
                var totalAbilityBonus = ability1Bonus + ability2Bonus;
                weapon.Price += 300 + totalFlatPrice + randomWeapon.priceModifiers[weaponBonus + totalAbilityBonus];
                weapon.id = idify.idify(ability1.name) + "-" + idify.idify(ability2.name) + "-" + weapon.id + "-" + weaponBonus;
            }
            else {
                weapon.Name = ability1.name + " " + weapon.Name.toLowerCase() + " +" + weaponBonus;
                var totalFlatPrice = (ability1.flatprice || 0);
                var totalAbilityBonus = (ability1.flatprice === undefined ? (ability1.enhancementBonus || abilityLevel1) : 0 );
                weapon.Price += 300 + totalFlatPrice + randomWeapon.priceModifiers[weaponBonus + totalAbilityBonus];
                weapon.id = idify.idify(ability1.name) + "-" + weapon.id + "-" + weaponBonus;
            }
        }

        function addRandomAbility(weapon) {
            do {
                var ability1 = rangeIn100(abilityTable1.chanceTable, abilityTable1.valueTable);
            } while (ability1.filter && ability1.filter(weapon));
            if (abilityLevel2) {
                do {
                    var ability2 = rangeIn100(abilityTable2.chanceTable, abilityTable2.valueTable);
                } while ((ability2.filter && ability2.filter(weapon)) || (ability2.name === ability1.name));
            }
            applyAbilities(weapon, ability1, ability2);
        }
    },
    priceModifiers: { 1: 2000, 2: 8000, 3: 18000, 4: 32000, 5: 50000, 6: 72000, 7: 98000, 8: 128000, 9: 162000, 10: 200000 },
    chanceTable: [2, 5, 7, 10, 13, 17, 20, 22, 24, 26, 29, 31, 34, 36, 40, 43, 47, 50,
        53, 56, 58, 60, 63, 65, 68, 71, 74, 77, 81, 83, 86, 89, 92, 95, 96, 98],
    valueTable: [
        {_light: false, _pOrS: true, _melee: true, "Price": 35.0, "PriceUnit": "gp", "Name": "Bastard sword", "id": "bastard-sword"},
        {_light: false, _pOrS: true, _melee: true, "Price": 10.0, "PriceUnit": "gp", "Name": "Battleaxe", "id": "battleaxe"},
        {_light: false, _pOrS: false, _melee: false, "Price": 5.0, "PriceUnit": "gp", "Name": "Bola", "id": "bola"},
        {_light: false, _pOrS: false, _melee: true, "Price": 0.0, "PriceUnit": "gp", "Name": "Club", "id": "club"},
        {_light: false, _pOrS: true, _melee: false, "Price": 100.0, "PriceUnit": "gp", "Name": "Composite longbow", "id": "composite-longbow"},
        {_light: false, _pOrS: true, _melee: false, "Price": 75.0, "PriceUnit": "gp", "Name": "Composite shortbow", "id": "composite-shortbow"},
        {_light: true, _pOrS: true, _melee: true, "Price": 2.0, "PriceUnit": "gp", "Name": "Dagger", "id": "dagger"},
        {_light: false, _pOrS: true, _melee: false, "Price": 5.0, "PriceUnit": "gp", "Name": "Dart", "id": "dart"},
        {_light: false, _pOrS: true, _melee: true, "Price": 30.0, "PriceUnit": "gp", "Name": "Dwarven waraxe", "id": "dwarven-waraxe"},
        {_light: false, _pOrS: true, _melee: true, "Price": 75.0, "PriceUnit": "gp", "Name": "Falchion", "id": "falchion"},
        {_light: true, _pOrS: true, _melee: true, "Price": 2.0, "PriceUnit": "gp", "Name": "Gauntlet", "id": "gauntlet"},
        {_light: false, _pOrS: true, _melee: true, "Price": 8.0, "PriceUnit": "gp", "Name": "Glaive", "id": "glaive"},
        {_light: false, _pOrS: true, _melee: true, "Price": 20.0, "PriceUnit": "gp", "Name": "Greataxe", "id": "greataxe"},
        {_light: false, _pOrS: false, _melee: true, "Price": 5.0, "PriceUnit": "gp", "Name": "Greatclub", "id": "greatclub"},
        {_light: false, _pOrS: true, _melee: true, "Price": 50.0, "PriceUnit": "gp", "Name": "Greatsword", "id": "greatsword"},
        {_light: false, _pOrS: true, _melee: true, "Price": 10.0, "PriceUnit": "gp", "Name": "Halberd", "id": "halberd"},
        {_light: false, _pOrS: true, _melee: true, "Price": 6.0, "PriceUnit": "gp", "Name": "Handaxe", "id": "handaxe"},
        {_light: false, _pOrS: true, _melee: false, "Price": 50.0, "PriceUnit": "gp", "Name": "Heavy crossbow", "id": "Heavy crossbow"},
        {_light: false, _pOrS: false, _melee: true, "Price": 15.0, "PriceUnit": "gp", "Name": "Heavy flail", "id": "heavy-flail"},
        {_light: false, _pOrS: false, _melee: true, "Price": 12.0, "PriceUnit": "gp", "Name": "Heavy mace", "id": "heavy mace"},
        {_light: false, _pOrS: true, _melee: true, "Price": 10.0, "PriceUnit": "gp", "Name": "Lance", "id": "lance"},
        {_light: false, _pOrS: true, _melee: false, "Price": 35.0, "PriceUnit": "gp", "Name": "Light crossbow", "id": "light-crossbow"},
        {_light: false, _pOrS: false, _melee: true, "Price": 8.0, "PriceUnit": "gp", "Name": "Flail", "id": "flail"},
        {_light: true, _pOrS: false, _melee: true, "Price": 1.0, "PriceUnit": "gp", "Name": "Light hammer", "id": "light-hammer"},
        {_light: true, _pOrS: false, _melee: true, "Price": 5.0, "PriceUnit": "gp", "Name": "Light mace", "id": "light-mace"},
        {_light: true, _pOrS: true, _melee: true, "Price": 4.0, "PriceUnit": "gp", "Name": "Light pick", "id": "light-pick"},
        {_light: false, _pOrS: true, _melee: false, "Price": 75.0, "PriceUnit": "gp", "Name": "Longbow", "id": "longbow"},
        {_light: false, _pOrS: true, _melee: true, "Price": 5.0, "PriceUnit": "gp", "Name": "Longspear", "id": "longspear"},
        {_light: false, _pOrS: true, _melee: true, "Price": 15.0, "PriceUnit": "gp", "Name": "Longsword", "id": "longsword"},
        {_light: false, _pOrS: true, _melee: true, "Price": 8.0, "PriceUnit": "gp", "Name": "Morningstar", "id": "morningstar"},
        {_light: true, _pOrS: false, _melee: true, "Price": 2.0, "PriceUnit": "gp", "Name": "Nunchaku", "id": "nunchaku"},
        {_light: false, _pOrS: false, _melee: true, "Price": 0.0, "PriceUnit": "gp", "Name": "Quarterstaff", "id": "quarterstaff"},
        {_light: false, _pOrS: true, _melee: true, "Price": 20.0, "PriceUnit": "gp", "Name": "Rapier", "id": "rapier"},
        {_light: false, _pOrS: true, _melee: true, "Price": 2.0, "PriceUnit": "gp", "Name": "Spear", "id": "spear"},
        {_light: false, _pOrS: true, _melee: true, "Price": 15.0, "PriceUnit": "gp", "Name": "Trident", "id": "trident"},
        {_light: false, _pOrS: false, _melee: true, "Price": 12.0, "PriceUnit": "gp", "Name": "Warhammer", "id": "warhammer"},
        {_light: false, _pOrS: true, _melee: true, "Price": 1.0, "PriceUnit": "gp", "Name": "Whip", "id": "whip"}
    ],
    meleeSpecialAbilities: {
        1: { chanceTable: [1, 2, 3, 8, 9, 10, 12, 16, 17, 18, 19, 21, 22, 26, 27, 33, 39, 41, 45, 47, 48, 49,
            50, 52, 54, 59, 61, 62, 64, 65, 68, 69, 70, 71, 72, 73, 74, 80, 85, 86, 91, 96, 97],
            valueTable: [
                {enhancementBonus: 1, name: 'Impervious', flatprice: 3000},
                {enhancementBonus: 1, name: 'Glamered', flatprice: 4000},
                {enhancementBonus: 1, name: 'Allying'},
                {enhancementBonus: 1, name: 'Bane'},
                {enhancementBonus: 1, name: 'Benevolent'},
                {enhancementBonus: 1, name: 'Called'},
                {enhancementBonus: 1, name: 'Conductive'},
                {enhancementBonus: 1, name: 'Corrosive'},
                {enhancementBonus: 1, name: 'Countering'},
                {enhancementBonus: 1, name: 'Courageous'},
                {enhancementBonus: 1, name: 'Cruel'},
                {enhancementBonus: 1, name: 'Cunning'},
                {enhancementBonus: 1, name: 'Deadly', filter: weaponAbilityFilters.onlyNonLethal},
                {enhancementBonus: 1, name: 'Defending'},
                {enhancementBonus: 1, name: 'Dispelling'},
                {enhancementBonus: 1, name: 'Flaming'},
                {enhancementBonus: 1, name: 'Frost'},
                {enhancementBonus: 1, name: 'Furious'},
                {enhancementBonus: 1, name: 'Ghost touch'},
                {enhancementBonus: 1, name: 'Grayflame'},
                {enhancementBonus: 1, name: 'Grounding'},
                {enhancementBonus: 1, name: 'Guardian'},
                {enhancementBonus: 1, name: 'Heartseeker'},
                {enhancementBonus: 1, name: 'Huntsman'},
                {enhancementBonus: 1, name: 'Jurist'},
                {enhancementBonus: 1, name: 'Keen', filter: weaponAbilityFilters.onlyPorS},
                {enhancementBonus: 1, name: 'Ki focus'},
                {enhancementBonus: 1, name: 'Limning'},
                {enhancementBonus: 1, name: 'Menacing'},
                {enhancementBonus: 1, name: 'Merciful'},
                {enhancementBonus: 1, name: 'Mighty cleaving'},
                {enhancementBonus: 1, name: 'Mimetic'},
                {enhancementBonus: 1, name: 'Neutralizing'},
                {enhancementBonus: 1, name: 'Ominous'},
                {enhancementBonus: 1, name: 'Planar'},
                {enhancementBonus: 1, name: 'Quenching'},
                {enhancementBonus: 1, name: 'Seaborne'},
                {enhancementBonus: 1, name: 'Shock'},
                {enhancementBonus: 1, name: 'Spell storing'},
                {enhancementBonus: 1, name: 'Thawing'},
                {enhancementBonus: 1, name: 'Throwing'},
                {enhancementBonus: 1, name: 'Thundering'},
                {enhancementBonus: 1, name: 'Valiant'},
                {enhancementBonus: 1, name: 'Vicious'}
            ]
        },
        2: {chanceTable: [1, 10, 19, 20, 27, 28, 29, 38, 47, 48, 49, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 91],
            valueTable: [
                {name: "Advancing"},
                {name: "Anarchic"},
                {name: "Anchoring", filter: weaponAbilityFilters.onlyHasRange},
                {name: "Axiomatic"},
                {name: "Corrosive burst"},
                {name: "Defiant"},
                {name: "Dispelling burst"},
                {name: "Disruption"},
                {name: "Flaming burst"},
                {name: "Furyborn"},
                {name: "Glorious"},
                {name: "Holy"},
                {name: "Icy burst"},
                {name: "Igniting"},
                {name: "Impact", filter: weaponAbilityFilters.onlyNonLight},
                {name: "Invigorating"},
                {name: "Ki intensifying"},
                {name: "Lifesurge"},
                {name: "Negating"},
                {name: "Phase locking"},
                {name: "Shocking burst"},
                {name: "Stalking"},
                {name: "Unholy"},
                {name: "Wounding"}
            ]
        },
        3: {chanceTable: [20, 40, 80],
            valueTable: [
                {name: "Nullifying"},
                {name: "Repositioning"},
                {name: "Speed"},
                {name: "Spellstealing"}
            ]
        },
        4: {chanceTable: [40, 80, 90, 95],
            valueTable: [
                {name: "Brilliant energy"},
                {name: "Dancing"},
                {name: "Vorpal", enhancementBonus: 5},
                {name: "Dueling", flatprice: 14000},
                {name: "Transformative", flatprice: 10000}
            ]
        }
    },
    rangedSpecialAbilities: {
        1: {chanceTable: [1, 2, 3, 6, 15, 16, 19, 20, 24, 25, 28, 36, 45, 54, 58, 62, 63, 64, 66, 67, 68, 76, 84, 92],
            valueTable: [
                {name: 'Adaptive', flatprice: 1000, filter: weaponAbilityFilters.onlyCompositeBows},
                {name: 'Impervious', flatprice: 3000},
                {name: 'Glamered', flatprice: 4000},
                {name: 'Allying'},
                {name: 'Bane'},
                {name: 'Called'},
                {name: 'Conductive'},
                {name: 'Conserving', filter: weaponAbilityFilters.onlyFirearms},
                {name: 'Corrosive'},
                {name: 'Cruel'},
                {name: 'Cunning'},
                {name: 'Distance'},
                {name: 'Flaming'},
                {name: 'Frost'},
                {name: 'Huntsman'},
                {name: 'Jurist'},
                {name: 'Limning'},
                {name: 'Lucky', filter: weaponAbilityFilters.onlyFirearms},
                {name: 'Merciful'},
                {name: 'Planar'},
                {name: 'Reliable', filter: weaponAbilityFilters.onlyFirearms},
                {name: 'Returning' /* FIXME: needs a filter */},
                {name: 'Seeking'},
                {name: 'Shock'},
                {name: 'Thundering'}
            ]
        },
        2: {chanceTable: [10, 13, 23, 31, 34, 37, 48, 58, 69, 73, 76, 86, 90],
            valueTable: [
                {name: "Anarchic"},
                {name: "Axiomatic"},
                {name: "Corrosive burst"},
                {name: "Designating, lesser"},
                {name: "Endless ammunition", filter: weaponAbilityFilters.onlyBowsAndCrossbows},
                {name: "Flaming burst"},
                {name: "Holy"},
                {name: "Icy burst"},
                {name: "Igniting"},
                {name: "Phase locking"},
                {name: "Shocking burst"},
                {name: "Stalking"},
                {name: "Unholy"}
            ]
        },
        3: {chanceTable: [25, 45, 85, 94, 96, 98],
            valueTable: [
                {name: "Lucky, greater", filter: weaponAbilityFilters.onlyFirearms},
                {name: "Reliable, greater", filter: weaponAbilityFilters.onlyFirearms},
                {name: "Speed"},
                {name: "Brilliant energy", enhancementBonus: 4},
                {name: "Designating, greater", enhancementBonus: 4},
                {name: "Nimble shot", enhancementBonus: 4},
                {name: "Second chance", filter: weaponAbilityFilters.onlyBows, enhancementBonus: 4}
            ]
        }
    },
    powerTable: {
        random: function (magnitude) {
            return rangeIn100(this[magnitude].chanceTable, this[magnitude].valueTable);
        },
        lesser_minor: {
            chanceTable: [80],
            valueTable: [
                {specific: false, weaponBonus: 1},
                {specific: true}
            ]
        },
        greater_minor: {
            chanceTable: [26, 53, 80],
            valueTable: [
                {specific: false, weaponBonus: 1},
                {specific: false, weaponBonus: 2},
                {specific: false, weaponBonus: 1, specialAbility1: 1},
                {specific: true}
            ]
        },
        lesser_medium: {
            chanceTable: [10, 20, 32, 44, 56, 68, 80],
            valueTable: [
                {specific: false, weaponBonus: 1},
                {specific: false, weaponBonus: 2},
                {specific: false, weaponBonus: 3},
                {specific: false, weaponBonus: 1, specialAbility1: 1},
                {specific: false, weaponBonus: 1, specialAbility1: 1, specialAbility2: 1},
                {specific: false, weaponBonus: 1, specialAbility1: 2},
                {specific: false, weaponBonus: 2, specialAbility1: 1},
                {specific: true}
            ]
        },
        greater_medium: {
            chanceTable: [10, 22, 32, 44, 56, 68, 80],
            valueTable: [
                {specific: false, weaponBonus: 2},
                {specific: false, weaponBonus: 3},
                {specific: false, weaponBonus: 1, specialAbility1: 1},
                {specific: false, weaponBonus: 1, specialAbility1: 2},
                {specific: false, weaponBonus: 2, specialAbility1: 1},
                {specific: false, weaponBonus: 2, specialAbility1: 2},
                {specific: false, weaponBonus: 3, specialAbility1: 1},
                {specific: true}
            ]
        },
        lesser_major: {
            chanceTable: [10, 22, 32, 44, 56, 68, 80],
            valueTable: [
                {specific: false, weaponBonus: 3},
                {specific: false, weaponBonus: 4},
                {specific: false, weaponBonus: 1, specialAbility1: 2},
                {specific: false, weaponBonus: 1, specialAbility1: 3},
                {specific: false, weaponBonus: 2, specialAbility1: 2},
                {specific: false, weaponBonus: 3, specialAbility1: 1},
                {specific: false, weaponBonus: 4, specialAbility1: 1},
                {specific: true}
            ]
        },
        greater_major: {
            chanceTable: [10, 20, 30, 38, 46, 51, 59, 67, 71, 74, 77, 80],
            valueTable: [
                {specific: false, weaponBonus: 4},
                {specific: false, weaponBonus: 5},
                {specific: false, weaponBonus: 4, specialAbility1: 1},
                {specific: false, weaponBonus: 4, specialAbility1: 2},
                {specific: false, weaponBonus: 4, specialAbility1: 3},
                {specific: false, weaponBonus: 4, specialAbility1: 4},
                {specific: false, weaponBonus: 5, specialAbility1: 1},
                {specific: false, weaponBonus: 5, specialAbility1: 2},
                {specific: false, weaponBonus: 5, specialAbility1: 3},
                {specific: false, weaponBonus: 5, specialAbility1: 4},
                {specific: false, weaponBonus: 5, specialAbility1: 4, specialAbility2: 1},
                {specific: false, weaponBonus: 5, specialAbility1: 3, specialAbility2: 2},
                {specific: true}
            ]
        }
    }
};

var randomMagicArmorOrShield = {
    generate: function (magnitude) {
        /* FIXME: cannot yet handle specific armorOrShields */
        do {
            var armorOrShieldPower = randomMagicArmorOrShield.powerTable.random(magnitude);
        } while (armorOrShieldPower.specific);
        return this.generateByBonus(armorOrShieldPower.armorOrShieldBonus, armorOrShieldPower.specialAbility1, armorOrShieldPower.specialAbility2);
    },
    generateByBonus: function (armorOrShieldBonus, abilityLevel1, abilityLevel2) {
        if (abilityLevel1 === undefined) {
            var armorOrShield = create();
            armorOrShield.Name = armorOrShield.Name + " +" + armorOrShieldBonus;
            armorOrShield.Price += 150 + randomMagicArmorOrShield.priceModifiers[armorOrShieldBonus];
            armorOrShield.id = armorOrShield.id + "-" + armorOrShieldBonus;
            clean(armorOrShield);
            return armorOrShield;
        } else {
            var armorOrShield = create();
            if (armorOrShield._shield) {
                var abilityTable1 = randomMagicArmorOrShield.shieldSpecialAbilities[abilityLevel1];
                if (abilityLevel2) {
                    var abilityTable2 = randomMagicArmorOrShield.shieldSpecialAbilities[abilityLevel2];
                }
            }
            else {
                var abilityTable1 = randomMagicArmorOrShield.armorSpecialAbilities[abilityLevel1];
                if (abilityLevel2) {
                    var abilityTable2 = randomMagicArmorOrShield.armorSpecialAbilities[abilityLevel2];
                }
            }
            addRandomAbility(armorOrShield);
            clean(armorOrShield);
            return armorOrShield;
        }

        function create() {
            return clone.clone(rangeIn100(randomMagicArmorOrShield.chanceTable, randomMagicArmorOrShield.valueTable));
        }

        function clean(armorOrShield) {
            delete armorOrShield._shield;
        }

        function applyAbilities(armorOrShield, ability1, ability2) {
            if (ability2) {
                armorOrShield.Name = ability1.name + " " + ability2.name.toLowerCase() + " " + armorOrShield.Name.toLowerCase() + " +" + armorOrShieldBonus;
                var totalFlatPrice = (ability1.flatprice || 0) + (ability2.flatprice || 0);
                var ability1Bonus = (ability1.flatprice === undefined ? (ability1.enhancementBonus || abilityLevel1) : 0 );
                var ability2Bonus = (ability2.flatprice === undefined ? (ability2.enhancementBonus || abilityLevel2) : 0 );
                var totalAbilityBonus = ability1Bonus + ability2Bonus;
                armorOrShield.Price += 150 + totalFlatPrice + randomMagicArmorOrShield.priceModifiers[armorOrShieldBonus + totalAbilityBonus];
                armorOrShield.id = idify.idify(ability1.name) + "-" + idify.idify(ability2.name) + "-" + armorOrShield.id + "-" + armorOrShieldBonus;
            }
            else {
                armorOrShield.Name = ability1.name + " " + armorOrShield.Name.toLowerCase() + " +" + armorOrShieldBonus;
                var totalFlatPrice = (ability1.flatprice || 0);
                var totalAbilityBonus = (ability1.flatprice === undefined ? (ability1.enhancementBonus || abilityLevel1) : 0 );
                armorOrShield.Price += 150 + totalFlatPrice + randomMagicArmorOrShield.priceModifiers[armorOrShieldBonus + totalAbilityBonus];
                armorOrShield.id = idify.idify(ability1.name) + "-" + armorOrShield.id + "-" + armorOrShieldBonus;
            }
        }

        function addRandomAbility(armorOrShield) {
            do {
                var ability1 = rangeIn100(abilityTable1.chanceTable, abilityTable1.valueTable);
            } while (ability1.filter && ability1.filter(armorOrShield));
            if (abilityLevel2) {
                do {
                    var ability2 = rangeIn100(abilityTable2.chanceTable, abilityTable2.valueTable);
                } while ((ability2.filter && ability2.filter(armorOrShield)) || (ability2.name === ability1.name));
            }
            applyAbilities(armorOrShield, ability1, ability2);
        }
    },
    priceModifiers: { 1: 1000, 2: 4000, 3: 9000, 4: 16000, 5: 25000, 6: 36000, 7: 49000, 8: 64000, 9: 81000, 10: 100000 },
    chanceTable: [5, 13, 16, 24, 30, 38, 44, 49, 56, 60, 67, 72, 76, 79, 85, 89, 96],
    valueTable: [
        {_shield: false, "Price": 250, "PriceUnit": "gp", "Name": "Banded mail", "id": "banded-mail"},
        {_shield: false, "Price": 200, "PriceUnit": "gp", "Name": "Breastplate", "id": "breastplate"},
        {_shield: true, "Price": 5, "PriceUnit": "gp", "Name": "Buckler", "id": "buckler"},
        {_shield: false, "Price": 100, "PriceUnit": "gp", "Name": "Chain shirt", "id": "chain-shirt"},
        {_shield: false, "Price": 150, "PriceUnit": "gp", "Name": "Chainmail", "id": "chainmail"},
        {_shield: false, "Price": 1500, "PriceUnit": "gp", "Name": "Full plate", "id": "full-plate"},
        {_shield: false, "Price": 600, "PriceUnit": "gp", "Name": "Half-plate", "id": "half-plate"},
        {_shield: true, "Price": 20, "PriceUnit": "gp", "Name": "Heavy steel shield", "id": "heavy-steel-shield"},
        {_shield: true, "Price": 7, "PriceUnit": "gp", "Name": "Heavy wooden shield", "id": "heavy-wooden-shield"},
        {_shield: false, "Price": 15, "PriceUnit": "gp", "Name": "Hide", "id": "hide"},
        {_shield: false, "Price": 10, "PriceUnit": "gp", "Name": "Leather armor", "id": "leather-armor"},
        {_shield: true, "Price": 9, "PriceUnit": "gp", "Name": "Light steel shield", "id": "light-steel-shield"},
        {_shield: true, "Price": 3, "PriceUnit": "gp", "Name": "Light wooden shield", "id": "light-wooden-shield"},
        {_shield: false, "Price": 5, "PriceUnit": "gp", "Name": "Padded armor", "id": "padded-armor"},
        {_shield: false, "Price": 50, "PriceUnit": "gp", "Name": "Scale mail", "id": "scale-mail"},
        {_shield: false, "Price": 200, "PriceUnit": "gp", "Name": "Splint mail", "id": "splint-mail"},
        {_shield: false, "Price": 25, "PriceUnit": "gp", "Name": "Studded leather armor", "id": "studded-leather-armor"},
        {_shield: true, "Price": 30, "PriceUnit": "gp", "Name": "Tower shield", "id": "tower-shield"}
    ],
    armorSpecialAbilities: {
        1: {
            chanceTable: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 71, 76, 82, 88, 94],
            valueTable: [
                {name: 'Benevolent', flatprice: 2000},
                {name: 'Poison-resistant', flatprice: 2250},
                {name: 'Balanced'},
                {name: 'Bitter'},
                {name: 'Bolstering'},
                {name: 'Brawling'},
                {name: 'Champion'},
                {name: 'Dastard'},
                {name: 'Deathless'},
                {name: 'Defiant'},
                {name: 'Fortification (light)'},
                {name: 'Grinding'},
                {name: 'Impervious'},
                {name: 'Mirrored'},
                {name: 'Spell storing'},
                {name: 'Stanching'},
                {name: 'Warding'}
            ]
        },
        2: {chanceTable: [12, 24, 38, 52, 64, 76, 88],
            valueTable: [
                {name: 'Glamered', flatprice: 2700},
                {name: 'Jousting', flatprice: 3750},
                {name: 'Shadow', flatprice: 3750},
                {name: 'Slick', flatprice: 3750},
                {name: 'Expeditious', flatprice: 4000},
                {name: 'Creeping', flatprice: 5000},
                {name: 'Rallying', flatprice: 5000},
                {name: "Spell resistance (13)"}
            ]
        },
        3: {chanceTable: [8, 17, 26, 36, 45, 55, 65, 74, 84, 92],
            valueTable: [
                {name: 'Adhesive', flatprice: 7000},
                {name: 'Hosteling', flatprice: 7500},
                {name: 'Radiant', flatprice: 7500},
                {name: 'Delving', flatprice: 10000},
                {name: 'Putrid', flatprice: 10000},
                {name: 'Fortification (moderate)'},
                {name: "Ghost touch"},
                {name: "Invulnerability"},
                {name: "Spell resistance (15)"},
                {name: "Titanic"},
                {name: "Wild"}
            ]
        },
        4: {chanceTable: [16, 33, 50, 67, 83],
            valueTable: [
                {name: 'Harmonizing', flatprice: 15000},
                {name: 'Shadow, improved', flatprice: 15000},
                {name: 'Slick, improved', flatprice: 15000},
                {name: 'Energy resistance', flatprice: 18000},
                {name: 'Martyring', flatprice: 18000},
                {name: "Spell resistance (17)"}
            ]
        },
        5: {chanceTable: [8, 15, 23, 30, 37, 45, 53, 61, 69, 76, 84, 92],
            valueTable: [
                {name: 'Righteous', flatprice: 27000},
                {name: 'Unbound', flatprice: 27000},
                {name: 'Unrighteous', flatprice: 27000},
                {name: 'Vigilant', flatprice: 27000},
                {name: 'Determination', flatprice: 30000},
                {name: 'Shadow, greater', flatprice: 33750},
                {name: 'Slick, greater', flatprice: 33750},
                {name: 'Energy resistance, improved', flatprice: 42000},
                {name: 'Etherealness', flatprice: 49000},
                {name: 'Undead controlling', flatprice: 49000},
                {name: 'Energy resistance, greater', flatprice: 66000},
                {name: "Fortification (heavy)"},
                {name: "Spell resistance (19)"}
            ]
        }
    },
    shieldSpecialAbilities: {
        1: {chanceTable: [10, 19, 28, 37, 46, 55, 64, 73, 82, 91],
            valueTable: [
                {name: 'Poison-resistant', flatprice: 2250},
                {name: 'Arrow catching'},
                {name: 'Bashing'},
                {name: 'Blinding'},
                {name: 'Clangorous'},
                {name: 'Defiant'},
                {name: 'Fortification (light)'},
                {name: 'Grinding'},
                {name: 'Impervious'},
                {name: 'Mirrored'},
                {name: 'Ramming'}
            ]
        },
        2: {chanceTable: [15, 30, 50, 67, 82],
            valueTable: [
                {name: 'Rallying', flatprice: 5000},
                {name: 'Wyrmsbreath', flatprice: 5000},
                {name: "Animated"},
                {name: "Arrow deflection"},
                {name: "Merging"},
                {name: "Spell resistance (13)"}
            ]
        },
        3: {chanceTable: [15, 32, 49, 66, 83],
            valueTable: [
                {name: 'Hosteling', flatprice: 7500},
                {name: 'Radiant', flatprice: 7500},
                {name: 'Fortification (moderate)'},
                {name: "Ghost touch"},
                {name: "Spell resistance (15)"},
                {name: "Wild"}
            ]
        },
        4: {chanceTable: [50],
            valueTable: [
                {name: 'Energy resistance', flatprice: 18000},
                {name: "Spell resistance (17)"}
            ]
        },
        5: {chanceTable: [11, 27, 38, 55, 70, 85],
            valueTable: [
                {name: 'Determination', flatprice: 30000},
                {name: 'Energy resistance, improved', flatprice: 42000},
                {name: 'Undead controlling', flatprice: 49000},
                {name: 'Energy resistance, greater', flatprice: 66000},
                {name: "Fortification (heavy)"},
                {name: "Reflecting"},
                {name: "Spell resistance (19)"}
            ]
        }
    },
    powerTable: {
        random: function (magnitude) {
            return rangeIn100(this[magnitude].chanceTable, this[magnitude].valueTable);
        },
        lesser_minor: {
            chanceTable: [80],
            valueTable: [
                {specific: false, armorOrShieldBonus: 1},
                {specific: true}
            ]
        },
        greater_minor: {
            chanceTable: [26, 53, 80],
            valueTable: [
                {specific: false, armorOrShieldBonus: 1},
                {specific: false, armorOrShieldBonus: 2},
                {specific: false, armorOrShieldBonus: 1, specialAbility1: 1},
                {specific: true}
            ]
        },
        lesser_medium: {
            chanceTable: [10, 20, 32, 44, 56, 68, 80],
            valueTable: [
                {specific: false, armorOrShieldBonus: 1},
                {specific: false, armorOrShieldBonus: 2},
                {specific: false, armorOrShieldBonus: 3},
                {specific: false, armorOrShieldBonus: 1, specialAbility1: 1},
                {specific: false, armorOrShieldBonus: 1, specialAbility1: 1, specialAbility2: 1},
                {specific: false, armorOrShieldBonus: 1, specialAbility1: 2},
                {specific: false, armorOrShieldBonus: 2, specialAbility1: 1},
                {specific: true}
            ]
        },
        greater_medium: {
            chanceTable: [10, 22, 32, 44, 56, 68, 80],
            valueTable: [
                {specific: false, armorOrShieldBonus: 2},
                {specific: false, armorOrShieldBonus: 3},
                {specific: false, armorOrShieldBonus: 1, specialAbility1: 1},
                {specific: false, armorOrShieldBonus: 1, specialAbility1: 2},
                {specific: false, armorOrShieldBonus: 2, specialAbility1: 1},
                {specific: false, armorOrShieldBonus: 2, specialAbility1: 2},
                {specific: false, armorOrShieldBonus: 3, specialAbility1: 1},
                {specific: true}
            ]
        },
        lesser_major: {
            chanceTable: [10, 22, 32, 44, 56, 68, 80],
            valueTable: [
                {specific: false, armorOrShieldBonus: 3},
                {specific: false, armorOrShieldBonus: 4},
                {specific: false, armorOrShieldBonus: 1, specialAbility1: 2},
                {specific: false, armorOrShieldBonus: 1, specialAbility1: 3},
                {specific: false, armorOrShieldBonus: 2, specialAbility1: 2},
                {specific: false, armorOrShieldBonus: 3, specialAbility1: 1},
                {specific: false, armorOrShieldBonus: 4, specialAbility1: 1},
                {specific: true}
            ]
        },
        greater_major: {
            chanceTable: [10, 20, 30, 38, 46, 51, 59, 67, 71, 74, 77, 80],
            valueTable: [
                {specific: false, armorOrShieldBonus: 4},
                {specific: false, armorOrShieldBonus: 5},
                {specific: false, armorOrShieldBonus: 4, specialAbility1: 1},
                {specific: false, armorOrShieldBonus: 4, specialAbility1: 2},
                {specific: false, armorOrShieldBonus: 4, specialAbility1: 3},
                {specific: false, armorOrShieldBonus: 4, specialAbility1: 4},
                {specific: false, armorOrShieldBonus: 5, specialAbility1: 1},
                {specific: false, armorOrShieldBonus: 5, specialAbility1: 2},
                {specific: false, armorOrShieldBonus: 5, specialAbility1: 3},
                {specific: false, armorOrShieldBonus: 5, specialAbility1: 2, specialAbility2: 2},
                {specific: false, armorOrShieldBonus: 5, specialAbility1: 4},
                {specific: false, armorOrShieldBonus: 5, specialAbility1: 5},
                {specific: true}
            ]
        }
    }
};

function generateMwkArmor(type) {
    return randomMundaneArmorOrShield.createMwk(type);
}

function generateMwkWeapon() {
    return randomWeapon.createMwk();
}

function generateMagicWeapon(magnitude) {
    return randomWeapon.generate(magnitude);
}

function generateMagicWeaponByBonus(weaponBonus, abilityLevel1, abilityLevel2) {
    return randomWeapon.generateByBonus(weaponBonus, abilityLevel1, abilityLevel2);
}

function generateMagicArmorOrShield(magnitude) {
    return randomMagicArmorOrShield.generate(magnitude);
}

function generateMagicArmorOrShieldByBonus(armorBonus, abilityLevel1, abilityLevel2) {
    return randomMagicArmorOrShield.generateByBonus(armorBonus, abilityLevel1, abilityLevel2);
}

function generateTypeDLoot(budget) {
    var gpValues = knapsackService.knapsack(Object.keys(typeDLoot), budget);
    var loot = {coins: { pp: 0, gp: 0, sp: 0, cp: 0 }, items: []};
    for (var i in gpValues) {
        var gpValue = gpValues[i];
        var partialLoots = diceService.chooseOne(typeDLoot[gpValue]);
        for (var j in partialLoots) {
            var partialLoot = partialLoots[j];

            if (partialLoot.type === 'coins') {
                loot.coins[partialLoot.unit] += diceService.roll(partialLoot.die, partialLoot.n) * partialLoot.amount;
            }
            else if (partialLoot.type === 'scroll') {
                var amount = partialLoot.amount;
                for (var k = 0; k < amount; ++k) {
                    addItem(generateScroll(partialLoot.magnitude), loot.items);
                }
            } else if (partialLoot.type === 'potion') {
                var amount = partialLoot.amount;
                for (var l = 0; l < amount; ++l) {
                    addItem(generatePotion(partialLoot.magnitude), loot.items);
                }
            } else if (partialLoot.type === 'wand') {
                var amount = partialLoot.amount;
                for (var m = 0; m < amount; ++m) {
                    addItem(generateWand(partialLoot.magnitude), loot.items);
                }
            }
        }
    }
    return loot;
};

function generateTypeELoot(budget) {
    var gpValues = knapsackService.knapsack(Object.keys(typeELoot), budget);
    var loot = {coins: { pp: 0, gp: 0, sp: 0, cp: 0 }, items: []};
    for (var i in gpValues) {
        var gpValue = gpValues[i];
        var partialLoots = diceService.chooseOne(typeELoot[gpValue]);
        for (var j in partialLoots) {
            var partialLoot = partialLoots[j];
            if (partialLoot.mwk && partialLoot.type === "weapon") {
                addItem(randomWeapon.createMwk(), loot.items);
            }
            else if (partialLoot.mwk && partialLoot.type === "armorOrShield") {
                addItem(randomMundaneArmorOrShield.createMwk(partialLoot.armorType), loot.items);
            }
            else if (partialLoot.type === "weapon") {
                addItem(randomWeapon.generate(partialLoot.magnitude), loot.items);
            }
            else {
                addItem(randomMagicArmorOrShield.generate(partialLoot.magnitude), loot.items);
            }
        }
    }
    return loot;
};

module.exports = function (_diceService_, _knapsackService_) {
    diceService = _diceService_;
    knapsackService = _knapsackService_;
    return {
        generateEncounterLoot: generateEncounterLoot,
        mostGenerousBudgetMultiplierAmongNonNPC : mostGenerousBudgetMultiplierAmongNonNPC,
        calculateNPCLevel : calculateNPCLevel,
        calculateEncounterNPCBudget : calculateEncounterNPCBudget,
        calculateNonNPCLootValue : calculateNonNPCLootValue,
        generateEncounterNonNPCLoot : generateEncounterNonNPCLoot,
        generateNPCLoot : generateNPCLoot,
        generateEncounterNPCLoot : generateEncounterNPCLoot,
        generatePotion : generatePotion,
        generateScroll : generateScroll,
        generateTypeDLoot : generateTypeDLoot,
        generateMwkArmor : generateMwkArmor,
        generateMwkWeapon : generateMwkWeapon,
        generateMagicWeaponByBonus : generateMagicWeaponByBonus,
        generateMagicWeapon : generateMagicWeapon,
        generateMagicArmorOrShield : generateMagicArmorOrShield
    }
};