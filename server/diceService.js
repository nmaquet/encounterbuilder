'use strict';

function uniform(lo, hi) {
    return Math.floor((Math.random() * hi) + lo);
}

function roll(die, n) {
    var sum = 0;
    for (var i = 0; i < n; ++i) {
        sum += uniform(1, die);
    }
    return sum;
}

function chooseOne(choices) {
    var i = uniform(0, choices.length);
    return choices[i];
}

module.exports = function () {
    return {
        roll: roll,
        chooseOne: chooseOne
    };
};