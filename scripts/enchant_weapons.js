"use strict";

var fs = require('fs');

var weapons = require(__dirname + "/../data/items/weapons.json");
var clone = require(__dirname + "/../server/clone.js")().clone;

var ONLY_NON_LETHAL = function (weapon) {
    if (weapon.Special.toLowerCase().indexOf("nonlethal") === -1) {
        return true;
    }
    else {
        return false;
    }
};
var ONLY_P_OR_S = function (weapon) {
    if (weapon.DamageType.indexOf("P") === -1 && weapon.DamageType.indexOf("S") === -1) {
        return true;
    }
    else {
        return false;
    }
};
var ONLY_HAS_RANGE = function (weapon) {
    if (weapon.Range.indexOf("ft") === -1) {
        return true;
    }
    else {
        return false;
    }
};
var ONLY_NOT_LIGHT = function (weapon) {
    if (weapon.WeaponType.indexOf("light") !== -1) {
        return true;
    }
    else {
        return false;
    }
};
var ONLY_COMPOSITE_BOWS = function (weapon) {
    if (weapon.Name.toLowerCase().indexOf("bow") === -1 || weapon.Name.toLowerCase().indexOf("composite") === -1) {
        return true;
    }
    else {
        return false;
    }
};
var ONLY_BOWS_AND_CROSSBOWS = function (weapon) {
    if (weapon.Name.indexOf("bow") === -1) {
        return true;
    }
    else {
        return false;
    }
};

var ONLY_FIREARMS = function (weapon) {
    if (weapon.WeaponType.toLowerCase().indexOf("firearm") === -1) {
        return true;
    }
    else {
        return false;
    }
};
var ONLY_ALCHEMICAL_OR_METAL_CARTRIDGES = function (weapon) {
    if (weapon.Name.toLowerCase().indexOf("alchemical cartridge") === -1 && weapon.Name.toLowerCase().indexOf("metal cartridge") === -1) {
        return true;
    }
    else {
        return false;
    }
};

var ONLY_BOWS = function (weapon) {
    if (weapon.Name.indexOf("bow") === -1 || weapon.Name.indexOf("crossbow") !== -1) {
        return true;
    }
    else {
        return false;
    }
};


