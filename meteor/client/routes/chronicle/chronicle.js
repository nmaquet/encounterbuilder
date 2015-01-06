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
    'click #edit-button': function () {
        Router.go('/chronicles/' + Router.current().params._id + '/edit');
    },
    'click #delete-button': function () {
        Meteor.call("removeChronicle", Router.current().params._id);
        Router.go('/chronicles/');
    },
    'click #collapse-button': function () {
        Router.go('/chronicles/' + Router.current().params._id + '?collapsed=true');
    },
    'click #expand-button': function () {
        Router.go('/chronicles/' + Router.current().params._id + '?collapsed=false');
    }
});

Template.chronicle.helpers({
    'allowedToEdit': function() {
        return Meteor.userId() && this.chronicle && Meteor.userId() === this.chronicle.ownerId;
    },
    'usernameFor': function(userId) {
        var user = Meteor.users.findOne({_id: userId});
        return user && user.username;
    },
    'activeClassIfCollapsed': function() {
        if (Router.current().params.query.collapsed === "true") {
            return "active";
        }
    },
    'activeClassIfExpanded': function() {
        if (Router.current().params.query.collapsed !== "true") {
            return "active";
        }
    }
});

Template.chronicleEncounter.helpers({
    'elements': function () {
        return EncounterElements.find({encounterId: this._id});
    },
    'expanded': function() {
        return Router.current().params.query.collapsed !== "true";
    }
});

Template.chronicleText.helpers({
    'expanded': function() {
        return Router.current().params.query.collapsed !== "true";
    }
});

Template.chronicleMonster.helpers({
    'expanded': function() {
        return Router.current().params.query.collapsed !== "true";
    }
});