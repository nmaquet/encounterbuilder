'use strict';

DEMONSQUID.encounterBuilderServices.factory('parserService', [
    function () {

        var service = {};

        service.parseMonster = function (monster) {
            var parsedMonster = {};
            parseAC(monster, parsedMonster);
            parseHD(monster, parsedMonster);

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

        return service;
    }
]);
