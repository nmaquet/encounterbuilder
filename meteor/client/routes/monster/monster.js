// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Router.route('/monster/:_id', function () {
    Meteor.subscribe("monsters", this.params._id);
    this.render('monster', {
        data: Monsters.findOne({id: this.params._id})
    });
});
