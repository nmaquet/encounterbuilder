"use strict";

var typeBLoot = {
    10: [
        [
            {type: "gems", grade: 1, amount: 1}
        ]
    ],
    15: [
        [
            {type: "coins", n: 2, die: 6, amount: 10, unit: 'cp'},
            {type: "coins", n: 4, die: 8, amount: 1, unit: 'sp'},
            {type: "coins", n: 1, die: 4, amount: 1, unit: 'gp'},
            {type: "gems", grade: 1, amount: 1}
        ]
    ],
    25: [
        [
            {type: "coins", n: 5, die: 10, amount: 1, unit: 'sp'},
            {type: "coins", n: 1, die: 4, amount: 1, unit: 'gp'},
            {type: "gems", grade: 1, amount: 2}
        ]
    ],
    50: [
        [
            {type: "gems", grade: 2, amount: 1}
        ],
        [
            {type: "coins", n: 3, die: 6, amount: 10, unit: 'sp'},
            {type: "coins", n: 3, die: 6, amount: 1, unit: 'gp'},
            {type: "gems", grade: 1, amount: 3}
        ]
    ],
    75: [
        [
            {type: "coins", n: 1, die: 4, amount: 10, unit: 'sp'},
            {type: "coins", n: 1, die: 4, amount: 1, unit: 'gp'},
            {type: "gems", grade: 1, amount: 2},
            {type: "gems", grade: 2, amount: 1}
        ]
    ],
    100: [
        [
            {type: "gems", grade: 3, amount: 1}
        ],
        [
            {type: "coins", n: 3, die: 8, amount: 10, unit: 'sp'},
            {type: "coins", n: 4, die: 8, amount: 1, unit: 'gp'},
            {type: "gems", grade: 1, amount: 2},
            {type: "gems", grade: 2, amount: 1}
        ]
    ],
    150: [
        [
            {type: "gems", grade: 2, amount: 1},
            {type: "gems", grade: 3, amount: 1}
        ]
    ],
    200: [
        [
            {type: "coins", n: 3, die: 6, amount: 10, unit: 'sp'},
            {type: "coins", n: 2, die: 4, amount: 10, unit: 'gp'},
            {type: "gems", grade: 1, amount: 4},
            {type: "gems", grade: 3, amount: 1}
        ]
    ],
    250: [
        [
            {type: "coins", n: 2, die: 4, amount: 10, unit: 'gp'},
            {type: "gems", grade: 2, amount: 2},
            {type: "gems", grade: 3, amount: 1}
        ]
    ],
    500: [
        [
            {type: "gems", grade: 4, amount: 1}
        ],
        [
            {type: "coins", n: 2, die: 4, amount: 10, unit: 'gp'},
            {type: "coins", n: 2, die: 4, amount: 1, unit: 'pp'},
            {type: "gems", grade: 2, amount: 2},
            {type: "gems", grade: 3, amount: 3}
        ]
    ],
    750: [
        [
            {type: "coins", n: 2, die: 4, amount: 10, unit: 'gp'},
            {type: "gems", grade: 2, amount: 2},
            {type: "gems", grade: 3, amount: 1},
            {type: "gems", grade: 4, amount: 1}
        ]
    ],
    1000: [
        [
            {type: "gems", grade: 5, amount: 1}
        ],
        [
            {type: "coins", n: 3, die: 6, amount: 10, unit: 'gp'},
            {type: "coins", n: 4, die: 4, amount: 1, unit: 'pp'},
            {type: "gems", grade: 3, amount: 3},
            {type: "gems", grade: 4, amount: 1}
        ]
    ],
    2500: [
        [
            {type: "coins", n: 2, die: 4, amount: 100, unit: 'gp'},
            {type: "gems", grade: 4, amount: 2},
            {type: "gems", grade: 5, amount: 1}
        ]
    ],
    5000: [
        [
            {type: "gems", grade: 6, amount: 1}
        ],
        [
            {type: "coins", n: 2, die: 4, amount: 100, unit: 'gp'},
            {type: "coins", n: 2, die: 4, amount: 10, unit: 'pp'},
            {type: "gems", grade: 4, amount: 2},
            {type: "gems", grade: 5, amount: 1}
        ]
    ],
    10000: [
        [
            {type: "gems", grade: 5, amount: 5},
            {type: "gems", grade: 6, amount: 1}
        ]
    ],
    20000: [
        [
            {type: "coins", n: 4, die: 8, amount: 100, unit: 'gp'},
            {type: "coins", n: 6, die: 10, amount: 10, unit: 'pp'},
            {type: "gems", grade: 6, amount: 3}
        ]
    ],
    50000: [
        [
            {type: "coins", n: 4, die: 4, amount: 10, unit: 'pp'},
            {type: "gems", grade: 3, amount: 10},
            {type: "gems", grade: 4, amount: 4},
            {type: "gems", grade: 5, amount: 6},
            {type: "gems", grade: 6, amount: 8}
        ]
    ]
};

module.exports = function () {
    return {
        typeBLoot: typeBLoot
    }
};