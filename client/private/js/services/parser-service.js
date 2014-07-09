'use strict';

DEMONSQUID.encounterBuilderServices.factory('parserService', [
    function () {

        var service = {};

        service.parseMonster = function (monster) {
            var parsedMonster = {};
            parseAC(monster, parsedMonster);
            parseHD(monster, parsedMonster);
            parseSkills(monster, parsedMonster);
            parseMeleeAttacks(monster, parsedMonster);

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


            return parsedMonster;

        };


        function parseAC(monster, parsedMonster) {
            // FIXME: handle right part with parentheses
            var string = monster.AC;
            var regex = /(\d+)\s*,\s*touch\s*(\d+)\s*,\s*flat-footed\s*(\d+)/;
            var matches = regex.exec(string);
            if (!matches) {
                console.log("failed to parse AC :( (did not recognize : '" + string + "'");
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
            var regex = /\(\s*(\d+)\s*[d,D](\d+)\s*\+?\s*(\d*)\)/;
            var matches = regex.exec(string);
            if (!matches) {
                console.log("failed to parse HD :( (did not recognize : '" + string + "'");
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

        function parseMeleeAttacks(monster, parsedMonster) {
            // "+5 dancing greatsword +35/+30/+25/+20 (3d6+18) or slam +30 (2d8+13)"
            var attacksGroup = monster.Melee.split(" or ");
            var regex = /(\+?\d?\s*[^\+\-]*)\s*(\+?\-?\d+\/?\+?\d*\/?\+?\d*\/?\+?\d*)\s*\(([^\)]*)\)/;
            var damageRegex = /(\dd\d+)\+?\-?(\d*)/;

            var parsedAttackGroups = [];
            for (var i in attacksGroup) {
                var attacks = attacksGroup[i].split(',');
                var parsedAttacks = [];
                for (var j in attacks) {
                    var matches = regex.exec(attacks[j]);
                    if (matches) {
                        var attackDescription = matches[1];
                        var attackBonuses = matches[2].split("/");

                        var damageMatches = damageRegex.exec(matches[3]);

                        parsedAttacks.push({attackDescription: attackDescription, attackBonuses: attackBonuses, damageDice: damageMatches[1], damageMod: damageMatches[2]});
                    }
                }
                parsedAttackGroups.push(parsedAttacks);
            }
            parsedMonster.Melee = parsedAttackGroups;
        }

        return service;
    }
]);
