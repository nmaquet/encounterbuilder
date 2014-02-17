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
            ]
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

        var random_potion = {
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


        var random_oil = {
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
            if (values.length !== upperBounds - 1) {
                throw Error("upperBounds and values mismatch");
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
        }

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
            return npcLevelToLootValue[level][monster.Heroic ? 'heroic' : 'basic'];
        };

        service.calculateEncounterNPCBudget = function (encounter, speed) {
            var budget = 0;
            for (var property in encounter.Monsters) {
                if (encounter.Monsters.hasOwnProperty(property)) {
                    var monster = encounter.Monsters[property];
                    if (monster.TreasureBudget === "npc gear") {
                        budget += service.calculateNPCBudget(monster, speed) * (monster.amount || 1);
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

        service.generateEncounterNonNPCLoot = function (budget, lootType) {
            var generateLoot = {A: generateTypeALoot, D: generateTypeDLoot};
            return generateLoot[lootType](budget);
        };


        service.generateNPCLoot = function (monsterBrief, speed) {
            var budget = service.calculateNPCBudget(monsterBrief, speed);
            var loot = {coins: { pp: 0, gp: 0, sp: 0, cp: 0 }, items: []};
            for (var i = 0; i < (monsterBrief.amount || 1); i++) {
                accumulateLoot(loot, service.generateEncounterNonNPCLoot(budget, 'A'));
            }
            return loot;
        };

        service.generateEncounterNPCLoot = function (encounter, speed) {
            var loot = {coins: { pp: 0, gp: 0, sp: 0, cp: 0 }, items: []};
            for (var property in encounter.Monsters) {
                if (encounter.Monsters.hasOwnProperty(property)) {
                    var monster = encounter.Monsters[property];
                    if (monster.TreasureBudget === "npc gear") {
                        accumulateLoot(loot, service.generateNPCLoot(monster, speed));
                    }
                }
            }
            return loot
        };

        service.generateEncounterLoot = function (encounter, speed) {
            var nonNPCBudget = service.calculateNonNPCLootValue(encounter, speed);
            var loot = service.generateEncounterNonNPCLoot(nonNPCBudget, 'A');
            var npcLoot = service.generateEncounterNPCLoot(encounter, speed);
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

        function generateTypeDLoot(budget) {
            var gpValues = knapsackService.knapsack(Object.keys(typeDLoot), budget);
            var loot = {coins: { pp: 0, gp: 0, sp: 0, cp: 0 }, items: []};
            for (var i in gpValues) {
                var gpValue = gpValues[i];
                var partialLoots = diceService.chooseOne(typeDLoot[gpValue]);

                for (var j in partialLoots) {
                    var partialLoot = partialLoots[j];

                    if (partialLoot.type === 'coins'){
                        loot.coins[partialLoot.unit] += diceService.roll(partialLoot.die, partialLoot.n) * partialLoot.amount;
                    }
                    else if (partialLoot.type === 'scroll'){
                        var scrollLevel = randomScrollLevel[partialLoot.magnitude]();
                        var amount = partialLoot.amount;
                        var dieResult = diceService.roll(100,1);
                    }
                }
            }

        }
        return service;
    }])
;
