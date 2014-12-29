// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Chronicles.allow({
    insert: function (userId, doc) {
        return (userId && doc.ownerId === userId);
    },
    update: function (userId, doc) {
        return doc.ownerId === userId;
    },
    remove: function (userId, doc) {
        return doc.ownerId === userId;
    }
});

Chronicles.deny({
    update: function (userId, doc, fields) {
        return _.contains(fields, 'ownerId');
    },
    remove: function (userId, doc, fields) {
        return ChronicleItems.findOne({chronicleId: doc._id});
    }
});

ChronicleItems.allow({
    insert: function (userId, doc) {
        return (userId && doc.ownerId === userId && Chronicles.findOne({_id: doc.chronicleId}));
    },
    update: function (userId, doc) {
        return doc.ownerId === userId;
    },
    remove: function (userId, doc) {
        return doc.ownerId === userId;
    }
});

ChronicleItems.deny({
    update: function (userId, docs, fields) {
        return _.contains(fields, 'ownerId') || _.contains(fields, 'chronicleId');
    }
});

Meteor.publish("chronicles", function (userId) {
    return Chronicles.find({ownerId: userId});
});

Meteor.publish("chronicle-items", function (chronicleId) {
    return ChronicleItems.find({chronicleId: chronicleId});
});

Meteor.publish("chronicle-monsters", function (chronicleId) {
    var encounterMonsters = EncounterItems.find({chronicleId: chronicleId, type: "monster"}).fetch();
    var monsterIds = _.map(encounterMonsters, function (monster) {
        return monster.monsterId;
    });
    console.log("monsterIds", monsterIds);
    return Monster.find({_id: {$in: monsterIds}});
});

Meteor.publish("monsters", function (id) {
    return Monsters.find({id: id});
});

Meteor.publish("chronicle-encounter-monsters", function(chronicleId) {
    var encounters = ChronicleItems.find({chronicleId: chronicleId, type: "encounter"}).fetch();
    var monsterIds = _.chain(encounters)
        .map(function(encounter){
           return _.keys(encounter.monsters)
        })
        .flatten()
        .unique()
        .value();
    console.log("monsterIds", JSON.stringify(monsterIds));
    var monsters = Monsters.find({_id : {$in: monsterIds}});
    console.log("monsters", JSON.stringify(monsters.fetch()));
    return monsters;
});

Meteor.publish('monster-name-autocomplete', function (selector, options, collectionName) {
    options = options || {};
    options.limit = Math.min(50, Math.abs(options.limit || 5));
    Autocomplete.publishCursor(Monsters.find(selector, options), this);
    this.ready();
});

Meteor.publish('search-monsters', function (selector, options) {
    options = options || {};
    options.limit = Math.min(50, Math.abs(options.limit || 5));
    return Monsters.find(selector, options);
});

Meteor.methods({
    "removeChronicle": function (_id) {
        ChronicleItems.remove({ownerId: this.userId, chronicleId: _id});
        Chronicles.remove({ownerId: this.userId, _id: _id});
    }
});
