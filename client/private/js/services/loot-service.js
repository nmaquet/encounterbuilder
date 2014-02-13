'use strict';

DEMONSQUID.encounterBuilderServices.factory('lootService', [ "diceService", "knapsackService",
    function (diceService, knapsackService) {

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
        }

        var budgetMultipliers = {
            'none': 0,
            'incidental': 0.5,
            'standard': 1,
            'double': 2,
            'triple': 3
        };

        var service = {};

        service.mostGenerousBudgetMultiplierAmongNonNPC = function (encounter) {
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
        };

        service.calculateNPCLevel = function (monsterBrief) {
            return  Math.max(1, Math.min(20, monsterBrief.Level || Math.max(1, monsterBrief.CR - 1)));
        };

        service.calculateNPCBudget = function (monster, speed) {
            var level = service.calculateNPCLevel(monster);
            if (speed === 'fast') {
                level += 1;
            }
            return npcLevelToLootValue[level][monster.Heroic ? 'heroic' : 'basic'] * (monster.amount || 1);
        };

        service.calculateEncounterNPCBudget = function (encounter, speed) {
            var budget = 0;
            for (var property in encounter.Monsters) {
                if (encounter.Monsters.hasOwnProperty(property)) {
                    var monster = encounter.Monsters[property];
                    if (monster.TreasureBudget === "npc gear") {
                        budget += service.calculateNPCBudget(monster, speed);
                    }
                }
            }
            return budget;
        };

        service.calculateNonNPCLootValue = function (encounter, speed) {
            var multiplier = service.mostGenerousBudgetMultiplierAmongNonNPC(encounter);
            var cr = Math.max(1, Math.min(20, encounter.CR));
            var baseBudget = crToLootValue[cr][speed] * multiplier;
            var npcBudget = service.calculateEncounterNPCBudget(encounter, speed);
            return Math.max(0, baseBudget - npcBudget);
        };

        service.generateNonNPCLoot = function (budget, lootType) {
            if (lootType !== 'A') {
                throw Error("not implemented");
            }
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
        };

        service.generateNPCLoot = function (monsterBrief, speed) {

        };

        return service;
    }]);
