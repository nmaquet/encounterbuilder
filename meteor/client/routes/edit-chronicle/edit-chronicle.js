// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

function insertChronicleElement(position, elementType, content) {
    var chronicleId = Router.current().params._id;
    var rank;
    if (position === "bottom") {
        var highestRanking = ChronicleElements.findOne({chronicleId: chronicleId}, {sort: {rank: -1}});
        rank = (highestRanking && highestRanking.rank + 1) || 1;
    } else {
        var lowestRanking = ChronicleElements.findOne({chronicleId: chronicleId}, {sort: {rank: 1}});
        rank = (lowestRanking && lowestRanking.rank - 1) || 0;
    }
    var element = {
        ownerId: Meteor.userId(),
        chronicleId: chronicleId,
        type: elementType,
        content: content,
        rank: rank
    };
    return ChronicleElements.insert(element);
}

Router.route('/chronicles/:_id/edit', function () {
    if (!Meteor.user()) {
        this.render('pleaseLogIn');
    } else {
        var chronicleId = this.params._id;
        Meteor.subscribe("usernames");
        Meteor.subscribe("chronicles");
        Meteor.subscribe("chronicle-elements", chronicleId);
        Meteor.subscribe("encounter-elements", chronicleId);
        this.render('editChronicle', {
            data: {
                chronicle: Chronicles.findOne({_id: chronicleId}),
                elements: ChronicleElements.find({chronicleId: chronicleId}, {sort: {rank: 1}})
            }
        });
    }
});

Template.editChronicle.created = function() {
    Session.set("editedChronicleElementId", null);
};

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

Template.editChronicle.events({
    'click #done-button': function () {
        Router.go('/chronicles/' + Router.current().params._id);
    },
    'keyup #chronicle-name-input': function(event) {
        Chronicles.update({_id: this.chronicle._id}, {$set: {name: event.target.value}});
    },
    'click #chronicle-privacy-radio-private': function() {
        Chronicles.update({_id: this.chronicle._id}, {$set: {privacy: 'private'}});
    },
    'click #chronicle-privacy-radio-public': function() {
        Chronicles.update({_id: this.chronicle._id}, {$set: {privacy: 'public'}});
    },
    'click #collapse-button': function() {
        Router.go('/chronicles/' + Router.current().params._id + '/edit/?collapsed=true');
    },
    'click #expand-button': function() {
        Router.go('/chronicles/' + Router.current().params._id + '/edit/?collapsed=false');
    }
});

Template.editChronicle.helpers({
    'isEmpty': function() {
        return ChronicleElements.find({chronicleId: this.chronicle && this.chronicle._id}).count() === 0;
    },
    'isPrivate': function() {
        return this.chronicle && this.chronicle.privacy === "private";
    },
    'isPublic': function() {
        return this.chronicle && this.chronicle.privacy === "public";
    },
    'usernameFor': function(userId) {
        var user = Meteor.users.findOne({_id: userId});
        return user && user.username;
    },
    'activeClassIfCollapsed': function() {
        if (Router.current().params.query.collapsed === "true") {
            return "active";
        }
    },
    'activeClassIfExpanded': function() {
        if (Router.current().params.query.collapsed !== "true") {
            return "active";
        }
    }
});

Template.editChronicle_addButton.events({
    "click #add-text-dropdown-element": function () {
        var elementId = insertChronicleElement(this.position, "text", {
            title: "Foo title",
            body: "Bar body"
        });
        Session.set("editedChronicleElementId", elementId);
    },
    "click #add-monster-dropdown-element": function () {
        var self = this;
        askUserForMonster(function (monster) {
            insertChronicleElement(self.position, "monster", monster);
        });
        Session.set("editedChronicleElementId", null);
    },
    "click #add-encounter-dropdown-element": function () {
        var elementId = insertChronicleElement(this.position, "encounter", {
            name: "Unnamed Encounter"
        });
        Session.set("editedChronicleElementId", elementId);
    },
    "click #add-heading-dropdown-element": function () {
        var elementId = insertChronicleElement(this.position, "heading", {
            title: "Unnamed Heading",
            level: 1
        });
        Session.set("editedChronicleElementId", elementId);
    }
});

