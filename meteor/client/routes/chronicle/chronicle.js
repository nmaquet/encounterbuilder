// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Router.route('/chronicle/:_id', function () {
    if (!Meteor.user()) {
        Router.go('/')
    } else {
        Meteor.subscribe("chronicles", Meteor.userId());
        Meteor.subscribe("chronicle-items", this.params._id);
        this.render('chronicle', {
            data: {
                content: ChronicleItems.find({chronicleId: this.params._id})
            }
        });
    }
});

Template.chronicle.events({
    'click .delete-user-content-button': function () {
        ChronicleItems.remove({_id: this._id});
    },
    'keyup .content-title-input': function (event) {
        ChronicleItems.update({_id: this._id}, {$set: {"content.title": event.target.value}});
    },
    'keyup .content-body-textarea': function (event) {
        ChronicleItems.update({_id: this._id}, {$set: {"content.body": event.target.value}});
    }
});

Template.addUserContentForm.events({
    "submit form": function (event) {
        event.preventDefault();
        var userContentType = $("#add-user-content-select").val();
        if (userContentType === "monster") {
            return alert("cannot yet add monsters");
        }
        if (userContentType === "text") {
            var text = {
                ownerId: Meteor.userId(),
                chronicleId: Router.current().params._id,
                type: "text",
                content: {
                    title: "Foo title",
                    body: "Bar body"
                }
            };
            ChronicleItems.insert(text);
        }
    }
});