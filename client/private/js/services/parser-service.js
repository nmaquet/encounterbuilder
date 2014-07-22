'use strict';

DEMONSQUID.encounterBuilderServices.factory('parserService', [
    function () {

        function parseNumber(monster, parsedMonster, attribute, failures) {
            parsedMonster[attribute] = Number(monster[attribute]);
            if (isNaN(parsedMonster[attribute])) {
                failures[attribute] = attribute + "must be a number";
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

        var validACMods = ["armor", "Dex", "dodge", "deflection", "natural", "shield", "size"];

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

        function parseSkills(monster, parsedMonster, attribute, failures) {
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

        function parseHitDice(monster, parsedMonster, attribute, failures) {
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

        function parseResist(monster, parsedMonster, attribute, failures) {
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
            Skill: parseSkills,
            HP: parseNumber,
            HD: parseHitDice,
            Melee: parseAttacks,
            Ranged: parseAttacks,
            Resist: parseResist,
            SR: parseNumber
        };

        var service = {};

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
