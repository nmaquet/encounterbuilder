"use strict";

var clone = require('./../clone')().clone;
var idify = require('./../idify')().idify;

var diceService;

var randomMundaneArmorOrShield = {
    create: function (type) {
        return clone(diceService.rangeIn100(this[type].chanceTable, this[type].valueTable));
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
                return clone(diceService.rangeIn100(randomMagicArmorOrShield.chanceTable, randomMagicArmorOrShield.valueTable));
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
                    armorOrShield.id = idify(ability1.name) + "-" + idify(ability2.name) + "-" + armorOrShield.id + "-" + armorOrShieldBonus;
                }
                else {
                    armorOrShield.Name = ability1.name + " " + armorOrShield.Name.toLowerCase() + " +" + armorOrShieldBonus;
                    var totalFlatPrice = (ability1.flatprice || 0);
                    var totalAbilityBonus = (ability1.flatprice === undefined ? (ability1.enhancementBonus || abilityLevel1) : 0 );
                    armorOrShield.Price += 150 + totalFlatPrice + randomMagicArmorOrShield.priceModifiers[armorOrShieldBonus + totalAbilityBonus];
                    armorOrShield.id = idify(ability1.name) + "-" + armorOrShield.id + "-" + armorOrShieldBonus;
                }
            }

            function addRandomAbility(armorOrShield) {
                do {
                    var ability1 = diceService.rangeIn100(abilityTable1.chanceTable, abilityTable1.valueTable);
                } while (ability1.filter && ability1.filter(armorOrShield));
                if (abilityLevel2) {
                    do {
                        var ability2 = diceService.rangeIn100(abilityTable2.chanceTable, abilityTable2.valueTable);
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
                return diceService.rangeIn100(this[magnitude].chanceTable, this[magnitude].valueTable);
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
    }
    ;

function generateMwkArmor(type) {
    return randomMundaneArmorOrShield.createMwk(type);
}

function generateMagicArmorOrShield(magnitude) {
    return randomMagicArmorOrShield.generate(magnitude);
}

module.exports = function (_diceService_) {
    diceService = _diceService_;
    return {
        generateMwkArmor: generateMwkArmor,
        generateMagicArmorOrShield: generateMagicArmorOrShield
    }
};