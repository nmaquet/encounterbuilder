"use strict";

var authentication = require("../../server/authentication")();
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

var username = process.argv[2];
var email = process.argv[3];

if (process.env.USE_TEST_DB) {
    var MONGODB_URL = process.env['MONGODB_TEST_URL'];
}
else {
    var MONGODB_URL = process.env['MONGODB_URL'];
}

MongoClient.connect(MONGODB_URL, function (error, db) {
    console.log('connecting to ' + MONGODB_URL);
    if (error) {
        console.log(error);
    } else {
        main(db);
    }
});

function main(db) {
    var randomString = Math.random().toString(36).slice(-8);
    String.prototype.replaceAll = function (search, replace) {
        if (!replace) {
            return this;
        }

        return this.replace(new RegExp('[' + search + ']', 'g'), replace);
    };
    authentication.hash(randomString, function (error, salt, hash) {
        if (error) {
            throw error;
        }
        var user = {
            username: username,
            email: email,
            salt: salt,
            hash: hash
        }

        console.log(JSON.stringify({username: username, email: email, password: randomString}));

        db.collection('users').insert(user, function (error, newEncounter) {
            if (error) {
                console.log(error);
                db.close();
            }
            else {
                var subject = "Welcome to Demon Squid's Encounter Builder private beta".replace(" ", "%20");
                var body = "Hey, \n here is your username and password for Encounter Builder.\n " +
                    "username:" + username + "\n" + "password:" + randomString + "\n" + "Currently you can't change or reset your password yourself but this will work very soon, in the meantime if you need to reset it, send us an email";
                body = body.replaceAll(" ", "%20").replaceAll("\n", "%0A");
                var bcc = "beta@encounterbuilder.com";

                var mail = '<a href="mailto:' + email + '?bcc=' + bcc + '&subject=' + subject + '&body=' + body + '">Send Mail!</a>';
                fs.writeFileSync('./' + username + ".html", mail);

                db.close();
            }
        });
    });
}