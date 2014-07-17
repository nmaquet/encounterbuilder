'use strict';

DEMONSQUID.encounterBuilderServices.factory('templateService', [ 'crService', 'parserService', 'formatterService',
    function (crService, parserService, formatterService) {

        var service = {};

        var sizesAndModifier = {
            "Fine": {Reach: "0", "Space": "1/2 ft."},
            "Diminutive": {"Space": "1 ft.", "Reach": "0"},
            "Tiny": {"Space": "2-1/2 ft.", "Reach": "0"},
            "Small": {"Space": "5 ft.", "Reach": "5 ft."},
            "Medium": {"Space": "5 ft.", "Reach": "5 ft."},
            "Large": {"Space": "10 ft.", "Reach": "10 ft."},
            "Huge": {"Space": "15 ft.", "Reach": "15 ft."},
            "Gargantuan": {"Space": "20 ft.", "Reach": "20 ft."},
            "Colossal": {"Space": "30 ft.", "Reach": "30 ft."}};

        var damageDicesA = ["1", "1d2", "1d3", "1d4", "1d6", "1d8", "2d6", "3d6", "4d6", "6d6", "8d6", "12d6"];
        var damageDicesB = ["1d10", "2d8", "3d8", "4d8", "6d8", "8d8", "12d8"];
        var sizes = ["Fine", "Diminutive", "Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan", "Colossal"];

        var dexBasedSkills = ["Acrobatics", "Disable Device", "Escape Artist", "Fly", "Ride", "Sleight of Hand", "Stealth"];
        var strBasedSkills = ["Climb", "Swim"];

        var AtkAndAcSizeAdjustment = {
            "Fine": +8,
            "Diminutive": +4,
            "Tiny": +2,
            "Small": +1,
            "Medium": +0,
            "Large": -1,
            "Huge": -2,
            "Gargantuan": -4,
            "Colossal": -8
        };

        var CombatManoeuvreSizeAdjustment = {
            "Fine": -8,
            "Diminutive": -4,
            "Tiny": -2,
            "Small": -1,
            "Medium": +0,
            "Large": +1,
            "Huge": +2,
            "Gargantuan": +4,
            "Colossal": +8
        };

        function applyAdvancedTemplate(parsedMonster) {

            function advanceMelee(parsedMonster) {
                return advanceAttacks(parsedMonster, "Melee");
            }

            function advanceRanged(parsedMonster) {
                return advanceAttacks(parsedMonster, "Ranged");
            }

            function advanceAttacks(parsedMonster, attribute) {
                function addTwo(value) {
                    return value + 2;
                }

                function advanceAttack(attack) {
                    attack.attackBonuses = attack.attackBonuses.map(addTwo);
                    if (attribute === "Ranged" && /composite/i.test(attack.attackDescription)) {
                        attack.attackDescription = attack.attackDescription.replace(/\(\s*\+(\d+)\s*str\s+bonus\s*\)/i, function (match, bonus) {
                            return "(+" + (Number(bonus) + 2) + " Str bonus)";
                        });
                        attack.damageMod += 2;
                    }
                    else if (attribute === "Melee") {
                        attack.damageMod += 2;
                    }
                    return attack;
                }

                function advanceAttackList(attackList) {
                    return attackList.map(advanceAttack);
                }

                return parsedMonster[attribute].map(advanceAttackList);
            }

            parsedMonster.HP += ( 2 * parsedMonster.numberOfHD);
            parsedMonster.hitPointBonus += ( 2 * parsedMonster.numberOfHD);

            parsedMonster.Str += 4;
            parsedMonster.Dex += 4;
            parsedMonster.Con += 4;
            if (parsedMonster.Int > 2)
                parsedMonster.Int += 4;
            parsedMonster.Wis += 4;
            parsedMonster.Cha += 4;

            parsedMonster.Fort += +2;
            parsedMonster.Ref += +2;
            parsedMonster.Will += +2;

            parsedMonster.CMB += 2;
            parsedMonster.CMD += 4;
            parsedMonster.Init += 2;

            parsedMonster.normalAC += 4;
            parsedMonster.touchAC += 4;
            parsedMonster.flatFootedAC += 4;

            if (parsedMonster.Melee instanceof Array) {
                parsedMonster.Melee = advanceMelee(parsedMonster);
            }

            if (parsedMonster.Ranged instanceof Array) {
                parsedMonster.Ranged = advanceRanged(parsedMonster);
            }

            for (var i in parsedMonster.Skills) {
                parsedMonster.Skills[i].mod += 2;
            }
        }

        function modifyMonsterDCs(monster, modifier) {
            var regex = /DC\s*(\d\d?)/g;
            var attributes = ["SpecialAbilities", "SpellLikeAbilities", "SpecialAttacks", "Description", "SpellsKnown", "SpellsPrepared"];
            for (var i in attributes) {
                if (monster[attributes[i]]) {
                    monster[attributes[i]] = monster[attributes[i]].replace(regex, function (match, DC) {
                        return "DC " + (Number(DC) + modifier);
                    });
                }
            }
        }

        function applyYoungTemplate(monster, parsedMonster) {
            parsedMonster.HP -= (2 * parsedMonster.numberOfHD);
            parsedMonster.hitPointBonus -= (2 * parsedMonster.numberOfHD);
            parsedMonster.Str -= 4;
            parsedMonster.Dex += 4;
            parsedMonster.Con -= 4;

            parsedMonster.Str = Math.max(3, parsedMonster.Str);
            parsedMonster.Con = Math.max(3, parsedMonster.Con);

            parsedMonster.Fort -= 2;
            parsedMonster.Ref += 2;

            var previousSize = monster.Size;
            monster.Size = sizes[Math.max(sizes.indexOf(monster.Size) - 1, 0)];
            var atkAndAcSizeAdjustment = AtkAndAcSizeAdjustment[monster.Size] - AtkAndAcSizeAdjustment[previousSize];

            var cmbAndCmdSizeAdjustment = CombatManoeuvreSizeAdjustment[monster.Size] - CombatManoeuvreSizeAdjustment[previousSize];
            parsedMonster.CMB += cmbAndCmdSizeAdjustment + atkAndAcSizeAdjustment - 2/*Str*/;
            parsedMonster.CMD += cmbAndCmdSizeAdjustment - 2/*Str*/ + 2/*Dex*/;


            parsedMonster.normalAC += +2 + atkAndAcSizeAdjustment;
            parsedMonster.touchAC += +2 + atkAndAcSizeAdjustment;
            parsedMonster.flatFootedAC += atkAndAcSizeAdjustment;

            if (parsedMonster.AC_Mods) {
                if (!parsedMonster.AC_Mods.Dex) {
                    parsedMonster.AC_Mods.Dex = 0;
                }
                parsedMonster.AC_Mods.size = AtkAndAcSizeAdjustment[monster.Size];
                parsedMonster.AC_Mods.Dex += 2;
            }

            if (parsedMonster.AC_Mods && parsedMonster.AC_Mods.natural) {
                var naturalArmorReduction = Math.min(parsedMonster.AC_Mods.natural, 2);
                parsedMonster.AC_Mods.natural = Math.max(parsedMonster.AC_Mods.natural - 2, 0);
                parsedMonster.normalAC -= naturalArmorReduction;
                parsedMonster.flatFootedAC -= naturalArmorReduction;
            }

            var attackSizeAdjustment = AtkAndAcSizeAdjustment[monster.Size] - AtkAndAcSizeAdjustment[previousSize];

            adjustDamage(parsedMonster, "Melee", -1, -2 + attackSizeAdjustment, -2);
            adjustDamage(parsedMonster, "Ranged", -1, +2 + attackSizeAdjustment, -2);

            monster.Reach = sizesAndModifier[monster.Size].Reach;
            monster.Space = sizesAndModifier[monster.Size].Space;

            parsedMonster.Init += 2;

            for (var i in parsedMonster.Skills) {
                var skill = parsedMonster.Skills[i];
                if (dexBasedSkills.indexOf(skill.name) >= 0) {
                    skill.mod += 2;
                }
                if (strBasedSkills.indexOf(skill.name) >= 0) {
                    skill.mod -= 2;
                }
                if (skill.name === "Stealth") {
                    skill.mod += 4;
                }
                if (skill.name === "Fly") {
                    skill.mod += 2;
                }
            }
        }

        function applyGiantTemplate(monster, parsedMonster) {
            parsedMonster.HP += (2 * parsedMonster.numberOfHD);
            parsedMonster.hitPointBonus += (2 * parsedMonster.numberOfHD);
            parsedMonster.Str += 4;
            parsedMonster.Dex -= 2;
            parsedMonster.Con += 4;

            parsedMonster.Dex = Math.max(3, parsedMonster.Dex);

            parsedMonster.Fort += 2;
            parsedMonster.Ref -= 1;

            var previousSize = monster.Size;
            monster.Size = sizes[Math.max(sizes.indexOf(monster.Size) + 1, 0)];

            var cmbAndCmdSizeAdjustment = CombatManoeuvreSizeAdjustment[monster.Size] - CombatManoeuvreSizeAdjustment[previousSize];


            var atkAndAcSizeAdjustment = AtkAndAcSizeAdjustment[monster.Size] - AtkAndAcSizeAdjustment[previousSize];
            parsedMonster.CMB += cmbAndCmdSizeAdjustment + atkAndAcSizeAdjustment + 2/*Str*/;
            parsedMonster.CMD += cmbAndCmdSizeAdjustment + 2/*Str*/ - 1/*Dex*/;

            parsedMonster.normalAC += -1 + atkAndAcSizeAdjustment;
            parsedMonster.touchAC += -1 + atkAndAcSizeAdjustment;
            parsedMonster.flatFootedAC += atkAndAcSizeAdjustment;

            if (parsedMonster.AC_Mods) {
                if (!parsedMonster.AC_Mods.Dex) {
                    parsedMonster.AC_Mods.Dex = 0;
                }
                parsedMonster.AC_Mods.size = AtkAndAcSizeAdjustment[monster.Size];
                parsedMonster.AC_Mods.Dex -= 1;
                if (!parsedMonster.AC_Mods.natural) {
                    parsedMonster.AC_Mods.natural = 0;
                }
                parsedMonster.AC_Mods.natural += 3;
                parsedMonster.normalAC += 3;
                parsedMonster.flatFootedAC += 3;
            }


            adjustDamage(parsedMonster, "Melee", +1, +2 + atkAndAcSizeAdjustment, +2);
            adjustDamage(parsedMonster, "Ranged", +1, -1 + atkAndAcSizeAdjustment, +2);

            monster.Reach = sizesAndModifier[monster.Size].Reach;
            monster.Space = sizesAndModifier[monster.Size].Space;

            parsedMonster.Init -= 1;

            for (var i in parsedMonster.Skills) {
                var skill = parsedMonster.Skills[i];
                if (dexBasedSkills.indexOf(skill.name) >= 0) {
                    skill.mod -= 1;
                }
                if (strBasedSkills.indexOf(skill.name) >= 0) {
                    skill.mod += 2;
                }
                if (skill.name === "Stealth") {
                    skill.mod -= 4;
                }
                if (skill.name === "Fly") {
                    skill.mod -= 2;
                }
            }
        }

        function applyAugmentedTemplate(parsedMonster) {
            parsedMonster.HP += (2 * parsedMonster.numberOfHD);
            parsedMonster.hitPointBonus += (2 * parsedMonster.numberOfHD);
            parsedMonster.Str += 4;
            parsedMonster.Con += 4;

            parsedMonster.Fort += 2;

            parsedMonster.CMB += 2/*Str*/;
            parsedMonster.CMD += 2/*Str*/;

            adjustDamage(parsedMonster, "Melee", 0, +2, +2);
            adjustDamage(parsedMonster, "Ranged", 0, 0, +2);
        }

        function applyOutsiderishTemplate(monster, parsedMonster, DRType, smiteType, resists) {
            if (monster.Senses.indexOf("darkvision") === -1) {
                monster.Senses = "darkvision 60 ft., " + monster.Senses;
            }
            var SR = Math.floor(monster.CR + 5);
            if (!parsedMonster.SR || parsedMonster.SR < SR) {
                parsedMonster.SR = SR;
            }
            var resistMod = null;
            var DR = null;
            if (parsedMonster.numberOfHD <= 4) {
                resistMod = 5;
            }
            else if (parsedMonster.numberOfHD <= 10) {
                resistMod = 10;
                DR = "5/" + DRType;
            }
            else {
                resistMod = 15;
                DR = "10/" + DRType;
            }
            if (DR !== null && (!monster.DR || monster.DR.indexOf(DR) === -1)) {
                if (monster.DR)
                    monster.DR += ", ";
                monster.DR = (monster.DR || "") + DR;
            }
            if (!monster.SpecialAttacks || monster.SpecialAttacks.indexOf("smite " + smiteType) === -1) {
                if (monster.SpecialAttacks)
                    monster.SpecialAttacks += ", ";
                monster.SpecialAttacks = (monster.SpecialAttacks || "") + "smite " + smiteType + " (1/day)";
            }
            if (!parsedMonster.Resist) {
                parsedMonster.Resist = {};
            }

            for (var i in resists) {
                if (!parsedMonster.Resist[resists[i]] || parsedMonster.Resist[resists[i]] < resistMod) {
                    parsedMonster.Resist[resists[i]] = resistMod;
                }
            }

        }

        function applyFiendishTemplate(monster, parsedMonster) {
            applyOutsiderishTemplate(monster, parsedMonster, "good", "good", ["cold", "fire"]);
        }

        function applyCelestialTemplate(monster, parsedMonster) {
            applyOutsiderishTemplate(monster, parsedMonster, "evil", "evil", ["cold", "acid", "electricity"]);
        }

        function applyResoluteTemplate(monster, parsedMonster) {
            applyOutsiderishTemplate(monster, parsedMonster, "chaotic", "chaos", ["acid", "cold", "fire"]);
        }

        function applyEntropicTemplate(monster, parsedMonster) {
            applyOutsiderishTemplate(monster, parsedMonster, "lawful", "law", ["acid", "fire"]);
        }

        function adjustDamage(parsedMonster, attribute, dicesAdjustment, attackModifier, damageModifier) {
            for (var i in parsedMonster[attribute]) {
                var groups = parsedMonster[attribute][i];
                for (var j in groups) {
                    var attack = groups[j];
                    attack.attackBonuses = attack.attackBonuses.map(function (value) {
                        return value + attackModifier
                    });

                    if (attribute === "Ranged" && /composite/i.test(attack.attackDescription)) {
                        attack.attackDescription = attack.attackDescription.replace(/\(\s*\+(\d+)\s*str\s+bonus\s*\)/i, function (match, bonus) {
                            return "(+" + (Number(bonus) + damageModifier) + " Str bonus)";
                        });
                        attack.damageMod += damageModifier;
                    }
                    else if (attribute = "Melee") {
                        attack.damageMod += damageModifier;
                    }

                    if (damageDicesA.indexOf(attack.damageDice) !== -1) {
                        attack.damageDice = damageDicesA[damageDicesA.indexOf(attack.damageDice) + dicesAdjustment] || damageDicesA[(dicesAdjustment < 0) ? 0 : damageDicesA.length - 1];
                    }
                    else {
                        attack.damageDice = damageDicesB[damageDicesB.indexOf(attack.damageDice) + dicesAdjustment] || damageDicesB[(dicesAdjustment < 0) ? 0 : damageDicesA.length - 1];
                    }
                }
            }
        }

        function templateNameSuffix(templates) {
            function capitalize(string) {
                return (string.charAt(0).toUpperCase() + string.slice(1));
            }

            var names = [];
            for (var template in templates) {
                if (!templates.hasOwnProperty(template) || !templates[template])
                    continue;
                names.push(capitalize(template));
            }
            if (names.length > 0) {
                return " (" + names.join(", ") + ")";
            } else {
                return "";
            }
        }

        service.createTemplatedMonster = function (monster) {
            var templatedMonster = angular.copy(monster);
            if (monster.templates) {
                var parsedMonster = parserService.parseMonster(templatedMonster);
                for (var template in monster.templates) {
                    if (!monster.templates.hasOwnProperty(template) || !monster.templates[template])
                        continue;
                    if (template === "advanced") {
                        applyAdvancedTemplate(parsedMonster);
                        modifyMonsterDCs(templatedMonster, +2);
                        formatterService.formatMonster(templatedMonster, parsedMonster);
                        templatedMonster.CR = Math.floor(templatedMonster.CR + 1);
                    }
                    else if (template === "young") {
                        applyYoungTemplate(templatedMonster, parsedMonster);
                        formatterService.formatMonster(templatedMonster, parsedMonster);
                        templatedMonster.CR = Math.max(1 / 3, Math.floor(templatedMonster.CR - 1));
                    }
                    else if (template === "giant") {
                        applyGiantTemplate(templatedMonster, parsedMonster);
                        formatterService.formatMonster(templatedMonster, parsedMonster);
                        templatedMonster.CR = Math.floor(templatedMonster.CR + 1);
                    }
                    else if (template === "augmented") {
                        applyAugmentedTemplate(parsedMonster);
                        formatterService.formatMonster(templatedMonster, parsedMonster);
                    }
                    else if (template === "fiendish") {
                        if (parsedMonster.numberOfHD >= 5) {
                            templatedMonster.CR = Math.floor(templatedMonster.CR + 1);
                        }
                        applyFiendishTemplate(templatedMonster, parsedMonster);
                        formatterService.formatMonster(templatedMonster, parsedMonster);
                    }
                    else if (template === "celestial") {
                        if (parsedMonster.numberOfHD >= 5) {
                            templatedMonster.CR = Math.floor(templatedMonster.CR + 1);
                        }
                        applyCelestialTemplate(templatedMonster, parsedMonster);
                        formatterService.formatMonster(templatedMonster, parsedMonster);
                    }
                    else if (template === "resolute") {
                        if (parsedMonster.numberOfHD >= 5) {
                            templatedMonster.CR = Math.floor(templatedMonster.CR + 1);
                        }
                        applyResoluteTemplate(templatedMonster, parsedMonster);
                        formatterService.formatMonster(templatedMonster, parsedMonster);
                    }
                    else if (template === "entropic") {
                        if (parsedMonster.numberOfHD >= 5) {
                            templatedMonster.CR = Math.floor(templatedMonster.CR + 1);
                        }
                        applyEntropicTemplate(templatedMonster, parsedMonster);
                        formatterService.formatMonster(templatedMonster, parsedMonster);
                    }
                }
                templatedMonster.Name += templateNameSuffix(templatedMonster.templates);
                templatedMonster.XP = crService.calculateXp(templatedMonster.CR);
            }
            return templatedMonster;
        };

        return service;
    }

])
;