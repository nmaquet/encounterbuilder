// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Router.route('/chronicle/:_id', function () {
    if (!Meteor.user()) {
        Router.go('/')
    } else {
        Meteor.subscribe("chronicles", Meteor.userId());
        Meteor.subscribe("chronicle-items", this.params._id);
        this.render('chronicle', {
            data: {
                content: ChronicleItems.find({chronicleId: this.params._id}, {sort: {rank: 1}})
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

Template.chronicle.rendered = function () {
    this.$('#chronicle-items').sortable({
        stop: function (e, ui) {
            var element = ui.item.get(0);
            var prevElement = ui.item.prev().get(0);
            var nextElement = ui.item.next().get(0);
            if (!prevElement) {
                var newRank = Blaze.getData(nextElement).rank - 1
            } else if (!nextElement) {
                var newRank = Blaze.getData(prevElement).rank + 1
            } else {
                var newRank = (Blaze.getData(nextElement).rank + Blaze.getData(prevElement).rank) / 2
            }
            ChronicleItems.update({_id: Blaze.getData(element)._id}, {$set: {rank: newRank}})
        }
    })
};

Template.addUserContentForm.events({
    "submit form": function (event) {
        event.preventDefault();
        var userContentType = $("#add-user-content-select").val();
        if (userContentType === "monster") {
            return alert("cannot yet add monsters");
        }
        if (userContentType === "text") {
            var chronicleId = Router.current().params._id;
            var highestRanking = ChronicleItems.findOne({chronicleId: chronicleId}, {sort: {rank: -1}});
            var text = {
                ownerId: Meteor.userId(),
                chronicleId: chronicleId,
                type: "text",
                content: {
                    title: "Foo title",
                    body: "Bar body"
                },
                rank: (highestRanking && highestRanking.rank + 1) || 1
            };
            ChronicleItems.insert(text);
        }
    }
});