"use strict";

require('../scripts/concat_and_uglify');

var fs = require('fs');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

var FIND_LIMIT = 50;

mongoose.connect(process.env['MONGODB_URL']);

app.configure(function () {
    //app.use(express.compress());
    app.use("/", express.static(__dirname + '/../client/public/'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({secret: "THECATZHAZITZ"}));
});

/* --- AUTHENTICATION STUFF --- */

var crypto = require('crypto');
var SALT_LENGTH = 128;
var PBKDF2_ITERATIONS = 12000;

function hash(pwd, salt, fn) {
    if (3 == arguments.length) {
        crypto.pbkdf2(pwd, salt, PBKDF2_ITERATIONS, SALT_LENGTH, fn);
    } else {
        fn = salt;
        crypto.randomBytes(SALT_LENGTH, function (err, salt) {
            if (err) return fn(err);
            salt = salt.toString('base64');
            crypto.pbkdf2(pwd, salt, PBKDF2_ITERATIONS, SALT_LENGTH, function (err, hash) {
                if (err) return fn(err);
                fn(null, salt, hash);
            });
        });
    }
}

var UserSchema = new mongoose.Schema({
    username: String,
    salt: String,
    hash: String
});

var User = mongoose.model('users', UserSchema);

var USERNAME = "chris";
var PASSWORD = "audrey4ever";

hash(PASSWORD, function (error, salt, hash) {
    if (error) {
        throw error;
    }
    User.create({ username: USERNAME, salt: salt, hash: hash }, function (error) {
        if (error) {
            console.log(error);
        }
    });
});

function authenticate(username, password, callback) {
    User.findOne({ username: username }, function (error, user) {
        if (error || !user) {
            if (error) {
                console.log(error);
            }
            callback(new Error('authentication failure'), null);
        } else {
            hash(password, user.salt, function (error, hash) {
                if (error || hash != user.hash) {
                    if (error) {
                        console.log(error);
                    }
                    callback(new Error('authentication failure'), null);
                } else {
                    callback(null, user);
                }
            });
        }
    });
}

function authenticationCheck(request, response, next) {
    if (request.session && request.session.user) {
        next();
    } else {
        response.send(401,'access denied');
    }
}

/* --- AUTHENTICATION STUFF --- */

var Monster = require('./monsterModel')(mongoose).Monster;
var searchMonstersRoute = require('./searchMonstersRoute')(Monster, FIND_LIMIT);
var monsterRoute = require('./monsterRoute')(Monster);
var monstersResetRoute = require('./monstersResetRoute')(Monster, fs);

app.get('/api/search-monsters', authenticationCheck, searchMonstersRoute);
app.get('/api/monster/:id', authenticationCheck, monsterRoute);
app.get('/api/monsters-reset', authenticationCheck, monstersResetRoute);
app.get('/login',function (request,response){
   response.sendfile('client/public/login.html');
});
app.get('/api/connected-user',function (request,response){
    if (request.session && request.session.user) {
        response.json({username:request.session.user.username});
    }
    else{
        response.json({});
    }
});

/* --- AUTHENTICATION STUFF --- */

app.post("/login", function (request, response) {
    authenticate(request.body.username, request.body.password, function (error, user) {
        if (user) {
            request.session.regenerate(function () {
                request.session.user = user;
                response.json({username:user.username});
            });
        } else {
            response.json({error:'login failed'});
        }
    });
});


/* --- AUTHENTICATION STUFF --- */

var port = process.env.PORT || 3000;

app.listen(port);

console.log("Encounter Builder Server listening on port " + port);

fs.writeFileSync("server.pid", process.pid);

process.on('SIGINT', function () {
    console.log('Exiting...');
    process.exit(0);
});
