'use strict';

DEMONSQUID.encounterBuilderServices.factory('diceService', [
    function () {

        function uniform(lo, hi) {
            return Math.floor((Math.random() * hi) + lo);
        }

        function roll(d, n) {
            var sum = 0;
            for (var i = 0; i < n; ++i) {
                sum += uniform(1, d);
            }
            return sum;
        }

        return {
            rollD3: function (n) {
                return roll(3, n);
            },
            rollD4: function (n) {
                return roll(4, n);
            },
            rollD6: function (n) {
                return roll(6, n);
            },
            rollD8: function (n) {
                return roll(8, n);
            },
            rollD10: function (n) {
                return roll(10, n);
            },
            rollD12: function (n) {
                console.log("rolling a D12");
                return roll(12, n);
            },
            rollD20: function (n) {
                return roll(20, n);
            },
            rollD100: function (n) {
                return roll(100, n);
            }
        };

    }]);
