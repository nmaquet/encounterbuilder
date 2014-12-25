// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Router.route('/', function () {
    this.render('home');
});

Template.home.helpers({
   'hiddenClassIfNotLoggedIn' : function() {
       if (!Meteor.user()) {
           return "hidden"
       }
   }
});