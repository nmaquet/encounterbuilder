"use strict";

var fs = require('fs');

var armors = require(__dirname + "/../data/items/armors_and_shields.json");
var clone = require(__dirname + "/../server/clone.js")().clone;
var idify = require(__dirname + "/../server/utils.js")().idify;

var armorSpecialAbilities = {
    1: [
        {name: 'Benevolent', flatprice: 2000, cl: 5},
        {name: 'Poison-resistant', flatprice: 2250, cl: 7},
        {name: 'Balanced', cl: 5},
        {name: 'Bitter', cl: 5},
        {name: 'Bolstering', cl: 5},
        {name: 'Brawling', cl: 5},
        {name: 'Champion', cl: 5},
        {name: 'Dastard', cl: 5},
        {name: 'Deathless', cl: 7},
        {name: 'Defiant', cl: 8},
        {name: 'Fortification (light)', cl: 13},
        {name: 'Grinding', cl: 5},
        {name: 'Impervious', cl: 7},
        {name: 'Mirrored', cl: 8},
        {name: 'Spell storing', cl: 12},
        {name: 'Stanching', cl: 7},
        {name: 'Warding', cl: 12}
    ],
    2: [
        {name: 'Glamered', flatprice: 2700, cl: 10},
        {name: 'Jousting', flatprice: 3750, cl: 5},
        {name: 'Shadow', flatprice: 3750, cl: 5},
        {name: 'Slick', flatprice: 3750, cl: 4},
        {name: 'Expeditious', flatprice: 4000, cl: 5},
        {name: 'Creeping', flatprice: 5000, cl: 7},
        {name: 'Rallying', flatprice: 5000, cl: 5},
        {name: "Spell resistance (13)", cl: 15}
    ],
    3: [
        {name: 'Adhesive', flatprice: 7000, cl: 10},
        {name: 'Hosteling', flatprice: 7500, cl: 9},
        {name: 'Radiant', flatprice: 7500, cl: 6},
        {name: 'Delving', flatprice: 10000, cl: 5},
        {name: 'Putrid', flatprice: 10000, cl:5},
        {name: 'Fortification (moderate)', cl: 13},
        {name: "Ghost touch", cl: 15},
        {name: "Invulnerability", cl: 18},
        {name: "Spell resistance (15)", cl: 15},
        {name: "Titanic", cl: 7},
        {name: "Wild", cl: 9}
    ],
    4: [
        {name: 'Harmonizing', flatprice: 15000, cl: 7},
        {name: 'Shadow, improved', flatprice: 15000, cl: 10},
        {name: 'Slick, improved', flatprice: 15000, cl: 10},
        {name: 'Energy resistance', flatprice: 18000, cl: 3},
        {name: 'Martyring', flatprice: 18000, cl: 9},
        {name: "Spell resistance (17)", cl: 15},
    ],
    5: [
        {name: 'Righteous', flatprice: 27000, cl: 10},
        {name: 'Unbound', flatprice: 27000, cl: 10},
        {name: 'Unrighteous', flatprice: 27000, cl: 10},
        {name: 'Vigilant', flatprice: 27000, cl: 10},
        {name: 'Determination', flatprice: 30000, cl: 10},
        {name: 'Shadow, greater', flatprice: 33750, cl: 15},
        {name: 'Slick, greater', flatprice: 33750, cl: 15},
        {name: 'Energy resistance, improved', flatprice: 42000, cl: 7},
        {name: 'Etherealness', flatprice: 49000, cl: 13},
        {name: 'Undead controlling', flatprice: 49000, cl: 13},
        {name: 'Energy resistance, greater', flatprice: 66000, cl: 11},
        {name: "Fortification (heavy)", cl: 13},
        {name: "Spell resistance (19)", cl: 15}
    ]
};

var shieldSpecialAbilities = {
    1: [
        {name: 'Poison-resistant', flatprice: 2250, cl: 7},
        {name: 'Arrow catching', cl: 8},
        {name: 'Bashing', cl: 8},
        {name: 'Blinding', cl: 7},
        {name: 'Clangorous', cl: 7},
        {name: 'Defiant', cl: 8},
        {name: 'Fortification (light)', cl: 13},
        {name: 'Grinding', cl: 5},
        {name: 'Impervious', cl: 7},
        {name: 'Mirrored', cl: 8},
        {name: 'Ramming', cl: 5}
    ],
    2: [
        {name: 'Rallying', flatprice: 5000, cl: 5},
        {name: 'Wyrmsbreath', flatprice: 5000, cl: 5},
        {name: "Animated", cl: 12},
        {name: "Arrow deflection", cl: 5},
        {name: "Merging", cl: 10},
        {name: "Spell resistance (13)", cl: 15}
    ],
    3: [
        {name: 'Hosteling', flatprice: 7500, cl: 9},
        {name: 'Radiant', flatprice: 7500, cl: 6},
        {name: 'Fortification (moderate)', cl: 13},
        {name: "Ghost touch", cl: 15},
        {name: "Spell resistance (15)", cl: 15},
        {name: "Wild", cl: 9}
    ],
    4: [
        {name: 'Energy resistance', flatprice: 18000, cl: 3},
        {name: "Spell resistance (17)", cl: 15}
    ],
    5: [
        {name: 'Determination', flatprice: 30000, cl: 10},
        {name: 'Energy resistance, improved', flatprice: 42000, cl: 7},
        {name: 'Undead controlling', flatprice: 49000, cl: 13},
        {name: 'Energy resistance, greater', flatprice: 66000, cl: 11},
        {name: "Fortification (heavy)", cl: 13},
        {name: "Reflecting", cl: 14},
        {name: "Spell resistance (19)", cl: 15}
    ]
};

