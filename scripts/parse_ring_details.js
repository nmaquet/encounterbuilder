"use strict";

var fs = require('fs');
var cheerio = require('cheerio');

var html = fs.readFileSync(__dirname + '/../data/contrib/ring_descriptions_prd.html');

var $ = cheerio.load(html);

$("p").filter(function (index) {
    return this.attr("id") !== undefined;
}).each(function (index) {
    console.log(this.text());
});
