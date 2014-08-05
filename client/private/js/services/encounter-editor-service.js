// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderServices.factory('encounterEditorService',
    ['$routeParams', 'monsterService', 'npcService', 'userMonsterService', 'userNpcService', 'encounterService', 'templateService', 'userResourceService', 'itemService',
        function ($routeParams, monsterService, npcService, userMonsterService, userNpcService, encounterService, templateService, userResourceService, itemService) {
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

            function addUserItem(id) {
                if ($routeParams.encounterId) {
                    userResourceService["user-item"].get({id: id}, function (item) {
                        var encounter = service.encounter;
                        if (!encounter.items) {
                            encounter.items = {};
                        }
                        if (!encounter.items[item._id]) {
                            encounter.items[item._id] = {Name: item.Name, Price: item.Price, PriceUnit: item.PriceUnit, amount: 1, userCreated: true};
                        }
                        else {
                            encounter.items[item._id].amount += 1;
                        }
                        encounterService.encounterChanged(encounter);
                    });

                }
            }

            function addItem(id) {
                if ($routeParams.encounterId) {
                    itemService.get(id, function (error, item) {
                        if (error) {
                            return console.log(error);
                        }
                        if (!item) {
                            return console.log("item not found");
                        }
                        var encounter = service.encounter;
                        if (!encounter.items) {
                            encounter.items = {};
                        }
                        if (!encounter.items[item.id]) {
                            encounter.items[item.id] = {Name: item.Name, Price: item.Price, PriceUnit: item.PriceUnit, amount: 1};
                        }
                        else {
                            encounter.items[item.id].amount += 1;
                        }
                        encounterService.encounterChanged(encounter);
                    });

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
            service.addUserItem = addUserItem;
            service.addItem = addItem;
            return service;
        }
    ]
);