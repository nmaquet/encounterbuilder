'use strict';

DEMONSQUID.encounterBuilderServices.factory('templateService', [ 'userMonsterService', 'crService',
    function (userMonsterService, crService) {

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

        service.handleTemplates = function (monster) {


            //FIXME this is seriously hackish,
            var templates = monster.templates;
            delete monster.templates;
            var templatedMonster = angular.copy(monster);
            monster.templates = templates;

            delete templatedMonster.templates;
            if (monster.templates && monster.templates.length > 0) {
                for (var i in monster.templates) {
                    if ("advanced" === monster.templates[i].template) {
                        templatedMonster.Name = templatedMonster.Name + " (Advanced)";

                        templatedMonster.Str = Number(templatedMonster.Str) + 4;
                        templatedMonster.Dex = Number(templatedMonster.Dex) + 4;
                        templatedMonster.Con = Number(templatedMonster.Con) + 4;
                        if (Number(templatedMonster.Int) > 2) {
                            templatedMonster.Int = Number(templatedMonster.Int) + 4;
                        }
                        templatedMonster.Wis = Number(templatedMonster.Wis) + 4;
                        templatedMonster.Cha = Number(templatedMonster.Cha) + 4;

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
