// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var typeHLoot = {
    500: [
        [
            { type: "coins", n: 4, die: 4, amount: 100, unit: 'cp'},
            { type: "coins", n: 3, die: 6, amount: 10, unit: 'sp'},
            { type: "coins", n: 2, die: 4, amount: 10, unit: 'gp'},
            { type: "weapon", mwk: true},
            { type: 'potion', amount: 1, magnitude: 'lesser_minor'},
            { type: 'scroll', amount: 1, magnitude: 'lesser_minor'},
            {type: "gems", grade: 2, amount: 1}
        ]
    ],
    1000: [
        [
            { type: "coins", n: 2, die: 4, amount: 100, unit: 'cp'},
            { type: "coins", n: 2, die: 6, amount: 100, unit: 'sp'},
            { type: "coins", n: 6, die: 6, amount: 1, unit: 'gp'},
            { type: 'potion', amount: 1, magnitude: 'greater_minor'},
            { type: 'scroll', amount: 1, magnitude: 'greater_minor'},
            { type: 'wand', amount: 1, magnitude: 'lesser_minor'},
            {type: "gems", grade: 1, amount: 3}
        ]
    ],
    2500: [
        [
            { type: "coins", n: 3, die: 6, amount: 10, unit: 'sp'},
            { type: "coins", n: 2, die: 4, amount: 1, unit: 'gp'},
            { type: "armorOrShield", mwk: true, armorType: "heavyArmor"},
            { type: "weapon", mwk: true},
            { type: 'potion', amount: 2, magnitude: 'lesser_medium'},
            { type: 'scroll', amount: 2, magnitude: 'greater_minor'},
            {type: "gems", grade: 2, amount: 1}
        ]
    ],
    5000: [
        [
            { type: "coins", n: 2, die: 4, amount: 10, unit: 'gp'},
            { type: "coins", n: 4, die: 6, amount: 1, unit: 'pp'},
            { type: "weapon", mwk: true},
            { type: 'ring', amount: 1, magnitude: 'lesser_minor'},
            { type: 'potion', amount: 1, magnitude: 'greater_medium'},
            { type: 'scroll', amount: 1, magnitude: 'lesser_medium'},
            { type: 'wand', amount: 1, magnitude: 'greater_minor'}
        ]
    ],
    7500: [
        [
            { type: "coins", n: 4, die: 4, amount: 10, unit: 'gp'},
            { type: "coins", n: 6, die: 6, amount: 1, unit: 'pp'},
            { type: "weapon", magnitude: "lesser_minor"},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_minor'},
            { type: 'potion', amount: 2, magnitude: 'greater_medium'},
            { type: 'wand', amount: 1, magnitude: 'greater_minor'},
            { type: "gems", grade: 3, amount: 2}
        ]
    ],
    10000: [
        [
            { type: "coins", n: 4, die: 8, amount: 10, unit: 'gp'},
            { type: "coins", n: 6, die: 10, amount: 1, unit: 'pp'},
            { type: "armorOrShield", magnitude: "greater_minor"},
            { type: 'ring', amount: 1, magnitude: 'lesser_minor'},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_minor'},
            { type: 'scroll', amount: 1, magnitude: 'lesser_medium'},
            { type: 'wand', amount: 1, magnitude: 'greater_minor'},
            { type: "gems", grade: 4, amount: 1}
        ]
    ],
    15000: [
        [
            { type: "coins", n: 4, die: 4, amount: 10, unit: 'gp'},
            { type: "coins", n: 4, die: 4, amount: 10, unit: 'pp'},
            { type: "armorOrShield", magnitude: "greater_minor"},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_minor'},
            { type: 'potion', amount: 2, magnitude: 'greater_medium'},
            { type: 'scroll', amount: 2, magnitude: 'greater_medium'},
            { type: 'wand', amount: 1, magnitude: 'lesser_medium'},
            { type: "gems", grade: 3, amount: 1}
        ]
    ],
    20000: [
        [
            { type: "coins", n: 2, die: 4, amount: 10, unit: 'pp'},
            { type: 'ring', amount: 1, magnitude: 'greater_minor'},
            { type: 'wondrous', amount: 2, magnitude: 'lesser_minor'},
            { type: 'potion', amount: 2, magnitude: 'greater_medium'},
            { type: 'scroll', amount: 2, magnitude: 'lesser_major'},
            { type: 'wand', amount: 1, magnitude: 'lesser_medium'},
        ]
    ],
    25000: [
        [
            { type: "coins", n: 6, die: 10, amount: 10, unit: 'gp'},
            { type: "coins", n: 6, die: 6, amount: 1, unit: 'pp'},
            { type: "armorOrShield", magnitude: "lesser_medium"},
            { type: "weapon", magnitude: "lesser_minor"},
            { type: 'wondrous', amount: 1, magnitude: 'greater_minor'},
            { type: 'scroll', amount: 2, magnitude: 'lesser_major'},
            { type: 'wand', amount: 1, magnitude: 'lesser_medium'},
            { type: "gems", grade: 4, amount: 1}
        ]
    ],
    30000: [
        [
            { type: "coins", n: 6, die: 6, amount: 10, unit: 'gp'},
            { type: "coins", n: 2, die: 4, amount: 10, unit: 'pp'},
            { type: "weapon", magnitude: "greater_minor"},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_medium'},
            { type: 'wand', amount: 1, magnitude: 'greater_medium'},
            { type: "gems", grade: 3, amount: 3}
        ]
    ],
    40000: [
        [
            { type: "coins", n: 4, die: 4, amount: 10, unit: 'gp'},
            { type: "coins", n: 4, die: 4, amount: 10, unit: 'pp'},
            { type: 'ring', amount: 1, magnitude: 'lesser_medium'},
            { type: 'rod', amount: 1, magnitude: 'lesser_medium'},
            { type: 'potion', amount: 2, magnitude: 'greater_major'},
            { type: 'scroll', amount: 2, magnitude: 'lesser_major'},
            { type: 'wand', amount: 1, magnitude: 'lesser_major'}
        ]
    ],
    50000: [
        [
            { type: "coins", n: 4, die: 4, amount: 10, unit: 'pp'},
            { type: "armorOrShield", magnitude: "greater_medium"},
            { type: 'staff', amount: 1, magnitude: 'lesser_medium'},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_medium'},
            { type: 'scroll', amount: 1, magnitude: 'greater_major'},
            { type: 'wand', amount: 1, magnitude: 'lesser_medium'},
            { type: "gems", grade: 5, amount: 1}
        ]
    ],
    75000: [
        [
            { type: "coins", n: 2, die: 8, amount: 100, unit: 'gp'},
            { type: "coins", n: 4, die: 4, amount: 10, unit: 'pp'},
            { type: "weapon", magnitude: "greater_minor"},
            { type: 'ring', amount: 1, magnitude: 'greater_medium'},
            { type: 'staff', amount: 1, magnitude: 'greater_medium'},
            { type: 'potion', amount: 3, magnitude: 'greater_major'},
            { type: 'scroll', amount: 1, magnitude: 'greater_major'},
            { type: 'wand', amount: 1, magnitude: 'lesser_major'},
            { type: "gems", grade: 5, amount: 1}
        ]
    ],
    100000: [
        [
            { type: "coins", n: 8, die: 6, amount: 100, unit: 'gp'},
            { type: "coins", n: 4, die: 4, amount: 10, unit: 'pp'},
            { type: 'ring', amount: 1, magnitude: 'lesser_major'},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_major'},
            { type: 'potion', amount: 3, magnitude: 'greater_major'},
            { type: 'scroll', amount: 1, magnitude: 'greater_major'},
            { type: 'wand', amount: 1, magnitude: 'lesser_medium'},
            { type: "gems", grade: 5, amount: 2},
            { type: "gems", grade: 6, amount: 1}
        ]
    ]
};

module.exports = function () {
    return {
        typeHLoot: typeHLoot
    }
};