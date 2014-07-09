'use strict';

DEMONSQUID.encounterBuilderServices.factory('parserService', [
    function () {

        var service = {};

        service.parseMonster = function (monster) {
            var parsedMonster = {};
            parseAC(monster, parsedMonster);

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

            return parsedMonster;

        };


        function parseAC(monster, parsedMonster) {
            // FIXME: handle right part with parentheses
            var string = monster.AC;
            var regex = /(\d+)\s*,\s*touch\s*(\d+)\s*,\s*flat-footed\s*(\d+)/;
            var matches = regex.exec(string);
            if (!matches) {
                console.log("failed to modify AC :( (did not recognize : '" + string + "'");
                return string;
            }

            parsedMonster.normalAC = Number(matches[1]);
            parsedMonster.touchAC = Number(matches[2]);
            parsedMonster.flatFootedAC = Number(matches[3]);
        }

        return service;
    }
]);
