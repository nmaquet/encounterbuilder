
"use strict";
module.exports = function (db) {
    return {
        monsters: db.collection('monsters'),
        npcs: db.collection('npcs'),
        magicitems: db.collection('magicitems'),
        encounters: db.collection('encounters'),
        users: db.collection('users'),
        metrics: db.collection('metrics'),
        spells: db.collection('spells'),
        feats: db.collection('feats')
    }
};


