// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.


function updateSearchQuery(template, updateFunction) {
    var searchQuery = template.state.get('searchQuery');
    updateFunction(searchQuery);
    template.state.set('searchQuery', searchQuery);
    Meteor.subscribe("search-monsters", template.state.get("searchQuery"), template.state.get("searchOptions"));
}

Router.route('/search', function () {
    this.render('search');
});

Template.search.created = function () {
    this.state = new ReactiveDict();
    this.state.set("searchQuery", {});
    this.state.set("searchOptions", {limit: 20, sort: {Name: 1}});
    Meteor.subscribe("search-monsters", this.state.get('searchQuery'), this.state.get('searchOptions'));
};

Template.search.events({
    "keyup #monster-search-input": function (event, template) {
        updateSearchQuery(template, function (searchQuery) {
            searchQuery.Name = {
                '$regex': '^' + DEMONSQUID.utils.escapeRegexp(event.target.value),
                '$options': 'i'
            };
        });
    },
    "change #monster-type-select": function (event, template) {
        updateSearchQuery(template, function (searchQuery) {
            if (event.target.value === 'any') {
                delete searchQuery.Type;
            } else {
                searchQuery.Type = event.target.value;
            }
        });
    }
});

Template.search.helpers({
    'searchResults': function () {
        var state = Template.instance().state;
        return Monsters.find(state.get("searchQuery"), state.get("searchOptions"));
    }
});