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
    update: function (userId, docs, fields) {
        return _.contains(fields, 'ownerId');
    }
});

Meteor.publish("chronicles", function (userId) {
    return Chronicles.find({ownerId: userId});
});

Meteor.publish("monsters", function(){
    return Monsters.find({});
});

Meteor.publish('monster-names', function (selector, options, collName) {
    options.limit = Math.min(50, Math.abs(options.limit || 5));
    Autocomplete.publishCursor(Monsters.find(selector, options), this);
    this.ready();
});