var meleeSpecialAbilities = {
    1: [
        {enhancementBonus:1, name: 'Impervious', flatprice: 3000, cl: 0},
        {enhancementBonus:1, name: 'Glamered', flatprice: 4000, cl: 0},
        {enhancementBonus:1, name: 'Allying', cl: 5},
        {enhancementBonus:1, name: 'Bane', cl: 8},
        {enhancementBonus:1, name: 'Benevolent', cl: 5},
        {enhancementBonus:1, name: 'Called', cl: 9},
        {enhancementBonus:1, name: 'Conductive', cl: 8},
        {enhancementBonus:1, name: 'Corrosive', cl: 10},
        {enhancementBonus:1, name: 'Countering', cl: 5},
        {enhancementBonus:1, name: 'Courageous', cl: 3},
        {enhancementBonus:1, name: 'Cruel', cl: 5},
        {enhancementBonus:1, name: 'Cunning', cl: 6},
        {enhancementBonus:1, name: 'Deadly', cl: 5, filter: ONLY_NON_LETHAL},
        {enhancementBonus:1, name: 'Defending', cl: 8},
        {enhancementBonus:1, name: 'Dispelling', cl: 10},
        {enhancementBonus:1, name: 'Flaming', cl: 10},
        {enhancementBonus:1, name: 'Frost', cl: 8},
        {enhancementBonus:1, name: 'Furious', cl: 8},
        {enhancementBonus:1, name: 'Ghost touch', cl: 9},
        {enhancementBonus:1, name: 'Grayflame', cl: 6},
        {enhancementBonus:1, name: 'Grounding', cl: 5},
        {enhancementBonus:1, name: 'Guardian', cl: 8},
        {enhancementBonus:1, name: 'Heartseeker', cl: 7},
        {enhancementBonus:1, name: 'Huntsman', cl: 7},
        {enhancementBonus:1, name: 'Jurist', cl: 4},
        {enhancementBonus:1, name: 'Keen', cl: 10, filter: ONLY_P_OR_S},
        {enhancementBonus:1, name: 'Ki focus', cl: 8},
        {enhancementBonus:1, name: 'Limning', cl: 5},
        {enhancementBonus:1, name: 'Menacing', cl: 10},
        {enhancementBonus:1, name: 'Merciful', cl: 5},
        {enhancementBonus:1, name: 'Mighty cleaving', cl: 8},
        {enhancementBonus:1, name: 'Mimetic', cl: 5},
        {enhancementBonus:1, name: 'Neutralizing', cl: 5},
        {enhancementBonus:1, name: 'Ominous', cl: 5},
        {enhancementBonus:1, name: 'Planar', cl: 9},
        {enhancementBonus:1, name: 'Quenching', cl: 5},
        {enhancementBonus:1, name: 'Returning', cl: 7, filter: ONLY_HAS_RANGE},
        {enhancementBonus:1, name: 'Seaborne', cl: 7},
        {enhancementBonus:1, name: 'Shock', cl: 8},
        {enhancementBonus:1, name: 'Spell storing', cl: 12},
        {enhancementBonus:1, name: 'Thawing', cl: 5},
        {enhancementBonus:1, name: 'Throwing', cl: 5},
        {enhancementBonus:1, name: 'Thundering', cl: 5},
        {enhancementBonus:1, name: 'Valiant', cl: 5},
        {enhancementBonus:1, name: 'Vicious', cl: 9}
    ],
    2: [
        {name: "Advancing", cl: 5},
        {name: "Anarchic", cl: 7},
        {name: "Anchoring", cl: 10, filter: ONLY_HAS_RANGE},
        {name: "Axiomatic", cl: 7},
        {name: "Corrosive burst", cl: 12},
        {name: "Defiant", cl: 10},
        {name: "Dispelling burst", cl: 12},
        {name: "Disruption", cl: 14},
        {name: "Flaming burst", cl: 12},
        {name: "Furyborn", cl: 7},
        {name: "Glorious", cl: 5},
        {name: "Holy", cl: 7},
        {name: "Icy burst", cl: 10},
        {name: "Igniting", cl: 12},
        {name: "Impact", cl: 9, filter: ONLY_NOT_LIGHT },
        {name: "Invigorating", cl: 5},
        {name: "Ki intensifying", cl: 12},
        {name: "Lifesurge", cl: 8},
        {name: "Negating", cl: 5},
        {name: "Phase locking", cl: 7},
        {name: "Shocking burst", cl: 10},
        {name: "Stalking", cl: 10},
        {name: "Unholy", cl: 7},
        {name: "Wounding", cl: 10}
    ],
    3: [
        {name: "Nullifying", cl: 12},
        {name: "Repositioning", cl: 10},
        {name: "Speed", cl: 7},
        {name: "Spellstealing", cl: 13}
    ],
    4: [
        {name: "Brilliant energy", cl: 16},
        {name: "Dancing", cl: 15},
        {name: "Dueling", cl: 5, flatprice: 14000}
    ],
    5: [
        {name: "Vorpal", cl: 18},
        {name: "Transformative", cl: 10, flatprice: 10000}
    ]
};

var rangedSpecialAbilities = {
    1: [
        {name: 'Adaptive', flatprice: 1000, cl: 0, filter: ONLY_COMPOSITE_BOWS},
        {name: 'Impervious', flatprice: 3000, cl: 0},
        {name: 'Glamered', flatprice: 4000, cl: 0},
        {name: 'Allying', cl: 5},
        {name: 'Bane', cl: 8},
        {name: 'Called', cl: 9},
        {name: 'Conductive', cl: 8},
        {name: 'Conserving', cl: 7, filter: ONLY_FIREARMS},
        {name: 'Corrosive', cl: 10},
        {name: 'Cruel', cl: 5},
        {name: 'Cunning', cl: 6},
        {name: 'Distance', cl: 6},
        {name: 'Flaming', cl: 10},
        {name: 'Frost', cl: 8},
        {name: 'Huntsman', cl: 7},
        {name: 'Jurist', cl: 4},
        {name: 'Limning', cl: 5},
        {name: 'Lucky', cl: 8, filter: ONLY_FIREARMS},
        {name: 'Merciful', cl: 5},
        {name: 'Planar', cl: 9},
        {name: 'Reliable', cl: 8, filter: ONLY_FIREARMS},
        {name: 'Seeking', cl: 12},
        {name: 'Shock', cl: 8},
        {name: 'Thundering', cl: 5}
    ],
    2: [
        {name: "Anarchic", cl: 7},
        {name: "Axiomatic", cl: 7},
        {name: "Corrosive burst", cl: 12},
        {name: "Designating, lesser", cl: 7},
        {name: "Endless ammunition", cl: 9, filter: ONLY_BOWS_AND_CROSSBOWS},
        {name: "Flaming burst", cl: 12},
        {name: "Holy", cl: 7},
        {name: "Icy burst", cl: 10},
        {name: "Igniting", cl: 12},
        {name: "Phase locking", cl: 7},
        {name: "Shocking burst", cl: 10},
        {name: "Stalking", cl: 10},
        {name: "Unholy", cl: 7}
    ],
    3: [
        {name: "Lucky, greater", cl: 12, filter: ONLY_FIREARMS},
        {name: "Reliable, greater", cl: 12, filter: ONLY_FIREARMS},
        {name: "Speed", cl: 7}
    ],
    4: [
        {name: "Brilliant energy", cl: 16},
        {name: "Designating, greater", cl: 12},
        {name: "Nimble shot", cl: 11},
        {name: "Second chance", cl: 11, filter: ONLY_BOWS }
    ]
};

