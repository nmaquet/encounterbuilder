'use strict';

DEMONSQUID.encounterBuilderServices.factory('encounterEditorService',
    ['$routeParams', 'monsterService', 'npcService', 'userMonsterService', 'userNpcService', 'encounterService', 'templateService',
        function ($routeParams, monsterService, npcService, userMonsterService, userNpcService, encounterService, templateService) {
            function addToEncounter(dbService, id, encounterListName, templated) {
                dbService.get(id, function (error, toAdd) {
                    if (error) {
                        return console.log(error);
                    }
                    if (templated) {
                        toAdd = templateService.createTemplatedMonster(toAdd);
                    }
                    var encounter = service.encounter;
                    if (!encounter[encounterListName]) {
                        encounter[encounterListName] = {};
                    }
                    var id = toAdd.id || toAdd._id;
                    if (!encounter[encounterListName][id]) {
                        encounter[encounterListName][id] = {
                            amount: 1,
                            Name: toAdd.Name,
                            XP: toAdd.XP,
                            CR: toAdd.CR,
                            Type: toAdd.Type,
                            TreasureBudget: toAdd.TreasureBudget,
                            Heroic: toAdd.Heroic,
                            Level: toAdd.Level
                        };
                        if (toAdd.id === undefined) {
                            encounter[encounterListName][id].userCreated = true;
                        }
                    }
                    else {
                        encounter[encounterListName][id].amount += 1;
                    }
                    encounterService.encounterChanged(encounter);
                });
            }

            function addUserNpcOrMonster(type, id) {
                if ($routeParams.encounterId) {
                    if (type === "monster") {
                        addToEncounter(userMonsterService, id, "Monsters", true);
                    }
                    else {
                        addToEncounter(userNpcService, id, "Npcs", false);
                    }
                }
            }

            function addNpcOrMonster(type, id) {
                if ($routeParams.encounterId) {
                    if (type === "monster") {
                        addToEncounter(monsterService, id, "Monsters", false);
                    }
                    else {
                        addToEncounter(npcService, id, "Npcs", false);
                    }
                }
            }

            var service = {
                encounter: null
            };
            service.addUserNpcOrMonster = addUserNpcOrMonster;
            service.addNpcOrMonster = addNpcOrMonster;
            return service;
        }
    ]
);