Template.editChronicle_element.events({
    'click .delete-button': function () {
        if (this.type === "encounter") {
            Meteor.call("removeEncounter", this._id);
        } else {
            ChronicleElements.remove({_id: this._id});
        }
    },
    'click .edit-button': function () {
        Session.set("editedChronicleElementId", this._id);
    },
    'click .done-button': function () {
        Session.set("editedChronicleElementId", null);
    }
});

Template.editChronicle_element.helpers({
    'isText': function () {
        return this.type === "text";
    },
    'isMonster': function () {
        return this.type === "monster";
    },
    'isEncounter': function () {
        return this.type === "encounter";
    },
    'isHeading': function () {
        return this.type === "heading";
    },
    'isEdited': function() {
        return Session.equals("editedChronicleElementId", this._id);
    },
    'chronicleElementLevelClass': function () {
        var self = this;
        var chronicleId = Router.current().params._id;
        var chronicleElements = ChronicleElements.find({chronicleId: chronicleId}, {sort: {rank: 1}}).fetch();
        var thisElementLevel = 1;
        var nextElementLevel = 1;
        var result = "";
        _.forEach(chronicleElements, function (element) {
            if (element.type === "heading" && element.content.level > thisElementLevel) {
                nextElementLevel = Math.min(nextElementLevel + 1, 6);
            } if (element.type === "heading" && element.content.level <= thisElementLevel) {
                thisElementLevel = element.content.level;
                nextElementLevel = Math.min(thisElementLevel + 1, 6);
            }
            if (self._id === element._id) {
                result = "chronicle-element-level-" + thisElementLevel;
            }
            thisElementLevel = nextElementLevel;
        });
        console.log(result);
        return result;
    }
});

Template.editChronicle_editText.events({
    'keyup .content-title-input': function (event) {
        ChronicleElements.update({_id: this._id}, {$set: {"content.title": event.target.value}});
    },
    'keyup .content-body-textarea': function (event) {
        ChronicleElements.update({_id: this._id}, {$set: {"content.body": event.target.value}});
    }
});

Template.editChronicle_editHeading.events({
    'keyup .title-input': _.debounce(function (event) {
        ChronicleElements.update({_id: this._id}, {$set: {"content.title": event.target.value}});
    }, 500),
    'click .heading-select': function(event) {
        var level = Number(event.target.dataset.level) || 1;
        ChronicleElements.update({_id: this._id}, {$set: {"content.level": level}});
    }
});

Template.editChronicle_editEncounter.events({
    "keyup .content-name-input": function (event){
        ChronicleElements.update({_id: this._id}, {$set: {'content.name': event.target.value}});
    },
    "click .add-monster-button": function () {
        var encounter = this;
        askUserForMonster(function (monster) {
            var element = EncounterElements.findOne({encounterId: encounter._id, type: "monster", 'monster._id': monster._id});
            if (element) {
                EncounterElements.update({_id: element._id}, {$inc: {count: 1}});
            } else {
                EncounterElements.insert({
                    ownerId: Meteor.userId(),
                    chronicleId: encounter.chronicleId,
                    encounterId: encounter._id,
                    type: "monster",
                    monster: monster,
                    count: 1
                });
            }
        });
    }
});

Template.editChronicle_editEncounter.helpers({
    'elements': function () {
        return EncounterElements.find({encounterId: this._id});
    }
});

Template.editChronicle_encounter.helpers({
    'elements': function () {
        return EncounterElements.find({encounterId: this._id});
    },
    'expanded': function() {
        return Router.current().params.query.collapsed !== "true";
    }
});

Template.editChronicle_text.helpers({
    'expanded': function() {
        return Router.current().params.query.collapsed !== "true";
    }
});

Template.editChronicle_monster.helpers({
    'expanded': function() {
        return Router.current().params.query.collapsed !== "true";
    }
});

Template.editChronicle_heading.helpers({
    'expanded': function() {
        return Router.current().params.query.collapsed !== "true";
    }
});

function askUserForMonster(callback) {
    askUserForMonster.callback = callback;
    $('#add-monster-modal').modal('show');
}

Template.editChronicle_addMonsterModal.helpers({
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
