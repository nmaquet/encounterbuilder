"use strict";

var typeALoot = {
    1: [
        {n: 5, die: 10, amount: 1, unit: 'cp'},
        {n: 3, die: 4, amount: 1, unit: 'sp'}
    ],
    5: [
        {n: 2, die: 6, amount: 10, unit: 'cp'},
        {n: 4, die: 8, amount: 1, unit: 'sp'},
        {n: 1, die: 4, amount: 1, unit: 'gp'}
    ],
    10: [
        {n: 5, die: 10, amount: 10, unit: 'cp'},
        {n: 5, die: 10, amount: 1, unit: 'sp'},
        {n: 1, die: 8, amount: 1, unit: 'gp'}
    ],
    25: [
        {n: 2, die: 4, amount: 100, unit: 'cp'},
        {n: 3, die: 6, amount: 10, unit: 'sp'},
        {n: 4, die: 4, amount: 1, unit: 'gp'}
    ],
    50: [
        {n: 4, die: 4, amount: 100, unit: 'cp'},
        {n: 4, die: 6, amount: 10, unit: 'sp'},
        {n: 8, die: 6, amount: 1, unit: 'gp'}
    ],
    100: [
        {n: 6, die: 8, amount: 10, unit: 'sp'},
        {n: 3, die: 4, amount: 10, unit: 'gp'}
    ],
    200: [
        {n: 2, die: 4, amount: 100, unit: 'sp'},
        {n: 4, die: 4, amount: 10, unit: 'gp'},
        {n: 2, die: 4, amount: 1, unit: 'pp'}
    ],
    500: [
        {n: 6, die: 6, amount: 10, unit: 'gp'},
        {n: 8, die: 6, amount: 1, unit: 'pp'}
    ],
    1000: [
        {n: 2, die: 4, amount: 100, unit: 'gp'},
        {n: 10, die: 10, amount: 1, unit: 'pp'}
    ],
    5000: [
        {n: 4, die: 8, amount: 100, unit: 'gp'},
        {n: 6, die: 10, amount: 10, unit: 'pp'}
    ],
    10000: [
        {n: 2, die: 4, amount: 1000, unit: 'gp'},
        {n: 12, die: 8, amount: 10, unit: 'pp'}
    ],
    50000: [
        {n: 2, die: 6, amount: 1000, unit: 'gp'},
        {n: 8, die: 10, amount: 100, unit: 'pp'}
    ]
};

module.exports = function () {
    return {
        typeALoot: typeALoot
    }
};