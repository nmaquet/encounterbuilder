// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Router.route('/chronicles/:_id', function () {
    if (!Meteor.user()) {
        Router.go('/')
    } else {
        var chronicleId = this.params._id;
        Meteor.subscribe("chronicles", Meteor.userId());
        Meteor.subscribe("chronicle-items", chronicleId);
        this.render('chronicle', {
            data: {
                chronicle: Chronicles.findOne({_id: chronicleId}),
                chronicleItems: ChronicleItems.find({chronicleId: chronicleId}, {sort: {rank: 1}})
            }
        });
    }
});

Template.chronicleItemList.helpers({
    'isText': function () {
        return this.type === "text";
    },
    'isMonster': function () {
        return this.type === "monster";
    },
    'isEncounter': function () {
        return this.type === "encounter";
    }
});

Template.chronicle.events({
   'click #edit-button': function() {
       var chronicleId = Router.current().params._id;
       Router.go('/chronicles/' + chronicleId + '/edit');
   }
});