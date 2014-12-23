if (Meteor.isClient) {

    Router.route('/', function () {
        this.render('home');
    });

    Router.route('/search/:query', function () {
        this.render('search');
    }, {name : "search"});

    Template.searchForm.events({
        'submit form': function (e) {
            e.preventDefault();
            Router.go('search', {query: event.target.query.value});
        }
    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
