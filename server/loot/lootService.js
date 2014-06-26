"use strict";

var clone = require('./../utils')().clone;
var idify = require('./../utils')().idify;

var diceService, knapsackService;

var generateMwkWeapon;
var generateMagicWeaponByBonus;
var generateMagicWeapon;
var generatePotion;
var generateWand;
var generateScroll;
var generateMwkArmor;
var generateMagicArmorOrShield;
var generateWondrousItem;
var generateRod;
var generateRing;
var generateStaff;
var generateGem;
var generateArtObject;
var typeALoot;
var typeBLoot;
var typeCLoot;
var typeDLoot;
var typeELoot;
var typeFLoot;
var typeGLoot;
var typeHLoot;
var typeILoot;

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

function mostGenerousBudgetMultiplierAmongNonNPC(encounter, options) {
    var multiplier = 0;
    if (options.budget === 'default') {
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
    }
    else {
        multiplier = budgetMultipliers[options.budget];
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

function calculateNonNPCLootValue(encounter, speed, options) {
    var multiplier = mostGenerousBudgetMultiplierAmongNonNPC(encounter, options);
    var cr = Math.max(1, Math.min(20, encounter.CR));
    var baseBudget = crToLootValue[cr][speed] * multiplier;
    var npcBudget = calculateEncounterNPCBudget(encounter, speed);
    return Math.max(0, baseBudget - npcBudget);
};

function generateEncounterNonNPCLoot(budget, lootType) {
    var generateLoot = {
        A: generateTypeALoot,
        B: generateTypeBLoot,
        C: generateTypeCLoot,
        D: generateTypeDLoot,
        E: generateTypeELoot,
        F: generateTypeFLoot,
        G: generateTypeGLoot,
        H: generateTypeHLoot,
        I: generateTypeILoot
    };
    console.log(lootType);
    return generateLoot[lootType](budget);
};

function getAllowedLootTypeForNpc(npc) {
    return Object.keys(monsterTypeToLootTypeTable[npc.Type]);
}

function getAllowedLootTypeForEncounter(nonNPCBudget, encounter) {
    var types = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    if (nonNPCBudget >= 500) {
        types.push('H');
    }
    if (nonNPCBudget >= 5000) {
        types.push('I');
    }
    var allowedTypes = [];
    for (var property in encounter.Monsters) {
        if (encounter.Monsters.hasOwnProperty(property)) {
            var monster = encounter.Monsters[property];
            if (monster.TreasureBudget !== "npc gear") {
                for (var i in types) {
                    var lootType = types[i];
                    if (monsterTypeToLootTypeTable[monster.Type] && allowedTypes.indexOf(lootType) === -1) {
                        allowedTypes.push(lootType);
                    }
                }
            }
        }
    }
    console.log('allowed type:' + allowedTypes);
    return allowedTypes;
}

function generateNPCLoot(monsterBrief, speed) {
    var budget = calculateNPCBudget(monsterBrief, speed);
    var loot = {coins: { pp: 0, gp: 0, sp: 0, cp: 0 }, items: []};
    for (var i = 0; i < (monsterBrief.amount || 1); i++) {
        accumulateLoot(loot, generateEncounterNonNPCLoot(budget, diceService.chooseOne(getAllowedLootTypeForNpc(monsterBrief))));
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
    for (var property in encounter.Npcs) {
        if (encounter.Npcs.hasOwnProperty(property)) {
            var npc = encounter.Npcs[property];
            accumulateLoot(loot, generateNPCLoot(npc, speed));
        }
    }
    return loot
};

function generateEncounterLoot(encounter, speed, options) {

    console.log(options);

    var nonNPCBudget = calculateNonNPCLootValue(encounter, speed, options);
    var nonNPCBudgetTypes = (options.lootType === 'default') ? getAllowedLootTypeForEncounter(nonNPCBudget, encounter) : [options.lootType];

    if (nonNPCBudgetTypes.length > 0) {
        var loot = generateEncounterNonNPCLoot(nonNPCBudget, diceService.chooseOne(nonNPCBudgetTypes));
        var npcLoot = generateEncounterNPCLoot(encounter, speed);
        accumulateLoot(loot, npcLoot);
        return loot
    } else {
        return generateEncounterNPCLoot(encounter, speed);
    }
};

function generateTypeALoot(budget) {
    return generateLootForType(budget, typeALoot);
}

function generateTypeBLoot(budget) {
    return generateLootForType(budget, typeBLoot);
}

function generateTypeCLoot(budget) {
    return generateLootForType(budget, typeCLoot);
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
    return generateLootForType(budget, typeDLoot);
};
function generateTypeELoot(budget) {
    return generateLootForType(budget, typeELoot);
};
function generateTypeFLoot(budget) {
    return generateLootForType(budget, typeFLoot);
};
function generateTypeGLoot(budget) {
    return generateLootForType(budget, typeGLoot);
};
function generateTypeHLoot(budget) {
    return generateLootForType(budget, typeHLoot);
};
function generateTypeILoot(budget) {
    return generateLootForType(budget, typeILoot);
};


function generateLootForType(budget, typeLootTable) {
    var gpValues = knapsackService.knapsack(Object.keys(typeLootTable), budget);
    var loot = {coins: { pp: 0, gp: 0, sp: 0, cp: 0 }, items: []};
    var i, j, k, amount;
    for (i in gpValues) {
        var gpValue = gpValues[i];
        var partialLoots = diceService.chooseOne(typeLootTable[gpValue]);
        for (j in partialLoots) {
            var partialLoot = partialLoots[j];
            if (partialLoot.type === 'coins') {
                loot.coins[partialLoot.unit] += diceService.roll(partialLoot.die, partialLoot.n) * partialLoot.amount;
            } else if (partialLoot.type === 'gems') {
                amount = partialLoot.amount;
                for (k = 0; k < amount; ++k) {
                    addItem(generateGem(partialLoot.grade), loot.items);
                }
            } else if (partialLoot.type === 'art_objects') {
                amount = partialLoot.amount;
                for (k = 0; k < amount; ++k) {
                    addItem(generateArtObject(partialLoot.grade), loot.items);
                }
            } else if (partialLoot.type === 'scroll') {
                amount = partialLoot.amount;
                for (k = 0; k < amount; ++k) {
                    addItem(generateScroll(partialLoot.magnitude), loot.items);
                }
            } else if (partialLoot.type === 'potion') {
                amount = partialLoot.amount;
                for (k = 0; k < amount; ++k) {
                    addItem(generatePotion(partialLoot.magnitude), loot.items);
                }
            } else if (partialLoot.type === 'wand') {
                amount = partialLoot.amount;
                for (k = 0; k < amount; ++k) {
                    addItem(generateWand(partialLoot.magnitude), loot.items);
                }
            } else if (partialLoot.type === 'ring') {
                amount = partialLoot.amount;
                for (k = 0; k < amount; ++k) {
                    addItem(generateRing(partialLoot.magnitude), loot.items);
                }
            } else if (partialLoot.type === 'staff') {
                amount = partialLoot.amount;
                for (k = 0; k < amount; ++k) {
                    addItem(generateStaff(partialLoot.magnitude), loot.items);
                }
            } else if (partialLoot.type === 'wondrous') {
                amount = partialLoot.amount;
                for (k = 0; k < amount; ++k) {
                    addItem(generateWondrousItem(partialLoot.magnitude), loot.items);
                }
            } else if (partialLoot.type === 'rod') {
                amount = partialLoot.amount;
                for (k = 0; k < amount; ++k) {
                    addItem(generateRod(partialLoot.magnitude), loot.items);
                }
            } else if (partialLoot.mwk && partialLoot.type === "weapon") {
                addItem(generateMwkWeapon(), loot.items);
            } else if (partialLoot.mwk && partialLoot.type === "armorOrShield") {
                addItem(generateMwkArmor(partialLoot.armorType), loot.items);
            } else if (partialLoot.type === "weapon") {
                addItem(generateMagicWeapon(partialLoot.magnitude), loot.items);
            } else if (partialLoot.type === "armorOrShield") {
                addItem(generateMagicArmorOrShield(partialLoot.magnitude), loot.items);
            } else {
                throw Error("Unknown partial loot type for : " + partialLoot);
            }
        }
    }
    return loot;
};

module.exports = function (_diceService_, _knapsackService_) {
    diceService = _diceService_;
    knapsackService = _knapsackService_;
    generateMwkArmor = require('./armorsAndShields')(diceService).generateMwkArmor;
    generateMagicArmorOrShield = require('./armorsAndShields')(diceService).generateMagicArmorOrShield;
    generateMwkWeapon = require('./weapons')(diceService).generateMwkWeapon;
    generateMagicWeaponByBonus = require('./weapons')(diceService).generateMagicWeaponByBonus;
    generateMagicWeapon = require('./weapons')(diceService).generateMagicWeapon;
    generatePotion = require('./potions')(diceService).generatePotion;
    generateWand = require('./wands')(diceService).generateWand;
    generateScroll = require('./scrolls')(diceService).generateScroll;
    generateWondrousItem = require('./wondrousItems')(diceService).generateWondrousItem;
    generateRod = require('./rods')(diceService).generateRod;
    generateRing = require('./rings')(diceService).generateRing;
    generateStaff = require('./staves')(diceService).generateStaff;
    generateGem = require('./gems')(diceService).generateGem;
    generateArtObject = require('./artObjects')(diceService).generateArtObject;
    typeALoot = require('./typeA')().typeALoot;
    typeBLoot = require('./typeB')().typeBLoot;
    typeCLoot = require('./typeC')().typeCLoot;
    typeDLoot = require('./typeD')().typeDLoot;
    typeELoot = require('./typeE')().typeELoot;
    typeFLoot = require('./typeF')().typeFLoot;
    typeGLoot = require('./typeG')().typeGLoot;
    typeHLoot = require('./typeH')().typeHLoot;
    typeILoot = require('./typeI')().typeILoot;
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
        generateTypeELoot: generateTypeELoot,
        generateTypeFLoot: generateTypeFLoot,
        generateTypeALoot: generateTypeALoot,
        generateTypeBLoot: generateTypeBLoot,
        generateTypeCLoot: generateTypeCLoot,
        generateTypeGLoot: generateTypeGLoot,
        generateTypeHLoot: generateTypeHLoot,
        generateTypeILoot: generateTypeILoot,
        generateMwkArmor: generateMwkArmor,
        generateMwkWeapon: generateMwkWeapon,
        generateMagicWeaponByBonus: generateMagicWeaponByBonus,
        generateMagicWeapon: generateMagicWeapon,
        generateMagicArmorOrShield: generateMagicArmorOrShield
    }
};