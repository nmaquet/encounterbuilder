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
    return  Chronicles.find({ownerId: userId});
});

Meteor.publish("monsters");