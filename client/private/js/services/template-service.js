'use strict';

DEMONSQUID.encounterBuilderServices.factory('templateService', [ 'userMonsterService', 'crService', 'parserService',
    function (userMonsterService, crService, parserService) {

        var service = {};

        service.advanceMonster = function (monster, callback) {
            if (monster.templates && monster.templates.length > 0) {
                monster.templates = [];
            }
            else {
                monster.templates = [
                    {template: "advanced"}
                ];
            }
            userMonsterService.update(monster, function (error) {
                if (error) {
                    console.log(error);
                }
                else {
                    callback(service.createTemplatedMonster(monster));
                }
            });
        };

        function buildModifiedAC(parsedMonster, modifier) {
            var AC = modifier + parsedMonster.normalAC;
            var touch = modifier + parsedMonster.touchAC;
            var flatFooted = modifier + parsedMonster.flatFootedAC;
            return AC + ", touch " + touch + ", flat-footed " + flatFooted
        }

        function advanceParsedMonster(parsedMonster) {
            parsedMonster.HP += ( 2 * parsedMonster.numberOfHD);
            parsedMonster.hitPointBonus += ( 2 * parsedMonster.numberOfHD);

            parsedMonster.Str += 4;
            parsedMonster.Dex += 4;
            parsedMonster.Con += 4;
            if (parsedMonster.Int > 2)
                parsedMonster.Int += 4;
            parsedMonster.Wis += 4;
            parsedMonster.Cha += 4;

            parsedMonster.Fort += +2;
            parsedMonster.Ref += +2;
            parsedMonster.Will += +2;

            parsedMonster.CMB += 2;
            parsedMonster.CMD += 4;
            parsedMonster.Init += 2;

            for (var i in parsedMonster.Skills) {
                parsedMonster.Skills[i].mod += 2;
            }

        }

        service.createTemplatedMonster = function (monster) {
            var templatedMonster = angular.copy(monster);
            if (monster.templates && monster.templates.length > 0) {
                var parsedMonster = parserService.parseMonster(templatedMonster);

                for (var i in monster.templates) {
                    if ("advanced" === monster.templates[i].template) {
                        advanceParsedMonster(parsedMonster);

                        templatedMonster.Name = templatedMonster.Name + " (Advanced)";

                        templatedMonster.HP = parsedMonster.HP || templatedMonster.HP;
                        templatedMonster.HD = "(" + parsedMonster.numberOfHD + "d" + parsedMonster.typeOfHD + "+" + parsedMonster.hitPointBonus + ")";

                        templatedMonster.Str = parsedMonster.Str || templatedMonster.Str;
                        templatedMonster.Dex = parsedMonster.Dex || templatedMonster.Dex;
                        templatedMonster.Con = parsedMonster.Con || templatedMonster.Con;
                        templatedMonster.Int = parsedMonster.Int || templatedMonster.Int;
                        templatedMonster.Wis = parsedMonster.Wis || templatedMonster.Wis;
                        templatedMonster.Cha = parsedMonster.Cha || templatedMonster.Cha;

                        templatedMonster.Fort = parsedMonster.Fort || templatedMonster.Fort;
                        templatedMonster.Ref = parsedMonster.Ref || templatedMonster.Ref;
                        templatedMonster.Will = parsedMonster.Will || templatedMonster.Will;

                        templatedMonster.CMB = parsedMonster.CMB || templatedMonster.CMB;
                        templatedMonster.CMD = parsedMonster.CMD || templatedMonster.CMD;
                        templatedMonster.Init = parsedMonster.Init || templatedMonster.Init;
                        templatedMonster.Skills = parsedMonster.Skills.map(function (value) {
                            var sign = (value.mod >= 0) ? "+" : "-";
                            return (value.name + " " + sign + value.mod);
                        }).join(", ");
                        templatedMonster.AC = buildModifiedAC(parsedMonster, +4);
                        templatedMonster.CR = Math.floor(templatedMonster.CR + 1);
                        templatedMonster.XP = crService.calculateXp(templatedMonster.CR);
                    }
                }
            }
            return templatedMonster;
        };

        return service;
    }
]);
