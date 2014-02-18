"use strict";

var request = require('request');
var cheerio = require('cheerio');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var baseUrl = 'http://www.d20pfsrd.com/equipment---final/weapons/weapon-descriptions/';

if (process.env.USE_TEST_DB) {
    var MONGODB_URL = process.env['MONGODB_TEST_URL'];
}
else {
    var MONGODB_URL = process.env['MONGODB_URL'];
}

MongoClient.connect(MONGODB_URL, function (error, db) {
    if (error) {
        console.log(error);
    } else {
        main(db);
    }
});


function main(db) {
    console.log("USE_TEST_DB" + process.env.USE_TEST_DB);

    db.collection('magicitems').find({Proficiency: {$exists: true}}).toArray(function (error, data) {
        function imDone() {
            done++;
            if (done === count) {
                console.log('done');
                db.close();
            }
        }

        function scrapeOneWeapon(item) {
            var id = item.id;
            if (id.indexOf("(") !== -1) {
                id = id.slice(0, id.indexOf("(") - 1);
            }

            if (item.WeaponType === "ammunition") {
                var url = baseUrl + "ammunition/" + id;
            }
            else {
                var url = baseUrl + id;
            }
            request(url, function (err, resp, body) {
                if (err)
                    throw err;
                var $ = cheerio.load(body);
                console.log("stuff happened");

                if ($("th:contains('Cost')").html()) {
                       console.log("th with cost found: " + $("th:contains('Cost')").html())
                    var visualDescriptionElement = $("#sites-canvas-main-content div table tbody tr td div div p span i")
                    if (visualDescriptionElement) {
                        var visualDescription = $("#sites-canvas-main-content div table tbody tr td div div p span i").text();
                    }

                    //*[@id="sites-canvas-main-content"]/div/table/tbody/tr/td[1]/div/div/p[2]/span
                    var description = "";
                    var rootDescription = $("#sites-canvas-main-content div table tbody tr td div div");

                    //console.log($("#sites-canvas-main-content div table tbody tr td div div p").html());
                    for (var i = 1; i < 5; i++) {
                        var descriptionPartial = $(rootDescription).find("p").eq(i).text();
                        description += descriptionPartial + "\n";
                    }
                }
                else{
                    console.log("NO th with cost found: " + $("th:contains('Cost')").html())
                    var visualDescription = $("div.sites-layout-tile.sites-tile-name-header").text();
                    var description = $("div.sites-layout-tile.sites-tile-name-content-1").text();
                }

                console.log(visualDescription);
                console.log(description);
               /* if (visualDescription) {
                    item.Description_Visual = visualDescription;
                }
                if (description) {
                    item.Description = description;
                }
                if (visualDescription || description) {
                    var selector = {id: item.id};
                    delete item._id;
                    db.collection('magicitems').update(selector, item, {}, function (error) {
                        if (error) {
                            console.log(error);
                            imDone();
                        }
                        else {
                            console.log(item.Name + " description updated in database");
                            imDone();
                        }
                    });
                }
                else {
                    console.log("no description found for : " + item.name);
                    imDone();
                }*/
            })
        }

        if (error) {
            throw error;
        }
        console.log("mongo replied with " + data.length + " weapons");
        var count = data.length;
        var done = 0;


        for (var i in data) {
            scrapeOneWeapon(data[i]);
        }

    });
}
