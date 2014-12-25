Chronicles.allow({
    insert: function (userId, doc) {
        console.log(userId);
        console.log(doc);
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
    var cursor = Chronicles.find({ownerId: userId});
    console.log("publishing", cursor.count(), "chronicles");
    return  cursor;
});

Meteor.publish("monsters");