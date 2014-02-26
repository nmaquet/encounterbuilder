"use strict";

var typeELoot = {
    200: [
        [
            {mwk: true, type: "armorOrShield", armorType: "lightArmorOrShield"}
        ]
    ],
    300: [
        [
            {mwk: true, type: "armorOrShield", armorType: "mediumArmor"}
        ]
    ],
    350: [
        [
            {mwk: true, type: "weapon"}
        ]
    ],
    1000: [
        [
            {mwk: true, type: "armorOrShield", armorType: "heavyArmor"}
        ]
    ],
    1500: [
        [
            { magnitude: "lesser_minor", type: "armorOrShield"}
        ]
    ],
    2500: [
        [
            { magnitude: "lesser_minor", type: "weapon"}
        ]
    ],
    3000: [
        [
            { magnitude: "greater_minor", type: "armorOrShield"}
        ],
        [
            {mwk: true, type: "armorOrShield", armorType: "mediumArmor"},
            {mwk: true, type: "armorOrShield", armorType: "lightArmorOrShield"},//FIXME this is supposed to be mwk Shield
            { magnitude: "lesser_minor", type: "weapon"}
        ]

    ],
    4000: [
        [
            { magnitude: "lesser_minor", type: "armorOrShield"},
            { magnitude: "lesser_minor", type: "weapon"}
        ]
    ],
    5500: [
        [
            { magnitude: "greater_minor", type: "armorOrShield"},
            { magnitude: "lesser_minor", type: "weapon"}
        ]
    ],
    6000: [
        [
            { magnitude: "greater_minor", type: "weapon"}
        ]
    ],
    7500: [
        [
            { magnitude: "lesser_minor", type: "armorOrShield"},
            { magnitude: "greater_minor", type: "weapon"}
        ]
    ],
    8000: [
        [
            { magnitude: "greater_minor", type: "armorOrShield"},
            { magnitude: "lesser_minor", type: "weapon"},
            { magnitude: "lesser_minor", type: "weapon"}

        ]
    ],
    9000: [
        [
            { magnitude: "greater_minor", type: "armorOrShield"},
            { magnitude: "greater_minor", type: "weapon"}
        ]
    ],
    10000: [
        [
            { magnitude: "lesser_medium", type: "armorOrShield"},
            { magnitude: "lesser_minor", type: "weapon"}
        ]
    ],
    13000: [
        [
            { magnitude: "lesser_medium", type: "weapon"}
        ],
        [
            { magnitude: "lesser_medium", type: "armorOrShield"},
            { magnitude: "greater_minor", type: "weapon"}
        ]
    ],
    15000: [
        [
            { magnitude: "greater_medium", type: "armorOrShield"},
            { magnitude: "lesser_minor", type: "weapon"}
        ]
    ],
    20000: [
        [
            { magnitude: "lesser_medium", type: "armorOrShield"},
            { magnitude: "lesser_medium", type: "weapon"}
        ]
    ],
    25000: [
        [
            { magnitude: "greater_minor", type: "armorOrShield"},
            { magnitude: "greater_medium", type: "weapon"}
        ]
    ],
    30000: [
        [
            { magnitude: "lesser_major", type: "armorOrShield"},
            { magnitude: "lesser_minor", type: "weapon"},
            { magnitude: "greater_minor", type: "weapon"}
        ],
        [
            { magnitude: "lesser_medium", type: "armorOrShield"},
            { magnitude: "greater_medium", type: "weapon"}
        ]
    ],
    35000: [
        [
            { magnitude: "lesser_major", type: "armorOrShield"},
            { magnitude: "lesser_medium", type: "weapon"}
        ],
        [
            { magnitude: "lesser_minor", type: "armorOrShield"},
            { magnitude: "lesser_major", type: "weapon"}
        ]
    ],
    40000: [
        { magnitude: "greater_major", type: "armorOrShield"},
        { magnitude: "greater_minor", type: "weapon"}
    ],
    50000: [
        [
            { magnitude: "greater_major", type: "armorOrShield"},
            { magnitude: "lesser_medium", type: "weapon"}
        ]
    ],
    75000: [
        [
            { magnitude: "greater_minor", type: "armorOrShield"},
            { magnitude: "greater_major", type: "weapon"}
        ]
    ],
    100000: [
        [
            { magnitude: "greater_major", type: "armorOrShield"},
            { magnitude: "greater_major", type: "weapon"}
        ]
    ]
};

module.exports = function () {
    return {
        typeELoot: typeELoot
    }
};