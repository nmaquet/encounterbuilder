"use strict";

var expect = require("chai").expect;

var mock, monstersResetRoute;

describe("monstersResetRoute", function () {

    beforeEach(function() {
        mock = require("./mock")();
        monstersResetRoute = require('../../server/monstersResetRoute')(mock.Monster, mock.fs);
    });

    it("should start by deleting everything from the DB", function() {
        monstersResetRoute(mock.request, mock.response);
        expect(mock.Monster.remove.params).to.deep.equal({});
    });

    it("should send the error if the remove fails", function() {
        var error = "KILL IT WITH FIRE";
        monstersResetRoute(mock.request, mock.response);
        mock.Monster.remove.callback(error);
        expect(mock.response.send.data).to.equal(error);
    });

    it("should read the monsters JSON file", function() {
        var removeError = null;
        monstersResetRoute(mock.request, mock.response);
        mock.Monster.remove.callback(removeError);
        expect(mock.fs.readFile.path).to.contain("/../data/monsters/monsters_full.json");
    });

    it("should parse the file's JSON content and create a monster per element", function() {
        var removeError = null;
        var readFileError = null;
        var fileContents = '[{ "Name" : "Dragon", "CR" : "20"}, { "Name" : "Goblin", "CR" : "1/3"} ]';
        monstersResetRoute(mock.request, mock.response);
        mock.Monster.remove.callback(removeError);
        mock.fs.readFile.callback(readFileError, fileContents);
        expect(mock.Monster.create.calls[0].object).to.deep.equal({name : "Dragon", id : "dragon", cr: 20});
        expect(mock.Monster.create.calls[1].object).to.deep.equal({name : "Goblin", id : "goblin", cr: 1/3});
        expect(mock.Monster.create.calls.length).to.equal(2);
    });

    it("should send a acknowledgement message", function() {
        var removeError = null;
        var readFileError = null;
        var fileContents = '[]';
        monstersResetRoute(mock.request, mock.response);
        mock.Monster.remove.callback(removeError);
        mock.fs.readFile.callback(readFileError, fileContents);
        expect(mock.response.send.data).to.equal('monsters regenerated');
    });

});