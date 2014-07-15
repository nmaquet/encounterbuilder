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
            "Huge": {"Space": "10 ft.", "Reach": "10 ft."},
            "Gargantuan": {"Space": "10 ft.", "Reach": "10 ft."},
            "Colossal": {"Space": "10 ft.", "Reach": "10 ft."}};

        var damageDicesA = ["1", "1d2", "1d3", "1d4", "1d6", "1d8", "2d6", "3d6", "4d6", "6d6", "8d6", "12d6"];
        var damageDicesB = ["1d10", "2d8", "3d8", "4d8", "6d8", "8d8", "12d8"];
        var sizes = ["Fine", "Diminutive", "Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan", "Colossal"];

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

            parsedMonster.normalAC += 2;
            parsedMonster.touchAC += 2;
            if (parsedMonster.AC_Mods) {
                if (!parsedMonster.AC_Mods.Dex) {
                    parsedMonster.AC_Mods.Dex = 0;
                }
                parsedMonster.AC_Mods.Dex += 2;
            }

            if (parsedMonster.AC_Mods && parsedMonster.AC_Mods.natural) {

                var naturalArmorReduction = Math.min(parsedMonster.AC_Mods.natural, 2);
                parsedMonster.AC_Mods.natural = Math.max(parsedMonster.AC_Mods.natural - 2, 0);
                parsedMonster.normalAC -= naturalArmorReduction;
                parsedMonster.flatFootedAC -= naturalArmorReduction;
            }
            adjustDamage(parsedMonster, "Melee", -1, -2, -2);
            adjustDamage(parsedMonster, "Ranged", -1, +2, -2);
            monster.Size = sizes[Math.max(sizes.indexOf(monster.Size) - 1, 0)];
            monster.Reach = sizesAndModifier[monster.Size].Reach;
            monster.Space = sizesAndModifier[monster.Size].Space;
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

            parsedMonster.touchAC -= 2;
            if (parsedMonster.AC_Mods) {
                if (!parsedMonster.AC_Mods.Dex) {
                    parsedMonster.AC_Mods.Dex = 0;
                }
                parsedMonster.AC_Mods.Dex -= 1;
            }

            if (parsedMonster.AC_Mods && parsedMonster.AC_Mods.natural) {

                parsedMonster.AC_Mods.natural += 3;
                parsedMonster.normalAC += 2;
                parsedMonster.flatFootedAC += 2;
            }
            adjustDamage(parsedMonster, "Melee", +1, +2, +2);
            adjustDamage(parsedMonster, "Ranged", +1, -1, +2);
            monster.Size = sizes[Math.max(sizes.indexOf(monster.Size) + 1, 0)];
            monster.Reach = sizesAndModifier[monster.Size].Reach;
            monster.Space = sizesAndModifier[monster.Size].Space;
        }

        function applyAugmentedTemplate(parsedMonster) {
            parsedMonster.HP += (2 * parsedMonster.numberOfHD);
            parsedMonster.hitPointBonus += (2 * parsedMonster.numberOfHD);
            parsedMonster.Str += 4;
            parsedMonster.Con += 4;

            parsedMonster.Fort += 2;

            if (parsedMonster.AC_Mods) {
                if (!parsedMonster.AC_Mods.Dex) {
                    parsedMonster.AC_Mods.Dex = 0;
                }
                parsedMonster.AC_Mods.Dex += 2;
            }

            parsedMonster.normalAC += 2;

            adjustDamage(parsedMonster, "Melee", 0, +2, +2);
            adjustDamage(parsedMonster, "Ranged", 0, 0, +2);
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
                        templatedMonster.CR = Math.floor(templatedMonster.CR - 1);
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
