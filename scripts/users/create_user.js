"use strict";

var authentication = require("../../server/authentication")();
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var User = require("../userModel")(mongoose).User;
var username = process.argv[2];
var email = process.argv[3];

if (process.argv[4]) {
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

function randomString() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomString = '';
    for (var i = 0; i < string_length; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        randomString += chars.substring(randomNumber, randomNumber + 1);
    }
    return randomString;
}

function main(db) {
    var password = randomString();
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
            if (error) {
                console.log(error);
                db.disconnect();
            }
            else {
                var mailto = 'mailto:' + email + '?BCC=beta@encounterbuilder.com&Subject=Welcome%20to%20DemonSquid%27s%20Encounter%20Builder%20private%20beta&Body=Hey%2C%0A%0AThanks%20for%20signing%20up%20for%20the%20private%20beta%21%0AHere%20is%20your%20username%20and%20password%20for%20Encounter%20Builder.%0A%0Ausername%3A%20' + username + '%0Apassword%3A%20' + password + '%0A%0AHead%20over%20to%20http%3A//www.encounterbuilder.com%20to%20log%20in%21%0A%0ACurrently%20you%20can%27t%20change%20or%20reset%20your%20password%20yourself%20but%20this%20will%20work%20very%20soon.%20In%20the%20meantime%20if%20you%20need%20to%20reset%20it%2C%20just%20send%20us%20an%20email.%0A%0ACheers%2C%0A%0ANick%20%26%20Chris';
                var mail = '<a href="' + mailto + '">Send Mail!</a>';
                fs.writeFileSync('./' + username + ".html", mail);
                db.disconnect();
            }
        });
    });
}