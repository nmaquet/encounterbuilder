// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderServices.factory('encounterService', ['$timeout', '$http', '$rootScope', '$cacheFactory', 'crService', 'userMonsterService', 'userNpcService', 'templateService',
    function ($timeout, $http, $rootScope, $cacheFactory, crService, userMonsterService, userNpcService, templateService) {

        function calculateXp(encounter) {
            var xp = 0;
            for (var id in encounter.Monsters) {
                var monsterXP = Number(encounter.Monsters[id].XP) * encounter.Monsters[id].amount;
                if (!isNaN(monsterXP)) {
                    xp += monsterXP;
                }

            }
            for (id in encounter.Npcs) {
                var npcXP = Number(encounter.Npcs[id].XP) * encounter.Npcs[id].amount;
                if (!isNaN(npcXP)) {
                    xp += npcXP;
                }
            }
            return xp;
        }

        function removeItemsWithZeroAmount(encounter) {
            for (var id in encounter.Monsters) {
                if (encounter.Monsters[id].amount <= 0) {
                    delete encounter.Monsters[id];
                }
            }
            for (id in encounter.Npcs) {
                if (encounter.Npcs[id].amount <= 0) {
                    delete encounter.Npcs[id];
                }
            }
            for (id in encounter.items) {
                if (encounter.items[id].amount <= 0) {
                    delete encounter.items[id];
                }
            }
        }

        function calculateLootValue(encounter) {
            var multipliers = {
                "cp": 1,
                "sp": 10,
                "gp": 100,
                "pp": 1000
            };
            var lootValue = 0;
            lootValue += Number(encounter.coins.cp);
            lootValue += Number(encounter.coins.sp) * 10;
            lootValue += Number(encounter.coins.gp) * 100;
            lootValue += Number(encounter.coins.pp) * 1000;
            for (var i in encounter.items) {
                var multiplier = multipliers[encounter.items[i].PriceUnit] || 100;
                var price = Number(encounter.items[i].Price) || 0;
                lootValue += price * multiplier * encounter.items[i].amount;
            }
            return Math.round(lootValue / 100);
        }

        var service = {};

        service.encounters = [];

        /* FIXME: don't we need a user callback ? */
        /* FIXME: The client of this function has no way to know whether this succeeds or not. */
        service.remove = function (encounter) {
            $cacheFactory.get('$http').remove('/api/encounter/' + encounter._id);
            $http.post('/api/remove-encounter', { encounter: encounter })
                .success(function (response) {
                    if (response.error) {
                        console.log(response.error);
                    }
                })
                .error(function (response) {
                    console.log("remove of encounter failed !");
                });
        };

        service.createEncounter = function (onSuccess) {
            $http.post('/api/create-encounter')
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                    }
                    onSuccess(response.encounter);

                })
                .error(function (response) {
                    console.log("post of encounter failed !");
                });
        };

        /* FIXME: don't we need a user callback ? */
        /* FIXME: The client of this function has no way to know whether this succeeds or not. */
        service.encounterChanged = function (encounter) {
            encounter.xp = calculateXp(encounter);
            encounter.lootValue = calculateLootValue(encounter);
            encounter.CR = crService.calculateCR(encounter);
            removeItemsWithZeroAmount(encounter);
            $cacheFactory.get('$http').put('/api/encounter/' + encounter._id, {encounter: encounter});
            $http.post('/api/update-encounter', { encounter: encounter })
                .success(function (response) {
                    if (response._id) {
                        encounter._id = response._id;
                    }
                    if (response.error) {
                        console.log(error);
                    }
                })
                .error(function (response) {
                    console.log("post of encounter failed !");
                });
        };

        service.get = function (id, callback) {
            $http.get('/api/encounter/' + id, {cache: true})
                .success(function (data) {
                    callback(data.error, data.encounter);
                })
                .error(function (error) {
                    callback(error, null);
                });
        };

        service.getMultiple = function (ids, callback) {
            function pushTask(id) {
                tasks.push(function (taskCallback) {
                        $http.get('/api/encounter/' + id, {cache: true})
                            .success(function (data) {
                                taskCallback(null, data.encounter);
                            })
                            .error(function (error) {
                                taskCallback(error, null);
                            });
                    }
                );
            }

            var tasks = [];
            for (var i in ids) {
                pushTask(ids[i]);
            }
            window.async.parallel(tasks, function (error, results) {
                callback(error, results);
            });
        };

        service.updateUserContent = function (encounter) {
            var id;
            for (id in encounter.Monsters) {
                if (!encounter.Monsters.hasOwnProperty(id)) {
                    continue;
                }
                if (!encounter.Monsters[id].userCreated) {
                    continue;
                }
                (function (monster, monsterId) {
                    userMonsterService.get(monsterId, function (error, newMonster) {
                        newMonster = templateService.createTemplatedMonster(newMonster);
                        if (newMonster) {
                            monster.Name = newMonster.Name;
                            monster.XP = newMonster.XP;
                            monster.CR = newMonster.CR;
                            monster.Type = newMonster.Type;
                            monster.TreasureBudget = newMonster.TreasureBudget;
                            monster.Heroic = newMonster.Heroic;
                            monster.Level = newMonster.Level;
                        } else {
                            delete encounter.Monsters[monsterId];
                            /* monster is no longer found -> remove it */
                            service.encounterChanged(encounter);
                        }
                        encounter.xp = calculateXp(encounter);
                        encounter.CR = crService.calculateCR(encounter);
                    });
                })(encounter.Monsters[id], id);
            }
            for (id in encounter.Npcs) {
                if (!encounter.Npcs.hasOwnProperty(id)) {
                    continue;
                }
                if (!encounter.Npcs[id].userCreated) {
                    continue;
                }
                (function (npc, npcId) {
                    userNpcService.get(npcId, function (error, newNpc) {
                        if (newNpc) {
                            npc.Name = newNpc.Name;
                            npc.XP = newNpc.XP;
                            npc.CR = newNpc.CR;
                            npc.Type = newNpc.Type;
                            npc.TreasureBudget = newNpc.TreasureBudget;
                            npc.Heroic = newNpc.Heroic;
                            npc.Level = newNpc.Level;
                        } else {
                            delete encounter.Npcs[npcId];
                            /* npc is no longer found -> remove it */
                            service.encounterChanged(encounter);
                        }
                        encounter.xp = calculateXp(encounter);
                        encounter.CR = crService.calculateCR(encounter);
                    });
                })(encounter.Npcs[id], id);
            }
        };

        return service;
    }]);
