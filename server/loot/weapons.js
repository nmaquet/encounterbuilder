"use strict";

var clone = require('./../clone')().clone;
var idify = require('./../idify')().idify;

var diceService;

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
        var weapon = clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
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
            return clone(diceService.rangeIn100(randomWeapon.chanceTable, randomWeapon.valueTable));
        }

        function applyAbilities(weapon, ability1, ability2) {
            if (ability2) {
                weapon.Name = ability1.name + " " + ability2.name.toLowerCase() + " " + weapon.Name.toLowerCase() + " +" + weaponBonus;
                var totalFlatPrice = (ability1.flatprice || 0) + (ability2.flatprice || 0);
                var ability1Bonus = (ability1.flatprice === undefined ? (ability1.enhancementBonus || abilityLevel1) : 0 );
                var ability2Bonus = (ability2.flatprice === undefined ? (ability2.enhancementBonus || abilityLevel2) : 0 );
                var totalAbilityBonus = ability1Bonus + ability2Bonus;
                weapon.Price += 300 + totalFlatPrice + randomWeapon.priceModifiers[weaponBonus + totalAbilityBonus];
                weapon.id = idify(ability1.name) + "-" + idify(ability2.name) + "-" + weapon.id + "-" + weaponBonus;
            }
            else {
                weapon.Name = ability1.name + " " + weapon.Name.toLowerCase() + " +" + weaponBonus;
                var totalFlatPrice = (ability1.flatprice || 0);
                var totalAbilityBonus = (ability1.flatprice === undefined ? (ability1.enhancementBonus || abilityLevel1) : 0 );
                weapon.Price += 300 + totalFlatPrice + randomWeapon.priceModifiers[weaponBonus + totalAbilityBonus];
                weapon.id = idify(ability1.name) + "-" + weapon.id + "-" + weaponBonus;
            }
        }

        function addRandomAbility(weapon) {
            do {
                var ability1 = diceService.rangeIn100(abilityTable1.chanceTable, abilityTable1.valueTable);
            } while (ability1.filter && ability1.filter(weapon));
            if (abilityLevel2) {
                do {
                    var ability2 = diceService.rangeIn100(abilityTable2.chanceTable, abilityTable2.valueTable);
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
            return diceService.rangeIn100(this[magnitude].chanceTable, this[magnitude].valueTable);
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

function generateMwkWeapon() {
    return randomWeapon.createMwk();
}

function generateMagicWeapon(magnitude) {
    return randomWeapon.generate(magnitude);
}

function generateMagicWeaponByBonus(weaponBonus, abilityLevel1, abilityLevel2) {
    return randomWeapon.generateByBonus(weaponBonus, abilityLevel1, abilityLevel2);
}

module.exports = function (_diceService_) {
    diceService = _diceService_;
    return {
        generateMwkWeapon: generateMwkWeapon,
        generateMagicWeapon : generateMagicWeapon,
        generateMagicWeaponByBonus : generateMagicWeaponByBonus
    }
};