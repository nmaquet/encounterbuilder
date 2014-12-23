Monsters = new Meteor.Collection("monsters");

DEMONSQUID = {
    utils: {

    }
};

DEMONSQUID.utils.escapeRegexp = function (str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};

if (Meteor.isClient) {

    Router.route('/', function () {
        this.render('home');
    });

    Router.route('/search/:_query', function () {
        var query = this.params._query;
        var results = Monsters.find({Name: new RegExp(DEMONSQUID.utils.escapeRegexp(query), 'i')}, {Name: 1});
        this.render('search', {
            data: {results: results}
        });
    });

    Router.route('/search', function () {
        this.render('search');
    });

    Template.searchForm.events({
        'submit form': function (e) {
            e.preventDefault();
            Router.go('/search/' + event.target.query.value);
        }
    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {
    });
}
