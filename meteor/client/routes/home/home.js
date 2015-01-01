// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Router.route('/', function () {
    Meteor.subscribe('public-chronicles');
    Meteor.subscribe('usernames');
    this.render('home', {
        data: {
            chronicles: Chronicles.find()
        }
    });
});

Template.home.helpers({
   'hiddenClassIfNotLoggedIn' : function() {
       if (!Meteor.user()) {
           return "hidden"
       }
   },
   'usernameFor': function (userId) {
       var user = Meteor.users.findOne({_id: userId});
       return user && user.username;
   },
   'chronicleScore': function () {
       var chronicle = Chronicles.findOne({_id: this._id});
       var upvotes = (chronicle.upvotes && chronicle.upvotes.length) || 0;
       var downvotes = (chronicle.downvotes && chronicle.downvotes.length) || 0;
       return upvotes - downvotes;
   },
    'upvotedArrowClass': function () {
        if (!Meteor.userId()) {
            return;
        }
        var chronicle = Chronicles.findOne({_id: this._id});
        if (_.contains(chronicle.upvotes, Meteor.userId())) {
            return "upvoted-arrow";
        }
   },
    'downvotedArrowClass': function () {
        if (!Meteor.userId()) {
            return;
        }
        var chronicle = Chronicles.findOne({_id: this._id});
        if (_.contains(chronicle.downvotes, Meteor.userId())) {
            return "downvoted-arrow";
        }
    }
});

Template.home.events({
   'click .upvote-arrow': function () {
        if (!Meteor.userId()) {
            return;
        }
        var chronicle = Chronicles.findOne({_id: this._id});
        if (_.contains(chronicle.upvotes, Meteor.userId())) {
            Meteor.call("removeVoteFromChronicle", this._id);
        } else {
            Meteor.call("upvoteChronicle", this._id);
        }
   },
   'click .downvote-arrow': function () {
       if (!Meteor.userId()) {
           return;
       }
       var chronicle = Chronicles.findOne({_id: this._id});
       if (_.contains(chronicle.downvotes, Meteor.userId())) {
           Meteor.call("removeVoteFromChronicle", this._id);
       } else {
           Meteor.call("downvoteChronicle", this._id);
       }
   }
});