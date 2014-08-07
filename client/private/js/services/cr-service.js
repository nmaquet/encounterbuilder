// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderServices.factory('crService', [
    function () {
        var crToXp = null;
        var xpToCr = null;

        function buildXpToCRTable() {
            crToXp = {"1": 400, "0.5": 200, "0.33": 135, "0.25": 100, "0.16": 65, "0.12": 50};
            xpToCr = {50: 0.125, 65: 1 / 6, 100: 1 / 4, 135: 1 / 3, 200: 0.5, 400: 1};
            for (var i = 2; i <= 100; i++) {
                var xp = null;
                if (i % 2 === 0) {
                    xp = crToXp[i - 1] * (3 / 2);
                }
                else {
                    xp = crToXp[i - 1] * (4 / 3);
                }
                crToXp[i] = xp;
                xpToCr[xp] = i;
            }
        }

        buildXpToCRTable();

        var service = {};

        service.calculateCR = function (encounter) {
            var totalXP = Number(encounter.xp);
            if (isNaN(totalXP)|| totalXP === 0) {
                return 0;
            }
            if (xpToCr[totalXP]) {
                return xpToCr[totalXP];
            }
            else {
                var closestXP = null;
                var xpKeys = Object.keys(xpToCr);
                for (var key in xpKeys) {
                    key = Number(key);
                    if (xpKeys[key] >= totalXP) {
                        var distance1 = Math.abs(xpKeys[key] - totalXP);
                        var distance2 = Math.abs(xpKeys[key - 1] - totalXP);
                        if (distance1 <= distance2) {
                            closestXP = xpKeys[key];
                        }
                        else {
                            closestXP = xpKeys[key - 1];
                        }
                        break;
                    }
                }
                return xpToCr[closestXP];
            }
        };

        service.calculateXp = function (cr) {
            if (cr < 1) {
                cr = Math.floor(cr * 100) / 100;
            } else {
                cr = Math.floor(cr);
            }
            return crToXp[cr];
        };

        return service;
    }]);
