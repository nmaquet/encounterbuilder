"use strict";

var typeILoot = {
    5000: [
        [
            { type: "coins", n: 4, die: 4, amount: 1000, unit: 'cp'},
            { type: "coins", n: 6, die: 6, amount: 100, unit: 'sp'},
            { type: "coins", n: 2, die: 4, amount: 100, unit: 'gp'},
            { type: "coins", n: 6, die: 6, amount: 1, unit: 'gp'},
            { type: "armorOrShield", magnitude: "lesser_minor"},
            { type: 'wand', amount: 1, magnitude: 'greater_minor'},
            { type: "gems", grade: 3, amount: 5},
            { type: "art_objects", grade: 3, amount: 1}
        ]
    ],
    10000: [
        [
            { type: "coins", n: 4, die: 4, amount: 1000, unit: 'cp'},
            { type: "coins", n: 6, die: 6, amount: 100, unit: 'sp'},
            { type: "coins", n: 2, die: 4, amount: 100, unit: 'gp'},
            { type: "coins", n: 6, die: 6, amount: 1, unit: 'gp'},
            { type: "armorOrShield", magnitude: "greater_minor"},
            { type: "weapon", magnitude: "lesser_minor"},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_minor'},
            { type: 'scroll', amount: 1, magnitude: 'greater_medium'},
            { type: "gems", grade: 4, amount: 1},
            { type: "art_objects", grade: 3, amount: 1}
        ]
    ],
    15000: [
        [
            { type: "coins", n: 2, die: 4, amount: 1000, unit: 'cp'},
            { type: "coins", n: 6, die: 4, amount: 100, unit: 'sp'},
            { type: "coins", n: 3, die: 6, amount: 10, unit: 'gp'},
            { type: "coins", n: 6, die: 6, amount: 1, unit: 'gp'},
            { type: "armorOrShield", magnitude: "greater_minor"},
            { type: "weapon", magnitude: "lesser_minor"},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_minor'},
            { type: 'scroll', amount: 1, magnitude: 'greater_medium'},
            { type: "gems", grade: 4, amount: 1},
            { type: "art_objects", grade: 3, amount: 1}
        ]
    ],
    20000: [
        [
            { type: "coins", n: 2, die: 4, amount: 1000, unit: 'cp'},
            { type: "coins", n: 6, die: 4, amount: 100, unit: 'sp'},
            { type: "coins", n: 3, die: 6, amount: 10, unit: 'gp'},
            { type: "coins", n: 6, die: 6, amount: 1, unit: 'gp'},
            { type: "armorOrShield", magnitude: "greater_minor"},
            { type: 'rod', amount: 1, magnitude: 'lesser_medium'},
            { type: 'wondrous', amount: 1, magnitude: 'greater_minor'},
            { type: 'potion', amount: 2, magnitude: 'lesser_major'},
            { type: 'scroll', amount: 1, magnitude: 'greater_medium'},
            { type: "art_objects", grade: 3, amount: 3}
        ]
    ],
    25000: [
        [
            { type: "coins", n: 2, die: 4, amount: 1000, unit: 'cp'},
            { type: "coins", n: 6, die: 4, amount: 100, unit: 'sp'},
            { type: "coins", n: 3, die: 6, amount: 10, unit: 'gp'},
            { type: "coins", n: 6, die: 6, amount: 1, unit: 'gp'},
            { type: 'staff', amount: 1, magnitude: 'lesser_medium'},
            { type: 'wondrous', amount: 2, magnitude: 'lesser_minor'},
            { type: 'potion', amount: 1, magnitude: 'greater_medium'},
            { type: 'wand', amount: 1, magnitude: 'lesser_medium'},
            { type: "gems", grade: 2, amount: 2},
            { type: "gems", grade: 3, amount: 2},
            { type: "gems", grade: 4, amount: 1}
        ]
    ],
    30000: [
        [
            { type: "coins", n: 2, die: 4, amount: 1000, unit: 'cp'},
            { type: "coins", n: 6, die: 4, amount: 100, unit: 'sp'},
            { type: "coins", n: 3, die: 6, amount: 10, unit: 'gp'},
            { type: "coins", n: 6, die: 6, amount: 1, unit: 'gp'},
            { type: "armorOrShield", magnitude: "lesser_medium"},
            { type: "weapon", magnitude: "greater_minor"},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_medium'},
            { type: 'scroll', amount: 2, magnitude: 'lesser_major'},
            { type: "art_objects", grade: 4, amount: 1}
        ]
    ],
    40000: [
        [
            { type: "coins", n: 4, die: 4, amount: 1000, unit: 'cp'},
            { type: "coins", n: 6, die: 4, amount: 100, unit: 'sp'},
            { type: "coins", n: 2, die: 4, amount: 100, unit: 'gp'},
            { type: "coins", n: 6, die: 6, amount: 1, unit: 'gp'},
            { type: "weapon", magnitude: "lesser_medium"},
            { type: 'rod', amount: 1, magnitude: 'greater_medium'},
            { type: 'potion', amount: 1, magnitude: 'greater_major'},
            { type: 'scroll', amount: 1, magnitude: 'greater_medium'},
            { type: 'wand', amount: 1, magnitude: 'lesser_medium'},
            { type: "gems", grade: 5, amount: 1}
        ]
    ],
    50000: [
        [
            { type: "coins", n: 4, die: 4, amount: 10000, unit: 'cp'},
            { type: "coins", n: 6, die: 6, amount: 1000, unit: 'sp'},
            { type: "coins", n: 4, die: 4, amount: 100, unit: 'gp'},
            { type: "coins", n: 6, die: 6, amount: 10, unit: 'gp'},
            { type: "armorOrShield", magnitude: "greater_minor"},
            { type: "weapon", magnitude: "greater_minor"},
            { type: "weapon", magnitude: "greater_minor"},
            { type: 'staff', amount: 1, magnitude: 'greater_medium'},
            { type: 'wondrous', amount: 1, magnitude: 'greater_minor'},
            { type: "gems", grade: 5, amount: 1}
        ]
    ],
    60000: [
        [
            { type: "coins", n: 2, die: 4, amount: 10000, unit: 'cp'},
            { type: "coins", n: 2, die: 4, amount: 1000, unit: 'sp'},
            { type: "coins", n: 2, die: 4, amount: 100, unit: 'gp'},
            { type: "coins", n: 2, die: 4, amount: 10, unit: 'gp'},
            { type: "weapon", magnitude: "greater_medium"},
            { type: 'rod', amount: 1, magnitude: 'greater_medium'},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_medium'},
            { type: 'scroll', amount: 1, magnitude: 'greater_major'},
            { type: 'wand', amount: 2, magnitude: 'greater_minor'},
            { type: "gems", grade: 4, amount: 1},
            { type: "art_objects", grade: 2, amount: 5}
        ]
    ],
    75000: [
        [
            { type: "coins", n: 2, die: 4, amount: 10000, unit: 'cp'},
            { type: "coins", n: 2, die: 4, amount: 1000, unit: 'sp'},
            { type: "coins", n: 2, die: 4, amount: 100, unit: 'gp'},
            { type: "coins", n: 2, die: 4, amount: 10, unit: 'gp'},
            { type: "armorOrShield", magnitude: "lesser_major"},
            { type: 'ring', amount: 1, magnitude: 'greater_medium'},
            { type: 'staff', amount: 1, magnitude: 'lesser_medium'},
            { type: 'wand', amount: 1, magnitude: 'greater_medium'},
            { type: "gems", grade: 6, amount: 1},
            { type: "art_objects", grade: 4, amount: 1}
        ]
    ],
    100000: [
        [
            { type: "coins", n: 2, die: 4, amount: 10000, unit: 'cp'},
            { type: "coins", n: 2, die: 4, amount: 1000, unit: 'sp'},
            { type: "coins", n: 2, die: 4, amount: 100, unit: 'gp'},
            { type: "coins", n: 2, die: 4, amount: 10, unit: 'gp'},
            { type: "weapon", magnitude: "lesser_medium"},
            { type: 'ring', amount: 1, magnitude: 'greater_medium'},
            { type: 'rod', amount: 1, magnitude: 'lesser_major'},
            { type: 'wondrous', amount: 1, magnitude: 'greater_medium'},
            { type: 'potion', amount: 2, magnitude: 'greater_major'},
            { type: 'scroll', amount: 1, magnitude: 'lesser_medium'},
            { type: "art_objects", grade: 4, amount: 2}
        ]
    ],
    125000: [
        [
            { type: "coins", n: 4, die: 4, amount: 10000, unit: 'cp'},
            { type: "coins", n: 6, die: 6, amount: 1000, unit: 'sp'},
            { type: "coins", n: 4, die: 4, amount: 100, unit: 'gp'},
            { type: "coins", n: 2, die: 8, amount: 10, unit: 'gp'},
            { type: "armorOrShield", magnitude: "greater_major"},
            { type: "weapon", magnitude: "lesser_medium"},
            { type: 'staff', amount: 1, magnitude: 'lesser_major'},
            { type: 'scroll', amount: 2, magnitude: 'greater_major'},
            { type: 'wand', amount: 1, magnitude: 'greater_major'},
            { type: "gems", grade: 6, amount: 1},
            { type: "art_objects", grade: 4, amount: 3}
        ]
    ],
    150000: [
        [
            { type: "coins", n: 4, die: 4, amount: 10000, unit: 'cp'},
            { type: "coins", n: 6, die: 6, amount: 1000, unit: 'sp'},
            { type: "coins", n: 4, die: 4, amount: 100, unit: 'gp'},
            { type: "coins", n: 2, die: 8, amount: 10, unit: 'gp'},
            { type: "armorOrShield", magnitude: "greater_medium"},
            { type: 'ring', amount: 1, magnitude: 'lesser_major'},
            { type: 'wondrous', amount: 1, magnitude: 'greater_major'},
            { type: 'wand', amount: 1, magnitude: 'greater_major'}
        ]
    ],
    200000: [
        [
            { type: "coins", n: 4, die: 4, amount: 10000, unit: 'cp'},
            { type: "coins", n: 6, die: 6, amount: 1000, unit: 'sp'},
            { type: "coins", n: 4, die: 4, amount: 100, unit: 'gp'},
            { type: "coins", n: 2, die: 8, amount: 10, unit: 'gp'},
            { type: "weapon", magnitude: "greater_major"},
            { type: 'ring', amount: 2, magnitude: 'lesser_medium'},
            { type: 'staff', amount: 1, magnitude: 'lesser_major'},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_major'},
            { type: 'wand', amount: 1, magnitude: 'lesser_major'},
            { type: "gems", grade: 5, amount: 3},
            { type: "gems", grade: 4, amount: 1}
        ]
    ],
    300000: [
        [
            { type: "coins", n: 8, die: 4, amount: 10000, unit: 'cp'},
            { type: "coins", n: 12, die: 6, amount: 1000, unit: 'sp'},
            { type: "coins", n: 8, die: 4, amount: 100, unit: 'gp'},
            { type: "coins", n: 2, die: 8, amount: 10, unit: 'gp'},
            { type: "weapon", magnitude: "greater_major"},
            { type: 'ring', amount: 1, magnitude: 'lesser_major'},
            { type: 'staff', amount: 1, magnitude: 'greater_major'},
            { type: 'wondrous', amount: 1, magnitude: 'greater_major'},
            { type: 'wand', amount: 1, magnitude: 'greater_medium'},
            { type: "gems", grade: 6, amount: 1},
            { type: "art_objects", grade: 6, amount: 1}
        ]
    ]
};

module.exports = function () {
    return {
        typeILoot: typeILoot
    }
};