Monsters = new Meteor.Collection("monsters");
Chronicles = new Meteor.Collection("chronicles");

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
        var results = Monsters.find({Name: new RegExp(DEMONSQUID.utils.escapeRegexp(query), 'i')}, {Name: 1, id: 1});
        this.render('search', {
            data: {results: results}
        });
    });

    Router.route('/monster/:_id', function () {
        this.render('monster', {
            data: Monsters.findOne({id: this.params._id})
        });
    });

    Router.route('/search', function () {
        this.render('search');
    });

    Router.route('/chronicles', function () {
        this.render('chronicles');
    });

    Template.searchForm.events({
        'submit form': function (e) {
            e.preventDefault();
            Router.go('/search/' + event.target.query.value);
        }
    });

    Template.chronicles.helpers({
        email: function(){
            if (Meteor.user()) {
                return Meteor.user().emails[0].address
            }
        },
        chronicles: Chronicles.find({})
    });

    Template.chronicles.events({
       "click .delete-chronicle-button": function() {
           Chronicles.remove({_id: this._id});
       }
    });

    Template.createChronicle.events({
        "submit form": function(event) {
            event.preventDefault();
            Chronicles.insert({name: event.target.name.value});
            event.target.name.value = ""
        }
    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {
    });
}
