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

Meteor.publish("monsters", function (id) {
    return Monsters.find({id: id});
});

Meteor.publish('monster-name-autocomplete', function (selector, options, collectionName) {
    options = options || {};
    options.limit = Math.min(50, Math.abs(options.limit || 5));
    console.log(selector, options);
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
