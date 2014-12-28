// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

function insertChronicleItem(itemType, content) {
    var chronicleId = Router.current().params._id;
    var highestRanking = ChronicleItems.findOne({chronicleId: chronicleId}, {sort: {rank: -1}});
    var item = {
        ownerId: Meteor.userId(),
        chronicleId: chronicleId,
        type: itemType,
        content: content,
        rank: (highestRanking && highestRanking.rank + 1) || 1
    };
    ChronicleItems.insert(item);
}

Router.route('/chronicles/:_id/edit', function () {
    if (!Meteor.user()) {
        Router.go('/')
    } else {
        var chronicleId = this.params._id;
        Meteor.subscribe("chronicles", Meteor.userId());
        Meteor.subscribe("chronicle-items", chronicleId);
        this.render('editChronicle', {
            data: {
                chronicle: Chronicles.findOne({_id: chronicleId}),
                chronicleItems: ChronicleItems.find({chronicleId: chronicleId}, {sort: {rank: 1}})
            }
        });
    }
});

Template.editChronicle.events({
    'click #done-button': function() {
        var chronicleId = Router.current().params._id;
        Router.go('/chronicles/' + chronicleId);
    }
});

Template.editChronicleItemList.events({
    'click .delete-user-content-button': function () {
        ChronicleItems.remove({_id: this._id});
    }
});

Template.textEditor.events({
    'keyup .content-title-input': function (event) {
        ChronicleItems.update({_id: this._id}, {$set: {"content.title": event.target.value}});
    },
    'keyup .content-body-textarea': function (event) {
        ChronicleItems.update({_id: this._id}, {$set: {"content.body": event.target.value}});
    }
});

Template.editChronicleItemList.helpers({
   'isText': function () {
        return this.type === "text";
   },
   'isMonster': function () {
        return this.type === "monster";
    },
    'isEncounter': function () {
        return this.type === "encounter";
    }
});

Template.editChronicle.rendered = function () {
    this.$('#edit-chronicle-item-list').sortable({
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

Template.addChronicleItemForm.events({
    "submit form": function (event) {
        event.preventDefault();
        var userContentType = $("#add-chronicle-item-select").val();
        if (userContentType === "monster") {
            return $('#add-monster-modal').modal('show');
        }
        if (userContentType === "text") {
            return insertChronicleItem("text", {
                title: "Foo title",
                body: "Bar body"
            });
        }
        if (userContentType === "encounter") {
            return insertChronicleItem("encounter", {
                name: "Unnamed Encounter",
                monsters: [],
                npcs: [],
                items: []
            });
        }
    }
});

Template.addMonsterModal.helpers({
    "autocompleteSettings": function () {
        return {
            position: "bottom",
            limit: 5,
            rules: [
                {
                    subscription: 'monster-name-autocomplete',
                    collection: 'Monsters',
                    token: '',
                    field: 'Name',
                    template: Template.autocompleteItem,
                    callback: function(monster) {
                        $("#add-monster-search-input").val("");
                        $('#add-monster-modal').modal('hide');
                        insertChronicleItem("monster", monster);
                    }
                }
            ]
        }
    }
});