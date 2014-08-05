// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var typeGLoot = {
    50: [
        [
            { type: "coins", n: 2, die: 4, amount: 10, unit: 'sp'},
            { type: "coins", n: 2, die: 4, amount: 1, unit: 'gp'},
            { type: 'potion', amount: 1, magnitude: 'lesser_minor'}
        ]
    ],
    75: [
        [
            { type: "coins", n: 2, die: 4, amount: 1, unit: 'gp'},
            { type: 'potion', amount: 1, magnitude: 'lesser_minor'},
            { type: 'scroll', amount: 1, magnitude: 'lesser_minor'}
        ]
    ],
    100: [
        [
            { type: 'potion', amount: 1, magnitude: 'lesser_minor'},
            { type: 'scroll', amount: 2, magnitude: 'lesser_minor'}
        ]
    ],
    150: [
        [
            { type: 'scroll', amount: 1, magnitude: 'lesser_minor'},
            { type: 'scroll', amount: 1, magnitude: 'greater_minor'}
        ]
    ],
    200: [
        [
            { type: 'potion', amount: 2, magnitude: 'lesser_minor'},
            { type: 'scroll', amount: 1, magnitude: 'greater_minor'}
        ]
    ],
    250: [
        [
            { type: 'scroll', amount: 2, magnitude: 'greater_minor'}
        ]
    ],
    500: [
        [
            { type: 'potion', amount: 3, magnitude: 'lesser_minor'},
            { type: 'scroll', amount: 3, magnitude: 'greater_minor'}
        ]
    ],
    750: [
        [
            { type: 'potion', amount: 1, magnitude: 'greater_minor'},
            { type: 'wand', amount: 1, magnitude: 'lesser_minor'}
        ]
    ],
    1000: [
        [
            { type: "coins", n: 7, die: 6, amount: 1, unit: 'gp'},
            { type: 'scroll', amount: 3, magnitude: 'greater_minor'},
            { type: 'wand', amount: 1, magnitude: 'lesser_minor'}

        ]
    ],
    1500: [
        [
            { type: "coins", n: 3, die: 6, amount: 10, unit: 'gp'},
            { type: 'potion', amount: 1, magnitude: 'lesser_medium'},
            { type: 'scroll', amount: 1, magnitude: 'lesser_medium'},
            { type: 'wand', amount: 1, magnitude: 'lesser_minor'}
        ]
    ],
    2000: [
        [
            { type: "coins", n: 2, die: 4, amount: 10, unit: 'gp'},
            { type: "weapon", mwk: true },
            { type: 'scroll', amount: 2, magnitude: 'lesser_medium'},
            { type: 'wand', amount: 1, magnitude: 'lesser_minor'}
        ]
    ],
    2500: [
        [
            { type: 'potion', amount: 2, magnitude: 'greater_medium'},
            { type: 'wand', amount: 1, magnitude: 'greater_minor'},
        ]
    ],
    3000: [
        [
            { type: 'potion', amount: 1, magnitude: 'greater_medium'},
            { type: 'scroll', amount: 2, magnitude: 'lesser_medium'},
            { type: 'wand', amount: 1, magnitude: 'greater_minor'}
        ]
    ],
    4000: [
        [
            { type: 'wondrous', amount: 1, magnitude: 'lesser_minor'},
            { type: 'potion', amount: 1, magnitude: 'greater_medium'},
            { type: 'wand', amount: 1, magnitude: 'greater_minor'},
        ]
    ],
    5000: [
        [
            { type: 'ring', amount: 1, magnitude: 'lesser_minor'},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_minor'},
            { type: 'scroll', amount: 2, magnitude: 'lesser_medium'}
        ]
    ],
    6000: [
        [
            { type: 'ring', amount: 1, magnitude: 'lesser_minor'},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_minor'},
            { type: 'potion', amount: 1, magnitude: 'greater_medium'},
            { type: 'wand', amount: 1, magnitude: 'greater_minor'}
        ]
    ],
    7500: [
        [
            { type: 'potion', amount: 2, magnitude: 'greater_medium'},
            { type: 'scroll', amount: 1, magnitude: 'lesser_minor'},
            { type: 'wand', amount: 1, magnitude: 'lesser_medium'},
        ]
    ],
    10000: [
        [
            { type: 'ring', amount: 1, magnitude: 'lesser_minor'},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_minor'},
            { type: 'wand', amount: 1, magnitude: 'lesser_medium'}
        ]
    ],
    12500: [
        [
            { type: 'ring', amount: 1, magnitude: 'lesser_minor'},
            { type: 'wondrous', amount: 1, magnitude: 'greater_minor'},
            { type: 'scroll', amount: 2, magnitude: 'greater_medium'},
            { type: 'wand', amount: 2, magnitude: 'greater_minor'}
        ]
    ],
    15000: [
        [
            { type: 'ring', amount: 1, magnitude: 'lesser_minor'},
            { type: 'rod', amount: 1, magnitude: 'lesser_medium'},
            { type: 'wand', amount: 1, magnitude: 'lesser_medium'}
        ]
    ],
    20000: [
        [
            { type: 'ring', amount: 1, magnitude: 'greater_minor'},
            { type: 'wondrous', amount: 1, magnitude: 'greater_minor'},
            { type: 'potion', amount: 1, magnitude: 'greater_medium'},
            { type: 'scroll', amount: 2, magnitude: 'greater_medium'},
            { type: 'wand', amount: 1, magnitude: 'lesser_medium'}
        ]
    ],
    25000: [
        [
            { type: 'ring', amount: 1, magnitude: 'lesser_minor'},
            { type: 'wand', amount: 1, magnitude: 'lesser_medium'},
            { type: 'wand', amount: 1, magnitude: 'greater_medium'},
            { type: 'wondrous', amount: 1, magnitude: 'greater_minor'}
        ]
    ],
    30000: [
        [
            { type: 'ring', amount: 1, magnitude: 'greater_minor'},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_medium'},
            { type: 'scroll', amount: 1, magnitude: 'lesser_major'},
            { type: 'wand', amount: 1, magnitude: 'greater_medium'}
        ]
    ],
    40000: [
        [
            { type: "weapon", magnitude: "lesser_minor"},
            { type: 'staff', amount: 1, magnitude: 'lesser_medium'},
            { type: 'rod', amount: 1, magnitude: 'greater_medium'},
            { type: 'wondrous', amount: 2, magnitude: 'lesser_minor'},
            { type: 'wand', amount: 1, magnitude: 'lesser_medium'}
        ]
    ],
    50000: [
        [
            { type: 'ring', amount: 1, magnitude: 'greater_minor'},
            { type: 'wondrous', amount: 2, magnitude: 'lesser_medium'},
            { type: 'potion', amount: 1, magnitude: 'lesser_major'},
            { type: 'scroll', amount: 3, magnitude: 'greater_medium'},
            { type: 'wand', amount: 1, magnitude: 'lesser_major'},
        ]
    ],
    60000: [
        [
            { type: 'staff', amount: 1, magnitude: 'lesser_medium'},
            { type: 'rod', amount: 1, magnitude: 'greater_medium'},
            { type: 'wondrous', amount: 1, magnitude: 'greater_medium'},
            { type: 'potion', amount: 1, magnitude: 'greater_medium'},
            { type: 'scroll', amount: 2, magnitude: 'lesser_major'},
            { type: 'wand', amount: 1, magnitude: 'lesser_medium'}
        ]
    ],
    75000: [
        [
            { type: "weapon", magnitude: "lesser_minor"},
            { type: 'staff', amount: 1, magnitude: 'greater_medium'},
            { type: 'wondrous', amount: 1, magnitude: 'greater_medium'},
            { type: 'scroll', amount: 3, magnitude: 'greater_major'},
            { type: 'wand', amount: 1, magnitude: 'greater_major'},
        ]
    ],
    100000: [
        [
            { type: 'ring', amount: 1, magnitude: 'lesser_major'},
            { type: 'rod', amount: 1, magnitude: 'greater_medium'},
            { type: 'staff', amount: 1, magnitude: 'lesser_major'},
            { type: 'scroll', amount: 1, magnitude: 'lesser_major'},
            { type: 'wand', amount: 1, magnitude: 'greater_medium'}
        ]
    ]
};

module.exports = function () {
    return {
        typeGLoot: typeGLoot
    }
};