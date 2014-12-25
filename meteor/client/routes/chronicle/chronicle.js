// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Router.route('/chronicle/:_id', function () {
    if (!Meteor.user()) {
        Router.go('/')
    } else {
        Meteor.subscribe("chronicles", Meteor.userId())
        this.render('chronicle', {
            data: Chronicles.findOne({_id: this.params._id})
        });
    }
});