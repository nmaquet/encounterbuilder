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
    remove: function (userId, doc) {
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
    update: function (userId, doc, fields) {
        return _.containsAny(fields, ['ownerId', 'chronicleId']);
    },
    remove: function (userId, doc) {
        if (doc.type === "encounter") {
            return EncounterElements.findOne({encounterId: doc._id});
        }
    }
});

EncounterElements.allow({
    insert: function (userId, doc) {
        var encounter = {
            _id: doc.encounterId,
            chronicleId: doc.chronicleId,
            type: "encounter"
        };
        return (userId && doc.ownerId === userId && ChronicleElements.findOne(encounter));
    },
    update: function (userId, doc) {
        return doc.ownerId === userId;
    },
    remove: function (userId, doc) {
        return doc.ownerId === userId;
    }
});

EncounterElements.deny({
    update: function (userId, docs, fields) {
        return _.containsAny(fields, ['ownerId', 'chronicleId', 'encounterId']);
    }
});

Meteor.publish("chronicles", function () {
    return Chronicles.find({ownerId: this.userId});
});

Meteor.publish("chronicle-elements", function (chronicleId) {
    return ChronicleElements.find({chronicleId: chronicleId});
});

Meteor.publish("encounter-elements", function (chronicleId) {
    return EncounterElements.find({chronicleId: chronicleId});
});

Meteor.publish("monsters", function (id) {
    return Monsters.find({id: id});
});

Meteor.publish("monsters-array", function (monsterIds) {
    return Monsters.find({_id: {$in: monsterIds}});
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
        ChronicleElements.remove({ownerId: this.userId, chronicleId: _id});
        Chronicles.remove({ownerId: this.userId, _id: _id});
    }
});

Meteor.methods({
    "removeEncounter": function (_id) {
        EncounterElements.remove({ownerId: this.userId, encounterId: _id});
        ChronicleElements.remove({ownerId: this.userId, type: "encounter", _id: _id});
    }
});