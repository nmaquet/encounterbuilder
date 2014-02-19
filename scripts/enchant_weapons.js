"use strict";
var weapons = require(__dirname + "/../data/items/weapons.json");

var clone = require(__dirname + "/../server/clone.js")().clone;
var fs = require('fs');

var meleeSpecialAbilitiesPlusOne = [
    {name: 'Impervious', flatprice: 3000},
    {name: 'Glamered', flatprice: 4000},
    {name: 'Allying'},
    {name: 'Bane'},
    {name: 'Benevolent'},
    {name: 'Called'},
    {name: 'Conductive'},
    {name: 'Corrosive'},
    {name: 'Countering'},
    {name: 'Courageous'},
    {name: 'Cruel'},
    {name: 'Cunning'},
    {name: 'Deadly'},
    {name: 'Defending'},
    {name: 'Dispelling'},
    {name: 'Flaming'},
    {name: 'Frost'},
    {name: 'Furious'},
    {name: 'Ghost touch'},
    {name: 'Grayflame'},
    {name: 'Grounding'},
    {name: 'Guardian'},
    {name: 'Heartseeker'},
    {name: 'Huntsman'},
    {name: 'Jurist'},
    {name: 'Keen'},
    {name: 'Ki focus'},
    {name: 'Limning'},
    {name: 'Menacing'},
    {name: 'Merciful'},
    {name: 'Mighty cleaving'},
    {name: 'Mimetic'},
    {name: 'Neutralizing'},
    {name: 'Ominous'},
    {name: 'Planar'},
    {name: 'Quenching'},
    {name: 'Seaborne'},
    {name: 'Shock'},
    {name: 'Spell storing'},
    {name: 'Thawing'},
    {name: 'Throwing'},
    {name: 'Thundering'},
    {name: 'Valiant'},
    {name: 'Vicious'}
];

function idify(string){
    return string.toLowerCase().replace(" ","-");
}
var enchantedWeapons = []
for (var i in weapons) {
    var weapon = weapons[i];
    if (weapon.WeaponType !== 'ranged' && weapon.WeaponType !== 'ammunition' && weapon.Mwk === false) {
        for (var j in meleeSpecialAbilitiesPlusOne) {
            var ability = meleeSpecialAbilitiesPlusOne[j];
            var enchantedWeapon = clone(weapon);
            var priceModifier = 300 + 2000 + (ability.flatprice ? ability.flatprice : 6000);
            enchantedWeapon.Price += priceModifier;
            enchantedWeapon.Mwk = true;
            enchantedWeapon.Enchanted = true;
            enchantedWeapon.SpecialAbilities = [idify(ability.name)];
            enchantedWeapon.WeaponBonus = 1;
            enchantedWeapon.Name = ability.name + " " + enchantedWeapon.Name +" +" + enchantedWeapon.WeaponBonus;
            enchantedWeapon.id = idify(ability.name) + "-" + enchantedWeapon.id +"-" + enchantedWeapon.WeaponBonus;
            enchantedWeapons.push(enchantedWeapon);
        }
        var enchantedWeapon = clone(weapon);
        var priceModifier = 300 + 2000;
        enchantedWeapon.Price += priceModifier;
        enchantedWeapon.Mwk = true;
        enchantedWeapon.Enchanted = true;
        enchantedWeapon.WeaponBonus = 1;
        enchantedWeapon.Name = enchantedWeapon.Name +" +" + enchantedWeapon.WeaponBonus;
        enchantedWeapon.id = enchantedWeapon.id +"-" + enchantedWeapon.WeaponBonus;
        enchantedWeapons.push(enchantedWeapon);
    }
}

console.log("generated " + enchantedWeapons.length + " enchanted objects");

fs.writeFileSync(__dirname + "/../data/items/enchanted_weapons.json", JSON.stringify(enchantedWeapons));
