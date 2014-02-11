'use strict';

DEMONSQUID.encounterBuilderServices.factory('crService', [
    function () {
        function buildXpToCRTable() {
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
            return xpToCr;
        }

        var xpToCr = buildXpToCRTable();

        var service = {};

        service.calculateCR = function (encounter) {
            var totalXP = Number(encounter.xp);
            if (totalXP === 0) {
                return 0;
            }
            if (xpToCr[totalXP]) {
                return xpToCr[totalXP];
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
                return xpToCr[closestXP];
            }
        }

        return service;
    }]);
