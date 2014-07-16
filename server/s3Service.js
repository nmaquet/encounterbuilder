"use strict";
// Load the SDK and UUID
var AWS = require('aws-sdk');
var fs = require('fs');

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
module.exports = function () {
    return {
        uploadToS3: uploadToS3,
        removeFromS3: removeFromS3
    }
};