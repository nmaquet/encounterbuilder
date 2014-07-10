'use strict';

DEMONSQUID.encounterBuilderServices.factory('formatterService', [

    function () {

        function unsignedNumber(monster, parsedMonster, attribute) {
            if (!isNaN(parsedMonster[attribute])) {
                monster[attribute] = parsedMonster[attribute];
            }
        }

        function signedNumber(monster, parsedMonster, attribute) {
            if (!isNaN(parsedMonster[attribute])) {
                var sign = parsedMonster[attribute] >= 0 ? "+" : "-";
                monster[attribute] = sign + parsedMonster[attribute];
            }
        }

        function armorClass(monster, parsedMonster, attribute) {
            var normal = parsedMonster.normalAC;
            var touch = parsedMonster.touchAC;
            var flatFooted = parsedMonster.flatFootedAC;
            monster.AC = normal + ", touch " + touch + ", flat-footed " + flatFooted;
        }

        function skills(monster, parsedMonster, attribute) {
            monster.Skills = parsedMonster.Skills.map(function (value) {
                var sign = (value.mod >= 0) ? "+" : "-";
                return (value.name + " " + sign + value.mod);
            }).join(", ");
        }

        var formatter = {
            Str: unsignedNumber,
            Dex: unsignedNumber,
            Con: unsignedNumber,
            Int: unsignedNumber,
            Wis: unsignedNumber,
            Cha: unsignedNumber,
            Fort: unsignedNumber,
            Ref: unsignedNumber,
            Will: unsignedNumber,
            AC: armorClass,
            CMB: signedNumber,
            CMD: unsignedNumber,
            Init: signedNumber,
            Skill: skills
        };

        var service = {};

        service.formatMonster = function(monster, parsedMonster) {
            monster.HP = parsedMonster.HP || monster.HP;

            if (parsedMonster.numberOfHD && parsedMonster.typeOfHD && parsedMonster.hitPointBonus) {
                var x = parsedMonster.numberOfHD;
                var y = parsedMonster.typeOfHD;
                var z = parsedMonster.hitPointBonus;
                monster.HD = "(" + x + "d" + y + "+" + z + ")";
            }

            for (var attribute in formatter) {
                if (!formatter.hasOwnProperty(attribute))
                    continue;
                formatter[attribute](monster, parsedMonster, attribute);
            }
        };

        return service;
    }
]);
