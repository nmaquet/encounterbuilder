/**
 * Created by user on 15/01/14.
 */
var parseXml = require('xml2js').parseString;
var fs = require('fs');
var inPath = process.argv[2];
var outPath = process.argv[3];

fs.readFile(inPath, {encoding:'UTF-8'}, function (error, data) {
    if (error)throw error;
    parseXml(data.replace("\ufeff", ""), function (error, result) {
        if (error)throw error;

        fs.writeFile(outPath, JSON.stringify(result, null, 4), function (error) {
            if (error)throw error;
            console.log('Done');
        });
    });
});

