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
                    callback(service.handleTemplates(monster));
                }
            });
        };

        function buildModifiedAC(parsedMonster, modifier) {
            var AC = modifier + parsedMonster.normalAC;
            var touch = modifier + parsedMonster.touchAC;
            var flatFooted = modifier + parsedMonster.flatFootedAC;
            return AC + ", touch " + touch + ", flat-footed " + flatFooted
        }

        service.createTemplatedMonster = function (monster) {


            var templatedMonster = angular.copy(monster);

            if (monster.templates && monster.templates.length > 0) {
                var parsedMonster = parserService.parseMonster(templatedMonster);
                for (var i in monster.templates) {
                    if ("advanced" === monster.templates[i].template) {
                        templatedMonster.Name = templatedMonster.Name + " (Advanced)";

                        if (!isNaN(parsedMonster.HP) && !isNaN(parsedMonster.numberOfHD))
                            templatedMonster.HP = parsedMonster.HP + ( 2 * parsedMonster.numberOfHD);
                        if (!isNaN(parsedMonster.Str))
                            templatedMonster.Str = parsedMonster.Str + 4;
                        if (!isNaN(parsedMonster.Dex))
                            templatedMonster.Dex = parsedMonster.Dex + 4;
                        if (!isNaN(parsedMonster.Con))
                            templatedMonster.Con = parsedMonster.Con + 4;
                        if (!isNaN(parsedMonster.Int) && parsedMonster.Int > 2)
                            templatedMonster.Int = parsedMonster.Int + 4;
                        if (!isNaN(parsedMonster.Wis))
                            templatedMonster.Wis = parsedMonster.Wis + 4;
                        if (!isNaN(parsedMonster.Cha))
                            templatedMonster.Cha = parsedMonster.Cha + 4;

                        templatedMonster.Fort = parsedMonster.Fort + 2;
                        templatedMonster.Ref = parsedMonster.Ref + 2;
                        templatedMonster.Will = parsedMonster.Will + 2;

                        if (!isNaN(parsedMonster.CMB))
                            templatedMonster.CMB = parsedMonster.CMB + 2;
                        if (!isNaN(parsedMonster.CMD))
                            templatedMonster.CMD = parsedMonster.CMD + 4;

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
