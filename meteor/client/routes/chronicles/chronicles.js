// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Router.route('/chronicles', function () {
    if (!Meteor.user()) {
        Router.go('/')
    } else {
        this.render('chronicles');
        Meteor.subscribe("chronicles", Meteor.userId())
    }
});

Template.chronicles.helpers({
    email: function(){
        if (Meteor.user()) {
            return Meteor.user().emails[0].address
        }
    },
    chronicles: Chronicles.find({})
});

Template.chronicles.events({
    "click .delete-chronicle-button": function() {
        Chronicles.remove({_id: this._id});
    }
});

Template.createChronicle.events({
    "submit form": function(event) {
        event.preventDefault();
        Chronicles.insert({name: event.target.name.value, ownerId: Meteor.userId()});
        event.target.name.value = ""
    }
});

