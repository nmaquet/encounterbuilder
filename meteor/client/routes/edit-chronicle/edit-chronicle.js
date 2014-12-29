// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

function insertChronicleElement(elementType, content) {
    var chronicleId = Router.current().params._id;
    var highestRanking = ChronicleElements.findOne({chronicleId: chronicleId}, {sort: {rank: -1}});
    var element = {
        ownerId: Meteor.userId(),
        chronicleId: chronicleId,
        type: elementType,
        content: content,
        rank: (highestRanking && highestRanking.rank + 1) || 1
    };
    ChronicleElements.insert(element);
}

Router.route('/chronicles/:_id/edit', function () {
    if (!Meteor.user()) {
        this.render('pleaseLogIn');
    } else {
        var chronicleId = this.params._id;
        Meteor.subscribe("chronicles", Meteor.userId());
        Meteor.subscribe("chronicle-elements", chronicleId);
        Meteor.subscribe("chronicle-encounter-monsters", chronicleId);
        this.render('editChronicle', {
            data: {
                chronicle: Chronicles.findOne({_id: chronicleId}),
                chronicleElements: ChronicleElements.find({chronicleId: chronicleId}, {sort: {rank: 1}})
            }
        });
    }
});

Template.editChronicle.events({
    'click #done-button': function () {
        var chronicleId = Router.current().params._id;
        Router.go('/chronicles/' + chronicleId);
    }
});

Template.editChronicleElementList.events({
    'click .delete-user-content-button': function () {
        ChronicleElements.remove({_id: this._id});
    }
});

Template.textEditor.events({
    'keyup .content-title-input': function (event) {
        ChronicleElements.update({_id: this._id}, {$set: {"content.title": event.target.value}});
    },
    'keyup .content-body-textarea': function (event) {
        ChronicleElements.update({_id: this._id}, {$set: {"content.body": event.target.value}});
    }
});

Template.editChronicleElementList.helpers({
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
    this.$('#edit-chronicle-element-list').sortable({
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
            ChronicleElements.update({_id: Blaze.getData(element)._id}, {$set: {rank: newRank}})
        }
    })
};

Template.addChronicleElementForm.events({
    "click #add-text-dropdown-element": function () {
        insertChronicleElement("text", {
            title: "Foo title",
            body: "Bar body"
        });
    },
    "click #add-monster-dropdown-element": function () {
        askUserForMonster(function (monster) {
            insertChronicleElement("monster", monster);
        });
    },
    "click #add-encounter-dropdown-element": function () {
        return insertChronicleElement("encounter", {
            name: "Unnamed Encounter",
            monsters: []
        });
    }
});

Template.addEncounterElementForm.events({
    "click #add-monster-dropdown-element": function () {
        var encounter = this;
        askUserForMonster(function (monster) {
            /* FIXME: inc count */
            ChronicleElements.update({_id: encounter._id}, {$push: {'content.monsters': {_id: monster._id, count: 1}}});
            Meteor.subscribe("chronicle-encounter-monsters", chronicleId);
        });
    }
});

Template.encounterEditor.helpers({
    'monsters': function () {
        var encounter = ChronicleElements.findOne({_id: this._id});
        return _.map(encounter.content.monsters, function (monster) {
            return {
                monster: Monsters.findOne({_id: monster._id}),
                count: monster.count
            }
        });
    }
});

function askUserForMonster(callback) {
    askUserForMonster.callback = callback;
    $('#add-monster-modal').modal('show');
}

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
                    template: Template.autocompleteElement,
                    callback: function (monster) {
                        $("#add-monster-search-input").val("");
                        $('#add-monster-modal').modal('hide');
                        askUserForMonster.callback(monster);
                        askUserForMonster.callback = null;
                    }
                }
            ]
        }
    }
});
