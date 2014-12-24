// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Router.route('/search', function () {
    this.render('search');
});

Router.route('/search/:_query', function () {
    var query = this.params._query;
    var results = Monsters.find({Name: new RegExp(DEMONSQUID.utils.escapeRegexp(query), 'i')}, {Name: 1, id: 1});
    this.render('search', {
        data: {results: results}
    });
});

Template.searchForm.events({
    'submit form': function (event) {
        event.preventDefault();
        Router.go('/search/' + event.target.query.value);
    }
});