var ammunitionSpecialAbilities = {
    1: [
        {name: 'Dry load', flatprice: 1500, cl: 3, filter: ONLY_ALCHEMICAL_OR_METAL_CARTRIDGES},
        {name: 'Bane', cl: 8},
        {name: 'Conductive', cl: 8},
        {name: 'Corrosive', cl: 10},
        {name: 'Cruel', cl: 5},
        {name: 'Cunning', cl: 6},
        {name: 'Flaming', cl: 10},
        {name: 'Frost', cl: 8},
        {name: 'Ghost touch', cl: 9},
        {name: 'Limning', cl: 5},
        {name: 'Merciful', cl: 5},
        {name: 'Planar', cl: 9},
        {name: 'Seeking', cl: 12},
        {name: 'Shock', cl: 8},
        {name: 'Thundering', cl: 5}
    ],
    2: [
        {name: "Anarchic", cl: 7},
        {name: "Axiomatic", cl: 7},
        {name: "Corrosive burst", cl: 12},
        {name: "Designating, lesser", cl: 7},
        {name: "Flaming burst", cl: 12},
        {name: "Holy", cl: 7},
        {name: "Icy burst", cl: 10},
        {name: "Igniting", cl: 12},
        {name: "Phase locking", cl: 7},
        {name: "Shocking burst", cl: 10},
        {name: "Unholy", cl: 7}
    ],
    4: [
        {name: "Brilliant energy", cl: 16},
        {name: "Designating, greater", cl: 12},
    ]
};

function idify(string) {
    return string.toLowerCase().replace(" ", "-");
}

var priceModifiers = {
    1: 2000,
    2: 8000,
    3: 18000,
    4: 32000,
    5: 50000,
    6: 72000,
    7: 98000,
    8: 128000,
    9: 162000,
    10: 200000
}

var enchantedWeapons = []

