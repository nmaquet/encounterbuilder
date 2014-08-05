// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var typeFLoot = {
    50: [
        [
            { type: "coins", n: 2, die: 4, amount: 10, unit: 'sp'},
            { type: "coins", n: 2, die: 4, amount: 1, unit: 'gp'},
            { type: 'potion', amount: 1, magnitude: 'lesser_minor'}
        ]
    ],
    250: [
        [
            { type: "coins", n: 2, die: 4, amount: 10, unit: 'sp'},
            { type: "coins", n: 2, die: 4, amount: 1, unit: 'gp'},
            { type: "armorOrShield", mwk: true, armorType: "lightArmorOrShield"},
            { type: 'potion', amount: 1, magnitude: 'lesser_minor'}
        ]
    ],
    350: [
        [
            { type: "coins", n: 2, die: 4, amount: 10, unit: 'sp'},
            { type: "coins", n: 2, die: 4, amount: 1, unit: 'gp'},
            { type: "armorOrShield", mwk: true, armorType: "mediumArmor"},
            { type: 'potion', amount: 1, magnitude: 'lesser_minor'}
        ]
    ],
    400: [
        [
            { type: "coins", n: 2, die: 4, amount: 10, unit: 'sp'},
            { type: "coins", n: 2, die: 4, amount: 1, unit: 'gp'},
            { type: "weapon", mwk: true},
            { type: 'potion', amount: 1, magnitude: 'lesser_minor'}
        ]
    ],
    500: [
        [
            { type: "weapon", mwk: true},
            { type: 'potion', amount: 1, magnitude: 'greater_minor'}
        ]
    ],
    750: [
        [
            { type: "coins", n: 6, die: 6, amount: 1, unit: 'gp'},
            { type: "armorOrShield", mwk: true, armorType: "mediumArmor"},
            { type: "weapon", mwk: true},
            { type: 'potion', amount: 2, magnitude: 'lesser_minor'}
        ]
    ],
    1000: [
        [
            { type: "armorOrShield", mwk: true, armorType: "heavyArmor"}
        ]
    ],
    1500: [
        [
            { type: "armorOrShield", mwk: true, armorType: "heavyArmor"},
            { type: "weapon", mwk: true},
            { type: 'potion', amount: 1, magnitude: 'greater_minor'}
        ]
    ],
    2000: [
        [
            { type: "armorOrShield", magnitude: "lesser_minor" },
            { type: "weapon", mwk: true},
            { type: 'potion', amount: 2, magnitude: 'greater_minor'}
        ]
    ],
    3000: [
        [
            { type: "armorOrShield", mwk: true, armorType: "mediumArmor"},
            { type: "weapon", magnitude: "lesser_minor"},
            { type: 'potion', amount: 1, magnitude: 'greater_minor'}
        ]
    ],
    4000: [
        [
            { type: "armorOrShield", magnitude: "lesser_minor" },
            { type: "weapon", mwk: true},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_minor'},
            { type: 'potion', amount: 1, magnitude: 'greater_minor'}
        ]
    ],
    5000: [
        [
            { type: "armorOrShield", mwk: true, armorType: "mediumArmor"},
            { type: "weapon", magnitude: "lesser_minor"},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_minor'},
            { type: 'potion', amount: 1, magnitude: 'greater_minor'}
        ]
    ],
    6000: [
        [
            { type: "armorOrShield", magnitude: "lesser_minor"},
            { type: "weapon", magnitude: "lesser_minor"},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_minor'}
        ]
    ],
    7500: [
        [
            { type: "armorOrShield", magnitude: "greater_minor"},
            { type: "weapon", magnitude: "lesser_minor"},
            { type: 'ring', amount: 1, magnitude: 'lesser_minor'}
        ]
    ],
    10000: [
        [
            { type: "armorOrShield", magnitude: "greater_minor"},
            { type: "weapon", magnitude: "lesser_minor"},
            { type: 'ring', amount: 1, magnitude: 'lesser_minor'},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_minor'},
            { type: 'potion', amount: 3, magnitude: 'greater_minor'}
        ],
        [
            { type: "armorOrShield", magnitude: "greater_minor"},
            { type: "weapon", magnitude: "greater_minor"},
            { type: 'potion', amount: 2, magnitude: 'greater_medium'}
        ]
    ],
    12500: [
        [
            { type: "armorOrShield", magnitude: "greater_minor"},
            { type: "weapon", magnitude: "lesser_minor"},
            { type: 'wondrous', amount: 1, magnitude: 'greater_minor'},
            { type: 'potion', amount: 2, magnitude: 'greater_minor'}
        ]
    ],
    15000: [
        [
            { type: "armorOrShield", magnitude: "greater_minor"},
            { type: "weapon", magnitude: "greater_minor"},
            { type: 'ring', amount: 1, magnitude: 'greater_minor'}
        ]
    ],
    20000: [
        [
            { type: "armorOrShield", magnitude: "lesser_medium"},
            { type: "weapon", magnitude: "greater_minor"},
            { type: 'wondrous', amount: 1, magnitude: 'greater_minor'},
            { type: 'potion', amount: 2, magnitude: 'greater_medium'}
        ]
    ],
    25000: [
        [
            { type: "armorOrShield", magnitude: "lesser_medium"},
            { type: "weapon", magnitude: "lesser_medium"},
            { type: 'ring', amount: 1, magnitude: 'lesser_minor'},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_minor'},
            { type: 'potion', amount: 2, magnitude: 'greater_medium'}
        ]
    ],
    30000: [
        [
            { type: "armorOrShield", magnitude: "lesser_medium"},
            { type: "weapon", magnitude: "lesser_medium"},
            { type: 'ring', amount: 2, magnitude: 'lesser_minor'},
            { type: 'wondrous', amount: 1, magnitude: 'greater_minor'}
        ]
    ],
    40000: [
        [
            { type: "armorOrShield", magnitude: "lesser_medium"},
            { type: "weapon", magnitude: "lesser_medium"},
            { type: 'ring', amount: 1, magnitude: 'lesser_medium'},
            { type: 'wondrous', amount: 1, magnitude: 'greater_minor'},
            { type: 'potion', amount: 2, magnitude: 'greater_medium'}
        ]
    ],
    50000: [
        [
            { type: "armorOrShield", magnitude: "greater_medium"},
            { type: "weapon", magnitude: "greater_medium"},
            { type: 'wondrous', amount: 1, magnitude: 'lesser_medium'},
            { type: 'potion', amount: 2, magnitude: 'lesser_major'}
        ]
    ],
    60000: [
        [
            { type: "armorOrShield", magnitude: "greater_medium"},
            { type: "weapon", magnitude: "greater_medium"},
            { type: 'ring', amount: 2, magnitude: 'greater_minor'},
            { type: 'wondrous', amount: 2, magnitude: 'greater_minor'}
        ]
    ],
    75000: [
        [
            { type: "armorOrShield", magnitude: "lesser_major"},
            { type: "weapon", magnitude: "greater_medium"},
            { type: 'ring', amount: 1, magnitude: 'greater_minor'},
            { type: 'wondrous', amount: 1, magnitude: 'greater_medium'},
            { type: 'potion', amount: 3, magnitude: 'greater_major'}
        ]
    ],
    100000: [
        [
            { type: "armorOrShield", magnitude: "lesser_major"},
            { type: "weapon", magnitude: "lesser_major"},
            { type: 'ring', amount: 1, magnitude: 'lesser_medium'},
            { type: 'ring', amount: 1, magnitude: 'greater_minor'},
            { type: 'wondrous', amount: 2, magnitude: 'lesser_medium'}
        ]
    ]
};

module.exports = function () {
    return {
        typeFLoot: typeFLoot
    }
};