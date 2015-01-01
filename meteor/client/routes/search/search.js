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
    var template = this;
    template.state = new ReactiveDict();
    template.state.set("searchQuery", {});
    template.state.set("searchOptions", {limit: 20, sort: {Name: 1}});
    Meteor.subscribe("search-monsters", this.state.get('searchQuery'), this.state.get('searchOptions'));
    template.autorun(function () {
        Iron.Location.get();
        updateSearchQuery(template, function (searchQuery) {
            searchQuery.Name = {
                '$regex': DEMONSQUID.utils.escapeRegexp(Router.current().params.query.query || ""),
                '$options': 'i'
            };
        });
    });
};

Template.search.events({
    "keyup #monster-search-input": _.debounce(function (event, template) {
        updateSearchQuery(template, function (searchQuery) {
            searchQuery.Name = {
                '$regex': DEMONSQUID.utils.escapeRegexp(event.target.value),
                '$options': 'i'
            };
            Router.go("/search?query=" + event.target.value);
        });
    }, 500),
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
    },
    'query': function () {
        return Router.current().params.query.query;
    }
});