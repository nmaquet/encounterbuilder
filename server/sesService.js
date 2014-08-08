// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var AWS = require('aws-sdk');
AWS.config.accessKeyId = process.env["AWS_ACCESS_KEY_ID"];
AWS.config.secretAccessKey = process.env["AWS_SECRET_ACCESS_KEY"];
AWS.config.region = "eu-west-1";

var ses = new AWS.SES({apiVersion: '2010-12-01'});

function sendConfirmationEmail(user, callback) {
    var link = "http://www.chronicleforge.com/validate-email/?id=" + user._id + "&uuid=" + user.validationUuid;
    var name = user.fullname || user.username;

    var html = "<html><body>";
    html += "<p>Hi " + name + ",</p>";
    html += "<p>Welcome to Chronice Forge!</p>";
    html += "<p><a href='" + link + "'>Please click here to activate your account</a></p>";
    html += "<p>Cheers,</p>";
    html += "<p>Nick & Chris</p>";
    html += "</body></html>";

    var text = "";
    text += "Hi " + name + ",\n\n";
    text += "Welcome to Chronice Forge!\n\n";
    text += "please copy and paste this link into your browser to activate your account: " + link + "\n";
    text += "Cheers,\n";
    text += "Nick & Chris";

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