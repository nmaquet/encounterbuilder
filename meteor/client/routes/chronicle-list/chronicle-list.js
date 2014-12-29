// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Router.route('/chronicles', function () {
    if (!Meteor.user()) {
        this.render('pleaseLogIn');
    } else {
        this.render('chronicleList');
        Meteor.subscribe("chronicles");
    }
});

Template.chronicleList.helpers({
    email: function(){
        if (Meteor.user()) {
            return Meteor.user().emails[0].address
        }
    },
    chronicles: Chronicles.find({})
});

Template.chronicleList.events({
    "click .delete-chronicle-button": function() {
        Meteor.call("removeChronicle", this._id);
    }
});

Template.createChronicle.events({
    "submit form": function(event) {
        event.preventDefault();
        Chronicles.insert({name: event.target.name.value, ownerId: Meteor.userId()});
        event.target.name.value = ""
    }
});

