// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var program = require('commander');
var read = require('read');
var async = require('async');
var crypto = require('crypto');

function command(command, description, callback) {
    program
        .command(command)
        .description(description)
        .action(function (arg1, arg2, arg3) {
            callback(arg1, arg2, arg3);
        });
}

program
    .version('0.0.1')
    .usage('<command>')

command("encrypt", "encrypt a string", function () {
    async.series([
        read.bind(null, { prompt: ' Password : ', silent: true }),
        read.bind(null, { prompt: 'Cleartext : ' })
    ], function (error, results) {
        if (error) {
            return console.log("aborted");
        }
        var password = results[0][0];
        var cleartext = results[1][0];
        var cipher = crypto.createCipher("aes-128-cbc", password);
        var ciphertext = "";
        ciphertext += cipher.update(cleartext, 'utf8', 'base64');
        ciphertext += cipher.final('base64');
        console.log("Ciphertext: " + ciphertext);
    });
});

command("decrypt", "decrypt a string", function () {
    async.series([
        read.bind(null, { prompt: '  Password : ', silent: true }),
        read.bind(null, { prompt: 'Ciphertext : ' })
    ], function (error, results) {
        if (error) {
            return console.log("aborted");
        }
        var password = results[0][0];
        var ciphertext = results[1][0];
        var decipher = crypto.createDecipher("aes-128-cbc", password);
        var cleartext = "";
        cleartext += decipher.update(ciphertext, 'base64');
        cleartext += decipher.final('utf8');
        console.log("Cleartext: " + cleartext);
    });
});

program.parse(process.argv);

var COMMANDS = ["encrypt", "decrypt"];

if (program.args.length === 0 || COMMANDS.indexOf(program.rawArgs[2]) < 0) {
    program.help();
}