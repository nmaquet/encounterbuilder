// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var AWS = require('aws-sdk');
var fs = require('fs');


var AWS = require('aws-sdk');
AWS.config.accessKeyId = process.env["AWS_ACCESS_KEY_ID"];
AWS.config.secretAccessKey = process.env["AWS_SECRET_ACCESS_KEY"];
AWS.config.region = "us-west-2";

var ses = new AWS.SES({apiVersion: '2010-12-01'});


function sendConfirmationEmail(user, host, callback) {
    var link = "http://"+host + "/validate-email/?id="+user._id+"&uuid=" + user.validationUuid;
    var name = user.fullname || user.username;

    var html = "<html><body>";
    html += "Hi " + name + ",<br><br>";
    html += "<a href='" + link + "'>Please click here to activate your account</a><br><br>";
    html += "Cheers,<br>";
    html += "</body></html>";
    var text = "";
    text += "Hi " + name + ",\n\n";
    text += "please copy and paste this link into your browser to activate your account: " + link + "\n";
    text += "Cheers,\n";

    var email = {
        Source: "beta@chronicleforge.com",
        Destination: { ToAddresses: [user.email] },
        Message: {
            Subject: {
                Data: 'Thank you for registering'
            },
            Body: {
                Text: {Data: text},
                Html: {Data: html}
            }
        }
    };


    console.log("sending email...");
    ses.sendEmail(email, function (error, data) {
        console.log("error : " + error);
        console.log("data : " + data);
        if (callback) {
            callback(error, data);
        }
    });
}


module.exports = function () {
    return {
        sendConfirmationEmail: sendConfirmationEmail
    }
};