"use strict";

var clone = require('./../clone')().clone;
var idify = require('./../idify')().idify;

var diceService, knapsackService;

var randomMundaneArmorOrShield;
var randomMagicArmorOrShield;
var randomWeapon;
var generateMwkWeapon;
var generateMagicWeaponByBonus;
var generateMagicWeapon;
var generatePotion;
var generateWand;
var generateScroll;
var generateMwkArmor;
var generateMagicArmorOrShield;

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
    randomMundaneArmorOrShield = require('./armorsAndShields')(diceService).randomMundaneArmorOrShield;
    randomMagicArmorOrShield = require('./armorsAndShields')(diceService).randomMagicArmorOrShield;
    generateMwkArmor = require('./armorsAndShields')(diceService).generateMwkArmor;
    generateMagicArmorOrShield = require('./armorsAndShields')(diceService).generateMagicArmorOrShield;
    randomWeapon = require('./weapons')(diceService).randomWeapon;
    generateMwkWeapon = require('./weapons')(diceService).generateMwkWeapon;
    generateMagicWeaponByBonus = require('./weapons')(diceService).generateMagicWeaponByBonus;
    generateMagicWeapon = require('./weapons')(diceService).generateMagicWeapon;
    generatePotion = require('./potions')(diceService).generatePotion;
    generateWand = require('./wands')(diceService).generateWand;
    generateScroll = require('./scrolls')(diceService).generateScroll;
    return {
        generateEncounterLoot: generateEncounterLoot,
        mostGenerousBudgetMultiplierAmongNonNPC: mostGenerousBudgetMultiplierAmongNonNPC,
        calculateNPCLevel: calculateNPCLevel,
        calculateEncounterNPCBudget: calculateEncounterNPCBudget,
        calculateNonNPCLootValue: calculateNonNPCLootValue,
        generateEncounterNonNPCLoot: generateEncounterNonNPCLoot,
        generateNPCLoot: generateNPCLoot,
        generateEncounterNPCLoot: generateEncounterNPCLoot,
        generatePotion: generatePotion,
        generateScroll: generateScroll,
        generateTypeDLoot: generateTypeDLoot,
        generateMwkArmor: generateMwkArmor,
        generateMwkWeapon: generateMwkWeapon,
        generateMagicWeaponByBonus: generateMagicWeaponByBonus,
        generateMagicWeapon: generateMagicWeapon,
        generateMagicArmorOrShield: generateMagicArmorOrShield
    }
};