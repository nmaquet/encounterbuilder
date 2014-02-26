"use strict";

var typeDLoot = {
    50: [
        [
            {n: 3, die: 6, amount: 10, unit: 'sp', type: 'coins'},
            {n: 4, die: 4, amount: 1, unit: 'gp', type: 'coins'},
            {amount: 1, type: 'scroll', magnitude: 'lesser_minor'}
        ],
        [
            {n: 2, die: 4, amount: 10, unit: 'sp', type: 'coins'},
            {n: 2, die: 4, amount: 1, unit: 'gp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'lesser_minor'}
        ]
    ],
    100: [
        [
            {n: 4, die: 6, amount: 10, unit: 'sp', type: 'coins'},
            {n: 3, die: 10, amount: 1, unit: 'gp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'lesser_minor'},
            {amount: 1, type: 'scroll', magnitude: 'lesser_minor'}
        ]
    ],
    150: [
        [
            {n: 2, die: 4, amount: 10, unit: 'sp', type: 'coins'},
            {n: 6, die: 6, amount: 1, unit: 'gp', type: 'coins'},
            {amount: 1, type: 'scroll', magnitude: 'greater_minor'}
        ]
    ],
    200: [
        [
            {n: 2, die: 4, amount: 10, unit: 'sp', type: 'coins'},
            {n: 4, die: 6, amount: 1, unit: 'gp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'greater_minor'},
            {amount: 1, type: 'scroll', magnitude: 'lesser_minor'}
        ]
    ],
    250: [
        [
            {n: 3, die: 6, amount: 10, unit: 'sp', type: 'coins'},
            {n: 3, die: 6, amount: 1, unit: 'gp', type: 'coins'},
            {n: 1, die: 4, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 2, type: 'potion', magnitude: 'lesser_minor'},
            {amount: 1, type: 'scroll', magnitude: 'greater_minor'}
        ]
    ],
    300: [
        [
            {n: 2, die: 4, amount: 10, unit: 'sp', type: 'coins'},
            {n: 6, die: 6, amount: 1, unit: 'gp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'greater_minor'},
            {amount: 1, type: 'scroll', magnitude: 'greater_minor'}
        ]
    ],
    400: [
        [
            {amount: 1, type: 'potion', magnitude: 'greater_minor'},
            {amount: 2, type: 'scroll', magnitude: 'greater_minor'}
        ]
    ],
    500: [
        [
            {n: 2, die: 4, amount: 10, unit: 'gp', type: 'coins'},
            {n: 1, die: 4, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'lesser_medium'},
            {amount: 1, type: 'scroll', magnitude: 'greater_minor'}
        ],
        [
            {n: 2, die: 4, amount: 10, unit: 'gp', type: 'coins'},
            {n: 1, die: 4, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 2, type: 'potion', magnitude: 'greater_minor'},
            {amount: 1, type: 'scroll', magnitude: 'greater_minor'}
        ]
    ],
    750: [
        [
            {n: 7, die: 6, amount: 1, unit: 'gp', type: 'coins'},
            {amount: 1, type: 'scroll', magnitude: 'greater_minor'},
            {amount: 1, type: 'wand', magnitude: 'lesser_minor'}
        ]
    ],
    1000: [
        [
            {n: 4, die: 4, amount: 10, unit: 'gp', type: 'coins'},
            {n: 3, die: 6, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'lesser_medium'},
            {amount: 1, type: 'scroll', magnitude: 'lesser_medium'}
        ],
        [
            {n: 2, die: 4, amount: 10, unit: 'gp', type: 'coins'},
            {n: 2, die: 4, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'lesser_medium'},
            {amount: 1, type: 'wand', magnitude: 'lesser_medium'}
        ]
    ],
    1500: [
        [
            {amount: 1, type: 'wand', magnitude: 'greater_minor'}
        ],
        [
            {n: 4, die: 4, amount: 10, unit: 'gp', type: 'coins'},
            {n: 3, die: 6, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'greater_medium'},
            {amount: 1, type: 'scroll', magnitude: 'greater_medium'}
        ]
    ],
    2000: [
        [
            {amount: 1, type: 'potion', magnitude: 'greater_medium'},
            {amount: 1, type: 'wand', magnitude: 'greater_minor'}
        ],
        [
            {n: 2, die: 4, amount: 10, unit: 'gp', type: 'coins'},
            {n: 2, die: 4, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'lesser_medium'},
            {amount: 2, type: 'scroll', magnitude: 'greater_medium'}
        ]
    ],
    3000: [
        [
            {n: 3, die: 6, amount: 10, unit: 'gp', type: 'coins'},
            {n: 4, die: 4, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'greater_medium'},
            {amount: 1, type: 'scroll', magnitude: 'greater_medium'},
            {amount: 1, type: 'wand', magnitude: 'greater_minor'}
        ]
    ],
    4000: [
        [
            {n: 3, die: 6, amount: 10, unit: 'gp', type: 'coins'},
            {n: 4, die: 4, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'scroll', magnitude: 'greater_medium'},
            {amount: 2, type: 'wand', magnitude: 'greater_minor'}
        ]
    ],
    5000: [
        [
            {n: 2, die: 4, amount: 10, unit: 'gp', type: 'coins'},
            {n: 2, die: 4, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 3, type: 'potion', magnitude: 'lesser_major'},
            {amount: 2, type: 'scroll', magnitude: 'greater_medium'},
            {amount: 1, type: 'wand', magnitude: 'greater_minor'}
        ]
    ],
    7500: [
        [
            {n: 2, die: 6, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'scroll', magnitude: 'lesser_major'},
            {amount: 1, type: 'wand', magnitude: 'lesser_medium'}
        ],
        [
            {n: 5, die: 6, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 2, type: 'potion', magnitude: 'greater_major'},
            {amount: 2, type: 'scroll', magnitude: 'greater_major'}
        ]
    ],
    10000: [
        [
            {amount: 1, type: 'wand', magnitude: 'greater_medium'}
        ],
        [
            {n: 4, die: 6, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 1, type: 'potion', magnitude: 'greater_major'},
            {amount: 1, type: 'scroll', magnitude: 'greater_major'},
            {amount: 1, type: 'wand', magnitude: 'lesser_medium'}
        ]
    ],
    15000: [
        [
            {amount: 1, type: 'wand', magnitude: 'lesser_major'}
        ],
        [
            {n: 9, die: 10, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 3, type: 'potion', magnitude: 'greater_major'},
            {amount: 2, type: 'scroll', magnitude: 'lesser_major'},
            {amount: 1, type: 'wand', magnitude: 'greater_medium'}
        ]
    ],
    20000: [
        [
            {n: 4, die: 4, amount: 10, unit: 'gp', type: 'coins'},
            {n: 2, die: 4, amount: 10, unit: 'pp', type: 'coins'},
            {amount: 2, type: 'potion', magnitude: 'greater_major'},
            {amount: 1, type: 'scroll', magnitude: 'greater_major'},
            {amount: 1, type: 'wand', magnitude: 'lesser_major'}
        ],
        [
            {n: 6, die: 6, amount: 10, unit: 'gp', type: 'coins'},
            {amount: 3, type: 'potion', magnitude: 'lesser_major'},
            {amount: 1, type: 'wand', magnitude: 'greater_major'}
        ]
    ],
    25000: [
        [
            {amount: 5, type: 'scroll', magnitude: 'greater_major'},
            {amount: 1, type: 'wand', magnitude: 'greater_medium'}
        ]
    ],
    30000: [
        [
            {n: 6, die: 6, amount: 1, unit: 'pp', type: 'coins'},
            {amount: 4, type: 'potion', magnitude: 'greater_major'},
            {amount: 3, type: 'scroll', magnitude: 'greater_major'},
            {amount: 1, type: 'wand', magnitude: 'greater_major'}
        ]
    ],
    50000: [
        [
            {n: 8, die: 4, amount: 10, unit: 'pp', type: 'coins'},
            {amount: 4, type: 'scroll', magnitude: 'greater_major'},
            {amount: 2, type: 'wand', magnitude: 'greater_major'}
        ]
    ]
};

module.exports = function () {
    return {
        typeDLoot: typeDLoot
    }
};