'use strict';

DEMONSQUID.encounterBuilderServices.factory('parserService', [
    function () {

        var service = {};

        var validACMods = ["armor", "Dex", "dodge", "deflection", "natural", "shield", "size"];

        function abilityModifier(ability) {
            return Math.round((ability - 10.5) / 2);
        }

        service.parseMonster = function (monster) {
            var parsedMonster = {};
            parseAC(monster, parsedMonster);
            parseHD(monster, parsedMonster);
            parseSkills(monster, parsedMonster);
            parseResit(monster, parsedMonster);

            if (monster.Melee) {
                parseMeleeAttacks(monster, parsedMonster);
            }

            if (monster.Ranged) {
                parseRangedAttacks(monster, parsedMonster);
            }

            parsedMonster.Str = Number(monster.Str);
            parsedMonster.Dex = Number(monster.Dex);
            parsedMonster.Con = Number(monster.Con);
            parsedMonster.Int = Number(monster.Int);
            parsedMonster.Wis = Number(monster.Wis);
            parsedMonster.Cha = Number(monster.Cha);

            parsedMonster.Fort = Number(monster.Fort);
            parsedMonster.Ref = Number(monster.Ref);
            parsedMonster.Will = Number(monster.Will);

            parsedMonster.CMB = Number(monster.CMB);
            parsedMonster.CMD = Number(monster.CMD);
            parsedMonster.SR = Number(monster.SR);

            parsedMonster.HP = Number(monster.HP);

            parsedMonster.Init = Number(monster.Init);

            if (monster.AC_Mods) {
                var mods = monster.AC_Mods.substring(1, monster.AC_Mods.length - 1);
                var AC_ModsRegex = /(\+?\-?\d+)\s*([^,\+\-]*)/g;
                var match = null;
                var parsedMods = {};
                while (null !== (match = AC_ModsRegex.exec(mods))) {
                    if (validACMods.indexOf(match[2].trim()) !== -1) {
                        parsedMods[match[2].trim()] = Number(match[1]);
                    }
                    else {
                        parsedMods.miscellaneous = (parsedMods.miscellaneous || "") + ( match[1] + " " + match[2]);
                    }
                }
                parsedMonster.AC_Mods = parsedMods;
            }
            return parsedMonster;

        };

        function parseAC(monster, parsedMonster) {

        }

        function parseHD(monster, parsedMonster) {
            var string = monster.HD;
            var regex = /\(\s*(\d+)\s*[d,D](\d+)\s*(\+?\-?\d*)\)/;
            var matches = regex.exec(string);
            if (!matches) {
                parsedMonster.numberOfHD = NaN;
                parsedMonster.typeOfHD = NaN;
                parsedMonster.hitPointBonus = NaN;
            }
            else {
                parsedMonster.numberOfHD = Number(matches[1]);
                parsedMonster.typeOfHD = Number(matches[2]);
                parsedMonster.hitPointBonus = Number(matches[3]);
            }
        }

        function parseResit(monster, parsedMonster) {
            if (monster.Resist) {
                parsedMonster.Resist = {};
                var string = monster.Resist;
                var resists = string.split(",");
                var regex = /(acid|cold|fire|electricity|sonic)\s(\d+)/i;
                for (var i in resists) {
                    var matches = regex.exec(resists[i]);
                    parsedMonster.Resist[matches[1]] = Number(matches[2]);
                }
            }
        }

        function parseSkills(monster, parsedMonster) {
            var string = monster.Skills;
            if (!string) {
                return;
            }
            var skills = string.split(",");
            var regex = /([^\+,\-]*)(\+?\-?\d+)/;
            parsedMonster.Skills = [];
            for (var i in skills) {
                var matches = regex.exec(skills[i]);
                parsedMonster.Skills.push({name: matches[1].trim(), mod: Number(matches[2])});
            }
        }

        function insideParens(position, string) {
            var left = 0, right = 0, i;
            for (i = 0; i < position; ++i) {
                if (string[i] === "(") {
                    left++;
                }
                else if (string[i] === ")") {
                    right++;
                }
            }
            return right !== left;
        }

        function replaceAndIfNotInsideParens(string) {
            return string.replace(/and/g, function (match, offset) {
                if (!insideParens(offset, string)) {
                    return ", ";
                } else {
                    return "and"
                }
            });
        }

        function parseMeleeAttacks(monster, parsedMonster) {
            parseAttacks(monster, parsedMonster, "Melee");
        }

        function parseRangedAttacks(monster, parsedMonster) {
            parseAttacks(monster, parsedMonster, "Ranged");
        }

        function parseAttacks(monster, parsedMonster, attribute) {

        }

        function parseNumber(monster, parsedMonster, attribute, failures) {
            parsedMonster[attribute] = Number(monster[attribute]);
            if (isNaN(parsedMonster[attribute])) {
                failures[attribute] = attribute + "must be a number";
            }
        }

        function parseArmorClass(monster, parsedMonster, attribute, failures) {
            var string = monster.AC;
            var regex = /(\d+)\s*,\s*touch\s*(\d+)\s*,\s*flat-footed\s*(\d+)/;
            var matches = regex.exec(string);
            if (!matches) {
                parsedMonster.normalAC = NaN;
                parsedMonster.touchAC = NaN;
                parsedMonster.flatFootedAC = NaN;
                failures["AC"] = "AC must be of the form 'X, touch Y, flat-footed Z";
            }
            else {
                parsedMonster.normalAC = Number(matches[1]);
                parsedMonster.touchAC = Number(matches[2]);
                parsedMonster.flatFootedAC = Number(matches[3]);
            }
        }

        function parseArmorClassModifiers(monster, parsedMonster, attribute, failures) {
            var mods = monster.AC_Mods.substring(1, monster.AC_Mods.length - 1);
            var AC_ModsRegex = /(\+?\-?\d+)\s*([^,\+\-]*)/g;
            var match;
            var parsedMods = {};
            while (null !== (match = AC_ModsRegex.exec(mods))) {
                if (validACMods.indexOf(match[2].trim()) !== -1) {
                    parsedMods[match[2].trim()] = Number(match[1]);
                }
                else {
                    parsedMods.miscellaneous = (parsedMods.miscellaneous || "") + ( match[1] + " " + match[2]);
                }
            }
            parsedMonster.AC_Mods = parsedMods;
        }
        
        function parseAttacks(monster, parsedMonster, attribute, failures) {
            // "+5 dancing greatsword +35/+30/+25/+20 (3d6+18) or slam +30 (2d8+13)"
            // "+5 dancing greatsword (+9 Str bonus) +35/+30/+25/+20 (3d6+18) or slam +30 (2d8+13)"
            var attacksGroup = replaceAndIfNotInsideParens(monster[attribute]).split(" or ");
            var regex = /^\s*(\+?\d?\s*[^\+\-]*(?:\s*\([^\)]*\)\s*)?[^\+\-]*)\s*(\+?\-?\d+\/?\+?\d*\/?\+?\d*\/?\+?\d*)\s*\(([^\)]*)\)\s*$/;
            var damageRegex = /(\dd\d+)(\+?\-?\d*)\s*(.*)/;

            var parsedAttackGroups = [];
            for (var i in attacksGroup) {
                var attacks = attacksGroup[i].split(',');
                var parsedAttacks = [];
                for (var j in attacks) {
                    var matches = regex.exec(attacks[j]);
                    if (matches) {
                        var attackDescription = matches[1].trim();
                        var attackBonuses = matches[2].split("/").map(Number);
                        var damageMatches = damageRegex.exec(matches[3]);
                        var damageDice = damageMatches[1];
                        var damageMod = Number(damageMatches[2]);
                        var specialAttacks = damageMatches[3];
                        parsedAttacks.push({attackDescription: attackDescription, attackBonuses: attackBonuses, damageDice: damageDice, damageMod: damageMod, specialAttacks: specialAttacks});
                    }
                }
                parsedAttackGroups.push(parsedAttacks);
            }
            parsedMonster[attribute] = parsedAttackGroups;
        }

        var parsers = {
            Str: parseNumber,
            Dex: parseNumber,
            Con: parseNumber,
            Int: parseNumber,
            Wis: parseNumber,
            Cha: parseNumber,
            Fort: parseNumber,
            Ref: parseNumber,
            Will: parseNumber,
            AC: parseArmorClass,
            AC_Mods: parseArmorClassModifiers,
            CMB: parseNumber,
            CMD: parseNumber,
            Init: parseNumber,
//            Skill: formatSkills,
//            HP: formatUnsignedNumber,
//            HD: formatHitDice,
            Melee: parseAttacks,
            Ranged: parseAttacks,
//            Resist: formatResist,
            SR: parseNumber
        };

        service.parseMonster = function (monster, optionalFailures) {
            var failures = optionalFailures || {};
            var parsedMonster = {};
            for (var attribute in parsers) {
                if (!parsers.hasOwnProperty(attribute))
                    continue;
                try {
                    parsers[attribute](monster, parsedMonster, attribute, failures);
                } catch (e) {
                    failures[attribute] = "parse error on attribute " + attribute + " (" + e + ")";
                }

            }
            return parsedMonster;
        };

        return service;
    }
]);
