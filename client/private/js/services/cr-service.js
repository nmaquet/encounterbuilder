'use strict';

DEMONSQUID.encounterBuilderServices.factory('crService', [
    function () {

        var crToXp = {1: 400};
        var xpToCr = {50: 0.125, 65: 1 / 6, 100: 1 / 4, 135: 1 / 3, 200: 0.5, 400: 1};
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

        var service = {};

        service.calculateCR = function (encounter) {
            var totalXP = encounter.xp;
            var cr = null;
            if (xpToCr[totalXP]) {
                var cr = xpToCr[totalXP];
            }
            else {
                var closestXP = null;
                var xpKeys = Object.keys(xpToCr);
                for (var key in xpKeys) {
                    if (xpKeys[key] >= totalXP) {
                        closestXP = xpKeys[key];
                        break;
                    }
                }
                var cr = xpToCr[closestXP];
            }
            return cr;
        }

        return service;
    }]);
