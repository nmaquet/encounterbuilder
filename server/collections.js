"use strict";


module.exports = function (db) {
    return {
        monsters: db.collection('monsters'),
        magicitems: db.collection('magicitems'),
        encounters: db.collection('encounters'),
        users:db.collection('users')
    }
};


