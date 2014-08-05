// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var typeALoot = {
    1: [
        [
            {type: "coins", n: 5, die: 10, amount: 1, unit: 'cp'},
            {type: "coins", n: 3, die: 4, amount: 1, unit: 'sp'}
        ]
    ],
    5: [
        [
            {type: "coins", n: 2, die: 6, amount: 10, unit: 'cp'},
            {type: "coins", n: 4, die: 8, amount: 1, unit: 'sp'},
            {type: "coins", n: 1, die: 4, amount: 1, unit: 'gp'}
        ]
    ],
    10: [
        [
            {type: "coins", n: 5, die: 10, amount: 10, unit: 'cp'},
            {type: "coins", n: 5, die: 10, amount: 1, unit: 'sp'},
            {type: "coins", n: 1, die: 8, amount: 1, unit: 'gp'}
        ]
    ],
    25: [
        [
            {type: "coins", n: 2, die: 4, amount: 100, unit: 'cp'},
            {type: "coins", n: 3, die: 6, amount: 10, unit: 'sp'},
            {type: "coins", n: 4, die: 4, amount: 1, unit: 'gp'}
        ]
    ],
    50: [
        [
            {type: "coins", n: 4, die: 4, amount: 100, unit: 'cp'},
            {type: "coins", n: 4, die: 6, amount: 10, unit: 'sp'},
            {type: "coins", n: 8, die: 6, amount: 1, unit: 'gp'}
        ]
    ],
    100: [
        [
            {type: "coins", n: 6, die: 8, amount: 10, unit: 'sp'},
            {type: "coins", n: 3, die: 4, amount: 10, unit: 'gp'}
        ]
    ],
    200: [
        [
            {type: "coins", n: 2, die: 4, amount: 100, unit: 'sp'},
            {type: "coins", n: 4, die: 4, amount: 10, unit: 'gp'},
            {type: "coins", n: 2, die: 4, amount: 1, unit: 'pp'}
        ]
    ],
    500: [
        [
            {type: "coins", n: 6, die: 6, amount: 10, unit: 'gp'},
            {type: "coins", n: 8, die: 6, amount: 1, unit: 'pp'}
        ]
    ],
    1000: [
        [
            {type: "coins", n: 2, die: 4, amount: 100, unit: 'gp'},
            {type: "coins", n: 10, die: 10, amount: 1, unit: 'pp'}
        ]
    ],
    5000: [
        [
            {type: "coins", n: 4, die: 8, amount: 100, unit: 'gp'},
            {type: "coins", n: 6, die: 10, amount: 10, unit: 'pp'}
        ]
    ],
    10000: [
        [
            {type: "coins", n: 2, die: 4, amount: 1000, unit: 'gp'},
            {type: "coins", n: 12, die: 8, amount: 10, unit: 'pp'}
        ]
    ],
    50000: [
        [
            {type: "coins", n: 2, die: 6, amount: 1000, unit: 'gp'},
            {type: "coins", n: 8, die: 10, amount: 100, unit: 'pp'}
        ]
    ]
};

module.exports = function () {
    return {
        typeALoot: typeALoot
    }
};