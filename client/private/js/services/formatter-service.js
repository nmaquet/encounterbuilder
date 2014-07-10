'use strict';

DEMONSQUID.encounterBuilderServices.factory('formatterService', [

    function () {

        function formatUnsignedNumber(monster, parsedMonster, attribute, failures) {
            if (!isNaN(parsedMonster[attribute])) {
                monster[attribute] = parsedMonster[attribute];
            } else {
                failures[attribute] = attribute + " must be a number";
            }
        }

        function formatSignedNumber(monster, parsedMonster, attribute, failures) {
            if (!isNaN(parsedMonster[attribute])) {
                var sign = parsedMonster[attribute] >= 0 ? "+" : "-";
                monster[attribute] = sign + parsedMonster[attribute];
            } else {
                failures[attribute] = attribute + " must be a number";
            }
        }

        function formatArmorClass(monster, parsedMonster, attribute, failures) {
            var normal = parsedMonster.normalAC;
            var touch = parsedMonster.touchAC;
            var flatFooted = parsedMonster.flatFootedAC;
            if (normal && touch && flatFooted) {
                monster.AC = normal + ", touch " + touch + ", flat-footed " + flatFooted;
            } else {
                failures["AC"] = "AC must be of the form 'AC X, touch Y, flat-footed Z'";
            }
        }

        function formatSkills(monster, parsedMonster, attribute, failures) {
            if (parsedMonster.Skills instanceof Array) {
                monster.Skills = parsedMonster.Skills.map(function (value) {
                    var sign = (value.mod >= 0) ? "+" : "-";
                    return (value.name + " " + sign + value.mod);
                }).join(", ");
            } else {
                failures["Skills"] = "Skills must be a comma-separated list of entries of the form 'skill name +X'";
            }
        }

        function formatHitDice(monster, parsedMonster, attribute, failures) {
            if (parsedMonster.numberOfHD && parsedMonster.typeOfHD && parsedMonster.hitPointBonus) {
                var hitDice = parsedMonster.numberOfHD;
                var dieType = parsedMonster.typeOfHD;
                var bonus = parsedMonster.hitPointBonus;
                monster.HD = "(" + hitDice + "d" + dieType + "+" + bonus + ")";
            } else {
                failures["HD"] = "HD must be of the form '(XdY+Z)'";
            }
        }

        function formatMelee(monster, parsedMonster, attribute, failures) {
            function formatAttack(attack) {
                var formattedAttackBonuses = attack.attackBonuses.map(function(bonus){
                    if (!isNaN(bonus)) {
                        var sign = bonus >= 0 ? "+" : "-";
                        return sign + bonus;
                    } else {
                        failures["Melee"] = "Melee attack bonuses must be signed numbers";
                    }
                }).join("/");
                return attack.attackDescription + " " + formattedAttackBonuses + " (" + attack.damageDice + "+" + attack.damageMod + ")";
            }
            function formatAttackList(attackList) {
                return attackList.map(formatAttack).join(", ");
            }
            if (parsedMonster.Melee instanceof Array) {
                monster.Melee = parsedMonster.Melee.map(formatAttackList).join(" or ");
            } else {
                failures["Melee"] = "Melee must be of the form '+5 dancing greatsword +35/+30/+25/+20 (3d6+18) or slam +30 (2d8+13)'";
            }
        }

        var formatters = {
            Str: formatUnsignedNumber,
            Dex: formatUnsignedNumber,
            Con: formatUnsignedNumber,
            Int: formatUnsignedNumber,
            Wis: formatUnsignedNumber,
            Cha: formatUnsignedNumber,
            Fort: formatUnsignedNumber,
            Ref: formatUnsignedNumber,
            Will: formatUnsignedNumber,
            AC: formatArmorClass,
            CMB: formatSignedNumber,
            CMD: formatUnsignedNumber,
            Init: formatSignedNumber,
            Skill: formatSkills,
            HP: formatUnsignedNumber,
            HD: formatHitDice,
            Melee: formatMelee
        };

        var service = {};

        service.formatMonster = function (monster, parsedMonster) {
            var failures = {};
            for (var attribute in formatters) {
                if (!formatters.hasOwnProperty(attribute))
                    continue;
                formatters[attribute](monster, parsedMonster, attribute, failures);
            }
            return failures;
        };

        return service;
    }
]);
