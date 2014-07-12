'use strict';

DEMONSQUID.encounterBuilderServices.factory('templateService', [ 'userMonsterService', 'crService', 'parserService', 'formatterService',
    function (userMonsterService, crService, parserService, formatterService) {

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
                callback(error);
            });
            return service.createTemplatedMonster(monster);
        };

        function advanceAttacks(parsedMonster, attribute) {
            function addTwo(value) {
                return value + 2;
            }
            function advanceAttack(attack) {
                attack.attackBonuses = attack.attackBonuses.map(addTwo);
                if (attribute === "Ranged" && /composite/i.test(attack.attackDescription)) {
                    attack.attackDescription = attack.attackDescription.replace(/\(\s*\+(\d+)\s*str\s+bonus\s*\)/i, function(match, bonus){
                       return "(+" + (Number(bonus) + 2) + " Str bonus)";
                    });
                    attack.damageMod += 2;
                }
                else if (attribute === "Melee") {
                    attack.damageMod += 2;
                }
                return attack;
            }
            function advanceAttackList(attackList) {
                return attackList.map(advanceAttack);
            }
            return parsedMonster[attribute].map(advanceAttackList);
        }

        function advanceMelee(parsedMonster) {
            return advanceAttacks(parsedMonster, "Melee");
        }

        function advanceRanged(parsedMonster) {
            return advanceAttacks(parsedMonster, "Ranged");
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

            parsedMonster.normalAC += 4;
            parsedMonster.touchAC += 4;
            parsedMonster.flatFootedAC += 4;

            if (parsedMonster.Melee instanceof Array) {
                parsedMonster.Melee = advanceMelee(parsedMonster);
            }

            if (parsedMonster.Ranged instanceof Array) {
                parsedMonster.Ranged = advanceRanged(parsedMonster);
            }

            for (var i in parsedMonster.Skills) {
                parsedMonster.Skills[i].mod += 2;
            }
        }

        function advanceDCs(monster) {
            var regex = /DC\s*(\d\d?)/g;
            var attributes = ["SpecialAbilities", "SpellLikeAbilities", "SpecialAttacks", "Description", "SpellsKnown", "SpellsPrepared"];
            for (var i in attributes) {
                if (monster[attributes[i]]) {
                    monster[attributes[i]] = monster[attributes[i]].replace(regex, function (match, DC) {
                        return "DC " + (Number(DC) + 2);
                    });
                }
            }
        }

        service.createTemplatedMonster = function (monster) {
            var templatedMonster = angular.copy(monster);
            if (monster.templates && monster.templates.length > 0) {
                var parsedMonster = parserService.parseMonster(templatedMonster);
                for (var i in monster.templates) {
                    if ("advanced" === monster.templates[i].template) {
                        advanceParsedMonster(parsedMonster);
                        advanceDCs(templatedMonster);
                        formatterService.formatMonster(templatedMonster, parsedMonster);
                        templatedMonster.Name = templatedMonster.Name + " (Advanced)";
                        templatedMonster.CR = Math.floor(templatedMonster.CR + 1);
                        templatedMonster.XP = crService.calculateXp(templatedMonster.CR);
                    }
                }
            }
            return templatedMonster;
        };

        return service;
    }

])
;
