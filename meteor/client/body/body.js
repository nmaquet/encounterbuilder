// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.navbar.helpers({
    'chroniclesRouteActiveClass': function () {
        if (Router.current() && Router.current().location.get().path === '/chronicles')
            return "active";
    },
    'searchRouteActiveClass': function () {
        if (Router.current() && Router.current().location.get().path === '/search')
            return "active";
    }
});

Template.quickSearchForm.helpers({
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
                    callback: function(monster) {
                        $("#quick-search-form-input").val("");
                        Router.go('/monsters/' + monster.id);
                    }
                }
            ]
        }
    }
});