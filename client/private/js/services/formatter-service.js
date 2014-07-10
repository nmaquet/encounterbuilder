'use strict';

DEMONSQUID.encounterBuilderServices.factory('formatterService', [
    function () {

        var service = {};

        service.formatMonster = function(monster, parsedMonster) {
            monster.HP = parsedMonster.HP || monster.HP;

            if (parsedMonster.numberOfHD && parsedMonster.typeOfHD && parsedMonster.hitPointBonus) {
                var x = parsedMonster.numberOfHD;
                var y = parsedMonster.typeOfHD;
                var z = parsedMonster.hitPointBonus;
                monster.HD = "(" + x + "d" + y + "+" + z + ")";
            }

            monster.Str = parsedMonster.Str || monster.Str;
            monster.Dex = parsedMonster.Dex || monster.Dex;
            monster.Con = parsedMonster.Con || monster.Con;
            monster.Int = parsedMonster.Int || monster.Int;
            monster.Wis = parsedMonster.Wis || monster.Wis;
            monster.Cha = parsedMonster.Cha || monster.Cha;

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
