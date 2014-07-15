'use strict';

DEMONSQUID.encounterBuilderServices.factory('parserService', [
    function () {

        var service = {};

        service.parseMonster = function (monster) {
            var parsedMonster = {};
            parseAC(monster, parsedMonster);
            parseHD(monster, parsedMonster);
            parseSkills(monster, parsedMonster);

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

            parsedMonster.HP = Number(monster.HP);

            parsedMonster.Init = Number(monster.Init);

            /* FIXME: what about monsters with both armor and natural armor ? */
            if (/armor/i.test(monster.Treasure)) {
                parsedMonster.naturalArmor = 0;
            } else {
                parsedMonster.naturalArmor = parsedMonster.flatFootedAC - parsedMonster.touchAC;
            }

            return parsedMonster;

        };


        function parseAC(monster, parsedMonster) {
            // FIXME: handle right part with parentheses
            var string = monster.AC;
            var regex = /(\d+)\s*,\s*touch\s*(\d+)\s*,\s*flat-footed\s*(\d+)/;
            var matches = regex.exec(string);
            if (!matches) {
                parsedMonster.normalAC = NaN;
                parsedMonster.touchAC = NaN;
                parsedMonster.flatFootedAC = NaN;
            }
            else {
                parsedMonster.normalAC = Number(matches[1]);
                parsedMonster.touchAC = Number(matches[2]);
                parsedMonster.flatFootedAC = Number(matches[3]);
            }
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

        function parseSkills(monster, parsedMonster) {
            var string = monster.Skills;
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
            return string.replace(/and/g, function(match, offset) {
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
                        parsedAttacks.push({attackDescription: attackDescription, attackBonuses: attackBonuses, damageDice: damageDice, damageMod: damageMod,specialAttacks:specialAttacks});
                    }
                }
                parsedAttackGroups.push(parsedAttacks);
            }
            parsedMonster[attribute] = parsedAttackGroups;
        }

        return service;
    }
]);
