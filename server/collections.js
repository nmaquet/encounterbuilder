// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";
module.exports = function (db) {
    return {
        monsters: db.collection('monsters'),
        userMonsters: db.collection('usermonsters'),
        npcs: db.collection('npcs'),
        userNpcs: db.collection('usernpcs'),
        userTexts: db.collection('usertexts'),
        magicitems: db.collection('magicitems'),
        encounters: db.collection('encounters'),
        users: db.collection('users'),
        metrics: db.collection('metrics'),
        spells: db.collection('spells'),
        feats: db.collection('feats'),
        userFeats: db.collection('userfeats'),
        userSpells: db.collection('userspells'),
        userItems: db.collection('useritems'),
        contentTrees: db.collection('contenttrees'),
        favourites: db.collection('favourites'),
        userIllustrations: db.collection('userillustrations'),
        userMaps: db.collection('usermaps')
    }
};


