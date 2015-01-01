// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Router.route('/', function () {
    Meteor.subscribe('public-chronicles')
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
   }
});