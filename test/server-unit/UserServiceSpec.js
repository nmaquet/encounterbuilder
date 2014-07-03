"use strict";

var expect = require("chai").expect;
var async = require("async");
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var MONGODB_URL = "mongodb://nicolas:password@localhost:27017/local";

var db = null;
var userService = null;

MongoClient.connect(MONGODB_URL, function (error, db) {
    expect(error).to.equal(null);
    userService = require("../../server/userService")(db);
    describe("userService", function () {
        describeUsers(db)
    });
});

function registerBob(callback) {
    userService.register({username: "Bob", password: "password", email: "bob@bob.com", age: 31}, callback);
}

function registerAlice(callback) {
    userService.register({username: "Alice", password: "password", email: "alice@alice.com", age: 22}, callback);
}

function getContentTree(db, username, callback) {
    db.collection("contenttrees").findOne({username:username}, callback);
}

function createEncounter(db, username, callback) {
    db.collection("encounters").insert({Username:username}, callback);
}

function getEncounters(db, username, callback) {
    db.collection("encounters").find({Username:username}).toArray(callback);
}

function getFavourites(db, username, callback) {
    db.collection("favourites").findOne({username:username}, callback);
}

function describeUsers(db) {

    beforeEach(function (done) {
        db.collection("users").remove({}, function (error) {
            if (error) {
                return done(error);
            }
            db.collection("contenttrees").remove({}, function(error){
                if (error) {
                    return done(error);
                }
                db.collection("favourites").remove({}, function(error){
                    if (error) {
                        return done(error);
                    }
                    db.collection("encounters").remove({}, done);
                });
            });
        });
    });

    it("should detect non existing users", function (done) {
        userService.exists({username: "Foo"}, function (error, userExists) {
            expect(error).to.equal(null);
            expect(userExists).to.equal(false);
            done();
        });
    });

    it("should allow the registration of a user", function (done) {
        async.series([
            userService.exists.bind(null, "Bob"),
            registerBob,
            userService.exists.bind(null, "Bob")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[0]).to.equal(false);
            expect(results[2]).to.equal(true);
            done();
        });
    });

    it("should prevent the registration of a user without password", function (done) {
        userService.register({username: "Bob"}, function (error) {
            expect(error.message).to.equal("MISSING_PASSWORD");
            done();
        });
    });

    it("should prevent the registration of a user without email", function (done) {
        userService.register({username: "Bob", password: "password"}, function (error) {
            expect(error.message).to.equal("MISSING_EMAIL");
            done();
        });
    });

    it("should prevent the registration of a user without username", function (done) {
        userService.register({}, function (error) {
            expect(error.message).to.equal("MISSING_USERNAME");
            done();
        });
    });

    it("should prevent the registration of users with an existing (case insensitive) username", function (done) {
        async.series([
            registerBob,
            userService.register.bind(null, {username: "BOB", password: "password", email: "bob@bob.com"})
        ], function (error) {
            expect(error.message).to.equal("USERNAME_ALREADY_EXISTS");
            done();
        });
    });

    it("should prevent the registering of users with an existing (case insensitive) email", function (done) {
        async.series([
            registerBob,
            userService.register.bind(null, {username: "OtherBob", password: "password", email: "BOB@bob.com"})
        ], function (error, results) {
            expect(error.message).to.equal("EMAIL_ALREADY_EXISTS");
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
            userService.get.bind(null, "Bob"),
            userService.update.bind(null, "Bob", {username: "Alice"}),
            userService.get.bind(null, "Alice")
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
            userService.get.bind(null, "Bob"),
            userService.update.bind(null, "Bob", {email: "bob@yada.com"}),
            userService.get.bind(null,"Bob")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[1].email).to.equal("bob@bob.com");
            expect(results[3].email).to.equal("bob@yada.com");
            done();
        });
    });

    it("should allow updating of username to same username", function (done) {
        async.series([
            registerBob,
            userService.update.bind(null, "Bob", {username: "Bob"})
        ], function (error, results) {
            expect(error).to.equal(null);
            done();
        });
    });

    it("should allow updating of username to same username with different case", function (done) {
        async.series([
            registerBob,
            userService.update.bind(null, "Bob", {username: "BOB"}),
            userService.get.bind(null,"BOB")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[2].username).to.equal("BOB");
            done();
        });
    });

    it("should allow updating of email to same email with different case", function (done) {
        async.series([
            registerBob,
            userService.update.bind(null, "Bob", {email: "BOB@bob.com"}),
            userService.get.bind(null,"Bob")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[2].email).to.equal("BOB@bob.com");
            done();
        });
    });

    it("should allow updating of metadata", function (done) {
        async.series([
            registerBob,
            userService.get.bind(null, "Bob"),
            userService.update.bind(null, "Bob", {age: 32}),
            userService.get.bind(null,"Bob")
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
            userService.update.bind(null, "Bob", {username: "ALICE"}),
        ], function (error, results) {
            expect(error.message).to.equal("USERNAME_ALREADY_EXISTS");
            done();
        });
    });

    it("should prevent updating data if email (case insensitive) collision occurs", function (done) {
        async.series([
            registerBob,
            registerAlice,
            userService.update.bind(null, "Bob", {email: "ALICE@alice.com"}),
        ], function (error, results) {
            expect(error.message).to.equal("EMAIL_ALREADY_EXISTS");
            done();
        });
    });

    it("should prevent updating users that don't exist", function (done) {
        async.series([
            registerBob,
            userService.update.bind(null, "Alice", {email: "alice@alice.com"}),
        ], function (error, results) {
            expect(error.message).to.equal("USER_DOES_NOT_EXIST");
            done();
        });
    });

    it("should get users and not store the password but have a salt and hash !", function (done) {
        async.series([
            registerBob,
            userService.get.bind(null, "Bob")
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
            userService.authenticate.bind(null, "Bob", "wrongpassword")
        ], function (error, results) {
            expect(error.message).to.equal("WRONG_PASSWORD");
            expect(results[1]).to.equal(null);
            done();
        });
    });

    it("should allow authentication (success case)", function(done){
        async.series([
            registerBob,
            userService.authenticate.bind(null, "Bob", "password")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[1].username).to.equal("Bob");
            done();
        });
    });

    it("should allow case insensitive login", function(done){
        async.series([
            registerBob,
            userService.authenticate.bind(null, "BOB", "password")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[1].username).to.equal("Bob");
            done();
        });
    });

    it("should prevent from updating the password directly", function(done){
        async.series([
            registerBob,
            userService.update.bind(null, "Bob", {password: "newpassword"}),
        ], function (error, results) {
            expect(error.message).to.equal("USE_UPDATEPASSWORD_TO_UPDATE_PASSWORD");
            done();
        });
    });

    it("should prevent from updating the hash directly", function(done){
        async.series([
            registerBob,
            userService.update.bind(null, "Bob", {hash: "XYZ"}),
        ], function (error, results) {
            expect(error.message).to.equal("CANNOT_UPDATE_HASH_OR_SALT_FIELDS");
            done();
        });
    });

    it("should prevent from updating the salt directly", function(done){
        async.series([
            registerBob,
            userService.update.bind(null, "Bob", {salt: "XYZ"}),
        ], function (error, results) {
            expect(error.message).to.equal("CANNOT_UPDATE_HASH_OR_SALT_FIELDS");
            done();
        });
    });

    it("should allow to get users (success case)", function(done){
        async.series([
            registerBob,
            userService.get.bind(null, "Bob")
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
            userService.toArray.bind(null)
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
            userService.updatePassword.bind(null, "Bob", "newpassword"),
            userService.authenticate.bind(null, "Bob", "newpassword")
        ], function (error, results) {
            expect(error).to.equal(null);
            done();
        });
    });

    it("should allow to remove a user", function(done){
        async.series([
            registerBob,
            registerAlice,
            userService.remove.bind(null, "Bob"),
            userService.exists.bind(null, "Bob"),
            userService.exists.bind(null, "Alice")
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
            userService.remove.bind(null, "Alice"),
        ], function (error, results) {
            expect(error).to.equal(null);
            done();
        });
    });

    it("should allow to update the password (unsuccessul authenticate)", function(done){
        async.series([
            registerBob,
            userService.updatePassword.bind(null, "Bob", "newpassword"),
            userService.authenticate.bind(null, "Bob", "wrongpassword")
        ], function (error, results) {
            expect(error.message).to.equal("WRONG_PASSWORD");
            done();
        });
    });

    it("should create an empty contenttree after registering", function (done) {
        async.series([
            registerBob,
            getContentTree.bind(null, db, "Bob")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[1].username).to.equal("Bob");
            expect(results[1].tree).to.deep.equal([]);
            done();
        });
    });

    it("should create an empty favourite tree after registering", function (done) {
        async.series([
            registerBob,
            getFavourites.bind(null, db, "Bob")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[1].username).to.equal("Bob");
            expect(results[1].favourites).to.deep.equal([]);
            done();
        });
    });

    it("should update the contenttree username if the username changes", function (done) {
        async.series([
            registerBob,
            userService.update.bind(null, "Bob", {username: "William"}),
            getContentTree.bind(null, db, "William")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[2].username).to.equal("William");
            done();
        });
    });

    it("should update the encounters username if the username changes", function (done) {
        async.series([
            registerBob,
            createEncounter.bind(null, db, "Bob"),
            createEncounter.bind(null, db, "Bob"),
            userService.update.bind(null, "Bob", {username: "William"}),
            getEncounters.bind(null, db, "William")
        ], function (error, results) {
            expect(error).to.equal(null);
            expect(results[4].length).to.equal(2);
            expect(results[4][0].Username).to.equal("William");
            expect(results[4][1].Username).to.equal("William");
            done();
        });
    });
}

