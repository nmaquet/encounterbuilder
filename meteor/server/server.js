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
        return ChronicleElements.findOne({chronicleId: doc._id});
    }
});

ChronicleElements.allow({
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

ChronicleElements.deny({
    update: function (userId, docs, fields) {
        return _.contains(fields, 'ownerId') || _.contains(fields, 'chronicleId');
    }
});

Meteor.publish("chronicles", function (userId) {
    return Chronicles.find({ownerId: userId});
});

Meteor.publish("chronicle-elements", function (chronicleId) {
    return ChronicleElements.find({chronicleId: chronicleId});
});

Meteor.publish("chronicle-monsters", function (chronicleId) {
    var encounterMonsters = EncounterElements.find({chronicleId: chronicleId, type: "monster"}).fetch();
    var monsterIds = _.map(encounterMonsters, function (monster) {
        return monster.monsterId;
    });
    return Monster.find({_id: {$in: monsterIds}});
});

Meteor.publish("monsters", function (id) {
    return Monsters.find({id: id});
});

Meteor.publish("chronicle-encounter-monsters_FUBAR", function(chronicleId) {
    var encounters = ChronicleElements.find({chronicleId: chronicleId, type: "encounter"});
    var monsterIds = _.chain(encounters.fetch())
        .map(function(encounter){
            return _.pluck(encounter.content.monsters, '_id');
        })
        .flatten()
        .unique()
        .value();
    var monsters = Monsters.find({_id : {$in: monsterIds}});
    console.log('monsters:', _.pluck(monsters.fetch(), 'id'));
    return [monsters, encounters];
});

//Meteor.publish("chronicle-encounter-monsters", function (chronicleId) {
//    var self = this;
//    var count = 0;
//
//    var handle = ChronicleElements.find({chronicleId: chronicleId, type: "encounter"}).observeChanges({
//        added: function (id) {
//            count++;
//            if (!initializing)
//                self.changed("counts", roomId, {count: count});
//        },
//        removed: function (id) {
//            count--;
//            self.changed("counts", roomId, {count: count});
//        }
//        // don't care about changed
//    });
//
//    // Instead, we'll send one `self.added()` message right after
//    // observeChanges has returned, and mark the subscription as
//    // ready.
//    initializing = false;
//    self.added("counts", roomId, {count: count});
//    self.ready();
//
//    // Stop observing the cursor when client unsubs.
//    // Stopping a subscription automatically takes
//    // care of sending the client any removed messages.
//    self.onStop(function () {
//        handle.stop();
//    });
//});

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
        ChronicleElements.remove({ownerId: this.userId, chronicleId: _id});
        Chronicles.remove({ownerId: this.userId, _id: _id});
    }
});
