"use strict";

var fs = require('fs');

var weapons = require(__dirname + "/../data/items/weapons.json");
var clone = require(__dirname + "/../server/clone.js")().clone;

var meleeSpecialAbilities = {
    1: [
        {name: 'Impervious', flatprice: 3000, cl: 0},
        {name: 'Glamered', flatprice: 4000, cl: 0},
        {name: 'Allying', cl: 5},
        {name: 'Bane', cl: 8},
        {name: 'Benevolent', cl: 5},
        {name: 'Called', cl: 9},
        {name: 'Conductive', cl: 8},
        {name: 'Corrosive', cl: 10},
        {name: 'Countering', cl: 5},
        {name: 'Courageous', cl: 3},
        {name: 'Cruel', cl: 5},
        {name: 'Cunning', cl: 6},
        {name: 'Deadly', cl: 5},
        {name: 'Defending', cl: 8},
        {name: 'Dispelling', cl: 10},
        {name: 'Flaming', cl: 10},
        {name: 'Frost', cl: 8},
        {name: 'Furious', cl: 8},
        {name: 'Ghost touch', cl: 9},
        {name: 'Grayflame', cl: 6},
        {name: 'Grounding', cl: 5},
        {name: 'Guardian', cl: 8},
        {name: 'Heartseeker', cl: 7},
        {name: 'Huntsman', cl: 7},
        {name: 'Jurist', cl: 4},
        {name: 'Keen', cl: 10},
        {name: 'Ki focus', cl: 8},
        {name: 'Limning', cl: 5},
        {name: 'Menacing', cl: 10},
        {name: 'Merciful', cl: 5},
        {name: 'Mighty cleaving', cl: 8},
        {name: 'Mimetic', cl: 5},
        {name: 'Neutralizing', cl: 5},
        {name: 'Ominous', cl: 5},
        {name: 'Planar', cl: 9},
        {name: 'Quenching', cl: 5},
        {name: 'Seaborne', cl: 7},
        {name: 'Shock', cl: 8},
        {name: 'Spell storing', cl: 12},
        {name: 'Thawing', cl: 5},
        {name: 'Throwing', cl: 5},
        {name: 'Thundering', cl: 5},
        {name: 'Valiant', cl: 5},
        {name: 'Vicious', cl: 9}
    ],
    2: [
        {name: "Advancing", cl: 5},
        {name: "Anarchic", cl: 7},
        {name: "Anchoring", cl: 10},
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
        {name: "Impact", cl: 9},
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
        {name: 'Adaptive', flatprice: 1000, cl: 0},
        {name: 'Impervious', flatprice: 3000, cl: 0},
        {name: 'Glamered',  flatprice: 4000, cl: 0},
        {name: 'Allying', cl: 5},
        {name: 'Bane', cl: 8},
        {name: 'Called', cl: 9},
        {name: 'Conductive', cl: 8},
        {name: 'Conserving', cl: 7},
        {name: 'Corrosive', cl: 10},
        {name: 'Cruel', cl: 5},
        {name: 'Cunning', cl: 6},
        {name: 'Distance', cl: 6},
        {name: 'Flaming', cl: 10},
        {name: 'Frost', cl: 8},
        {name: 'Huntsman', cl: 7},
        {name: 'Jurist', cl: 4},
        {name: 'Limning', cl: 5},
        {name: 'Lucky', cl: 8},
        {name: 'Merciful', cl: 5},
        {name: 'Planar', cl: 9},
        {name: 'Reliable', cl: 8},
        {name: 'Returning', cl: 7},
        {name: 'Seeking', cl: 12},
        {name: 'Shock', cl: 8},
        {name: 'Thundering', cl: 5}
    ],
    2: [
        {name: "Anarchic", cl: 7},
        {name: "Anchoring", cl: 10},
        {name: "Axiomatic", cl: 7},
        {name: "Corrosive burst", cl: 12},
        {name: "Designating, lesser", cl: 7},
        {name: "Endless ammunition", cl: 9},
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
        {name: "Lucky, greater", cl: 12},
        {name: "Reliable, greater", cl: 12},
        {name: "Speed", cl: 7}
    ],
    4: [
        {name: "Brilliant energy", cl: 16},
        {name: "Designating, greater", cl: 12},
        {name: "Nimble shot", cl: 11},
        {name: "Second chance", cl: 11}
    ]
};

var ammunitionSpecialAbilities = {
    1: [
        {name: 'Dry load', flatprice: 1500, cl: 3},
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
function enchantWeaponNoAbility(weapon, weaponBonus) {
    var enchantedWeapon = clone(weapon);
    enchantedWeapon.Mwk = true;
    enchantedWeapon.Enchanted = true;
    enchantedWeapon.WeaponBonus = weaponBonus;
    enchantedWeapon.EnhancementBonus = weaponBonus;
    enchantedWeapon.Price += 300 + priceModifiers[enchantedWeapon.EnhancementBonus];
    enchantedWeapon.CL = 3 * enchantedWeapon.EnhancementBonus;
    enchantedWeapon.Name = enchantedWeapon.Name + " +" + enchantedWeapon.WeaponBonus;
    enchantedWeapon.id = enchantedWeapon.id + "-" + enchantedWeapon.WeaponBonus;
    return enchantedWeapon;
}
function enchantWeaponWithAbility(ability, weapon, weaponBonus, abilityBonus) {

    var enchantedWeapon = clone(weapon);
    enchantedWeapon.Mwk = true;
    enchantedWeapon.Enchanted = true;
    enchantedWeapon.SpecialAbilities = [idify(ability.name)];
    enchantedWeapon.WeaponBonus = weaponBonus;

    if (ability.flatprice) {
        enchantedWeapon.EnhancementBonus = weaponBonus;
        enchantedWeapon.Price += 300 + priceModifiers[enchantedWeapon.EnhancementBonus] + ability.flatprice;
    } else {
        enchantedWeapon.EnhancementBonus = weaponBonus + abilityBonus;
        enchantedWeapon.Price += 300 + priceModifiers[enchantedWeapon.EnhancementBonus];
    }

    enchantedWeapon.CL = Math.max(3 * enchantedWeapon.EnhancementBonus, ability.cl);
    enchantedWeapon.Name = ability.name + " " + enchantedWeapon.Name.toLowerCase() + " +" + enchantedWeapon.WeaponBonus;
    enchantedWeapon.id = idify(ability.name) + "-" + enchantedWeapon.id + "-" + enchantedWeapon.WeaponBonus;
    return enchantedWeapon;
}
function main() {
    for (var i in weapons) {
        var weapon = weapons[i];
        if (weapon.Mwk === true) {
            continue;
        }
        if (weapon.WeaponType !== 'ranged' && weapon.WeaponType !== 'ammunition') {
            var abilityTable = meleeSpecialAbilities;
        }
        else if (weapon.WeaponType === 'ranged'){
            var abilityTable = rangedSpecialAbilities;
        }
        else if (weapon.WeaponType === 'ammunition'){
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
