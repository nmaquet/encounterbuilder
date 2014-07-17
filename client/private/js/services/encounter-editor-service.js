'use strict';

DEMONSQUID.encounterBuilderServices.factory('encounterEditorService',
    ['$routeParams', 'userMonsterService', 'userNpcService', 'encounterService', 'templateService',
        function ($routeParams, userMonsterService, userNpcService, encounterService, templateService) {
            function addUserNpcOrMonster(type, id) {
                if ($routeParams.encounterId) {
                    if (type === "monster") {
                        userMonsterService.get(id, function (error, monster) {
                            if (error) {
                                return console.log(error);
                            }
                            monster = templateService.createTemplatedMonster(monster);
                            var encounter = service.encounter;
                            if (!encounter.Monsters) {
                                encounter.Monsters = {};
                            }
                            var id = monster.id || monster._id;
                            if (!encounter.Monsters[id]) {
                                encounter.Monsters[id] = {
                                    amount: 1,
                                    Name: monster.Name,
                                    XP: monster.XP,
                                    CR: monster.CR,
                                    Type: monster.Type,
                                    TreasureBudget: monster.TreasureBudget,
                                    Heroic: monster.Heroic,
                                    Level: monster.Level
                                };
                                if (monster.id === undefined) {
                                    encounter.Monsters[id].userCreated = true;
                                }
                            }
                            else {
                                encounter.Monsters[id].amount += 1;
                            }
                            encounterService.encounterChanged(encounter);
                        });

                    }
                    else {
                        userNpcService.get(id, function (error, npc) {
                            if (error) {
                                return console.log(error);
                            }
                            var encounter = service.encounter;
                            if (!encounter.Npcs) {
                                encounter.Npcs = {};
                            }
                            var id = npc.id || npc._id;
                            if (!encounter.Npcs[id]) {
                                encounter.Npcs[id] = {
                                    amount: 1,
                                    Name: npc.Name,
                                    XP: npc.XP,
                                    CR: npc.CR,
                                    Type: npc.Type,
                                    Heroic: npc.Heroic,
                                    Level: npc.Level
                                };
                                if (npc.id === undefined) {
                                    encounter.Npcs[id].userCreated = true;
                                }
                            }
                            else {
                                encounter.Npcs[id].amount += 1;
                            }
                            encounterService.encounterChanged(encounter);
                        });

                    }
                }
            }

            var service = {
                encounter: null
            };
            service.addUserNpcOrMonster = addUserNpcOrMonster;
            return service;
        }
    ]
);