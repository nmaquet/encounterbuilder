'use strict';

DEMONSQUID.encounterBuilderServices.factory('diceService', [
    function () {

        function uniform(lo, hi) {
            return Math.floor((Math.random() * hi) + lo);
        }

        return {
            roll: function (die, n) {
                var sum = 0;
                for (var i = 0; i < n; ++i) {
                    sum += uniform(1, die);
                }
                return sum;
            },
            chooseOne: function (choices) {
                return choices[uniform(0, choices.length - 1)];
            }

        };


    }]);
