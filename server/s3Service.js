// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var AWS = require('aws-sdk');
var crypto = require("crypto");

AWS.config.accessKeyId = process.env["AWS_ACCESS_KEY_ID"];
AWS.config.secretAccessKey = process.env["AWS_SECRET_ACCESS_KEY"];
AWS.config.region = "us-east-1";

var s3 = new AWS.S3();

var bucketName = process.env["AWS_BUCKET_NAME"];
var urlPrefix = "http://s3.amazonaws.com/" + bucketName + "/";

function removeFromS3(id, callback) {
    var params = {Bucket: bucketName, Key: id};
    s3.deleteObject(params, function (error) {
        callback(error);
    });
}
function copyInS3(sourceId, destinationId) {
    var params = {Bucket: bucketName, Key: destinationId, CopySource: bucketName + "/" + sourceId, ACL: "public-read"};
    console.log(params);
    s3.copyObject(params, function (error) {
        if (error) {
            console.log(error);
        }
    });
}
function getResourceURL(id) {
    return urlPrefix + id + "?" + new Date().getTime();
}

function createS3Credentials(key, contentType) {

    var now = new Date();
    var expiration = new Date(now.getTime() + 5 * 60000 /* 5 minutes */);
    var s3Policy = {
        "expiration": expiration.toISOString(),
        "conditions": [
            { "bucket": bucketName },
            ["starts-with", "$key", key],
            { "acl": "public-read" },
            ["content-length-range", 0, 3 * 1024 * 1024],
            ["eq", "$Content-Type", contentType]
        ]
    };

    var s3PolicyBase64 = new Buffer(JSON.stringify(s3Policy)).toString('base64');

    var s3Credentials = {
        policy: s3PolicyBase64,
        signature: crypto.createHmac("sha1", AWS.config.secretAccessKey).update(s3PolicyBase64).digest("base64"),
        AWSAccessKeyId: AWS.config.accessKeyId,
        url: urlPrefix,
        "Content-Type": contentType,
        resourceURL: getResourceURL(key)
    };

    return s3Credentials;
}

module.exports = function () {
    return {
        removeFromS3: removeFromS3,
        copyInS3: copyInS3,
        createS3Credentials: createS3Credentials,
        getResourceURL: getResourceURL
    }
};