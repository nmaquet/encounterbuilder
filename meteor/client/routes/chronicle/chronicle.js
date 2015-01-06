// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Router.route('/chronicles/:_id', function () {
    var chronicleId = this.params._id;
    Meteor.subscribe("usernames");
    Meteor.subscribe("chronicle", chronicleId);
    Meteor.subscribe("chronicle-elements", chronicleId);
    Meteor.subscribe("encounter-elements", chronicleId);
    this.render('chronicle', {
        data: {
            chronicle: Chronicles.findOne({_id: chronicleId}),
            chronicleElements: ChronicleElements.find({chronicleId: chronicleId}, {sort: {rank: 1}})
        }
    });
});

Template.chronicleElementList.helpers({
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
       Router.go('/chronicles/' + Router.current().params._id + '/edit');
   },
    'click #delete-button': function() {
        Meteor.call("removeChronicle", Router.current().params._id);
        Router.go('/chronicles/');
    }
});

Template.chronicle.helpers({
    'allowedToEdit': function() {
        return Meteor.userId() && this.chronicle && Meteor.userId() === this.chronicle.ownerId;
    },
    'usernameFor': function(userId) {
        var user = Meteor.users.findOne({_id: userId});
        return user && user.username;
    }
});

Template.chronicleEncounter.helpers({
    'elements': function () {
        return EncounterElements.find({encounterId: this._id});
    }
});
