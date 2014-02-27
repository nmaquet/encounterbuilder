"use strict";

var clone = require('./../clone')().clone;

var diceService;

var random_wondrous_item = {
    body: {
        greater_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [25, 52, 76],
            valueTable: [
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Xorn robe", "id": "xorn-robe"},
                {"Price": 22000.0, "PriceUnit": "gp", "Name": "Corset of dire witchcraft", "id": "corset-of-dire-witchcraft"},
                {"Price": 27000.0, "PriceUnit": "gp", "Name": "Bodywrap of mighty strikes +3", "id": "bodywrap-of-mighty-strikes-3"},
                {"Price": 27000.0, "PriceUnit": "gp", "Name": "Robe of scintillating colors", "id": "robe-of-scintillating-colors"}
            ]
        },
        lesser_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [20, 35, 60, 70, 80],
            valueTable: [
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Robe of infinite twine", "id": "robe-of-infinite-twine"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Robe of needles", "id": "robe-of-needles"},
                {"Price": 2400.0, "PriceUnit": "gp", "Name": "Robe of bones", "id": "robe-of-bones"},
                {"Price": 3000.0, "PriceUnit": "gp", "Name": "Bodywrap of mighty strikes +1", "id": "bodywrap-of-mighty-strikes-1"},
                {"Price": 3000.0, "PriceUnit": "gp", "Name": "Corset of the vishkanya", "id": "corset-of-the-vishkanya"},
                {"Price": 3750.0, "PriceUnit": "gp", "Name": "Druid's vestment", "id": "druid-s-vestment"}
            ]
        },
        greater_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [15, 30, 45, 60, 75],
            valueTable: [
                {"Price": 4600.0, "PriceUnit": "gp", "Name": "Cassock of the clergy", "id": "cassock-of-the-clergy"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Mnemonic vestment", "id": "mnemonic-vestment"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Robe of components", "id": "robe-of-components"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Sorcerer's robe", "id": "sorcerer-s-robe"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Eidolon anchoring harness", "id": "eidolon-anchoring-harness"},
                {"Price": 7000.0, "PriceUnit": "gp", "Name": "Robe of useful items", "id": "robe-of-useful-items"}
            ]
        },
        lesser_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [40, 80],
            valueTable: [
                {"Price": 36000.0, "PriceUnit": "gp", "Name": "Gunman's duster", "id": "gunman-s-duster"},
                {"Price": 48000.0, "PriceUnit": "gp", "Name": "Bodywrap of mighty strikes +4", "id": "bodywrap-of-mighty-strikes-4"},
                {"Price": 48000.0, "PriceUnit": "gp", "Name": "Smuggler's collapsible robe", "id": "smuggler-s-collapsible-robe"}
            ]
        },
        lesser_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [15, 26, 37, 48, 59, 75],
            valueTable: [
                {"Price": 8400.0, "PriceUnit": "gp", "Name": "Robe of blending", "id": "robe-of-blending"},
                {"Price": 11000.0, "PriceUnit": "gp", "Name": "Blazing robe", "id": "blazing-robe"},
                {"Price": 11000.0, "PriceUnit": "gp", "Name": "Shocking robe", "id": "shocking-robe"},
                {"Price": 11000.0, "PriceUnit": "gp", "Name": "Voidfrost robe", "id": "voidfrost-robe"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Bodywrap of mighty strikes +2", "id": "bodywrap-of-mighty-strikes-2"},
                {"Price": 13000.0, "PriceUnit": "gp", "Name": "Monk's robe", "id": "monk-s-robe"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Robe of arcane heritage", "id": "robe-of-arcane-heritage"}
            ]
        },
        greater_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [10, 15, 20, 40, 51, 67, 77, 97],
            valueTable: [
                {"Price": 58000.0, "PriceUnit": "gp", "Name": "Robe of stars", "id": "robe-of-stars"},
                {"Price": 64000.0, "PriceUnit": "gp", "Name": "Robe of gates", "id": "robe-of-gates"},
                {"Price": 67000.0, "PriceUnit": "gp", "Name": "Otherworldly kimono", "id": "otherworldly-kimono"},
                {"Price": 75000.0, "PriceUnit": "gp", "Name": "Bodywrap of mighty strikes +5", "id": "bodywrap-of-mighty-strikes-5"},
                {"Price": 75000.0, "PriceUnit": "gp", "Name": "Resplendent robe of the thespian", "id": "resplendent-robe-of-the-thespian"},
                {"Price": 75000.0, "PriceUnit": "gp", "Name": "Robe of the archmagi", "id": "robe-of-the-archmagi"},
                {"Price": 108000.0, "PriceUnit": "gp", "Name": "Bodywrap of mighty strikes +6", "id": "bodywrap-of-mighty-strikes-6"},
                {"Price": 120000.0, "PriceUnit": "gp", "Name": "Robe of eyes", "id": "robe-of-eyes"},
                {"Price": 147000.0, "PriceUnit": "gp", "Name": "Bodywrap of mighty strikes +7", "id": "bodywrap-of-mighty-strikes-7"}
            ]
        }
    },
    eyes: {
        greater_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [21, 40, 58, 77],
            valueTable: [
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Darklands goggles", "id": "darklands-goggles"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Sniper goggles", "id": "sniper-goggles"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Rainbow lenses", "id": "rainbow-lenses"},
                {"Price": 25000.0, "PriceUnit": "gp", "Name": "Annihilation spectacles", "id": "annihilation-spectacles"},
                {"Price": 25000.0, "PriceUnit": "gp", "Name": "Eyes of doom", "id": "eyes-of-doom"}
            ]
        },
        lesser_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [18, 38, 58, 72, 87],
            valueTable: [
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Deathwatch eyes", "id": "deathwatch-eyes"},
                {"Price": 2500.0, "PriceUnit": "gp", "Name": "Eyes of the eagle", "id": "eyes-of-the-eagle"},
                {"Price": 2500.0, "PriceUnit": "gp", "Name": "Goggles of minute seeing", "id": "goggles-of-minute-seeing"},
                {"Price": 2600.0, "PriceUnit": "gp", "Name": "Pirate's eye patch", "id": "pirate-s-eye-patch"},
                {"Price": 3000.0, "PriceUnit": "gp", "Name": "Spectacles of understanding", "id": "spectacles-of-understanding"},
                {"Price": 3500.0, "PriceUnit": "gp", "Name": "Lenses of detection", "id": "lenses-of-detection"}
            ]
        },
        greater_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [20, 44, 66, 84],
            valueTable: [
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Eyes of the owl", "id": "eyes-of-the-owl"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Eyes of keen sight", "id": "eyes-of-keen-sight"},
                {"Price": 6400.0, "PriceUnit": "gp", "Name": "Treasure hunter's goggles", "id": "treasure-hunter-s-goggles"},
                {"Price": 6800.0, "PriceUnit": "gp", "Name": "Inquisitor's monocle", "id": "inquisitor-s-monocle"},
                {"Price": 7500.0, "PriceUnit": "gp", "Name": "Kinsight goggles", "id": "kinsight-goggles"}
            ]
        },
        lesser_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [60],
            valueTable: [
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Eyes of eyebite", "id": "eyes-of-eyebite"},
                {"Price": 50000.0, "PriceUnit": "gp", "Name": "Sniper goggles, greater", "id": "sniper-goggles-greater"}
            ]
        },
        lesser_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [16, 31, 48, 67, 82],
            valueTable: [
                {"Price": 8500.0, "PriceUnit": "gp", "Name": "Goggles of elvenkind", "id": "goggles-of-elvenkind"},
                {"Price": 8800.0, "PriceUnit": "gp", "Name": "Goggles of brilliant light", "id": "goggles-of-brilliant-light"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Blind man's fold", "id": "blind-man-s-fold"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Goggles of night", "id": "goggles-of-night"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Lenses of figment piercing", "id": "lenses-of-figment-piercing"},
                {"Price": 15000.0, "PriceUnit": "gp", "Name": "Arachnid goggles", "id": "arachnid-goggles"}
            ]
        },
        greater_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [18, 34, 48, 63, 77, 90],
            valueTable: [
                {"Price": 56000.0, "PriceUnit": "gp", "Name": "Eyes of charming", "id": "eyes-of-charming"},
                {"Price": 66000.0, "PriceUnit": "gp", "Name": "Monocle of the investigator", "id": "monocle-of-the-investigator"},
                {"Price": 70000.0, "PriceUnit": "gp", "Name": "Sea tyrant's patch", "id": "sea-tyrant-s-patch"},
                {"Price": 80000.0, "PriceUnit": "gp", "Name": "Swordmaster's blindfold", "id": "swordmaster-s-blindfold"},
                {"Price": 95000.0, "PriceUnit": "gp", "Name": "Mindmaster's eyes", "id": "mindmaster-s-eyes"},
                {"Price": 110000.0, "PriceUnit": "gp", "Name": "Eyes of the dragon", "id": "eyes-of-the-dragon"},
                {"Price": 184800.0, "PriceUnit": "gp", "Name": "Truesight goggles", "id": "truesight-goggles"}
            ]
        }
    },
    neck: {
        greater_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [15, 24, 35, 50, 62, 67, 72, 85],
            valueTable: [
                {"Price": 18000.0, "PriceUnit": "gp", "Name": "Amulet of natural armor +3", "id": "amulet-of-natural-armor-3"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Ampoule of false blood", "id": "ampoule-of-false-blood"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Amulet of magecraft", "id": "amulet-of-magecraft"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Amulet of mighty fists +2", "id": "amulet-of-mighty-fists-2"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Dragonfoe amulet", "id": "dragonfoe-amulet"},
                {"Price": 22000.0, "PriceUnit": "gp", "Name": "Amulet of spell mastery", "id": "amulet-of-spell-mastery"},
                {"Price": 24000.0, "PriceUnit": "gp", "Name": "Amulet of bullet protection +4", "id": "amulet-of-bullet-protection-4"},
                {"Price": 27000.0, "PriceUnit": "gp", "Name": "Hand of stone", "id": "hand-of-stone"},
                {"Price": 27000.0, "PriceUnit": "gp", "Name": "Periapt of proof against poison", "id": "periapt-of-proof-against-poison"}
            ]
        },
        lesser_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [10, 18, 25, 37, 49, 63, 72, 82, 89, 95],
            valueTable: [
                {"Price": 900.0, "PriceUnit": "gp", "Name": "Hand of the mage", "id": "hand-of-the-mage"},
                {"Price": 1500.0, "PriceUnit": "gp", "Name": "Aegis of recovery", "id": "aegis-of-recovery"},
                {"Price": 1500.0, "PriceUnit": "gp", "Name": "Amulet of bullet protection +1", "id": "amulet-of-bullet-protection-1"},
                {"Price": 1500.0, "PriceUnit": "gp", "Name": "Brooch of shielding", "id": "brooch-of-shielding"},
                {"Price": 1650.0, "PriceUnit": "gp", "Name": "Necklace of fireballs I", "id": "necklace-of-fireballs-i"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Amulet of natural armor +1", "id": "amulet-of-natural-armor-1"},
                {"Price": 2500.0, "PriceUnit": "gp", "Name": "Golembane scarab", "id": "golembane-scarab"},
                {"Price": 2700.0, "PriceUnit": "gp", "Name": "Necklace of fireballs II", "id": "necklace-of-fireballs-ii"},
                {"Price": 3000.0, "PriceUnit": "gp", "Name": "Swarmbane clasp", "id": "swarmbane-clasp"},
                {"Price": 3500.0, "PriceUnit": "gp", "Name": "Mind sentinel medallion", "id": "mind-sentinel-medallion"},
                {"Price": 3500.0, "PriceUnit": "gp", "Name": "Mummer's ruff", "id": "mummer-s-ruff"}
            ]
        },
        greater_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [8, 15, 26, 36, 47, 55, 66, 73, 81, 89],
            valueTable: [
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Amulet of elemental strife", "id": "amulet-of-elemental-strife"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Righteous fist amulet", "id": "righteous-fist-amulet"},
                {"Price": 4350.0, "PriceUnit": "gp", "Name": "Necklace of fireballs III", "id": "necklace-of-fireballs-iii"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Amulet of mighty fists +1", "id": "amulet-of-mighty-fists-1"},
                {"Price": 5400.0, "PriceUnit": "gp", "Name": "Necklace of fireballs IV", "id": "necklace-of-fireballs-iv"},
                {"Price": 5400.0, "PriceUnit": "gp", "Name": "Stormlure", "id": "stormlure"},
                {"Price": 5850.0, "PriceUnit": "gp", "Name": "Necklace of fireballs V", "id": "necklace-of-fireballs-v"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Amulet of bullet protection +2", "id": "amulet-of-bullet-protection-2"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Feychild necklace", "id": "feychild-necklace"},
                {"Price": 7200.0, "PriceUnit": "gp", "Name": "Carcanet of detention", "id": "carcanet-of-detention"},
                {"Price": 7500.0, "PriceUnit": "gp", "Name": "Periapt of health", "id": "periapt-of-health"}
            ]
        },
        lesser_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [18, 35, 49, 67, 82],
            valueTable: [
                {"Price": 32000.0, "PriceUnit": "gp", "Name": "Amulet of natural armor +4", "id": "amulet-of-natural-armor-4"},
                {"Price": 35000.0, "PriceUnit": "gp", "Name": "Amulet of proof against detection and location", "id": "amulet-of-proof-against-detection-and-location"},
                {"Price": 37500.0, "PriceUnit": "gp", "Name": "Amulet of bullet protection +5", "id": "amulet-of-bullet-protection-5"},
                {"Price": 38000.0, "PriceUnit": "gp", "Name": "Scarab of protection", "id": "scarab-of-protection"},
                {"Price": 42000.0, "PriceUnit": "gp", "Name": "Necklace of netted stars", "id": "necklace-of-netted-stars"},
                {"Price": 45000.0, "PriceUnit": "gp", "Name": "Amulet of mighty fists +3", "id": "amulet-of-mighty-fists-3"}
            ]
        },
        lesser_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [8, 12, 15, 18, 23, 26, 33, 40, 43, 47, 51, 54, 58, 63, 66, 73, 77, 81, 85, 92, 95, 98],
            valueTable: [
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Amulet of natural armor +2", "id": "amulet-of-natural-armor-2"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Amulet of proof against petrification", "id": "amulet-of-proof-against-petrification"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Everwake amulet", "id": "everwake-amulet"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Gravewatch pendant", "id": "gravewatch-pendant"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Hand of glory", "id": "hand-of-glory"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Torc of lionheart fury", "id": "torc-of-lionheart-fury"},
                {"Price": 8100.0, "PriceUnit": "gp", "Name": "Necklace of fireballs VI", "id": "necklace-of-fireballs-vi"},
                {"Price": 8700.0, "PriceUnit": "gp", "Name": "Necklace of fireballs VII", "id": "necklace-of-fireballs-vii"},
                {"Price": 9000.0, "PriceUnit": "gp", "Name": "Amulet of hidden strength", "id": "amulet-of-hidden-strength"},
                {"Price": 9000.0, "PriceUnit": "gp", "Name": "Necklace of adaptation", "id": "necklace-of-adaptation"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Amulet of spell cunning", "id": "amulet-of-spell-cunning"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Collar of the true companion", "id": "collar-of-the-true-companion"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Frost fist amulet", "id": "frost-fist-amulet"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Crystal of healing hands", "id": "crystal-of-healing-hands"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Guardian gorget", "id": "guardian-gorget"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Medallion of thoughts", "id": "medallion-of-thoughts"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Periapt of protection from curses", "id": "periapt-of-protection-from-curses"},
                {"Price": 13000.0, "PriceUnit": "gp", "Name": "Forge fist amulet", "id": "forge-fist-amulet"},
                {"Price": 13500.0, "PriceUnit": "gp", "Name": "Amulet of bullet protection +3", "id": "amulet-of-bullet-protection-3"},
                {"Price": 15000.0, "PriceUnit": "gp", "Name": "Periapt of wound closure", "id": "periapt-of-wound-closure"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Necklace of ki serenity", "id": "necklace-of-ki-serenity"},
                {"Price": 16800.0, "PriceUnit": "gp", "Name": "Brooch of amber sparks", "id": "brooch-of-amber-sparks"},
                {"Price": 17500.0, "PriceUnit": "gp", "Name": "Symbol of sanguine protection", "id": "symbol-of-sanguine-protection"}
            ]
        },
        greater_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [35, 60, 85],
            valueTable: [
                {"Price": 50000.0, "PriceUnit": "gp", "Name": "Amulet of natural armor +5", "id": "amulet-of-natural-armor-5"},
                {"Price": 80000.0, "PriceUnit": "gp", "Name": "Amulet of mighty fists +4", "id": "amulet-of-mighty-fists-4"},
                {"Price": 120000.0, "PriceUnit": "gp", "Name": "Amulet of the planes", "id": "amulet-of-the-planes"},
                {"Price": 125000.0, "PriceUnit": "gp", "Name": "Amulet of mighty fists +5", "id": "amulet-of-mighty-fists-5"}
            ]
        }
    },
    wrists: {
        greater_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [10, 20, 30, 50, 70, 90],
            valueTable: [
                {"Price": 18900.0, "PriceUnit": "gp", "Name": "Vambraces of the genie (djinni)", "id": "vambraces-of-the-genie-djinni"},
                {"Price": 18900.0, "PriceUnit": "gp", "Name": "Vambraces of the genie (marid)", "id": "vambraces-of-the-genie-marid"},
                {"Price": 18900.0, "PriceUnit": "gp", "Name": "Vambraces of the genie (shaitan)", "id": "vambraces-of-the-genie-shaitan"},
                {"Price": 19000.0, "PriceUnit": "gp", "Name": "Bracelet of friends", "id": "bracelet-of-friends"},
                {"Price": 25000.0, "PriceUnit": "gp", "Name": "Bracers of archery, greater", "id": "bracers-of-archery-greater"},
                {"Price": 25000.0, "PriceUnit": "gp", "Name": "Bracers of armor +5", "id": "bracers-of-armor-5"},
                {"Price": 25000.0, "PriceUnit": "gp", "Name": "Bracers of sworn vengeance", "id": "bracers-of-sworn-vengeance"}
            ]
        },
        lesser_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [10, 20, 48, 63, 91, 96],
            valueTable: [
                {"Price": 200.0, "PriceUnit": "gp", "Name": "Sleeves of many garments", "id": "sleeves-of-many-garments"},
                {"Price": 500.0, "PriceUnit": "gp", "Name": "Armbands of the brawler", "id": "armbands-of-the-brawler"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Bracers of armor +1", "id": "bracers-of-armor-1"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Burglar's bracers", "id": "burglar-s-bracers"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Bracers of steadiness", "id": "bracers-of-steadiness"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Manacles of cooperation", "id": "manacles-of-cooperation"},
                {"Price": 3280.0, "PriceUnit": "gp", "Name": "Shackles of compliance", "id": "shackles-of-compliance"}
            ]
        },
        greater_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [27, 28, 38, 65, 68, 71, 81, 98, 99],
            valueTable: [
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Bracers of armor +2", "id": "bracers-of-armor-2"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Bracers of falcon's aim", "id": "bracers-of-falcon-s-aim"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Inquisitor's bastion vambraces", "id": "inquisitor-s-bastion-vambraces"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Bracers of archery, lesser", "id": "bracers-of-archery-lesser"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Spellguard bracers", "id": "spellguard-bracers"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Bonebreaker gauntlets", "id": "bonebreaker-gauntlets"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Vambraces of defense", "id": "vambraces-of-defense"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Verdant vine", "id": "verdant-vine"},
                {"Price": 7200.0, "PriceUnit": "gp", "Name": "Longarm bracers", "id": "longarm-bracers"},
                {"Price": 7900.0, "PriceUnit": "gp", "Name": "Bracers of the glib entertainer", "id": "bracers-of-the-glib-entertainer"}
            ]
        },
        lesser_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [30, 45],
            valueTable: [
                {"Price": 28000.0, "PriceUnit": "gp", "Name": "Dimensional shackles", "id": "dimensional-shackles"},
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Gauntlets of skill at arms", "id": "gauntlets-of-skill-at-arms"},
                {"Price": 36000.0, "PriceUnit": "gp", "Name": "Bracers of armor +6", "id": "bracers-of-armor-6"}
            ]
        },
        lesser_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [4, 8, 13, 18, 43, 53, 58, 63, 73, 78, 82, 86, 90, 99],
            valueTable: [
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Charm bracelet", "id": "charm-bracelet"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Duelist's vambraces", "id": "duelist-s-vambraces"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Merciful vambraces", "id": "merciful-vambraces"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Vambraces of the tactician", "id": "vambraces-of-the-tactician"},
                {"Price": 9000.0, "PriceUnit": "gp", "Name": "Bracers of armor +3", "id": "bracers-of-armor-3"},
                {"Price": 9900.0, "PriceUnit": "gp", "Name": "Seducer's bane", "id": "seducer-s-bane"},
                {"Price": 11500.0, "PriceUnit": "gp", "Name": "Bracers of the avenging knight", "id": "bracers-of-the-avenging-knight"},
                {"Price": 13900.0, "PriceUnit": "gp", "Name": "Arrowmaster's bracers", "id": "arrowmaster-s-bracers"},
                {"Price": 14400.0, "PriceUnit": "gp", "Name": "Vambraces of the genie (efreeti)", "id": "vambraces-of-the-genie-efreeti"},
                {"Price": 14500.0, "PriceUnit": "gp", "Name": "Bracelet of bargaining", "id": "bracelet-of-bargaining"},
                {"Price": 15000.0, "PriceUnit": "gp", "Name": "Bracelet of mercy", "id": "bracelet-of-mercy"},
                {"Price": 15600.0, "PriceUnit": "gp", "Name": "Bracers of the merciful knight", "id": "bracers-of-the-merciful-knight"},
                {"Price": 15750.0, "PriceUnit": "gp", "Name": "Bracelet of second chances", "id": "bracelet-of-second-chances"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Bracers of armor +4", "id": "bracers-of-armor-4"},
                {"Price": 16200.0, "PriceUnit": "gp", "Name": "Shackles of durance vile", "id": "shackles-of-durance-vile"}
            ]
        },
        greater_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [60],
            valueTable: [
                {"Price": 49000.0, "PriceUnit": "gp", "Name": "Bracers of armor +7", "id": "bracers-of-armor-7"},
                {"Price": 64000.0, "PriceUnit": "gp", "Name": "Bracers of armor +8", "id": "bracers-of-armor-8"}
            ]
        }
    },
    shoulders: {
        greater_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [12, 24, 32, 44, 56, 68, 88],
            valueTable: [
                {"Price": 18000.0, "PriceUnit": "gp", "Name": "Stole of justice", "id": "stole-of-justice"},
                {"Price": 19200.0, "PriceUnit": "gp", "Name": "Jellyfish cape", "id": "jellyfish-cape"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Cloak of the diplomat", "id": "cloak-of-the-diplomat"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Slashing cloak", "id": "slashing-cloak"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Stone cloak, major", "id": "stone-cloak-major"},
                {"Price": 24000.0, "PriceUnit": "gp", "Name": "Cloak of displacement, minor", "id": "cloak-of-displacement-minor"},
                {"Price": 25000.0, "PriceUnit": "gp", "Name": "Cloak of resistance +5", "id": "cloak-of-resistance-5"},
                {"Price": 26000.0, "PriceUnit": "gp", "Name": "Cloak of the bat", "id": "cloak-of-the-bat"}
            ]
        },
        lesser_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [6, 10, 30, 36, 38, 44, 50, 56, 74, 80, 85, 94, 97],
            valueTable: [
                {"Price": 200.0, "PriceUnit": "gp", "Name": "Catching cape", "id": "catching-cape"},
                {"Price": 900.0, "PriceUnit": "gp", "Name": "Cloak of human guise", "id": "cloak-of-human-guise"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Cloak of resistance +1", "id": "cloak-of-resistance-1"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Muleback cords", "id": "muleback-cords"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Shawl of life-keeping", "id": "shawl-of-life-keeping"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Shield cloak", "id": "shield-cloak"},
                {"Price": 1500.0, "PriceUnit": "gp", "Name": "Quickchange cloak", "id": "quickchange-cloak"},
                {"Price": 1800.0, "PriceUnit": "gp", "Name": "Cowardly crouching cloak", "id": "cowardly-crouching-cloak"},
                {"Price": 2500.0, "PriceUnit": "gp", "Name": "Cloak of elvenkind", "id": "cloak-of-elvenkind"},
                {"Price": 2500.0, "PriceUnit": "gp", "Name": "Cloak of the hedge wizard", "id": "cloak-of-the-hedge-wizard"},
                {"Price": 2600.0, "PriceUnit": "gp", "Name": "Cloak of fiery vanishing", "id": "cloak-of-fiery-vanishing"},
                {"Price": 2800.0, "PriceUnit": "gp", "Name": "Cloak of fangs", "id": "cloak-of-fangs"},
                {"Price": 3000.0, "PriceUnit": "gp", "Name": "Pauldrons of the serpent", "id": "pauldrons-of-the-serpent"},
                {"Price": 3500.0, "PriceUnit": "gp", "Name": "Stonemist cloak", "id": "stonemist-cloak"}
            ]
        },
        greater_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [26, 38, 39, 52, 74, 94],
            valueTable: [
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Cloak of resistance +2", "id": "cloak-of-resistance-2"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Cloak of the scuttling rat", "id": "cloak-of-the-scuttling-rat"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Seafoam shawl", "id": "seafoam-shawl"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Treeform cloak", "id": "treeform-cloak"},
                {"Price": 7000.0, "PriceUnit": "gp", "Name": "Eagle cape", "id": "eagle-cape"},
                {"Price": 7200.0, "PriceUnit": "gp", "Name": "Cloak of the manta ray", "id": "cloak-of-the-manta-ray"},
                {"Price": 7500.0, "PriceUnit": "gp", "Name": "Hunter's cloak", "id": "hunter-s-cloak"}
            ]
        },
        lesser_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [40, 60],
            valueTable: [
                {"Price": 32500.0, "PriceUnit": "gp", "Name": "Highwayman's cape", "id": "highwayman-s-cape"},
                {"Price": 40000.0, "PriceUnit": "gp", "Name": "Juggernaut's pauldrons", "id": "juggernaut-s-pauldrons"},
                {"Price": 45000.0, "PriceUnit": "gp", "Name": "Charlatan's cape", "id": "charlatan-s-cape"}
            ]
        },
        lesser_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [20, 22, 25, 27, 32, 40, 45, 52, 54, 59, 69, 72, 74, 76, 78, 88, 91],
            valueTable: [
                {"Price": 9000.0, "PriceUnit": "gp", "Name": "Cloak of resistance +3", "id": "cloak-of-resistance-3"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Cloak of the duskwalker", "id": "cloak-of-the-duskwalker"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Cocoon cloak", "id": "cocoon-cloak"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Pauldrons of the bull", "id": "pauldrons-of-the-bull"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Stone cloak, minor", "id": "stone-cloak-minor"},
                {"Price": 10800.0, "PriceUnit": "gp", "Name": "Cape of the mountebank", "id": "cape-of-the-mountebank"},
                {"Price": 10800.0, "PriceUnit": "gp", "Name": "Pauldrons of the watchful lion", "id": "pauldrons-of-the-watchful-lion"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Lion cloak", "id": "lion-cloak"},
                {"Price": 13400.0, "PriceUnit": "gp", "Name": "Mantle of spores", "id": "mantle-of-spores"},
                {"Price": 14000.0, "PriceUnit": "gp", "Name": "Cape of effulgent escape", "id": "cape-of-effulgent-escape"},
                {"Price": 14000.0, "PriceUnit": "gp", "Name": "Cloak of arachnida", "id": "cloak-of-arachnida"},
                {"Price": 14000.0, "PriceUnit": "gp", "Name": "Gunfighter's poncho", "id": "gunfighter-s-poncho"},
                {"Price": 14000.0, "PriceUnit": "gp", "Name": "Tentacle cloak", "id": "tentacle-cloak"},
                {"Price": 14350.0, "PriceUnit": "gp", "Name": "Demonspike pauldrons", "id": "demonspike-pauldrons"},
                {"Price": 15600.0, "PriceUnit": "gp", "Name": "Comfort's cloak", "id": "comfort-s-cloak"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Cloak of resistance +4", "id": "cloak-of-resistance-4"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Shawl of the crone", "id": "shawl-of-the-crone"},
                {"Price": 17200.0, "PriceUnit": "gp", "Name": "Prestidigitator's cloak", "id": "prestidigitator-s-cloak"}
            ]
        },
        greater_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [15, 35, 55, 80],
            valueTable: [
                {"Price": 50000.0, "PriceUnit": "gp", "Name": "Cloak of displacement, major", "id": "cloak-of-displacement-major"},
                {"Price": 54000.0, "PriceUnit": "gp", "Name": "Wings of flying", "id": "wings-of-flying"},
                {"Price": 55000.0, "PriceUnit": "gp", "Name": "Cloak of etherealness", "id": "cloak-of-etherealness"},
                {"Price": 72000.0, "PriceUnit": "gp", "Name": "Wings of the gargoyle", "id": "wings-of-the-gargoyle"},
                {"Price": 78600.0, "PriceUnit": "gp", "Name": "Wyvern cloak", "id": "wyvern-cloak"}
            ]
        }
    },
    head: {
        greater_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [6, 12, 19, 27, 34, 42, 50, 62, 72, 79, 85, 94],
            valueTable: [
                {"Price": 18000.0, "PriceUnit": "gp", "Name": "Cat's eye crown", "id": "cat-s-eye-crown"},
                {"Price": 18000.0, "PriceUnit": "gp", "Name": "Maw of the wyrm", "id": "maw-of-the-wyrm"},
                {"Price": 18000.0, "PriceUnit": "gp", "Name": "Mitre of the hierophant", "id": "mitre-of-the-hierophant"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Magician's hat", "id": "magician-s-hat"},
                {"Price": 22000.0, "PriceUnit": "gp", "Name": "Circlet of mindsight", "id": "circlet-of-mindsight"},
                {"Price": 22000.0, "PriceUnit": "gp", "Name": "Mask of the skull", "id": "mask-of-the-skull"},
                {"Price": 22600.0, "PriceUnit": "gp", "Name": "Howling helm", "id": "howling-helm"},
                {"Price": 23760.0, "PriceUnit": "gp", "Name": "Crown of blasting, major", "id": "crown-of-blasting-major"},
                {"Price": 24000.0, "PriceUnit": "gp", "Name": "Helm of underwater action", "id": "helm-of-underwater-action"},
                {"Price": 24600.0, "PriceUnit": "gp", "Name": "Crown of conquest", "id": "crown-of-conquest"},
                {"Price": 26000.0, "PriceUnit": "gp", "Name": "Batrachian helm", "id": "batrachian-helm"},
                {"Price": 27000.0, "PriceUnit": "gp", "Name": "Helm of telepathy", "id": "helm-of-telepathy"},
                {"Price": 27000.0, "PriceUnit": "gp", "Name": "Plague mask", "id": "plague-mask"}
            ]
        },
        lesser_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [10, 22, 36, 56, 71, 85],
            valueTable: [
                {"Price": 500.0, "PriceUnit": "gp", "Name": "Mask of stony demeanor", "id": "mask-of-stony-demeanor"},
                {"Price": 800.0, "PriceUnit": "gp", "Name": "Cap of human guise", "id": "cap-of-human-guise"},
                {"Price": 900.0, "PriceUnit": "gp", "Name": "Cap of light", "id": "cap-of-light"},
                {"Price": 1800.0, "PriceUnit": "gp", "Name": "Hat of disguise", "id": "hat-of-disguise"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Buffering cap", "id": "buffering-cap"},
                {"Price": 3000.0, "PriceUnit": "gp", "Name": "Miser's mask", "id": "miser-s-mask"},
                {"Price": 3500.0, "PriceUnit": "gp", "Name": "Stalker's mask", "id": "stalker-s-mask"}
            ]
        },
        greater_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [12, 21, 31, 40, 54, 67, 87],
            valueTable: [
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Circlet of persuasion", "id": "circlet-of-persuasion"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Grappler's mask", "id": "grappler-s-mask"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Helm of fearsome mien", "id": "helm-of-fearsome-mien"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Jingasa of the fortunate soldier", "id": "jingasa-of-the-fortunate-soldier"},
                {"Price": 5200.0, "PriceUnit": "gp", "Name": "Helm of comprehend languages and read magic", "id": "helm-of-comprehend-languages-and-read-magic"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Crown of swords", "id": "crown-of-swords"},
                {"Price": 6480.0, "PriceUnit": "gp", "Name": "Crown of blasting, minor", "id": "crown-of-blasting-minor"},
                {"Price": 7200.0, "PriceUnit": "gp", "Name": "Mask of the krenshar", "id": "mask-of-the-krenshar"}
            ]
        },
        lesser_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [14, 29, 45, 61, 78],
            valueTable: [
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Iron circlet of guarded souls", "id": "iron-circlet-of-guarded-souls"},
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Laurel of command", "id": "laurel-of-command"},
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Mask of giants, lesser", "id": "mask-of-giants-lesser"},
                {"Price": 33600.0, "PriceUnit": "gp", "Name": "Steel-mind cap", "id": "steel-mind-cap"},
                {"Price": 35000.0, "PriceUnit": "gp", "Name": "Stormlord's helm", "id": "stormlord-s-helm"},
                {"Price": 36000.0, "PriceUnit": "gp", "Name": "Helm of brilliance, lesser", "id": "helm-of-brilliance-lesser"}
            ]
        },
        lesser_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [16, 30, 46, 63, 80],
            valueTable: [
                {"Price": 8500.0, "PriceUnit": "gp", "Name": "Helm of the mammoth lord", "id": "helm-of-the-mammoth-lord"},
                {"Price": 9000.0, "PriceUnit": "gp", "Name": "Veil of fleeting glances", "id": "veil-of-fleeting-glances"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Mask of a thousand tomes", "id": "mask-of-a-thousand-tomes"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Medusa mask", "id": "medusa-mask"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Cap of the free thinker", "id": "cap-of-the-free-thinker"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Halo of inner calm", "id": "halo-of-inner-calm"}
            ]
        },
        greater_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [14, 39, 55, 68, 83, 92],
            valueTable: [
                {"Price": 59200.0, "PriceUnit": "gp", "Name": "Judge's wig", "id": "judge-s-wig"},
                {"Price": 73500.0, "PriceUnit": "gp", "Name": "Helm of teleportation", "id": "helm-of-teleportation"},
                {"Price": 84000.0, "PriceUnit": "gp", "Name": "Halo of menace", "id": "halo-of-menace"},
                {"Price": 90000.0, "PriceUnit": "gp", "Name": "Mask of giants, greater", "id": "mask-of-giants-greater"},
                {"Price": 125000.0, "PriceUnit": "gp", "Name": "Helm of brilliance", "id": "helm-of-brilliance"},
                {"Price": 125000.0, "PriceUnit": "gp", "Name": "Helm of electric radiance", "id": "helm-of-electric-radiance"},
                {"Price": 150000.0, "PriceUnit": "gp", "Name": "Crown of heaven", "id": "crown-of-heaven"}
            ]
        }
    },
    slotless: {
        greater_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 20, 21, 22, 25, 31, 32, 33, 34, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 81, 82, 83, 87, 88, 91, 93, 95, 99],
            valueTable: [
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Chalice of poison weeping", "id": "chalice-of-poison-weeping"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Exorcist's aspergillum", "id": "exorcist-s-aspergillum"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Golem manual (flesh)", "id": "golem-manual-flesh"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Harp of shattering", "id": "harp-of-shattering"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Insignia of valor", "id": "insignia-of-valor"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Ioun stone (deep red sphere)", "id": "ioun-stone-deep-red-sphere"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Ioun stone (incandescent blue sphere)", "id": "ioun-stone-incandescent-blue-sphere"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Ioun stone (pale blue rhomboid)", "id": "ioun-stone-pale-blue-rhomboid"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Ioun stone (pink and green sphere)", "id": "ioun-stone-pink-and-green-sphere"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Ioun stone (pink rhomboid)", "id": "ioun-stone-pink-rhomboid"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Ioun stone (scarlet and blue sphere)", "id": "ioun-stone-scarlet-and-blue-sphere"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Needles of fleshgraving", "id": "needles-of-fleshgraving"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Restless lockpicks", "id": "restless-lockpicks"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Werewhistle", "id": "werewhistle"},
                {"Price": 8100.0, "PriceUnit": "gp", "Name": "Deck of illusions", "id": "deck-of-illusions"},
                {"Price": 8400.0, "PriceUnit": "gp", "Name": "Candle of invocation", "id": "candle-of-invocation"},
                {"Price": 8500.0, "PriceUnit": "gp", "Name": "Bag of tricks (rust)", "id": "bag-of-tricks-rust"},
                {"Price": 9000.0, "PriceUnit": "gp", "Name": "Boro bead (3rd)", "id": "boro-bead-3rd"},
                {"Price": 9000.0, "PriceUnit": "gp", "Name": "Decanter of endless water", "id": "decanter-of-endless-water"},
                {"Price": 9000.0, "PriceUnit": "gp", "Name": "Loathsome mirror", "id": "loathsome-mirror"},
                {"Price": 9000.0, "PriceUnit": "gp", "Name": "Page of spell knowledge, 3rd level", "id": "page-of-spell-knowledge-3rd-level"},
                {"Price": 9000.0, "PriceUnit": "gp", "Name": "Pearl of Power, 3rd level", "id": "pearl-of-power-3rd-level"},
                {"Price": 9000.0, "PriceUnit": "gp", "Name": "Preserving flask, 3rd level", "id": "preserving-flask-3rd-level"},
                {"Price": 9100.0, "PriceUnit": "gp", "Name": "Figurine of wondrous power (serpentine owl)", "id": "figurine-of-wondrous-power-serpentine-owl"},
                {"Price": 9600.0, "PriceUnit": "gp", "Name": "Strand of prayer beads (lesser)", "id": "strand-of-prayer-beads-lesser"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Bag of holding IV", "id": "bag-of-holding-iv"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Boundary chalk", "id": "boundary-chalk"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Chime of resounding silence", "id": "chime-of-resounding-silence"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Construct channel brick", "id": "construct-channel-brick"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Doomharp", "id": "doomharp"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Drum of advance and retreat", "id": "drum-of-advance-and-retreat"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Embalming thread", "id": "embalming-thread"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Eye of the void", "id": "eye-of-the-void"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Figurine of wondrous power (bronze griffon)", "id": "figurine-of-wondrous-power-bronze-griffon"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Figurine of wondrous power (ebony fly)", "id": "figurine-of-wondrous-power-ebony-fly"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Figurine of wondrous power (slate spider)", "id": "figurine-of-wondrous-power-slate-spider"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Hourglass of last chances", "id": "hourglass-of-last-chances"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Ioun stone (dark blue rhomboid)", "id": "ioun-stone-dark-blue-rhomboid"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Ki mat", "id": "ki-mat"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Lord's banner (swiftness)", "id": "lord-s-banner-swiftness"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Malleable symbol", "id": "malleable-symbol"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Migrus locker", "id": "migrus-locker"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Ornament of healing light", "id": "ornament-of-healing-light"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Prayer wheel of ethical strength", "id": "prayer-wheel-of-ethical-strength"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Stone horse (courser)", "id": "stone-horse-courser"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Summon-slave crystal", "id": "summon-slave-crystal"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Treasurer's seal", "id": "treasurer-s-seal"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Black soul shard", "id": "black-soul-shard"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Golem manual (clay)", "id": "golem-manual-clay"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Horsemaster's saddle", "id": "horsemaster-s-saddle"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Pipes of dissolution", "id": "pipes-of-dissolution"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Pipes of pain", "id": "pipes-of-pain"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Seeker's sight", "id": "seeker-s-sight"},
                {"Price": 12500.0, "PriceUnit": "gp", "Name": "Blessed book", "id": "blessed-book"},
                {"Price": 12500.0, "PriceUnit": "gp", "Name": "Waters of transfiguration", "id": "waters-of-transfiguration"},
                {"Price": 13000.0, "PriceUnit": "gp", "Name": "Gem of brightness", "id": "gem-of-brightness"},
                {"Price": 13000.0, "PriceUnit": "gp", "Name": "Harp of contagion", "id": "harp-of-contagion"},
                {"Price": 13000.0, "PriceUnit": "gp", "Name": "Lyre of building", "id": "lyre-of-building"},
                {"Price": 14000.0, "PriceUnit": "gp", "Name": "Void pennant", "id": "void-pennant"},
                {"Price": 14800.0, "PriceUnit": "gp", "Name": "Stone horse (destrier)", "id": "stone-horse-destrier"},
                {"Price": 15000.0, "PriceUnit": "gp", "Name": "Book of the loremaster", "id": "book-of-the-loremaster"},
                {"Price": 15000.0, "PriceUnit": "gp", "Name": "Cauldron of plenty", "id": "cauldron-of-plenty"},
                {"Price": 15000.0, "PriceUnit": "gp", "Name": "Horn of judgment", "id": "horn-of-judgment"},
                {"Price": 15000.0, "PriceUnit": "gp", "Name": "Horn of the tritons", "id": "horn-of-the-tritons"},
                {"Price": 15300.0, "PriceUnit": "gp", "Name": "Pearl of the sirines", "id": "pearl-of-the-sirines"},
                {"Price": 15500.0, "PriceUnit": "gp", "Name": "Figurine of wondrous power (onyx dog)", "id": "figurine-of-wondrous-power-onyx-dog"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Bag of tricks (tan)", "id": "bag-of-tricks-tan"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Boro bead (4th)", "id": "boro-bead-4th"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Page of spell knowledge, 4th level", "id": "page-of-spell-knowledge-4th-level"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Pearl of Power, 4th level", "id": "pearl-of-power-4th-level"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Preserving flask, 4th level", "id": "preserving-flask-4th-level"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Scabbard of keen edges", "id": "scabbard-of-keen-edges"},
                {"Price": 16500.0, "PriceUnit": "gp", "Name": "Figurine of wondrous power (golden lions)", "id": "figurine-of-wondrous-power-golden-lions"},
                {"Price": 16800.0, "PriceUnit": "gp", "Name": "Chime of interruption", "id": "chime-of-interruption"},
                {"Price": 17000.0, "PriceUnit": "gp", "Name": "Broom of flying", "id": "broom-of-flying"},
                {"Price": 17000.0, "PriceUnit": "gp", "Name": "Figurine of wondrous power (marble elephant)", "id": "figurine-of-wondrous-power-marble-elephant"}
            ]
        },
        lesser_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 19, 22, 25, 27, 28, 31, 32, 34, 36, 37, 38, 39, 40, 42, 43, 44, 46, 48, 51, 53, 57, 61, 63, 69, 72, 75, 79, 83, 86, 89, 92, 97],
            valueTable: [
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Feather token (anchor)", "id": "feather-token-anchor"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Universal solvent", "id": "universal-solvent"},
                {"Price": 75.0, "PriceUnit": "gp", "Name": "Ioun torch", "id": "ioun-torch"},
                {"Price": 100.0, "PriceUnit": "gp", "Name": "Stubborn nail", "id": "stubborn-nail"},
                {"Price": 100.0, "PriceUnit": "gp", "Name": "War paint of the terrible visage", "id": "war-paint-of-the-terrible-visage"},
                {"Price": 150.0, "PriceUnit": "gp", "Name": "Elixir of love", "id": "elixir-of-love"},
                {"Price": 150.0, "PriceUnit": "gp", "Name": "Unguent of timelessness", "id": "unguent-of-timelessness"},
                {"Price": 200.0, "PriceUnit": "gp", "Name": "Feather token (fan)", "id": "feather-token-fan"},
                {"Price": 200.0, "PriceUnit": "gp", "Name": "Formula alembic", "id": "formula-alembic"},
                {"Price": 200.0, "PriceUnit": "gp", "Name": "Hybridization funnel", "id": "hybridization-funnel"},
                {"Price": 200.0, "PriceUnit": "gp", "Name": "Soul soap", "id": "soul-soap"},
                {"Price": 250.0, "PriceUnit": "gp", "Name": "Dust of tracelessness", "id": "dust-of-tracelessness"},
                {"Price": 250.0, "PriceUnit": "gp", "Name": "Elixir of hiding", "id": "elixir-of-hiding"},
                {"Price": 250.0, "PriceUnit": "gp", "Name": "Elixir of swimming", "id": "elixir-of-swimming"},
                {"Price": 250.0, "PriceUnit": "gp", "Name": "Elixir of tumbling", "id": "elixir-of-tumbling"},
                {"Price": 250.0, "PriceUnit": "gp", "Name": "Elixir of vision", "id": "elixir-of-vision"},
                {"Price": 250.0, "PriceUnit": "gp", "Name": "Nightdrops", "id": "nightdrops"},
                {"Price": 250.0, "PriceUnit": "gp", "Name": "Oil of silence", "id": "oil-of-silence"},
                {"Price": 250.0, "PriceUnit": "gp", "Name": "Silversheen", "id": "silversheen"},
                {"Price": 250.0, "PriceUnit": "gp", "Name": "Traveler's any-tool", "id": "traveler-s-any-tool"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Bottle of messages", "id": "bottle-of-messages"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Feather token (bird)", "id": "feather-token-bird"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Origami swarm", "id": "origami-swarm"},
                {"Price": 400.0, "PriceUnit": "gp", "Name": "Alluring golden apple", "id": "alluring-golden-apple"},
                {"Price": 400.0, "PriceUnit": "gp", "Name": "Feather token (tree)", "id": "feather-token-tree"},
                {"Price": 400.0, "PriceUnit": "gp", "Name": "Key of lock jamming", "id": "key-of-lock-jamming"},
                {"Price": 450.0, "PriceUnit": "gp", "Name": "Feather token (swan boat)", "id": "feather-token-swan-boat"},
                {"Price": 500.0, "PriceUnit": "gp", "Name": "Animated portrait", "id": "animated-portrait"},
                {"Price": 500.0, "PriceUnit": "gp", "Name": "Bottled misfortune", "id": "bottled-misfortune"},
                {"Price": 500.0, "PriceUnit": "gp", "Name": "Elixir of truth", "id": "elixir-of-truth"},
                {"Price": 500.0, "PriceUnit": "gp", "Name": "Feather token (whip)", "id": "feather-token-whip"},
                {"Price": 500.0, "PriceUnit": "gp", "Name": "Scabbard of honing", "id": "scabbard-of-honing"},
                {"Price": 550.0, "PriceUnit": "gp", "Name": "Seer's tea", "id": "seer-s-tea"},
                {"Price": 600.0, "PriceUnit": "gp", "Name": "Abjurant salt", "id": "abjurant-salt"},
                {"Price": 600.0, "PriceUnit": "gp", "Name": "Arrow magnet", "id": "arrow-magnet"},
                {"Price": 600.0, "PriceUnit": "gp", "Name": "Dust of darkness", "id": "dust-of-darkness"},
                {"Price": 720.0, "PriceUnit": "gp", "Name": "Campfire bead", "id": "campfire-bead"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Archon's torch", "id": "archon-s-torch"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Book of extended summoning (lesser)", "id": "book-of-extended-summoning-lesser"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Iron rope", "id": "iron-rope"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Snapleaf", "id": "snapleaf"},
                {"Price": 800.0, "PriceUnit": "gp", "Name": "Bottled yeti fur", "id": "bottled-yeti-fur"},
                {"Price": 800.0, "PriceUnit": "gp", "Name": "Defoliant polish", "id": "defoliant-polish"},
                {"Price": 800.0, "PriceUnit": "gp", "Name": "Dust of emulation", "id": "dust-of-emulation"},
                {"Price": 800.0, "PriceUnit": "gp", "Name": "Steadfast gut-stone", "id": "steadfast-gut-stone"},
                {"Price": 850.0, "PriceUnit": "gp", "Name": "Dust of dryness", "id": "dust-of-dryness"}
            ]
        },
        greater_minor: {
            create: function () {
                var item = clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
                if (item === "ROLL_ON_LESSER_MINOR_TABLE") {
                    return random_wondrous_item.slotless.lesser_minor.create();
                }
            },
            chanceTable: [3, 4, 5, 6, 7, 9, 10, 11, 12, 14, 17, 18, 20, 22, 23, 26, 27, 29, 31, 33, 35, 36, 37, 38, 40, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 59, 62, 64, 65, 66, 68, 69, 70, 72, 73, 77, 78, 80, 81, 86, 88, 89, 92, 95, 96, 97, 99],
            valueTable: [
                "ROLL_ON_LESSER_MINOR_TABLE",
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Anatomy doll", "id": "anatomy-doll"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Bead of newt prevention", "id": "bead-of-newt-prevention"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Beast-bond brand", "id": "beast-bond-brand"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Bookplate of recall", "id": "bookplate-of-recall"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Boro bead (1st)", "id": "boro-bead-1st"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Concealing pocket", "id": "concealing-pocket"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Dowsing syrup", "id": "dowsing-syrup"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Incense of transcendence", "id": "incense-of-transcendence"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Page of spell knowledge, 1st level", "id": "page-of-spell-knowledge-1st-level"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Pearl of Power, 1st level", "id": "pearl-of-power-1st-level"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Preserving flask 1st level", "id": "preserving-flask-1st-level"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Pyxes of redirected focus", "id": "pyxes-of-redirected-focus"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Salve of slipperiness", "id": "salve-of-slipperiness"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Wasp nest of swarming", "id": "wasp-nest-of-swarming"},
                {"Price": 1100.0, "PriceUnit": "gp", "Name": "Elixir of fire breath", "id": "elixir-of-fire-breath"},
                {"Price": 1100.0, "PriceUnit": "gp", "Name": "Grave salt", "id": "grave-salt"},
                {"Price": 1150.0, "PriceUnit": "gp", "Name": "Pipes of the sewers", "id": "pipes-of-the-sewers"},
                {"Price": 1200.0, "PriceUnit": "gp", "Name": "Dust of illusion", "id": "dust-of-illusion"},
                {"Price": 1200.0, "PriceUnit": "gp", "Name": "Goblin skull bomb", "id": "goblin-skull-bomb"},
                {"Price": 1400.0, "PriceUnit": "gp", "Name": "Elixir of dragon breath", "id": "elixir-of-dragon-breath"},
                {"Price": 1500.0, "PriceUnit": "gp", "Name": "Bookmark of deception", "id": "bookmark-of-deception"},
                {"Price": 1500.0, "PriceUnit": "gp", "Name": "Word bottle", "id": "word-bottle"},
                {"Price": 1600.0, "PriceUnit": "gp", "Name": "Dust of acid consumption", "id": "dust-of-acid-consumption"},
                {"Price": 1800.0, "PriceUnit": "gp", "Name": "Dust of appearance", "id": "dust-of-appearance"},
                {"Price": 1800.0, "PriceUnit": "gp", "Name": "Efficient quiver", "id": "efficient-quiver"},
                {"Price": 1800.0, "PriceUnit": "gp", "Name": "Pipes of sounding", "id": "pipes-of-sounding"},
                {"Price": 1800.0, "PriceUnit": "gp", "Name": "Scabbard of vigor", "id": "scabbard-of-vigor"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Agile alpenstock", "id": "agile-alpenstock"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Blood reservoir of physical prowess", "id": "blood-reservoir-of-physical-prowess"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Clamor box", "id": "clamor-box"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Dry load powder horn", "id": "dry-load-powder-horn"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Goblin fire drum (normal)", "id": "goblin-fire-drum-normal"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Handy haversack", "id": "handy-haversack"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Horn of fog", "id": "horn-of-fog"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Iron spike of safe passage", "id": "iron-spike-of-safe-passage"},
                {"Price": 2200.0, "PriceUnit": "gp", "Name": "Knight's pennon (honor)", "id": "knight-s-pennon-honor"},
                {"Price": 2200.0, "PriceUnit": "gp", "Name": "Volatile vaporizer, 1st level", "id": "volatile-vaporizer-1st-level"},
                {"Price": 2250.0, "PriceUnit": "gp", "Name": "Elemental gem", "id": "elemental-gem"},
                {"Price": 2250.0, "PriceUnit": "gp", "Name": "Flying ointment", "id": "flying-ointment"},
                {"Price": 2400.0, "PriceUnit": "gp", "Name": "Sovereign glue", "id": "sovereign-glue"},
                {"Price": 2500.0, "PriceUnit": "gp", "Name": "Apple of eternal sleep", "id": "apple-of-eternal-sleep"},
                {"Price": 2500.0, "PriceUnit": "gp", "Name": "Bag of holding I", "id": "bag-of-holding-i"},
                {"Price": 2500.0, "PriceUnit": "gp", "Name": "Candle of truth", "id": "candle-of-truth"},
                {"Price": 2500.0, "PriceUnit": "gp", "Name": "Hexing doll", "id": "hexing-doll"},
                {"Price": 2700.0, "PriceUnit": "gp", "Name": "Stone of alarm", "id": "stone-of-alarm"},
                {"Price": 2750.0, "PriceUnit": "gp", "Name": "Book of extended summoning (standard)", "id": "book-of-extended-summoning-standard"},
                {"Price": 3000.0, "PriceUnit": "gp", "Name": "Bead of force", "id": "bead-of-force"},
                {"Price": 3000.0, "PriceUnit": "gp", "Name": "Cauldron of brewing", "id": "cauldron-of-brewing"},
                {"Price": 3000.0, "PriceUnit": "gp", "Name": "Chime of opening", "id": "chime-of-opening"},
                {"Price": 3000.0, "PriceUnit": "gp", "Name": "Philter of love", "id": "philter-of-love"},
                {"Price": 3000.0, "PriceUnit": "gp", "Name": "Rope of climbing", "id": "rope-of-climbing"},
                {"Price": 3000.0, "PriceUnit": "gp", "Name": "Volatile vaporizer, 2nd level", "id": "volatile-vaporizer-2nd-level"},
                {"Price": 3300.0, "PriceUnit": "gp", "Name": "Shroud of disintegration", "id": "shroud-of-disintegration"},
                {"Price": 3400.0, "PriceUnit": "gp", "Name": "Bag of tricks (gray)", "id": "bag-of-tricks-gray"},
                {"Price": 3500.0, "PriceUnit": "gp", "Name": "Dust of disappearance", "id": "dust-of-disappearance"},
                {"Price": 3600.0, "PriceUnit": "gp", "Name": "Dust of weighty burdens", "id": "dust-of-weighty-burdens"},
                {"Price": 3600.0, "PriceUnit": "gp", "Name": "Noble's vigilant pillbox", "id": "noble-s-vigilant-pillbox"},
                {"Price": 3800.0, "PriceUnit": "gp", "Name": "Figurine of wondrous power (silver raven)", "id": "figurine-of-wondrous-power-silver-raven"},
                {"Price": 3800.0, "PriceUnit": "gp", "Name": "Volatile vaporizer, 3rd level", "id": "volatile-vaporizer-3rd-level"}
            ]
        },
        lesser_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [3, 4, 8, 9, 13, 17, 21, 24, 27, 31, 35, 37, 40, 42, 43, 45, 48, 51, 53, 57, 64, 67, 69, 73, 76, 80, 84, 88, 92, 96],
            valueTable: [
                {"Price": 18000.0, "PriceUnit": "gp", "Name": "Ioun stone (iridescent spindle)", "id": "ioun-stone-iridescent-spindle"},
                {"Price": 18000.0, "PriceUnit": "gp", "Name": "Orb of foul Abaddon", "id": "orb-of-foul-abaddon"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Carpet of flying (5 ft. by 5 ft.)", "id": "carpet-of-flying-5-ft-by-5-ft"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Horn of antagonism", "id": "horn-of-antagonism"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Horn of blasting", "id": "horn-of-blasting"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Ioun stone (pale lavender ellipsoid)", "id": "ioun-stone-pale-lavender-ellipsoid"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Ioun stone (pearly white spindle)", "id": "ioun-stone-pearly-white-spindle"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Master's perfect golden bell", "id": "master-s-perfect-golden-bell"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Necromancer's athame", "id": "necromancer-s-athame"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Portable hole", "id": "portable-hole"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Stone of good luck", "id": "stone-of-good-luck"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Figurine of wondrous power (ivory goats)", "id": "figurine-of-wondrous-power-ivory-goats"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Rope of entanglement", "id": "rope-of-entanglement"},
                {"Price": 22000.0, "PriceUnit": "gp", "Name": "Golem manual (stone)", "id": "golem-manual-stone"},
                {"Price": 22000.0, "PriceUnit": "gp", "Name": "Orb of golden heaven", "id": "orb-of-golden-heaven"},
                {"Price": 23348.0, "PriceUnit": "gp", "Name": "Mattock of the titans", "id": "mattock-of-the-titans"},
                {"Price": 24000.0, "PriceUnit": "gp", "Name": "Drinking horn of bottomless valor", "id": "drinking-horn-of-bottomless-valor"},
                {"Price": 25000.0, "PriceUnit": "gp", "Name": "Boro bead (5th)", "id": "boro-bead-5th"},
                {"Price": 25000.0, "PriceUnit": "gp", "Name": "Chaos emerald", "id": "chaos-emerald"},
                {"Price": 25000.0, "PriceUnit": "gp", "Name": "Page of spell knowledge, 5th level", "id": "page-of-spell-knowledge-5th-level"},
                {"Price": 25000.0, "PriceUnit": "gp", "Name": "Pearl of Power, 5th level", "id": "pearl-of-power-5th-level"},
                {"Price": 25000.0, "PriceUnit": "gp", "Name": "Preserving flask, 5th level", "id": "preserving-flask-5th-level"},
                {"Price": 25305.0, "PriceUnit": "gp", "Name": "Maul of the titans", "id": "maul-of-the-titans"},
                {"Price": 26000.0, "PriceUnit": "gp", "Name": "Iron bands of binding", "id": "iron-bands-of-binding"},
                {"Price": 27000.0, "PriceUnit": "gp", "Name": "Cube of frost resistance", "id": "cube-of-frost-resistance"},
                {"Price": 27500.0, "PriceUnit": "gp", "Name": "Manual of bodily health +1", "id": "manual-of-bodily-health-1"},
                {"Price": 27500.0, "PriceUnit": "gp", "Name": "Manual of gainful exercise +1", "id": "manual-of-gainful-exercise-1"},
                {"Price": 27500.0, "PriceUnit": "gp", "Name": "Manual of quickness of action +1", "id": "manual-of-quickness-of-action-1"},
                {"Price": 27500.0, "PriceUnit": "gp", "Name": "Tome of clear thought +1", "id": "tome-of-clear-thought-1"},
                {"Price": 27500.0, "PriceUnit": "gp", "Name": "Tome of leadership and influence +1", "id": "tome-of-leadership-and-influence-1"},
                {"Price": 27500.0, "PriceUnit": "gp", "Name": "Tome of understanding +1", "id": "tome-of-understanding-1"}
            ]
        },
        lesser_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [1, 2, 3, 4, 6, 7, 15, 25, 26, 27, 30, 31, 32, 33, 34, 35, 36, 37, 51, 52, 53, 54, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 79, 79, 80, 81, 83, 84, 85, 87, 94, 95, 96, 97],
            valueTable: [
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Boro bead (2nd)", "id": "boro-bead-2nd"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Cautionary creance", "id": "cautionary-creance"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Escape ladder", "id": "escape-ladder"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Far-reaching sight", "id": "far-reaching-sight"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Ioun stone (clear spindle)", "id": "ioun-stone-clear-spindle"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Marvelous pigments", "id": "marvelous-pigments"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Page of spell knowledge, 2nd level", "id": "page-of-spell-knowledge-2nd-level"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Pearl of Power, 2nd level", "id": "pearl-of-power-2nd-level"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Preserving flask, 2nd level", "id": "preserving-flask-2nd-level"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Restorative ointment", "id": "restorative-ointment"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Stone salve", "id": "stone-salve"},
                {"Price": 4400.0, "PriceUnit": "gp", "Name": "Wind-caller compass", "id": "wind-caller-compass"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Goblin fire drum (greater)", "id": "goblin-fire-drum-greater"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Knight's pennon (battle)", "id": "knight-s-pennon-battle"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Knight's pennon (parley)", "id": "knight-s-pennon-parley"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Void dust", "id": "void-dust"},
                {"Price": 4900.0, "PriceUnit": "gp", "Name": "Incense of meditation", "id": "incense-of-meditation"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Admixture vial", "id": "admixture-vial"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Bag of holding II", "id": "bag-of-holding-ii"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Bone razor", "id": "bone-razor"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Horn of the huntmaster", "id": "horn-of-the-huntmaster"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Insistent doorknocker", "id": "insistent-doorknocker"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Ioun stone (dusty rose prism)", "id": "ioun-stone-dusty-rose-prism"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Mallet of building", "id": "mallet-of-building"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Polymorphic pouch", "id": "polymorphic-pouch"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Scabbard of stanching", "id": "scabbard-of-stanching"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "School of eyes", "id": "school-of-eyes"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Sheath of bladestealth", "id": "sheath-of-bladestealth"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Stone of alliance", "id": "stone-of-alliance"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Summoning shackle", "id": "summoning-shackle"},
                {"Price": 5400.0, "PriceUnit": "gp", "Name": "Eversmoking bottle", "id": "eversmoking-bottle"},
                {"Price": 5400.0, "PriceUnit": "gp", "Name": "Sustaining spoon", "id": "sustaining-spoon"},
                {"Price": 5500.0, "PriceUnit": "gp", "Name": "Wind fan", "id": "wind-fan"},
                {"Price": 5800.0, "PriceUnit": "gp", "Name": "Grim lantern", "id": "grim-lantern"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Coin of the untrodden road", "id": "coin-of-the-untrodden-road"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Horn of battle clarity", "id": "horn-of-battle-clarity"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Life link badge", "id": "life-link-badge"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Martyr's tear", "id": "martyr-s-tear"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Pipes of haunting", "id": "pipes-of-haunting"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Rope of knots", "id": "rope-of-knots"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Singing bell of striking", "id": "singing-bell-of-striking"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Stone familiar", "id": "stone-familiar"},
                {"Price": 6126.0, "PriceUnit": "gp", "Name": "Book of extended summoning (greater)", "id": "book-of-extended-summoning-greater"},
                {"Price": 6400.0, "PriceUnit": "gp", "Name": "Dragonbone divination sticks", "id": "dragonbone-divination-sticks"},
                {"Price": 6500.0, "PriceUnit": "gp", "Name": "Horn of goodness/evil", "id": "horn-of-goodness-evil"},
                {"Price": 6600.0, "PriceUnit": "gp", "Name": "Naga-scale bindi", "id": "naga-scale-bindi"},
                {"Price": 7000.0, "PriceUnit": "gp", "Name": "Bottle of shadows", "id": "bottle-of-shadows"},
                {"Price": 7000.0, "PriceUnit": "gp", "Name": "Cape of bravado", "id": "cape-of-bravado"},
                {"Price": 7000.0, "PriceUnit": "gp", "Name": "Instant bridge", "id": "instant-bridge"},
                {"Price": 7000.0, "PriceUnit": "gp", "Name": "Mirror of guarding reflections", "id": "mirror-of-guarding-reflections"},
                {"Price": 7200.0, "PriceUnit": "gp", "Name": "Folding boat", "id": "folding-boat"},
                {"Price": 7250.0, "PriceUnit": "gp", "Name": "Bottle of air", "id": "bottle-of-air"},
                {"Price": 7400.0, "PriceUnit": "gp", "Name": "Bag of holding III", "id": "bag-of-holding-iii"},
                {"Price": 7500.0, "PriceUnit": "gp", "Name": "Balm of impish grace", "id": "balm-of-impish-grace"},
                {"Price": 7500.0, "PriceUnit": "gp", "Name": "Candle of clean air", "id": "candle-of-clean-air"},
                {"Price": 7500.0, "PriceUnit": "gp", "Name": "Harp of charming", "id": "harp-of-charming"},
                {"Price": 7500.0, "PriceUnit": "gp", "Name": "Manual of war", "id": "manual-of-war"}
            ]
        },
        greater_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [3, 5, 8, 9, 11, 15, 19, 23, 27, 31, 35, 36, 37, 39, 40, 41, 43, 49, 50, 51, 54, 55, 56, 57, 59, 62, 63, 65, 67, 69, 71, 73, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
            valueTable: [
                {"Price": 50000.0, "PriceUnit": "gp", "Name": "Crystal ball with see invisibility", "id": "crystal-ball-with-see-invisibility"},
                {"Price": 50000.0, "PriceUnit": "gp", "Name": "Horn of Valhalla", "id": "horn-of-valhalla"},
                {"Price": 51000.0, "PriceUnit": "gp", "Name": "Crystal ball with detect thoughts", "id": "crystal-ball-with-detect-thoughts"},
                {"Price": 52000.0, "PriceUnit": "gp", "Name": "Last leaves of the autumn dryad", "id": "last-leaves-of-the-autumn-dryad"},
                {"Price": 55000.0, "PriceUnit": "gp", "Name": "Instant fortress", "id": "instant-fortress"},
                {"Price": 55000.0, "PriceUnit": "gp", "Name": "Manual of bodily health +2", "id": "manual-of-bodily-health-2"},
                {"Price": 55000.0, "PriceUnit": "gp", "Name": "Manual of gainful exercise +2", "id": "manual-of-gainful-exercise-2"},
                {"Price": 55000.0, "PriceUnit": "gp", "Name": "Manual of quickness of action +2", "id": "manual-of-quickness-of-action-2"},
                {"Price": 55000.0, "PriceUnit": "gp", "Name": "Tome of clear thought +2", "id": "tome-of-clear-thought-2"},
                {"Price": 55000.0, "PriceUnit": "gp", "Name": "Tome of leadership and influence +2", "id": "tome-of-leadership-and-influence-2"},
                {"Price": 55000.0, "PriceUnit": "gp", "Name": "Tome of understanding +2", "id": "tome-of-understanding-2"},
                {"Price": 56000.0, "PriceUnit": "gp", "Name": "Lord's banner (terror)", "id": "lord-s-banner-terror"},
                {"Price": 60000.0, "PriceUnit": "gp", "Name": "Carpet of flying (10 ft. by 10 ft.)", "id": "carpet-of-flying-10-ft-by-10-ft"},
                {"Price": 60000.0, "PriceUnit": "gp", "Name": "Darkskull", "id": "darkskull"},
                {"Price": 60000.0, "PriceUnit": "gp", "Name": "Orb of pure law", "id": "orb-of-pure-law"},
                {"Price": 62000.0, "PriceUnit": "gp", "Name": "Cube of force", "id": "cube-of-force"},
                {"Price": 64000.0, "PriceUnit": "gp", "Name": "Page of spell knowledge, 8th level", "id": "page-of-spell-knowledge-8th-level"},
                {"Price": 64000.0, "PriceUnit": "gp", "Name": "Pearl of Power, 8th level", "id": "pearl-of-power-8th-level"},
                {"Price": 70000.0, "PriceUnit": "gp", "Name": "Crystal ball with telepathy", "id": "crystal-ball-with-telepathy"},
                {"Price": 70000.0, "PriceUnit": "gp", "Name": "Horn of blasting (greater)", "id": "horn-of-blasting-greater"},
                {"Price": 70000.0, "PriceUnit": "gp", "Name": "Pearl of Power, two spells", "id": "pearl-of-power-two-spells"},
                {"Price": 75000.0, "PriceUnit": "gp", "Name": "Gem of seeing", "id": "gem-of-seeing"},
                {"Price": 75000.0, "PriceUnit": "gp", "Name": "Lord's banner (victory)", "id": "lord-s-banner-victory"},
                {"Price": 80000.0, "PriceUnit": "gp", "Name": "Crystal ball with true seeing", "id": "crystal-ball-with-true-seeing"},
                {"Price": 81000.0, "PriceUnit": "gp", "Name": "Page of spell knowledge, 9th level", "id": "page-of-spell-knowledge-9th-level"},
                {"Price": 81000.0, "PriceUnit": "gp", "Name": "Pearl of Power, 9th level", "id": "pearl-of-power-9th-level"},
                {"Price": 82000.0, "PriceUnit": "gp", "Name": "Well of many worlds", "id": "well-of-many-worlds"},
                {"Price": 82500.0, "PriceUnit": "gp", "Name": "Manual of bodily health +3", "id": "manual-of-bodily-health-3"},
                {"Price": 82500.0, "PriceUnit": "gp", "Name": "Manual of gainful exercise +3", "id": "manual-of-gainful-exercise-3"},
                {"Price": 82500.0, "PriceUnit": "gp", "Name": "Manual of quickness of action +3", "id": "manual-of-quickness-of-action-3"},
                {"Price": 82500.0, "PriceUnit": "gp", "Name": "Tome of clear thought +3", "id": "tome-of-clear-thought-3"},
                {"Price": 82500.0, "PriceUnit": "gp", "Name": "Tome of leadership and influence +3", "id": "tome-of-leadership-and-influence-3"},
                {"Price": 82500.0, "PriceUnit": "gp", "Name": "Tome of understanding +3", "id": "tome-of-understanding-3"},
                {"Price": 90000.0, "PriceUnit": "gp", "Name": "Apparatus of the crab", "id": "apparatus-of-the-crab"},
                {"Price": 90000.0, "PriceUnit": "gp", "Name": "Bowl of conjuring water elementals", "id": "bowl-of-conjuring-water-elementals"},
                {"Price": 90000.0, "PriceUnit": "gp", "Name": "Brazier of conjuring fire elementals", "id": "brazier-of-conjuring-fire-elementals"},
                {"Price": 90000.0, "PriceUnit": "gp", "Name": "Censer of conjuring air elementals", "id": "censer-of-conjuring-air-elementals"},
                {"Price": 90000.0, "PriceUnit": "gp", "Name": "Stone of conjuring earth elementals", "id": "stone-of-conjuring-earth-elementals"},
                {"Price": 92000.0, "PriceUnit": "gp", "Name": "Mirror of opposition", "id": "mirror-of-opposition"},
                {"Price": 95800.0, "PriceUnit": "gp", "Name": "Strand of prayer beads (greater)", "id": "strand-of-prayer-beads-greater"},
                {"Price": 100000.0, "PriceUnit": "gp", "Name": "Lord's banner (crusades)", "id": "lord-s-banner-crusades"},
                {"Price": 110000.0, "PriceUnit": "gp", "Name": "Manual of bodily health +4", "id": "manual-of-bodily-health-4"},
                {"Price": 110000.0, "PriceUnit": "gp", "Name": "Manual of gainful exercise +4", "id": "manual-of-gainful-exercise-4"},
                {"Price": 110000.0, "PriceUnit": "gp", "Name": "Manual of quickness of action +4", "id": "manual-of-quickness-of-action-4"},
                {"Price": 110000.0, "PriceUnit": "gp", "Name": "Tome of clear thought +4", "id": "tome-of-clear-thought-4"},
                {"Price": 110000.0, "PriceUnit": "gp", "Name": "Tome of leadership and influence +4", "id": "tome-of-leadership-and-influence-4"},
                {"Price": 110000.0, "PriceUnit": "gp", "Name": "Tome of understanding +4", "id": "tome-of-understanding-4"},
                {"Price": 137500.0, "PriceUnit": "gp", "Name": "Manual of bodily health +5", "id": "manual-of-bodily-health-5"},
                {"Price": 137500.0, "PriceUnit": "gp", "Name": "Manual of gainful exercise +5", "id": "manual-of-gainful-exercise-5"},
                {"Price": 137500.0, "PriceUnit": "gp", "Name": "Manual of quickness of action +5", "id": "manual-of-quickness-of-action-5"},
                {"Price": 137500.0, "PriceUnit": "gp", "Name": "Tome of clear thought +5", "id": "tome-of-clear-thought-5"},
                {"Price": 137500.0, "PriceUnit": "gp", "Name": "Tome of leadership and influence +5", "id": "tome-of-leadership-and-influence-5"},
                {"Price": 137500.0, "PriceUnit": "gp", "Name": "Tome of understanding +5", "id": "tome-of-understanding-5"},
                {"Price": 145000.0, "PriceUnit": "gp", "Name": "Efreeti bottle", "id": "efreeti-bottle"},
                {"Price": 164000.0, "PriceUnit": "gp", "Name": "Cubic gate", "id": "cubic-gate"},
                {"Price": 170000.0, "PriceUnit": "gp", "Name": "Iron flask", "id": "iron-flask"},
                {"Price": 175000.0, "PriceUnit": "gp", "Name": "Mirror of mental prowess", "id": "mirror-of-mental-prowess"},
                {"Price": 200000.0, "PriceUnit": "gp", "Name": "Mirror of life trapping", "id": "mirror-of-life-trapping"}
            ]
        }
    },
    feet: {
        greater_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [38, 72],
            valueTable: [
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Shoes of the firewalker", "id": "shoes-of-the-firewalker"},
                {"Price": 24000.0, "PriceUnit": "gp", "Name": "Dryad sandals", "id": "dryad-sandals"},
                {"Price": 27000.0, "PriceUnit": "gp", "Name": "Horseshoes of mist", "id": "horseshoes-of-mist"}
            ]
        },
        lesser_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [11, 22, 31, 41, 50, 60, 76, 85, 92],
            valueTable: [
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Boots of the cat", "id": "boots-of-the-cat"},
                {"Price": 1400.0, "PriceUnit": "gp", "Name": "Daredevil boots", "id": "daredevil-boots"},
                {"Price": 1500.0, "PriceUnit": "gp", "Name": "Boots of the enduring march", "id": "boots-of-the-enduring-march"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Feather step slippers", "id": "feather-step-slippers"},
                {"Price": 2400.0, "PriceUnit": "gp", "Name": "Boots of friendly terrain", "id": "boots-of-friendly-terrain"},
                {"Price": 2500.0, "PriceUnit": "gp", "Name": "Boots of the winterlands", "id": "boots-of-the-winterlands"},
                {"Price": 2500.0, "PriceUnit": "gp", "Name": "Boots of elvenkind", "id": "boots-of-elvenkind"},
                {"Price": 3000.0, "PriceUnit": "gp", "Name": "Acrobat slippers", "id": "acrobat-slippers"},
                {"Price": 3000.0, "PriceUnit": "gp", "Name": "Horseshoes of speed", "id": "horseshoes-of-speed"},
                {"Price": 3500.0, "PriceUnit": "gp", "Name": "Boots of the mire", "id": "boots-of-the-mire"}
            ]
        },
        greater_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [7, 13, 19, 26, 40, 46, 60, 68, 75, 82],
            valueTable: [
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Burglar boots, minor", "id": "burglar-boots-minor"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Horseshoes of crushing blows +1", "id": "horseshoes-of-crushing-blows-1"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Sandals of quick reaction", "id": "sandals-of-quick-reaction"},
                {"Price": 4400.0, "PriceUnit": "gp", "Name": "Slippers of cloudwalking", "id": "slippers-of-cloudwalking"},
                {"Price": 4800.0, "PriceUnit": "gp", "Name": "Slippers of spider climbing", "id": "slippers-of-spider-climbing"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Sandals of the lightest step", "id": "sandals-of-the-lightest-step"},
                {"Price": 5500.0, "PriceUnit": "gp", "Name": "Boots of striding and springing", "id": "boots-of-striding-and-springing"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Horseshoes of a zephyr", "id": "horseshoes-of-a-zephyr"},
                {"Price": 6480.0, "PriceUnit": "gp", "Name": "Haunted shoes", "id": "haunted-shoes"},
                {"Price": 7200.0, "PriceUnit": "gp", "Name": "Jaunt boots", "id": "jaunt-boots"},
                {"Price": 7500.0, "PriceUnit": "gp", "Name": "Boots of levitation", "id": "boots-of-levitation"}
            ]
        },
        lesser_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [20, 35, 55, 75],
            valueTable: [
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Getaway boots", "id": "getaway-boots"},
                {"Price": 36000.0, "PriceUnit": "gp", "Name": "Horseshoes of crushing blows +3", "id": "horseshoes-of-crushing-blows-3"},
                {"Price": 39600.0, "PriceUnit": "gp", "Name": "Horseshoes of glory", "id": "horseshoes-of-glory"},
                {"Price": 46000.0, "PriceUnit": "gp", "Name": "Burglar boots, major", "id": "burglar-boots-major"},
                {"Price": 49000.0, "PriceUnit": "gp", "Name": "Boots of teleportation", "id": "boots-of-teleportation"}
            ]
        },
        lesser_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [8, 14, 21, 26, 32, 39, 47, 54, 70, 77, 84],
            valueTable: [
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Boots of escape", "id": "boots-of-escape"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Earth root boots", "id": "earth-root-boots"},
                {"Price": 8500.0, "PriceUnit": "gp", "Name": "Nightmare boots", "id": "nightmare-boots"},
                {"Price": 9000.0, "PriceUnit": "gp", "Name": "Nightmare horseshoes", "id": "nightmare-horseshoes"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Caltrop boots", "id": "caltrop-boots"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Tremor boots", "id": "tremor-boots"},
                {"Price": 10500.0, "PriceUnit": "gp", "Name": "Boots of the mastodon", "id": "boots-of-the-mastodon"},
                {"Price": 10500.0, "PriceUnit": "gp", "Name": "Shoes of lightning leaping", "id": "shoes-of-lightning-leaping"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Boots of speed", "id": "boots-of-speed"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Verdant boots", "id": "verdant-boots"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Horseshoes of crushing blows +2", "id": "horseshoes-of-crushing-blows-2"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Winged boots", "id": "winged-boots"}
            ]
        },
        greater_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [40, 70],
            valueTable: [
                {"Price": 56000.0, "PriceUnit": "gp", "Name": "Slippers of the triton", "id": "slippers-of-the-triton"},
                {"Price": 64000.0, "PriceUnit": "gp", "Name": "Horseshoes of crushing blows +4", "id": "horseshoes-of-crushing-blows-4"},
                {"Price": 100000.0, "PriceUnit": "gp", "Name": "Horseshoes of crushing blows +5", "id": "horseshoes-of-crushing-blows-5"}
            ]
        }
    },
    chest: {
        greater_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [50],
            valueTable: [
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Vest of stable mutation", "id": "vest-of-stable-mutation"},
                {"Price": 26000.0, "PriceUnit": "gp", "Name": "Spectral shroud", "id": "spectral-shroud"}
            ]
        },
        lesser_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [15, 30, 50, 75],
            valueTable: [
                {"Price": 200.0, "PriceUnit": "gp", "Name": "Bandages of rapid recovery", "id": "bandages-of-rapid-recovery"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Quick runner's shirt", "id": "quick-runner-s-shirt"},
                {"Price": 1500.0, "PriceUnit": "gp", "Name": "Endless bandolier", "id": "endless-bandolier"},
                {"Price": 1800.0, "PriceUnit": "gp", "Name": "All tools vest", "id": "all-tools-vest"},
                {"Price": 3000.0, "PriceUnit": "gp", "Name": "Vest of surgery", "id": "vest-of-surgery"}
            ]
        },
        greater_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [10, 20, 31, 42, 52, 62, 70, 79, 90],
            valueTable: [
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Sash of the war champion", "id": "sash-of-the-war-champion"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Sipping jacket", "id": "sipping-jacket"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Tunic of careful casting", "id": "tunic-of-careful-casting"},
                {"Price": 5200.0, "PriceUnit": "gp", "Name": "Vest of escape", "id": "vest-of-escape"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Cackling hag's blouse", "id": "cackling-hag-s-blouse"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Deadshot vest", "id": "deadshot-vest"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Prophet's pectoral", "id": "prophet-s-pectoral"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Tunic of deadly might", "id": "tunic-of-deadly-might"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Vest of the vengeful tracker", "id": "vest-of-the-vengeful-tracker"},
                {"Price": 7000.0, "PriceUnit": "gp", "Name": "Resplendent uniform coat", "id": "resplendent-uniform-coat"}
            ]
        },
        lesser_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [60],
            valueTable: [
                {"Price": 50000.0, "PriceUnit": "gp", "Name": "Mantle of immortality", "id": "mantle-of-immortality"},
                {"Price": 58000.0, "PriceUnit": "gp", "Name": "Poisoner's jacket, greater", "id": "poisoner-s-jacket-greater"}
            ]
        },
        lesser_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [13, 28, 40, 60, 80],
            valueTable: [
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Shirt of immolation", "id": "shirt-of-immolation"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Snakeskin tunic", "id": "snakeskin-tunic"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Bane baldric", "id": "bane-baldric"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Unfettered shirt", "id": "unfettered-shirt"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Poisoner's jacket, lesser", "id": "poisoner-s-jacket-lesser"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Vest of the cockroach", "id": "vest-of-the-cockroach"}
            ]
        },
        greater_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [35, 70],
            valueTable: [
                {"Price": 60000.0, "PriceUnit": "gp", "Name": "Merciful baldric", "id": "merciful-baldric"},
                {"Price": 76000.0, "PriceUnit": "gp", "Name": "Mantle of faith", "id": "mantle-of-faith"},
                {"Price": 90000.0, "PriceUnit": "gp", "Name": "Mantle of spell resistance", "id": "mantle-of-spell-resistance"}
            ]
        }
    },
    hands: {
        greater_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [30, 65],
            valueTable: [
                {"Price": 18000.0, "PriceUnit": "gp", "Name": "Vampiric gloves", "id": "vampiric-gloves"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Giant fist gauntlets", "id": "giant-fist-gauntlets"},
                {"Price": 27000.0, "PriceUnit": "gp", "Name": "Gloves of the shortened path", "id": "gloves-of-the-shortened-path"}
            ]
        },
        lesser_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [13, 22, 34, 46, 58, 70, 80, 90],
            valueTable: [
                {"Price": 180.0, "PriceUnit": "gp", "Name": "Assisting gloves", "id": "assisting-gloves"},
                {"Price": 1300.0, "PriceUnit": "gp", "Name": "Claws of the ice bear", "id": "claws-of-the-ice-bear"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Gloves of reconnaissance", "id": "gloves-of-reconnaissance"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Glowing glove", "id": "glowing-glove"},
                {"Price": 2200.0, "PriceUnit": "gp", "Name": "Apprentice's cheating gloves", "id": "apprentice-s-cheating-gloves"},
                {"Price": 2200.0, "PriceUnit": "gp", "Name": "Challenger's gloves", "id": "challenger-s-gloves"},
                {"Price": 2500.0, "PriceUnit": "gp", "Name": "Gloves of larceny", "id": "gloves-of-larceny"},
                {"Price": 2500.0, "PriceUnit": "gp", "Name": "Healer's gloves", "id": "healer-s-gloves"},
                {"Price": 3000.0, "PriceUnit": "gp", "Name": "Engineer's workgloves", "id": "engineer-s-workgloves"}
            ]
        },
        greater_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [12, 21, 33, 43, 55, 65, 75],
            valueTable: [
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Gauntlets of the skilled maneuver", "id": "gauntlets-of-the-skilled-maneuver"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Ghostvision gloves", "id": "ghostvision-gloves"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Gloves of arrow snaring", "id": "gloves-of-arrow-snaring"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Trapspringer's gloves", "id": "trapspringer-s-gloves"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Gloves of arcane striking", "id": "gloves-of-arcane-striking"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Poisoner's gloves", "id": "poisoner-s-gloves"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Magnetist's gloves", "id": "magnetist-s-gloves"},
                {"Price": 6250.0, "PriceUnit": "gp", "Name": "Gloves of swimming and climbing", "id": "gloves-of-swimming-and-climbing"}
            ]
        },
        lesser_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [40],
            valueTable: [
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Gloves of the commanding conjurer", "id": "gloves-of-the-commanding-conjurer"},
                {"Price": 34500.0, "PriceUnit": "gp", "Name": "Gauntlet of rust, greater", "id": "gauntlet-of-rust-greater"}
            ]
        },
        lesser_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [2, 5, 8, 16, 20, 28, 40, 46, 54, 76],
            valueTable: [
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Deliquescent gloves", "id": "deliquescent-gloves"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Form-fixing gauntlets", "id": "form-fixing-gauntlets"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Iron cobra gauntlet", "id": "iron-cobra-gauntlet"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Shadow falconer's glove", "id": "shadow-falconer-s-glove"},
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Spellstrike gloves", "id": "spellstrike-gloves"},
                {"Price": 9000.0, "PriceUnit": "gp", "Name": "Glyphbane gloves", "id": "glyphbane-gloves"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Glove of storing", "id": "glove-of-storing"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Gloves of shaping", "id": "gloves-of-shaping"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Pliant gloves", "id": "pliant-gloves"},
                {"Price": 11500.0, "PriceUnit": "gp", "Name": "Gauntlet of rust", "id": "gauntlet-of-rust"},
                {"Price": 15000.0, "PriceUnit": "gp", "Name": "Gloves of dueling", "id": "gloves-of-dueling"}
            ]
        },
        greater_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [60],
            valueTable: [
                {"Price": 67000.0, "PriceUnit": "gp", "Name": "Talons of Leng", "id": "talons-of-leng"},
                {"Price": 110000.0, "PriceUnit": "gp", "Name": "Gauntlets of the weaponmaster", "id": "gauntlets-of-the-weaponmaster"}
            ]
        }
    },
    headband: {
        greater_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [30, 70],
            valueTable: [
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Headband of arcane energy", "id": "headband-of-arcane-energy"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Headband of counterspelling", "id": "headband-of-counterspelling"},
                {"Price": 27500.0, "PriceUnit": "gp", "Name": "Headband of knucklebones", "id": "headband-of-knucklebones"}
            ]
        },
        lesser_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [60],
            valueTable: [
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Phylactery of faithfulness", "id": "phylactery-of-faithfulness"},
                {"Price": 3600.0, "PriceUnit": "gp", "Name": "Dead man's headband", "id": "dead-man-s-headband"}
            ]
        },
        greater_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [9, 18, 27, 33, 39, 45, 51, 58, 66, 74, 82, 91],
            valueTable: [
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Headband of alluring charisma +2", "id": "headband-of-alluring-charisma-2"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Headband of inspired wisdom +2", "id": "headband-of-inspired-wisdom-2"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Headband of vast intelligence +2", "id": "headband-of-vast-intelligence-2"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Headband of aerial agility +2", "id": "headband-of-aerial-agility-2"},
                {"Price": 4500.0, "PriceUnit": "gp", "Name": "Shifter's headband +2", "id": "shifter-s-headband-2"},
                {"Price": 5100.0, "PriceUnit": "gp", "Name": "Headband of ponderous recollection", "id": "headband-of-ponderous-recollection"},
                {"Price": 5400.0, "PriceUnit": "gp", "Name": "Headband of ki focus", "id": "headband-of-ki-focus"},
                {"Price": 5600.0, "PriceUnit": "gp", "Name": "Headband of unshakeable resolve", "id": "headband-of-unshakeable-resolve"},
                {"Price": 5700.0, "PriceUnit": "gp", "Name": "Hollywreath band", "id": "hollywreath-band"},
                {"Price": 6400.0, "PriceUnit": "gp", "Name": "Headband of deathless devotion", "id": "headband-of-deathless-devotion"},
                {"Price": 7000.0, "PriceUnit": "gp", "Name": "Phylactery of the shepherd", "id": "phylactery-of-the-shepherd"},
                {"Price": 7000.0, "PriceUnit": "gp", "Name": "Headband of intuition", "id": "headband-of-intuition"},
                {"Price": 7700.0, "PriceUnit": "gp", "Name": "Headband of fortune's favor", "id": "headband-of-fortune-s-favor"}
            ]
        },
        lesser_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [9, 19, 32, 45, 58, 66, 81, 90],
            valueTable: [
                {"Price": 30000.0, "PriceUnit": "gp", "Name": "Soulbound eye", "id": "soulbound-eye"},
                {"Price": 32000.0, "PriceUnit": "gp", "Name": "Winter wolf headband", "id": "winter-wolf-headband"},
                {"Price": 36000.0, "PriceUnit": "gp", "Name": "Headband of alluring charisma +6", "id": "headband-of-alluring-charisma-6"},
                {"Price": 36000.0, "PriceUnit": "gp", "Name": "Headband of inspired wisdom +6", "id": "headband-of-inspired-wisdom-6"},
                {"Price": 36000.0, "PriceUnit": "gp", "Name": "Headband of vast intelligence +6", "id": "headband-of-vast-intelligence-6"},
                {"Price": 39000.0, "PriceUnit": "gp", "Name": "Shifter's headband +6", "id": "shifter-s-headband-6"},
                {"Price": 40000.0, "PriceUnit": "gp", "Name": "Headband of mental prowess +4", "id": "headband-of-mental-prowess-4"},
                {"Price": 40000.0, "PriceUnit": "gp", "Name": "Headband of seduction", "id": "headband-of-seduction"},
                {"Price": 42000.0, "PriceUnit": "gp", "Name": "Headband of aerial agility +4", "id": "headband-of-aerial-agility-4"}
            ]
        },
        lesser_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [6, 12, 20, 26, 34, 42, 48, 54, 60, 68, 76, 85, 93],
            valueTable: [
                {"Price": 8000.0, "PriceUnit": "gp", "Name": "Headband of havoc", "id": "headband-of-havoc"},
                {"Price": 9000.0, "PriceUnit": "gp", "Name": "Serpent's band", "id": "serpent-s-band"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Headband of mental prowess +2", "id": "headband-of-mental-prowess-2"},
                {"Price": 11000.0, "PriceUnit": "gp", "Name": "Hunter's band", "id": "hunter-s-band"},
                {"Price": 11000.0, "PriceUnit": "gp", "Name": "Phylactery of negative channeling", "id": "phylactery-of-negative-channeling"},
                {"Price": 11000.0, "PriceUnit": "gp", "Name": "Phylactery of positive channeling", "id": "phylactery-of-positive-channeling"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Veiled eye", "id": "veiled-eye"},
                {"Price": 14000.0, "PriceUnit": "gp", "Name": "Band of the stalwart warrior", "id": "band-of-the-stalwart-warrior"},
                {"Price": 15000.0, "PriceUnit": "gp", "Name": "Headband of ninjitsu", "id": "headband-of-ninjitsu"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Headband of alluring charisma +4", "id": "headband-of-alluring-charisma-4"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Headband of inspired wisdom +4", "id": "headband-of-inspired-wisdom-4"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Headband of mental superiority +2", "id": "headband-of-mental-superiority-2"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Headband of vast intelligence +4", "id": "headband-of-vast-intelligence-4"},
                {"Price": 17500.0, "PriceUnit": "gp", "Name": "Shifter's headband +4", "id": "shifter-s-headband-4"}
            ]
        },
        greater_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [20, 50, 65, 85],
            valueTable: [
                {"Price": 64000.0, "PriceUnit": "gp", "Name": "Headband of mental resilience", "id": "headband-of-mental-resilience"},
                {"Price": 64000.0, "PriceUnit": "gp", "Name": "Headband of mental superiority +4", "id": "headband-of-mental-superiority-4"},
                {"Price": 81000.0, "PriceUnit": "gp", "Name": "Headband of aerial agility +6", "id": "headband-of-aerial-agility-6"},
                {"Price": 90000.0, "PriceUnit": "gp", "Name": "Headband of metal prowess +6", "id": "headband-of-metal-prowess-6"},
                {"Price": 144000.0, "PriceUnit": "gp", "Name": "Headband of mental superiority +6", "id": "headband-of-mental-superiority-6"}
            ]
        }
    },
    belt: {
        greater_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [12, 26, 38, 53, 67, 84],
            valueTable: [
                {"Price": 18000.0, "PriceUnit": "gp", "Name": "Monkey belt, greater", "id": "monkey-belt-greater"},
                {"Price": 18500.0, "PriceUnit": "gp", "Name": "Anaconda's coils", "id": "anaconda-s-coils"},
                {"Price": 20000.0, "PriceUnit": "gp", "Name": "Serpent belt, greater", "id": "serpent-belt-greater"},
                {"Price": 21000.0, "PriceUnit": "gp", "Name": "Belt of fallen heroes", "id": "belt-of-fallen-heroes"},
                {"Price": 23000.0, "PriceUnit": "gp", "Name": "Gorgon belt", "id": "gorgon-belt"},
                {"Price": 24000.0, "PriceUnit": "gp", "Name": "Elemental earth belt", "id": "elemental-earth-belt"},
                {"Price": 25000.0, "PriceUnit": "gp", "Name": "Sash of flowing water", "id": "sash-of-flowing-water"}
            ]
        },
        lesser_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [16, 28, 40, 54, 70, 84],
            valueTable: [
                {"Price": 800.0, "PriceUnit": "gp", "Name": "Belt of tumbling", "id": "belt-of-tumbling"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Beneficial bandolier", "id": "beneficial-bandolier"},
                {"Price": 1000.0, "PriceUnit": "gp", "Name": "Meridian belt", "id": "meridian-belt"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Bladed belt", "id": "bladed-belt"},
                {"Price": 2000.0, "PriceUnit": "gp", "Name": "Heavyload belt", "id": "heavyload-belt"},
                {"Price": 2600.0, "PriceUnit": "gp", "Name": "Aquatic cummerbund", "id": "aquatic-cummerbund"},
                {"Price": 3200.0, "PriceUnit": "gp", "Name": "Equestrian belt", "id": "equestrian-belt"}
            ]
        },
        greater_minor: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [18, 36, 54, 62, 74, 84],
            valueTable: [
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Belt of giant strength +2", "id": "belt-of-giant-strength-2"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Belt of incredible dexterity +2", "id": "belt-of-incredible-dexterity-2"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Belt of mighty constitution +2", "id": "belt-of-mighty-constitution-2"},
                {"Price": 4000.0, "PriceUnit": "gp", "Name": "Belt of teeth", "id": "belt-of-teeth"},
                {"Price": 5000.0, "PriceUnit": "gp", "Name": "Blinkback belt", "id": "blinkback-belt"},
                {"Price": 5200.0, "PriceUnit": "gp", "Name": "Plague rat belt", "id": "plague-rat-belt"},
                {"Price": 6000.0, "PriceUnit": "gp", "Name": "Belt of foraging", "id": "belt-of-foraging"}
            ]
        },
        lesser_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [12, 30, 48, 66, 88],
            valueTable: [
                {"Price": 32000.0, "PriceUnit": "gp", "Name": "Merform belt", "id": "merform-belt"},
                {"Price": 36000.0, "PriceUnit": "gp", "Name": "Belt of giant strength +6", "id": "belt-of-giant-strength-6"},
                {"Price": 36000.0, "PriceUnit": "gp", "Name": "Belt of incredible dexterity +6", "id": "belt-of-incredible-dexterity-6"},
                {"Price": 36000.0, "PriceUnit": "gp", "Name": "Belt of mighty constitution +6", "id": "belt-of-mighty-constitution-6"},
                {"Price": 40000.0, "PriceUnit": "gp", "Name": "Belt of physical might +4", "id": "belt-of-physical-might-4"},
                {"Price": 42000.0, "PriceUnit": "gp", "Name": "Belt of mighty hurling, greater", "id": "belt-of-mighty-hurling-greater"}
            ]
        },
        lesser_medium: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [4, 8, 16, 22, 27, 32, 36, 41, 46, 51, 57, 61, 71, 80, 90],
            valueTable: [
                {"Price": 9000.0, "PriceUnit": "gp", "Name": "Serpent belt", "id": "serpent-belt"},
                {"Price": 9400.0, "PriceUnit": "gp", "Name": "Monkey belt", "id": "monkey-belt"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Belt of physical might +2", "id": "belt-of-physical-might-2"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Belt of the weasel", "id": "belt-of-the-weasel"},
                {"Price": 10000.0, "PriceUnit": "gp", "Name": "Belt of thunderous charging", "id": "belt-of-thunderous-charging"},
                {"Price": 11000.0, "PriceUnit": "gp", "Name": "Minotaur belt", "id": "minotaur-belt"},
                {"Price": 11200.0, "PriceUnit": "gp", "Name": "Plague rat belt, greater", "id": "plague-rat-belt-greater"},
                {"Price": 12000.0, "PriceUnit": "gp", "Name": "Belt of equilibrium", "id": "belt-of-equilibrium"},
                {"Price": 12500.0, "PriceUnit": "gp", "Name": "Security belt", "id": "security-belt"},
                {"Price": 14000.0, "PriceUnit": "gp", "Name": "Belt of mighty hurling, lesser", "id": "belt-of-mighty-hurling-lesser"},
                {"Price": 14900.0, "PriceUnit": "gp", "Name": "Belt of dwarvenkind", "id": "belt-of-dwarvenkind"},
                {"Price": 15000.0, "PriceUnit": "gp", "Name": "Cord of stubborn resolve", "id": "cord-of-stubborn-resolve"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Belt of giant strength +4", "id": "belt-of-giant-strength-4"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Belt of physical perfection +2", "id": "belt-of-physical-perfection-2"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Belt of incredible dexterity +4", "id": "belt-of-incredible-dexterity-4"},
                {"Price": 16000.0, "PriceUnit": "gp", "Name": "Belt of mighty constitution +4", "id": "belt-of-mighty-constitution-4"}
            ]
        },
        greater_major: {
            create: function () {
                return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
            },
            chanceTable: [25, 55, 75, 90],
            valueTable: [
                {"Price": 60000.0, "PriceUnit": "gp", "Name": "Belt of stoneskin", "id": "belt-of-stoneskin"},
                {"Price": 64000.0, "PriceUnit": "gp", "Name": "Belt of physical perfection +4", "id": "belt-of-physical-perfection-4"},
                {"Price": 90000.0, "PriceUnit": "gp", "Name": "Belt of physical might +6", "id": "belt-of-physical-might-6"},
                {"Price": 110000.0, "PriceUnit": "gp", "Name": "Shadowform belt", "id": "shadowform-belt"},
                {"Price": 144000.0, "PriceUnit": "gp", "Name": "Belt of physical perfection +6", "id": "belt-of-physical-perfection-6"}
            ]
        }
    }
};

module.exports = function (_diceService_) {
    diceService = _diceService_;
    return {
        random_wondrous_item : random_wondrous_item
    }
};