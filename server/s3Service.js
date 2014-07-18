"use strict";

var AWS = require('aws-sdk');
var fs = require('fs');
var crypto = require("crypto");

AWS.config.accessKeyId = process.env["AWS_ACCESS_KEY_ID"];
AWS.config.secretAccessKey = process.env["AWS_SECRET_ACCESS_KEY"];

var s3 = new AWS.S3();

var bucketName = process.env["AWS_BUCKET_NAME"];
var urlPrefix = "http://s3.amazonaws.com/" + bucketName + "/";

function uploadToS3(id, contentType, filePath, callback) {
    var fileStream = fs.createReadStream(filePath);
    var params = {Bucket: bucketName, Key: id, ContentType: contentType, Body: fileStream, ACL: 'public-read'};
    s3.putObject(params, function (error, data) {
        callback(error, data, urlPrefix + id);
    });
}

function removeFromS3(id, callback) {
    var params = {Bucket: bucketName, Key: id};
    s3.deleteObject(params, function (error) {
        callback(error);
    });
}

function getResourceURL(id) {
    return urlPrefix + id;
}

function createS3Credentials(keyPrefix, contentType) {

    var date = new Date();
    var s3Policy = {
        "expiration": "2016-01-01T00:00:00Z",
        "conditions": [
            { "bucket": bucketName },
            ["starts-with", "$key", keyPrefix],
            { "acl": "public-read" },
//            { "success_action_redirect": "http://example.com/uploadsuccess" },
//            ["content-length-range", 0, 2147483648],
            ["eq", "$Content-Type", contentType]
        ]
    };

    var s3PolicyBase64 = new Buffer(JSON.stringify(s3Policy)).toString('base64');

    var s3Credentials = {
        s3PolicyBase64: s3PolicyBase64,
        s3Signature: crypto.createHmac("sha1", AWS.config.secretAccessKey).update(s3PolicyBase64).digest("base64"),
        s3KeyId: AWS.config.accessKeyId,
        s3Redirect: "http://example.com/uploadsuccess",
        url: urlPrefix,
        contentType: contentType
    };

    return s3Credentials;
}

module.exports = function () {
    return {
        uploadToS3: uploadToS3,
        removeFromS3: removeFromS3,
        createS3Credentials: createS3Credentials,
        getResourceURL: getResourceURL
    }
};