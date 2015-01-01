// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Router.route('/chronicles', function () {
    if (!Meteor.user()) {
        this.render('pleaseLogIn');
    } else {
        this.render('chronicleList');
        Meteor.subscribe("chronicles");
        Meteor.subscribe("usernames");
    }
});

Template.chronicleList.helpers({
    email: function(){
        if (Meteor.user()) {
            return Meteor.user().emails[0].address
        }
    },
    chronicles: Chronicles.find({}),
    'usernameFor': function(userId) {
        var user = Meteor.users.findOne({_id: userId});
        return user && user.username;
    }
});

Template.chronicleList.events({
    "click .delete-chronicle-button": function() {
        Meteor.call("removeChronicle", this._id);
    }
});

Template.createChronicle.events({
    "submit form": function(event) {
        event.preventDefault();
        Chronicles.insert({name: event.target.name.value, ownerId: Meteor.userId(), privacy: 'private', creativeCommons: false});
        event.target.name.value = ""
    }
});

