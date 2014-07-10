'use strict';

DEMONSQUID.encounterBuilderServices.factory('formatterService', [

    function () {

        function formatUnsignedNumber(monster, parsedMonster, attribute, failures) {
            if (!isNaN(parsedMonster[attribute])) {
                monster[attribute] = parsedMonster[attribute];
            }
        }

        function formatSignedNumber(monster, parsedMonster, attribute, failures) {
            if (!isNaN(parsedMonster[attribute])) {
                var sign = parsedMonster[attribute] >= 0 ? "+" : "-";
                monster[attribute] = sign + parsedMonster[attribute];
            }
        }

        function formatArmorClass(monster, parsedMonster, attribute, failures) {
            var normal = parsedMonster.normalAC;
            var touch = parsedMonster.touchAC;
            var flatFooted = parsedMonster.flatFootedAC;
            monster.AC = normal + ", touch " + touch + ", flat-footed " + flatFooted;
        }

        function formatSkills(monster, parsedMonster, attribute, failures) {
            monster.Skills = parsedMonster.Skills.map(function (value) {
                var sign = (value.mod >= 0) ? "+" : "-";
                return (value.name + " " + sign + value.mod);
            }).join(", ");
        }

        function formatHitDice(monster, parsedMonster, attribute, failures) {
            if (parsedMonster.numberOfHD && parsedMonster.typeOfHD && parsedMonster.hitPointBonus) {
                var hitDice = parsedMonster.numberOfHD;
                var dieType = parsedMonster.typeOfHD;
                var bonus = parsedMonster.hitPointBonus;
                monster.HD = "(" + hitDice + "d" + dieType + "+" + bonus + ")";
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
            HD: formatHitDice
        };

        var service = {};

        service.formatMonster = function(monster, parsedMonster) {
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
