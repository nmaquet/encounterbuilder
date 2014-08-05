// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

function generateUserSchema(mongoose) {
    return new mongoose.Schema({
        username: String,
        email:String,
        fullname:String,
        salt: String,
        hash: String
    });
}

module.exports = function (mongoose) {
    return {
        User: mongoose.model('User', generateUserSchema(mongoose))
    };
};