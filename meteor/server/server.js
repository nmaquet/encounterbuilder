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
        return (userId && doc.ownerId === userId && Chronicles.findOne({_id: doc.chronicleId, ownerId: userId}));
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
            type: "encounter",
            ownerId: userId
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

Meteor.publish("chronicle", function (chronicleId) {
    return Chronicles.find({
        _id: chronicleId,
        $or: [
            {ownerId: this.userId},
            {privacy: 'public'}
        ]
    });
});

Meteor.publish("public-chronicles", function () {
    return Chronicles.find({privacy: 'public'}, {sort: {nonAtomicScore: -1}});
});

Meteor.publish("chronicle-elements", function (chronicleId) {
    return ChronicleElements.find({chronicleId: chronicleId});
});

Meteor.publish("chronicle-element", function (_id) {
    return ChronicleElements.find({_id: _id});
});

Meteor.publish("encounter-elements", function (chronicleId) {
    return EncounterElements.find({chronicleId: chronicleId});
});

Meteor.publish("monsters", function (id) {
    return Monsters.find({id: id});
});

Meteor.publish("usernames", function() {
    return Meteor.users.find({}, {fields: {username: 1, _id: 1}});
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
    },
    "upvoteChronicle": function (_id) {
        var chronicle = Chronicles.findOne({_id: _id});
        if (!this.userId || !chronicle) {
            return;
        }
        var upvotes = chronicle.upvotes || [];
        var downvotes = chronicle.downvotes || [];
        var nonAtomicScore = upvotes.length - downvotes.length;
        if (_.contains(downvotes, this.userId)) {
            nonAtomicScore += 2;
        } else if (!_.contains(upvotes, this.userId)) {
            nonAtomicScore += 1;
        }
        Chronicles.update({_id: _id}, {
            $addToSet: {
                upvotes: this.userId
            },
            $pull : {
                downvotes: this.userId
            },
            $set: {
                nonAtomicScore: nonAtomicScore
            }
        });
    },
    "downvoteChronicle": function (_id) {
        var chronicle = Chronicles.findOne({_id: _id});
        if (!this.userId || !chronicle) {
            return;
        }
        var upvotes = chronicle.upvotes || [];
        var downvotes = chronicle.downvotes || [];
        var nonAtomicScore = upvotes.length - downvotes.length;
        if (_.contains(upvotes, this.userId)) {
            nonAtomicScore -= 2;
        } else if (!_.contains(downvotes, this.userId)) {
            nonAtomicScore -= 1;
        }
        Chronicles.update({_id: _id}, {
            $addToSet: {
                downvotes: this.userId
            },
            $pull : {
                upvotes: this.userId
            },
            $set: {
                nonAtomicScore: nonAtomicScore
            }
        });
    },
    "removeVoteFromChronicle": function (_id) {
        var chronicle = Chronicles.find({_id: _id});
        if (!this.userId || !chronicle) {
            return;
        }
        var upvotes = chronicle.upvotes || [];
        var downvotes = chronicle.downvotes || [];
        var nonAtomicScore = upvotes.length - downvotes.length;
        if (_.contains(upvotes, this.userId)) {
            nonAtomicScore -= 1;
        } else if (!_.contains(downvotes, this.userId)) {
            nonAtomicScore += 1;
        }
        Chronicles.update({_id: _id}, {
            $pull : {
                upvotes: this.userId,
                downvotes: this.userId
            },
            $set: {
                nonAtomicScore: nonAtomicScore
            }
        });
    }
});