function ammunitionName(weapon) {
    var match = /([^\(]*)\((\d*)\)/.exec(weapon.Name);
    if (match) {
        return match[1].trim();
    } else {
        throw Error("no ammunition quantity");
    }
}

function ammunitionQuantity(weapon) {
    var match = /([^\(]*)\((\d*)\)/.exec(weapon.Name);
    if (match) {
        return Number(match[2].trim());
    } else {
        throw Error("no ammunition quantity");
    }
}

function ammunitionWeight(weapon) {
    var match = /([\d\.]*) lbs*\.*/.exec(weapon.Weight);
    if (weapon.Weight === "see text") {
        return ammunitionQuantity(weapon) * 3/20;
    }
    else if (weapon.Weight === "-") {
        return 0;
    }
    else if (match) {
        return Number(match[1].trim());
    } else {
        throw Error("no weapon weight for weapon " + weapon.Name + " (weight = '" + weapon.Weight + "')");
    }
}

function pounds(weight) {
    return weight === 1 ? "lb." : "lbs.";
}

function enchantWeaponNoAbility(weapon, weaponBonus) {
    var enchantedWeapon = clone(weapon);
    enchantedWeapon.Mwk = true;
    enchantedWeapon.Enchanted = true;
    enchantedWeapon.WeaponBonus = weaponBonus;
    if (weapon.WeaponType === "ammunition") {
        var quantity = ammunitionQuantity(enchantedWeapon);
        enchantedWeapon.Price = Math.round(50 * (enchantedWeapon.Price / quantity));
        var weight = Math.round(50 * (ammunitionWeight(enchantedWeapon) / quantity));
        enchantedWeapon.Weight = "" + weight + " " + pounds(weight);
        enchantedWeapon.Name = ammunitionName(enchantedWeapon)+ " +" + enchantedWeapon.WeaponBonus + " (50)";
    } else {
        enchantedWeapon.Name = enchantedWeapon.Name + " +" + enchantedWeapon.WeaponBonus;
    }
    enchantedWeapon.EnhancementBonus = weaponBonus;
    enchantedWeapon.Price += 300 + priceModifiers[enchantedWeapon.EnhancementBonus];
    enchantedWeapon.CL = 3 * enchantedWeapon.EnhancementBonus;
    enchantedWeapon.id = enchantedWeapon.id + "-" + enchantedWeapon.WeaponBonus;
    return enchantedWeapon;
}

function enchantWeaponWithAbility(ability, weapon, weaponBonus, abilityBonus) {

    var enchantedWeapon = clone(weapon);
    enchantedWeapon.Mwk = true;
    enchantedWeapon.Enchanted = true;
    enchantedWeapon.SpecialAbilities = [idify(ability.name)];
    enchantedWeapon.WeaponBonus = weaponBonus;
    if (weapon.WeaponType === "ammunition") {
        var quantity = ammunitionQuantity(enchantedWeapon);
        enchantedWeapon.Price = Math.round(50 * (enchantedWeapon.Price / quantity));
        var weight = Math.round(50 * (ammunitionWeight(enchantedWeapon) / quantity));
        enchantedWeapon.Weight = "" + weight + " " + pounds(weight);
        enchantedWeapon.Name = ability.name + " " + ammunitionName(enchantedWeapon).toLowerCase() + " +" + enchantedWeapon.WeaponBonus + " (50)";
    } else {
        enchantedWeapon.Name = ability.name + " " + enchantedWeapon.Name.toLowerCase() + " +" + enchantedWeapon.WeaponBonus;
    }
    if (ability.flatprice) {
        enchantedWeapon.EnhancementBonus = weaponBonus;
        enchantedWeapon.Price += 300 + priceModifiers[enchantedWeapon.EnhancementBonus] + ability.flatprice;
    } else {
        enchantedWeapon.EnhancementBonus = weaponBonus + abilityBonus;
        enchantedWeapon.Price += 300 + priceModifiers[enchantedWeapon.EnhancementBonus];
    }
    enchantedWeapon.CL = Math.max(3 * enchantedWeapon.EnhancementBonus, ability.cl);
    enchantedWeapon.id = idify(ability.name) + "-" + enchantedWeapon.id + "-" + enchantedWeapon.WeaponBonus;
    return enchantedWeapon;
}
function main() {
    for (var i in weapons) {
        var weapon = weapons[i];
        if (weapon.Mwk === true) {
            continue;
        }
        if (weapon.Name == "Unarmed strike") {
            continue;
        }
        if (weapon.WeaponType !== 'ranged' && weapon.WeaponType !== 'ammunition') {
            var abilityTable = meleeSpecialAbilities;
        }
        else if (weapon.WeaponType === 'ranged') {
            var abilityTable = rangedSpecialAbilities;
        }
        else if (weapon.WeaponType === 'ammunition') {
            var abilityTable = ammunitionSpecialAbilities;
        }
        else {
            throw Error("unknown weapon type : " + weapon.WeaponType + " for : " + weapon.Name);
        }
        for (var weaponBonus = 1; weaponBonus <= 5; weaponBonus++) {
            for (var abilityBonus = 1; abilityBonus <= 5; abilityBonus++) {
                if (abilityTable[abilityBonus] === undefined) {
                    continue;
                }
                for (var j in abilityTable[abilityBonus]) {
                    var ability = abilityTable[abilityBonus][j];
                    if (ability.filter && ability.filter(weapon)) {
                        continue;
                    }
                    var enchantedWeapon = enchantWeaponWithAbility(ability, weapon, weaponBonus, abilityBonus);
                    enchantedWeapons.push(enchantedWeapon);
                }
            }
            var enchantedWeapon = enchantWeaponNoAbility(weapon, weaponBonus);
            enchantedWeapons.push(enchantedWeapon);
        }
    }
}

main();
console.log("generated " + enchantedWeapons.length + " enchanted objects");

fs.writeFileSync(__dirname + "/../data/items/enchanted_weapons.json", JSON.stringify(enchantedWeapons, null, 4));
