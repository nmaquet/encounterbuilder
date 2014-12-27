// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Router.route('/search', function () {
    this.render('search');
});

Template.search.events({
    "keyup #monster-search-input": function (event) {
        console.log(event.target.value);
    },
    "change #monster-type-select": function (event) {
        console.log(event.target.value);
    },
    "change #monster-climate-select": function (event) {
        console.log(event.target.value);
    },
    "change #monster-terrain-select": function (event) {
        console.log(event.target.value);
    }
});