var priceModifiers = {
    1: 1000,
    2: 4000,
    3: 9000,
    4: 16000,
    5: 25000,
    6: 36000,
    7: 49000,
    8: 64000,
    9: 81000,
    10: 100000
}

var enchantedArmorsAndShields = []
function enchantArmorOrShieldNoAbility(armorOrShield, bonus) {
    var enchantedArmorOrShield = clone(armorOrShield);
    enchantedArmorOrShield.Mwk = true;
    enchantedArmorOrShield.ArmorCheckPenalty = Math.min(0, enchantedArmorOrShield.ArmorCheckPenalty + 1);
    enchantedArmorOrShield.Enchanted = true;
    enchantedArmorOrShield.ArmorBonus = bonus;
    enchantedArmorOrShield.EnhancementBonus = bonus;
    enchantedArmorOrShield.Price += 150 + priceModifiers[enchantedArmorOrShield.EnhancementBonus];
    enchantedArmorOrShield.CL = 3 * enchantedArmorOrShield.EnhancementBonus;
    enchantedArmorOrShield.Name = enchantedArmorOrShield.Name + " +" + enchantedArmorOrShield.ArmorBonus;
    enchantedArmorOrShield.id = enchantedArmorOrShield.id + "-" + enchantedArmorOrShield.ArmorBonus;
    return enchantedArmorOrShield;
}

function enchantArmorOrShieldWithAbility(ability, armorOrShield, armorBonus, abilityBonus) {
    var enchantedArmorOrShield = clone(armorOrShield);
    enchantedArmorOrShield.Mwk = true;
    enchantedArmorOrShield.ArmorCheckPenalty = Math.min(0, enchantedArmorOrShield.ArmorCheckPenalty + 1);
    enchantedArmorOrShield.Enchanted = true;
    enchantedArmorOrShield.SpecialAbilities = [idify(ability.name)];
    enchantedArmorOrShield.ArmorBonus = armorBonus;
    if (ability.flatprice) {
        enchantedArmorOrShield.EnhancementBonus = armorBonus;
        enchantedArmorOrShield.Price += 150 + priceModifiers[enchantedArmorOrShield.EnhancementBonus] + ability.flatprice;
    } else {
        enchantedArmorOrShield.EnhancementBonus = armorBonus + abilityBonus;
        enchantedArmorOrShield.Price += 150 + priceModifiers[enchantedArmorOrShield.EnhancementBonus];
    }

    enchantedArmorOrShield.CL = Math.max(3 * enchantedArmorOrShield.EnhancementBonus, ability.cl);
    enchantedArmorOrShield.Name = ability.name + " " + enchantedArmorOrShield.Name.toLowerCase() + " +" + enchantedArmorOrShield.ArmorBonus;
    enchantedArmorOrShield.id = idify(ability.name) + "-" + enchantedArmorOrShield.id + "-" + enchantedArmorOrShield.ArmorBonus;
    return enchantedArmorOrShield;
}

function main() {
    for (var i in armors) {
        var armorOrShield = armors[i];
        if (armorOrShield.Mwk === true) {
            continue;
        }
        if (armorOrShield.Name === "Armored Kilt") {
            continue;
        }
        if (armorOrShield.ArmorType === 'light-armor' || armorOrShield.ArmorType === 'medium-armor' || armorOrShield.ArmorType === 'heavy-armor') {
            var abilityTable = armorSpecialAbilities;
        }
        else if (armorOrShield.ArmorType === 'shield') {
            var abilityTable = shieldSpecialAbilities;
        }
        else if (armorOrShield.ArmorType === 'extra') {
            continue;
        }
        else {
            throw Error("unknown armor type : " + armorOrShield.ArmorType + " for : " + armorOrShield.Name);
        }
        for (var armorBonus = 1; armorBonus <= 5; armorBonus++) {
            for (var abilityBonus = 1; abilityBonus <= 5; abilityBonus++) {
                if (abilityTable[abilityBonus] === undefined) {
                    continue;
                }
                for (var j in abilityTable[abilityBonus]) {
                    var ability = abilityTable[abilityBonus][j];
                    if (ability.filter && ability.filter(armorOrShield)) {
                        continue;
                    }
                    var enchantedArmorOrShield = enchantArmorOrShieldWithAbility(ability, armorOrShield, armorBonus, abilityBonus);
                    enchantedArmorsAndShields.push(enchantedArmorOrShield);
                }
            }
            var enchantedArmorOrShield = enchantArmorOrShieldNoAbility(armorOrShield, armorBonus);
            enchantedArmorsAndShields.push(enchantedArmorOrShield);
        }
    }
}

main();
console.log("generated " + enchantedArmorsAndShields.length + " enchanted objects");

fs.writeFileSync(__dirname + "/../data/items/enchanted_armors_and_shields.json", JSON.stringify(enchantedArmorsAndShields, null, 4));
