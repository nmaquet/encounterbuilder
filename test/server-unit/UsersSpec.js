"use strict";

var expect = require("chai").expect;
var async = require("async");
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var MONGODB_URL = "mongodb://nicolas:password@localhost:27017/local";

var db = null;
var Users = null;

MongoClient.connect(MONGODB_URL, function (error, db) {
    expect(error).to.equal(null);
    Users = require("../../server/users")(db);
    describe("Users", function () {
        describeUsers(db)
    });
});

function registerBob(callback) {
    Users.register({username: "Bob", password: "password", email: "bob@bob.com", age: 31}, callback);
}

function registerAlice(callback) {
    Users.register({username: "Alice", password: "password", email: "alice@alice.com", age: 22}, callback);
}

function describeUsers(db) {

    beforeEach(function (done) {
        db.collection("users").remove({}, done);
    });

    it("should detect non existing users", function (done) {
        Users.exists({username: "Foo"}, function (error, userExists) {
            expect(error).to.equal(null);
            expect(userExists).to.equal(false);
            done();
        });
    });

    it("should allow the registration of a user", function (done) {
        async.series([
            Users.exists.bind(null, "Bob"),
            registerBob,
            Users.exists.bind(null, "Bob")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[0]).to.equal(false);
            expect(results[2]).to.equal(true);
            done();
        });
    });

    it("should prevent the registration of a user without password", function (done) {
        Users.register({username: "Bob"}, function (error) {
            expect(error.message).to.equal("missing password");
            done();
        });
    });

    it("should prevent the registration of a user without email", function (done) {
        Users.register({username: "Bob", password: "password"}, function (error) {
            expect(error.message).to.equal("missing email");
            done();
        });
    });

    it("should prevent the registration of a user without username", function (done) {
        Users.register({}, function (error) {
            expect(error.message).to.equal("missing username");
            done();
        });
    });

    it("should prevent the registration of users with an existing (case insensitive) username", function (done) {
        async.series([
            registerBob,
            Users.register.bind(null, {username: "BOB", password: "password", email: "bob@bob.com"})
        ], function (error) {
            expect(error.message).to.equal("username exists");
            done();
        });
    });

    it("should prevent the registering of users with an existing (case insensitive) email", function (done) {
        async.series([
            registerBob,
            Users.register.bind(null, {username: "OtherBob", password: "password", email: "BOB@bob.com"})
        ], function (error, results) {
            expect(error.message).to.equal("email exists");
            done();
        });
    });

    it("should output the created user when registering", function (done) {
        registerBob(function(error, user) {
           expect(user.username).to.equal("Bob");
           done();
        });
    });

    it("should allow updating of username", function (done) {
        async.series([
            registerBob,
            Users.get.bind(null, "Bob"),
            Users.update.bind(null, "Bob", {username: "Alice"}),
            Users.get.bind(null, "Alice")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[1].username).to.equal("Bob");
            expect(results[3].username).to.equal("Alice");
            done();
        });
    });

    it("should allow updating of email", function (done) {
        async.series([
            registerBob,
            Users.get.bind(null, "Bob"),
            Users.update.bind(null, "Bob", {email: "bob@yada.com"}),
            Users.get.bind(null,"Bob")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[1].email).to.equal("bob@bob.com");
            expect(results[3].email).to.equal("bob@yada.com");
            done();
        });
    });

    it("should allow updating of metadata", function (done) {
        async.series([
            registerBob,
            Users.get.bind(null, "Bob"),
            Users.update.bind(null, "Bob", {age: 32}),
            Users.get.bind(null,"Bob")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[1].age).to.equal(31);
            expect(results[3].age).to.equal(32); /* happy birthday, bob ! */
            done();
        });
    });

    it("should prevent updating data if username (case insensitive) collision occurs", function (done) {
        async.series([
            registerBob,
            registerAlice,
            Users.update.bind(null, "Bob", {username: "ALICE"}),
        ], function (error, results) {
            expect(error.message).to.equal("username exists");
            done();
        });
    });

    it("should prevent updating data if email (case insensitive) collision occurs", function (done) {
        async.series([
            registerBob,
            registerAlice,
            Users.update.bind(null, "Bob", {email: "ALICE@alice.com"}),
        ], function (error, results) {
            expect(error.message).to.equal("email exists");
            done();
        });
    });

    it("should prevent updating users that don't exist", function (done) {
        async.series([
            registerBob,
            Users.update.bind(null, "Alice", {email: "alice@alice.com"}),
        ], function (error, results) {
            expect(error.message).to.equal("user does not exist");
            done();
        });
    });

    it("should get users and not store the password but have a salt and hash !", function (done) {
        async.series([
            registerBob,
            Users.get.bind(null, "Bob")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[1].username).to.equal("Bob");
            expect(results[1].email).to.equal("bob@bob.com");
            expect(results[1].password).to.equal(undefined);
            expect(results[1].salt).to.not.equal(undefined);
            expect(results[1].hash).to.not.equal(undefined);
            done();
        });
    });

    it("should allow authentication (failure case)", function(done){
        async.series([
            registerBob,
            Users.authenticate.bind(null, "Bob", "wrongpassword")
        ], function (error, results) {
            expect(error.message).to.equal("authentication failure");
            expect(results[1]).to.equal(null);
            done();
        });
    });

    it("should allow authentication (success case)", function(done){
        async.series([
            registerBob,
            Users.authenticate.bind(null, "Bob", "password")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[1].username).to.equal("Bob");
            done();
        });
    });

    it("should allow case insensitive login", function(done){
        async.series([
            registerBob,
            Users.authenticate.bind(null, "BOB", "password")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[1].username).to.equal("Bob");
            done();
        });
    });

    it("should prevent from updating the password directly", function(done){
        async.series([
            registerBob,
            Users.update.bind(null, "Bob", {password: "newpassword"}),
        ], function (error, results) {
            expect(error.message).to.equal("use updatePassword() to update password");
            done();
        });
    });

    it("should prevent from updating the hash directly", function(done){
        async.series([
            registerBob,
            Users.update.bind(null, "Bob", {hash: "XYZ"}),
        ], function (error, results) {
            expect(error.message).to.equal("cannot update hash or salt fields");
            done();
        });
    });

    it("should prevent from updating the salt directly", function(done){
        async.series([
            registerBob,
            Users.update.bind(null, "Bob", {salt: "XYZ"}),
        ], function (error, results) {
            expect(error.message).to.equal("cannot update hash or salt fields");
            done();
        });
    });

    it("should allow to get users (success case)", function(done){
        async.series([
            registerBob,
            Users.get.bind(null, "Bob")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[1].username).to.equal("Bob");
            expect(results[1].email).to.equal("bob@bob.com");
            done();
        });
    });

    it("should allow to list all users in an array", function(done){
        async.series([
            registerBob,
            registerAlice,
            Users.toArray.bind(null)
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[2][0].username).to.equal("Bob");
            expect(results[2][1].username).to.equal("Alice");
            done();
        });
    });

    it("should allow to update the password (successul authenticate)", function(done){
        async.series([
            registerBob,
            Users.updatePassword.bind(null, "Bob", "newpassword"),
            Users.authenticate.bind(null, "Bob", "newpassword")
        ], function (error, results) {
            expect(error).to.equal(null);
            done();
        });
    });

    it("should allow to remove a user", function(done){
        async.series([
            registerBob,
            registerAlice,
            Users.remove.bind(null, "Bob"),
            Users.exists.bind(null, "Bob"),
            Users.exists.bind(null, "Alice")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[3]).to.equal(false);
            expect(results[4]).to.equal(true);
            done();
        });
    });

    it("should fail silently when removing non-existing user", function(done){
        async.series([
            registerBob,
            Users.remove.bind(null, "Alice"),
        ], function (error, results) {
            expect(error).to.equal(null);
            done();
        });
    });

    it("should allow to update the password (unsuccessul authenticate)", function(done){
        async.series([
            registerBob,
            Users.updatePassword.bind(null, "Bob", "newpassword"),
            Users.authenticate.bind(null, "Bob", "wrongpassword")
        ], function (error, results) {
            expect(error.message).to.equal("authentication failure");
            done();
        });
    });
}

