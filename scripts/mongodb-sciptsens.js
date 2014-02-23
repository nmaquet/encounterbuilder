"use strict";

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;


if (process.env.USE_TEST_DB) {
    var MONGODB_URL = process.env['MONGODB_TEST_URL'];
}
else {
    var MONGODB_URL = process.env['MONGODB_URL'];
}

MongoClient.connect(MONGODB_URL, function (error, db) {
    console.log('connecting to '+MONGODB_URL);
    if (error) {
        console.log(error);
    } else {
        main(db);
    }
});

function main(db) {
    db.collection('magicitems').find({Enchanted: {$exists: false}}).toArray(function (error, data) {
        console.log(error);
        console.log(data.length);
        console.log('done');
        db.close();
    });
}

function parseClass(Class) {
    var basicClasses = ['commoner', 'aristocrat', 'expert', 'warrior', 'adept'];

    function parseSingleClass(singleClass) {
        var words = singleClass.split(" ");
        var readClass = '';
        var classLevel = 0;
        for (var i in words) {
            if (isNaN(Number(words[i]))) {
                if (i > 0) {
                    readClass += " ";
                }
                readClass += words[i]
            }
            else {
                classLevel = Number(words[i]);
            }
        }
        return {class: readClass, classLevel: classLevel};
    }

    if (Class.indexOf('/') === -1) {
        var singleClass = parseSingleClass(Class);
        var heroic = basicClasses.indexOf(singleClass.class) === -1;
        return {'heroic': heroic, 'level': singleClass.classLevel, 'classes': [singleClass]};
    }
    else {
        var classes = Class.split('/');
        var multipleClasses = [];
        var heroic = false;
        var level = 0;
        for (var j in classes) {
            multipleClasses[j] = parseSingleClass(classes[j]);
            level += multipleClasses[j].classLevel;
            if (!heroic) {
                heroic = basicClasses.indexOf(multipleClasses[j].class) === -1;
            }
        }
        return {'heroic': heroic, 'level': level, 'classes': multipleClasses};
    }
}