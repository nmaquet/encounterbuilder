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

function rangeIn100(upperBounds, values) {
    if (values.length !== upperBounds.length + 1) {
        throw Error("upperBounds and values mismatch '" + upperBounds + "' '" + values + "'" + "(" + upperBounds.length + " vs " + values.length + ")");
    }
    var dieResult = roll(100, 1);
    for (var i in upperBounds) {
        if (dieResult <= upperBounds[i]) {
            return values[i];
        }
    }
    return values[upperBounds.length];
}

module.exports = function () {
    return {
        roll: roll,
        chooseOne: chooseOne,
        rangeIn100 : rangeIn100
    };
};