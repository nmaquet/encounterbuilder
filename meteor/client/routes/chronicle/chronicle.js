// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Router.route('/chronicle/:_id', function () {
    if (!Meteor.user()) {
        Router.go('/')
    } else {
        Meteor.subscribe("chronicles", Meteor.userId());
        this.render('chronicle', {
            data: Chronicles.findOne({_id: this.params._id})
        });
    }
});

Template.chronicle.events({
    'click .delete-user-content-button': function (event, template) {
        var position = template.data.content.indexOf(this);
        var query = {_id: Router.current().params._id};
        Chronicles.update(query, {$unset: _.object([["content." + position, 1]])});
        Chronicles.update(query, {$pull: {"content" : null}});
    },
    'keyup .content-body-textarea': function(event, template) {
        var position = template.data.content.indexOf(this);
        var query = {_id: Router.current().params._id};
        Chronicles.update(query, { $set: _.object([["content." + position + ".content.body", event.target.value]])});
    },
    'keyup .content-title-input': function(event, template) {
        var position = template.data.content.indexOf(this);
        var query = {_id: Router.current().params._id};
        Chronicles.update(query, { $set: _.object([["content." + position + ".content.title", event.target.value]])});
    }
});

Template.addUserContentForm.events({
    "submit form": function (event) {
        event.preventDefault();
        userContentType = $("#add-user-content-select").val();
        if (userContentType === "monster") {
            return alert("cannot yet add monsters");
        }
        if (userContentType === "text") {
            var text = {
                type: "text",
                content: {
                    title: "Foo title",
                    body: "Bar body"
                },
                lastUpdated: new Date().toISOString()
            };
            Chronicles.update({_id: Router.current().params._id}, {$push: {content: text}});
        }
    }
});