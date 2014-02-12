'use strict';

DEMONSQUID.encounterBuilderServices.factory('lootService', [
    function () {

        var monsterTypeToLootTypeTable = {
            "humanoid": {'A': true, 'B': true, 'D': true, 'E': true, 'F': true, 'G': true},
            "construct": {'E': true, 'F': true}
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

        var service = {};

        function calculateNPCLootValue(monsterBrief, speed) {
            var level = Math.max(1, Math.min(20, monsterBrief.Level));
            if (speed === "fast" && level < 20) {
                level += 1;
            }
            return npcLevelToLootValue[level][(monsterBrief.Heroic ? "heroic" : "basic")];
        };

        function calculateNonNPCLootValue(monsterBrief, speed) {
            var cr = Math.max(1, Math.min(20, monsterBrief.CR));
            var value = crToLootValue[cr][speed] * budgetMultipliers[monsterBrief.TreasureBudget];
            if (monsterBrief.CR < 1) {
                value = value * monsterBrief.CR;
            }
            return value;
        }

        service.calculateMonsterLootValue = function (monsterBrief, speed) {
            if (monsterBrief.TreasureBudget === "npc gear") {
                return calculateNPCLootValue(monsterBrief, speed);
            } else {
                return calculateNonNPCLootValue(monsterBrief, speed);
            }
        };

        service.generateMonsterLoot = function (monsterBrief) {
            var loot = {
                coins: 0,
                items: []
            };
            if (monsterBrief.TreasureBudget !== "none") {
                if (monsterTypeToLootTypeTable[monsterBrief.Type].A) {
                    loot.coins = 1;
                }
            }
            return loot;
        };

        service.generateEncounterLoot = function (encounter) {

        };

        return service;
    }]);
