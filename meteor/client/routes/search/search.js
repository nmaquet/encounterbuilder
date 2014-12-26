// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Template.searchForm.helpers({
    "autocompleteSettings": function () {
        return {
            position: "bottom",
            limit: 5,
            rules: [
                {
                    subscription: 'monster-names',
                    collection: 'Monsters',
                    token: '',
                    field: 'Name',
                    template: Template.autocompleteItem,
                    callback: function(monster) {
                        $("#search-form-input").val("");
                        Router.go('/monsters/' + monster.id);
                    }
                }
            ]
        }
    }
});