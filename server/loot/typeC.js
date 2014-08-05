// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var typeCLoot = {
    50: [
        [
            {type: "art_objects", grade: 1, amount: 1}
        ]
    ],
    100: [
        [
            {type: "art_objects", grade: 2, amount: 1}
        ],
        [
            {type: "art_objects", grade: 1, amount: 2}
        ]
    ],
    150: [
        [
            {type: "art_objects", grade: 1, amount: 1},
            {type: "art_objects", grade: 2, amount: 1}
        ]
    ],
    200: [
        [
            {type: "art_objects", grade: 2, amount: 2}
        ]
    ],
    250: [
        [
            {type: "art_objects", grade: 1, amount: 3},
            {type: "art_objects", grade: 2, amount: 1}
        ]
    ],
    500: [
        [
            {type: "art_objects", grade: 3, amount: 1}
        ],
        [
            {type: "art_objects", grade: 1, amount: 4},
            {type: "art_objects", grade: 2, amount: 3}
        ]
    ],
    750: [
        [
            {type: "art_objects", grade: 1, amount: 3},
            {type: "art_objects", grade: 2, amount: 2},
            {type: "art_objects", grade: 3, amount: 1}
        ]
    ],
    1000: [
        [
            {type: "art_objects", grade: 4, amount: 1}
        ],
        [
            {type: "art_objects", grade: 3, amount: 2}
        ]
    ],
    1500: [
        [
            {type: "art_objects", grade: 3, amount: 1},
            {type: "art_objects", grade: 4, amount: 1}
        ]
    ],
    2000: [
        [
            {type: "art_objects", grade: 4, amount: 2}
        ]
    ],
    2500: [
        [
            {type: "art_objects", grade: 2, amount: 5},
            {type: "art_objects", grade: 3, amount: 2},
            {type: "art_objects", grade: 4, amount: 1}
        ]
    ],
    5000: [
        [
            {type: "art_objects", grade: 5, amount: 1}
        ],
        [
            {type: "art_objects", grade: 3, amount: 4},
            {type: "art_objects", grade: 4, amount: 3}
        ]
    ],
    7500: [
        [
            {type: "art_objects", grade: 3, amount: 1},
            {type: "art_objects", grade: 4, amount: 2},
            {type: "art_objects", grade: 5, amount: 1}
        ]
    ],
    10000: [
        [
            {type: "art_objects", grade: 6, amount: 1}
        ],
        [
            {type: "art_objects", grade: 4, amount: 5},
            {type: "art_objects", grade: 5, amount: 1}
        ]
    ],
    15000: [
        [
            {type: "art_objects", grade: 5, amount: 1},
            {type: "art_objects", grade: 6, amount: 1}
        ]
    ],
    20000: [
        [
            {type: "art_objects", grade: 5, amount: 2},
            {type: "art_objects", grade: 6, amount: 1}
        ]
    ],
    50000: [
        [
            {type: "art_objects", grade: 3, amount: 10},
            {type: "art_objects", grade: 4, amount: 5},
            {type: "art_objects", grade: 5, amount: 4},
            {type: "art_objects", grade: 6, amount: 2}
        ]
    ]
};

module.exports = function () {
    return {
        typeCLoot: typeCLoot
    }
};