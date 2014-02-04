"use strict";

function generateUserSchema(mongoose) {
    return new mongoose.Schema({
        username: String,
        salt: String,
        hash: String
    });
}

module.exports = function (mongoose) {
    return {
        User: mongoose.model('users', generateUserSchema(mongoose))
    };
};