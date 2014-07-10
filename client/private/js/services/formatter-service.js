'use strict';

DEMONSQUID.encounterBuilderServices.factory('formatterService', [

    function () {

        function numberize(monster, parsedMonster, attribute) {
            if (!isNaN(parsedMonster[attribute])) {
                monster[attribute] = parsedMonster[attribute];
            }
        }

        var formatter = {
            Str: numberize,
            Dex: numberize,
            Con: numberize,
            Int: numberize,
            Wis: numberize,
            Cha: numberize
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

            monster.Fort = parsedMonster.Fort || monster.Fort;
            monster.Ref = parsedMonster.Ref || monster.Ref;
            monster.Will = parsedMonster.Will || monster.Will;

            monster.AC = parsedMonster.normalAC + ", touch " + parsedMonster.touchAC + ", flat-footed " + parsedMonster.flatFootedAC;

            monster.CMB = parsedMonster.CMB || monster.CMB;
            monster.CMD = parsedMonster.CMD || monster.CMD;
            monster.Init = parsedMonster.Init || monster.Init;
            monster.Skills = parsedMonster.Skills.map(function (value) {
                var sign = (value.mod >= 0) ? "+" : "-";
                return (value.name + " " + sign + value.mod);
            }).join(", ");
        };

        return service;
    }
]);
