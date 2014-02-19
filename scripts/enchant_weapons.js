"use strict";

var fs = require('fs');

var weapons = require(__dirname + "/../data/items/weapons.json");
var clone = require(__dirname + "/../server/clone.js")().clone;

var meleeSpecialAbilitiesPlusOne = [
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
];

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

for (var i in weapons) {
    var weapon = weapons[i];
    if (weapon.WeaponType !== 'ranged' && weapon.WeaponType !== 'ammunition' && weapon.Mwk === false) {
        for (var weaponBonus = 1; weaponBonus <= 5; weaponBonus++) {
            for (var j in meleeSpecialAbilitiesPlusOne) {
                var ability = meleeSpecialAbilitiesPlusOne[j];
                var enchantedWeapon = clone(weapon);
                enchantedWeapon.Mwk = true;
                enchantedWeapon.Enchanted = true;
                enchantedWeapon.SpecialAbilities = [idify(ability.name)];
                enchantedWeapon.WeaponBonus = weaponBonus;
                enchantedWeapon.EnhancementBonus = weaponBonus + 1;
                if (ability.flatprice) {
                    enchantedWeapon.Price += 300 + priceModifiers[enchantedWeapon.EnhancementBonus - 1] + ability.flatprice;
                } else {
                    enchantedWeapon.Price += 300 + priceModifiers[enchantedWeapon.EnhancementBonus];
                }
                enchantedWeapon.CL = Math.max(3 * enchantedWeapon.EnhancementBonus, ability.cl);
                enchantedWeapon.Name = ability.name + " " + enchantedWeapon.Name.toLowerCase() + " +" + enchantedWeapon.WeaponBonus;
                enchantedWeapon.id = idify(ability.name) + "-" + enchantedWeapon.id + "-" + enchantedWeapon.WeaponBonus;
                enchantedWeapons.push(enchantedWeapon);
            }
            var enchantedWeapon = clone(weapon);
            enchantedWeapon.Mwk = true;
            enchantedWeapon.Enchanted = true;
            enchantedWeapon.WeaponBonus = weaponBonus;
            enchantedWeapon.EnhancementBonus = weaponBonus;
            enchantedWeapon.Price += 300 + priceModifiers[enchantedWeapon.EnhancementBonus];
            enchantedWeapon.CL = 3 * enchantedWeapon.EnhancementBonus;
            enchantedWeapon.Name = enchantedWeapon.Name + " +" + enchantedWeapon.WeaponBonus;
            enchantedWeapon.id = enchantedWeapon.id + "-" + enchantedWeapon.WeaponBonus;
            enchantedWeapons.push(enchantedWeapon);
        }
    }
}

console.log("generated " + enchantedWeapons.length + " enchanted objects");

fs.writeFileSync(__dirname + "/../data/items/enchanted_weapons.json", JSON.stringify(enchantedWeapons, null, 4));
