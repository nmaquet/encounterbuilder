"use strict";

var authentication = require("../../server/authentication")();
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var User = require("../userModel")(mongoose).User;
var username = process.argv[2];
var email = process.argv[3];

if (process.argv[4]){
    var MONGODB_URL = process.argv[4];
}
else if (process.env.USE_TEST_DB) {
    var MONGODB_URL = process.env['MONGODB_TEST_URL'];
}
else {
    var MONGODB_URL = process.env['MONGODB_URL'];
}

var db = mongoose.connect(MONGODB_URL);
main(db);
//MongoClient.connect(MONGODB_URL, function (error, db) {
//    console.log('connecting to ' + MONGODB_URL);
//    if (error) {
//        console.log(error);
//    } else {
//        main(db);
//    }
//});

function randomString() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomString = '';
    for (var i=0; i<string_length; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        randomString += chars.substring(randomNumber,randomNumber+1);
    }
    return randomString;
}

function main(db) {
    var password = randomString();
    String.prototype.replaceAll = function (search, replace) {
        if (!replace) {
            return this;
        }

        return this.replace(new RegExp('[' + search + ']', 'g'), replace);
    };
    authentication.hash(password, function (error, salt, hash) {
        if (error) {
            throw error;
        }
        var user = {
            username: username,
            email: email,
            salt: salt,
            hash: hash
        }

        console.log(JSON.stringify({username: username, email: email, password: password}));
            User.create(user, function (error) {
//        db.collection('users').insert(user, function (error) {
            if (error) {
                console.log(error);
//                db.close();
                db.disconnect();
            }
            else {
                var subject = "Welcome to Demon Squid's Encounter Builder private beta".replace(" ", "%20");
                var body = "Hey,\n Thanks for signing up for the private beta!\nHere is your username and password for Encounter Builder.\n\n" +
                    "username:" + username + "\n" + "password:" + password + "\n" + "Currently you can't change or reset your password yourself but this will work very soon, in the meantime if you need to reset it, send us an email";
                body = body.replaceAll(" ", "%20").replaceAll("\n", "%0A");
                var bcc = "beta@encounterbuilder.com";

                var mail = '<a href="mailto:' + email + '?bcc=' + bcc + '&subject=' + subject + '&body=' + body + '">Send Mail!</a>';
                fs.writeFileSync('./' + username + ".html", mail);

//                db.close();
                db.disconnect();
            }
        });
    });
}